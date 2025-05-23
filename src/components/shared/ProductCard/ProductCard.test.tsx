import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";
import { vi, describe, it, beforeEach, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ProductCard", () => {
  const defaultProps = {
    id: 1,
    title: "Test Product",
    price: 99.99,
    image: "https://example.com/image.jpg",
    isFavorite: false,
    onToggleFavorite: vi.fn(),
  };

  const setup = (props = defaultProps) =>
    render(
      <BrowserRouter>
        <ProductCard {...props} />
      </BrowserRouter>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders product information", () => {
    setup();

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
  });

  it("calls navigate on card click", () => {
    setup();

    fireEvent.click(screen.getByText("Test Product"));
    expect(mockNavigate).toHaveBeenCalledWith("/listing/1");
  });

  it("calls onToggleFavorite when heart icon is clicked", () => {
    const onToggleFavorite = vi.fn();

    setup({
      ...defaultProps,
      onToggleFavorite,
    });

    fireEvent.click(screen.getByTitle("Add to wishlist"));
    expect(onToggleFavorite).toHaveBeenCalledWith(1);
  });

  it("renders filled heart when isFavorite is true", () => {
    setup({
      ...defaultProps,
      isFavorite: true,
    });

    expect(screen.getByTitle("Remove from wishlist")).toBeInTheDocument();
  });

  it("renders outline heart when isFavorite is false", () => {
    setup({
      ...defaultProps,
      isFavorite: false,
    });

    expect(screen.getByTitle("Add to wishlist")).toBeInTheDocument();
  });
});
