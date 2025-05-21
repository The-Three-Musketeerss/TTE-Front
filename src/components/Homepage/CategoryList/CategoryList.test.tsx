import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CategoryList from "./CategoryList";

// Mocks
vi.mock("@services/CategoryServices", async () => {
    return {
        getCategories: vi.fn(),
        deleteCategory: vi.fn(),
    };
});

vi.mock("@hooks/useGetUser", () => ({
    useGetUser: () => ({ user: { token: "fake-token" } }),
}));

vi.mock("react-hot-toast", () => ({
    default: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

const { getCategories, deleteCategory } = await import("@services/CategoryServices");

describe("CategoryList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders loading skeleton initially", async () => {
        (getCategories as any).mockResolvedValueOnce({ data: [] });

        render(<CategoryList />);
        expect(screen.getByText("Loading table...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByRole("table")).toBeInTheDocument();
        });
    });

    it("renders categories in the table after fetch", async () => {
        (getCategories as any).mockResolvedValueOnce({
            data: [
                { id: 1, name: "Shoes" },
                { id: 2, name: "Bags" },
            ],
        });

        render(<CategoryList />);

        await screen.findByText("Shoes");
        expect(screen.getByText("Bags")).toBeInTheDocument();
    });

    it("deletes category after confirmation", async () => {
        global.confirm = vi.fn(() => true);

        (getCategories as any).mockResolvedValue({
            data: [{ id: 1, name: "Shoes" }],
        });

        render(<CategoryList />);
        await screen.findByText("Shoes");

        fireEvent.click(screen.getByTitle("Delete category"));

        expect(global.confirm).toHaveBeenCalled();

        await waitFor(() => {
            expect(deleteCategory).toHaveBeenCalledWith(1, "fake-token");
        });
    });

    it("shows edit form when edit icon is clicked", async () => {
        (getCategories as any).mockResolvedValue({
            data: [{ id: 1, name: "Shoes" }],
        });

        render(<CategoryList />);
        await screen.findByText("Shoes");

        const row = screen.getByText("Shoes").closest("tr")!;
        const editIcon = within(row).getByTitle("Edit category");
        fireEvent.click(editIcon);

        expect(screen.getByRole("heading", { name: /edit category/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();

        fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
        await screen.findByText("Shoes");
    });


});
