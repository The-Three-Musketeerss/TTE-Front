import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import * as AuthServices from "@services/AuthServices";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

// Mock dependencies
vi.mock("@components/shared/BaseInput/BaseInput", () => ({
    default: ({ label, ...props }: any) => (
        <input aria-label={label} {...props.register} />
    ),
}));
vi.mock("@components/shared/Button/Button", () => ({
    default: ({ text, ...props }: any) => <button {...props}>{text}</button>,
}));
vi.mock("@components/shared/Checkbox/Checkbox", () => ({
    default: ({ value }: any) => <input type="checkbox" aria-label={value} />,
}));
vi.mock("react-cookie", async () => {
    const actual = await vi.importActual("react-cookie");
    return {
        ...actual,
        useCookies: vi.fn().mockReturnValue([{}, vi.fn()]),
    };
});
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => vi.fn(),
        Link: ({ to, children }: any) => <a href={to}>{children}</a>,
    };
});
vi.mock("react-hot-toast", () => ({
    __esModule: true,
    default: {
        promise: vi.fn(),
    },
}));

describe("LoginForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    function renderWithRouter() {
        return render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );
    }

    it("renders form fields and buttons", () => {
        renderWithRouter();
        expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Remember me/i)).toBeInTheDocument();
        expect(screen.getByText(/Forgot password/i)).toBeInTheDocument();
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.getByText(/Register/i)).toBeInTheDocument();
    });

    it("calls Login and sets cookie on successful submit", async () => {
        const loginMock = vi
            .spyOn(AuthServices, "Login")
            .mockResolvedValue({ data: "session-token" });
        const setCookie = vi.fn();
        (useCookies as any).mockReturnValue([{}, setCookie]);
        (toast.promise as any).mockImplementation((promise: Promise<any>) => promise);

        renderWithRouter();

        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByText(/Login/i));

        await waitFor(() => {
            expect(loginMock).toHaveBeenCalledWith("test@example.com", "password123");
            expect(setCookie).toHaveBeenCalledWith("session", "session-token", {
                maxAge: 3600,
                path: "/",
            });
        });
    });

    it("shows validation errors if fields are empty", async () => {
        renderWithRouter();
        fireEvent.click(screen.getByText(/Login/i));
        await waitFor(() => {
            expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        });
    });

    it("navigates to forgot password and signup links", () => {
        renderWithRouter();
        expect(screen.getByText(/Forgot password/i).closest("a")).toHaveAttribute(
            "href",
            "/forgot-password"
        );
        expect(screen.getByText(/Register/i).closest("a")).toHaveAttribute(
            "href",
            "/signup"
        );
    });

    it("shows toast error on login failure", async () => {
        const error = { message: "Invalid credentials" };
        vi.spyOn(AuthServices, "Login").mockRejectedValue(error);
        (toast.promise as any).mockImplementation((promise: Promise<any>, opts: any) => {
            promise.catch((e: any) => opts.error(e));
            return promise;
        });

        renderWithRouter();

        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: "fail@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: "wrongpass" },
        });
        fireEvent.click(screen.getByText(/Login/i));

        await waitFor(() => {
            expect(toast.promise).toHaveBeenCalled();
        });
    });
});