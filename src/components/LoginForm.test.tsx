import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/LoginForm";
import { signIn } from "next-auth/react";

const pushMock = vi.fn();
const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, refresh: refreshMock }),
}));

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}));

const mockedSignIn = vi.mocked(signIn);

beforeEach(() => {
  pushMock.mockReset();
  refreshMock.mockReset();
  mockedSignIn.mockReset();
});

describe("LoginForm", () => {
  it("renders email/password fields and the submit button", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows a validation error and does not call signIn for an invalid email", async () => {
    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText(/email address/i), "not-an-email");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
    expect(mockedSignIn).not.toHaveBeenCalled();
  });

  it("shows an invalid credentials message when signIn returns an error", async () => {
    mockedSignIn.mockResolvedValueOnce({ error: "CredentialsSignin", status: 401, ok: false, url: null });
    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText(/email address/i), "john@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "wrongpassword");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("Invalid email or password")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("redirects to /dashboard and refreshes on successful sign in", async () => {
    mockedSignIn.mockResolvedValueOnce({ error: null, status: 200, ok: true, url: "/dashboard" });
    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText(/email address/i), "john@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/dashboard"));
    expect(refreshMock).toHaveBeenCalled();
  });
});
