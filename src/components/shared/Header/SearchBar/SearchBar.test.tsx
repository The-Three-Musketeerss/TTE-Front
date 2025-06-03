import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach, expect } from "vitest";
import SearchBar from "./SearchBar";
import { BrowserRouter } from "react-router-dom";

// Mocks
const mockNavigate = vi.fn();
const mockSetSearchParams = vi.fn();
let mockSearchParams = new URLSearchParams();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: "/listing",
    }),
    useSearchParams: () => [mockSearchParams, mockSetSearchParams],
  };
});

describe("SearchBar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  const setup = () =>
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );

  it("renders input with default value from URL", () => {
    mockSearchParams.set("search", "shoes");

    setup();

    const input = screen.getByPlaceholderText("Search products...") as HTMLInputElement;
    expect(input.value).toBe("shoes");
  });

  it("updates input value on user typing", () => {
    setup();

    const input = screen.getByPlaceholderText("Search products...") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "laptop" } });
    expect(input.value).toBe("laptop");
  });

  it("sets search param after debounce when typing", async () => {
    setup();

    const input = screen.getByPlaceholderText("Search products...") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "camera" } });

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledWith(new URLSearchParams({ search: "camera" }));
    }, { timeout: 1000 });
  });

  it("removes search param when input is cleared", async () => {
    mockSearchParams.set("search", "item");

    setup();

    const input = screen.getByPlaceholderText("Search products...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledWith(new URLSearchParams());
    }, { timeout: 1000 });
  });

  it("navigates to listing with search param on submit", () => {
    setup();

    const input = screen.getByPlaceholderText("Search products...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "keyboard" } });

    fireEvent.submit(input.closest("form")!);

    expect(mockNavigate).toHaveBeenCalledWith("/listing?search=keyboard");
  });
});