import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ReviewJobs from "./ReviewJobs";
import { vi, describe, it, beforeEach, expect } from "vitest";
import * as JobServices from "@services/JobServices";
import * as useGetUserModule from "@hooks/useGetUser";
import { useNavigate } from "react-router-dom";

// Mocks
vi.mock("@services/JobServices.", () => ({
  getJobs: vi.fn(),
  reviewJob: vi.fn(),
}));

vi.mock("@components/shared/Table/Skeleton/Skeleton", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("@components/shared/Table/Table", () => ({
  default: ({ headers, data }: any) => (
    <table>
      <thead>
        <tr>
          {headers.map((h: any) => (
            <th key={h.key}>{h.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.type}</td>
            <td>{row.id_item}</td>
            <td>{row.operation}</td>
            <td>{row.itemName}</td>
            <td>{row.createdAt}</td>
            <td>{row.createdBy}</td>
            <td>{row.action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    promise: vi.fn((promise: Promise<any>, opts: any) =>
      promise.then(opts.success).catch(opts.error)
    ),
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("ReviewJobs", () => {
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as unknown as ReturnType<typeof vi.fn>).mockReturnValue(navigate);

    vi.spyOn(useGetUserModule, "useGetUser").mockReturnValue({
      user: {
        username: "test-user",
        email: "test@example.com",
        role: "admin",
        token: "test-token",
      },
      hasLoggedIn: true,
    });

    (JobServices.getJobs as any).mockResolvedValue({
      data: [
        {
          id: 1,
          type: "Update",
          id_item: 101,
          operation: "Edit",
          itemName: "Sample Item",
          createdAt: "2024-01-01",
          createdBy: "admin",
        },
      ],
    });

    (JobServices.reviewJob as any).mockResolvedValue({ message: "Job reviewed" });
  });

  it("renders jobs and allows approval", async () => {
    render(<ReviewJobs />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(JobServices.getJobs).toHaveBeenCalledWith("test-token");
    });

    expect(screen.getByText("Sample Item")).toBeInTheDocument();

    const approveIcon = screen.getByText((_, el) =>
      el?.tagName === "svg" && el.classList.contains("text-green-500")
    );

    fireEvent.click(approveIcon);

    await waitFor(() => {
      expect(JobServices.reviewJob).toHaveBeenCalledWith(1, "test-token", "approve");
    });
  });
});
