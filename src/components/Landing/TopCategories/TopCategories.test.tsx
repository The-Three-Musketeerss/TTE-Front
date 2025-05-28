import { screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import TopCategories from "./TopCategories";
import * as CategoryServices from "@services/CategoryServices";
import { customRender } from "@utils/test-utils";

const mockGetTopCategories = vi.spyOn(CategoryServices, "getTopCategories");
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await import("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@components/shared/Button/Button", () => ({
  __esModule: true,
  default: ({ text, onClick }: any) => (
    <button onClick={onClick} data-testid="category-button">
      {text}
    </button>
  ),
}));

vi.mock("@components/shared/Button/Skeleton/Skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="button-skeleton">Loading...</div>,
}));

describe("TopCategories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading skeletons initially", async () => {
    mockGetTopCategories.mockResolvedValue({ data: [] });

    customRender(<TopCategories />);

    expect(screen.getAllByTestId("button-skeleton")).toHaveLength(3);

    await waitFor(() => {
      expect(mockGetTopCategories).toHaveBeenCalled();
    });
  });

  it("renders category buttons after loading", async () => {
    mockGetTopCategories.mockResolvedValue({
      data: ["Shoes", "Accessories", "Jackets"],
    });

    customRender(<TopCategories />);

    await waitFor(() => {
      expect(screen.getAllByTestId("category-button")).toHaveLength(3);
      expect(screen.getByText("Shoes")).toBeInTheDocument();
      expect(screen.getByText("Accessories")).toBeInTheDocument();
      expect(screen.getByText("Jackets")).toBeInTheDocument();
    });
  });

  it("navigates to listing page with selected category", async () => {
    mockGetTopCategories.mockResolvedValue({
      data: ["Hats"],
    });

    customRender(<TopCategories />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Hats"));
      expect(mockNavigate).toHaveBeenCalledWith("/listing?category=Hats");
    });
  });
});
