import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import Checkout from "./Checkout";
import * as CartServices from "@services/CartServices";
import * as useGetUserModule from "@hooks/useGetUser";
import { useShop } from "@contexts/ShopContext";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("@services/CartServices");
vi.mock("@contexts/ShopContext", () => ({
  useShop: vi.fn(),
}));

vi.mock("@components/Checkout/AddressForm/AddressForm", () => ({
  __esModule: true,
  default: ({ onNext }: any) => (
    <div data-testid="address-form">
      AddressForm
      <button onClick={() => onNext("Sample Address", { city: "City" })}>
        Continue to Shipping
      </button>
    </div>
  ),
}));

vi.mock("@components/Checkout/ShippingMethodForm/ShippingMethodForm", () => ({
  __esModule: true,
  default: ({ onNext }: any) => (
    <div data-testid="shipping-form">
      ShippingMethodForm
      <button onClick={() => onNext()}>Continue to Payment</button>
    </div>
  ),
}));

vi.mock("@components/Checkout/PaymentForm/PaymentForm", () => ({
  __esModule: true,
  default: ({ onFinish }: any) => (
    <div data-testid="payment-form">
      PaymentForm
      <button onClick={onFinish}>Finish Order</button>
    </div>
  ),
}));

vi.mock("@components/Checkout/StepperHeader/StepperHeader", () => ({
  __esModule: true,
  default: ({ currentStep }: any) => (
    <div data-testid="stepper-header">Current step: {currentStep}</div>
  ),
}));

vi.mock("@components/Checkout/CheckoutSummary/CheckoutSummary", () => ({
  __esModule: true,
  default: () => <div data-testid="summary">Summary</div>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockGetCart = CartServices.getCart as unknown as ReturnType<typeof vi.fn>;
const mockUseNavigate = useNavigate as unknown as ReturnType<typeof vi.fn>;
const mockUseShop = useShop as unknown as ReturnType<typeof vi.fn>;

describe("Checkout", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseNavigate.mockReturnValue(mockNavigate);
    mockUseShop.mockReturnValue({ refreshCart: vi.fn() });

    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      hasLoggedIn: true,
      user: {
          token: "token", role: "Shopper",
          username: undefined,
          email: undefined
      },
    });
  });

  it("redirects to / if user not logged in", async () => {
    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      hasLoggedIn: false,
      user: null,
    });

    render(<Checkout />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  it("redirects to / if role is not Shopper", async () => {
    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      hasLoggedIn: true,
      user: {
          token: "token", role: "Admin",
          username: undefined,
          email: undefined
      },
    });

    render(<Checkout />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  it("redirects to / if cart is empty", async () => {
    mockGetCart.mockResolvedValue({ data: { shoppingCart: [] } });

    render(<Checkout />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });
  });

  it("renders stepper and address form initially", async () => {
    mockGetCart.mockResolvedValue({
      data: { shoppingCart: [{ quantity: 1 }] },
    });

    render(<Checkout />, { wrapper: MemoryRouter });

    expect(await screen.findByTestId("stepper-header")).toHaveTextContent("address");
    expect(screen.getByTestId("address-form")).toBeInTheDocument();
  });

  it("navigates through all steps and finishes order", async () => {
    const refreshCartMock = vi.fn();
    mockUseShop.mockReturnValue({ refreshCart: refreshCartMock });

    mockGetCart.mockResolvedValue({
      data: { shoppingCart: [{ quantity: 1 }] },
    });

    render(<Checkout />, { wrapper: MemoryRouter });

    fireEvent.click(await screen.findByText("Continue to Shipping"));
    expect(screen.getByTestId("shipping-form")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Continue to Payment"));
    expect(screen.getByTestId("payment-form")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Finish Order"));

    await waitFor(() => {
      expect(refreshCartMock).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/orders");
    });
  });
});
