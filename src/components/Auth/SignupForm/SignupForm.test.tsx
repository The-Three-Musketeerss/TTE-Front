import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignupForm from "./SignupForm";
import * as AuthServices from "@services/AuthServices";
import { vi, describe, it, beforeEach, expect } from "vitest";

// Mocks
vi.mock("@services/AuthServices", () => ({
  getSecurityQuestions: vi.fn(),
  Signup: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    promise: vi.fn((promise: Promise<any>, { success, error }) =>
      promise.then(success).catch(error)
    ),
  },
}));

// Full mocks for controlled components
vi.mock("@components/shared/BaseInput/BaseInput", () => ({
  default: ({ label, register, type = "text", ...props }: any) => {
    const { name, onChange, onBlur, ref } = register;
    return (
      <input
        aria-label={label}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        {...props}
      />
    );
  },
}));

vi.mock("@components/shared/Select/Select", () => ({
  default: ({ label, data, register, ...props }: any) => {
    const { name, onChange, onBlur, ref } = register;
    return (
      <select
        aria-label={label}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        {...props}
      >
        <option value="">Select</option>
        {data.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    );
  },
}));

vi.mock("@components/shared/Button/Button", () => ({
  default: ({ text, ...props }: any) => <button {...props}>{text}</button>,
}));

describe("SignupForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (AuthServices.getSecurityQuestions as any).mockResolvedValue([
      { id: 1, question: "What is your pet's name?" },
      { id: 2, question: "What is your favorite color?" },
    ]);
    (AuthServices.Signup as any).mockResolvedValue({
      message: "Account created",
    });
  });

  const setup = () =>
    render(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    );

  it("submits the form and calls Signup", async () => {
    setup();

    fireEvent.change(await screen.findByLabelText("Email"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Security Question"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Security Question Answer"), {
      target: { value: "Fluffy" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Passw0rd!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "Passw0rd!" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(AuthServices.Signup).toHaveBeenCalledWith(
        expect.objectContaining({
          email: "user@example.com",
          name: "Test User",
          username: "testuser",
          securityQuestionId: 1,
          securityAnswer: "Fluffy",
          password: "Passw0rd!",
          confirmPassword: "Passw0rd!",
        })
      );
    });
  });
});
