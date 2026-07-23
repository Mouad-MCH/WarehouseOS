import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "@/components/RegisterForm";
import { registerUser } from "@/services/register";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock, refresh: vi.fn() }),
}));

vi.mock("@/services/register", () => ({
  registerUser: vi.fn(),
}));

const mockedRegisterUser = vi.mocked(registerUser);

async function fillValidForm() {
  await userEvent.type(screen.getByLabelText(/full name/i), "John Doe");
  await userEvent.type(
    screen.getByLabelText(/email address/i),
    "john@example.com",
  );
  await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
  await userEvent.type(
    screen.getByLabelText(/confirm password/i),
    "password123",
  );
  await userEvent.click(screen.getByRole("checkbox"));
}

beforeEach(() => {
  pushMock.mockReset();
  mockedRegisterUser.mockReset();
});

describe("RegisteForm", () => {
  it("renders all fields and the submit button", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it("keeps the submit button disabled until terms are agreed to", async () => {
    render(<RegisterForm />);
    await userEvent.type(screen.getByLabelText(/full name/i), "John Doe");
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      "john@example.com",
    );
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      "password123",
    );

    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeDisabled();
    expect(mockedRegisterUser).not.toHaveBeenCalled();
  });

  it("shows a client-side validation error and does not call registerUser on mismatched passwords", async () => {
    render(<RegisterForm />);
    await userEvent.type(screen.getByLabelText(/full name/i), "John Doe");
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      "john@example.com",
    );
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      "different123",
    );
    await userEvent.click(screen.getByRole("checkbox"));
    await userEvent.click(
      screen.getByRole("button", { name: /create account/i }),
    );

    expect(
      await screen.findByText("Passwords do not match"),
    ).toBeInTheDocument();
    expect(mockedRegisterUser).not.toHaveBeenCalled();
  });

  it("calls registerUser with parsed data and redirects to /login on success", async () => {
    mockedRegisterUser.mockResolvedValueOnce({ success: true });
    render(<RegisterForm />);
    await fillValidForm();
    await userEvent.click(
      screen.getByRole("button", { name: /create account/i }),
    );

    await waitFor(() => {
      expect(mockedRegisterUser).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        confirmPassword: "password123",
      });
    });
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/login"));
  });

  it("shows a duplicate-email message on a 409 response and does not redirect", async () => {
    mockedRegisterUser.mockResolvedValueOnce({ success: false, status: 409 });
    render(<RegisterForm />);
    await fillValidForm();
    await userEvent.click(
      screen.getByRole("button", { name: /create account/i }),
    );

    expect(
      await screen.findByText("This email is already in use"),
    ).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("shows field-level errors returned by the server on a 400 response", async () => {
    mockedRegisterUser.mockResolvedValueOnce({
      success: false,
      status: 400,
      errors: { email: ["Email already exists"] },
    });
    render(<RegisterForm />);
    await fillValidForm();
    await userEvent.click(
      screen.getByRole("button", { name: /create account/i }),
    );

    expect(await screen.findByText("Email already exists")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
