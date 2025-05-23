import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

import ForgotPasswordForm from './ForgotPasswordForm';
import { getSecurityQuestions, resetPassword } from '@services/AuthServices';
import toast from 'react-hot-toast';
import { securityQuestionProps } from '@utils/types';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@services/AuthServices', async () => {
  return {
    getSecurityQuestions: vi.fn(),
    resetPassword: vi.fn(),
  };
});

vi.mock('react-hot-toast', async () => {
  return {
    default: {
      success: vi.fn(),
      error: vi.fn(),
    },
    success: vi.fn(),
    error: vi.fn(),
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('<ForgotPasswordForm />', () => {
  const mockQuestions: securityQuestionProps[] = [
    { id: 1, question: 'What is your favorite color?' },
    { id: 2, question: 'What is your pet’s name?' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (getSecurityQuestions as Mock).mockResolvedValue(mockQuestions);
  });

  it('renders form fields and loads security questions', async () => {
    renderWithRouter(<ForgotPasswordForm />);

    await waitFor(() => {
      expect(screen.getByText(/what is your favorite color/i)).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your answer/i)).toBeInTheDocument();
    const passwordFields = screen.getAllByPlaceholderText('********');
    expect(passwordFields[0]).toBeInTheDocument();
    expect(passwordFields[1]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });

  it('shows error toast if resetPassword fails', async () => {
    const user = userEvent.setup();

    renderWithRouter(<ForgotPasswordForm />);

    await waitFor(() => {
      expect(screen.getByText(/what is your favorite color/i)).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText(/enter your email/i), 'user@example.com');
    await user.selectOptions(screen.getByRole('combobox'), ['1']);
    await user.type(screen.getByPlaceholderText(/your answer/i), 'blue');

    const passwordFields = screen.getAllByPlaceholderText('********');
    await user.type(passwordFields[0], 'Password123!');
    await user.type(passwordFields[1], 'Password123!');

    (resetPassword as Mock).mockRejectedValueOnce(new Error('Reset failed'));

    await user.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Reset failed');
    });
  });

  it('submits form, shows success toast, and navigates to /login', async () => {
    const user = userEvent.setup();

    renderWithRouter(<ForgotPasswordForm />);

    await waitFor(() => {
      expect(screen.getByText(/what is your favorite color/i)).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText(/enter your email/i), 'user@example.com');
    await user.selectOptions(screen.getByRole('combobox'), ['1']);
    await user.type(screen.getByPlaceholderText(/your answer/i), 'blue');

    const passwordFields = screen.getAllByPlaceholderText('********');
    await user.type(passwordFields[0], 'Password123!');
    await user.type(passwordFields[1], 'Password123!');

    (resetPassword as Mock).mockResolvedValueOnce({});

    await user.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith({
        email: 'user@example.com',
        securityQuestionId: 1,
        securityAnswer: 'blue',
        newPassword: 'Password123!',
      });
      expect(toast.success).toHaveBeenCalledWith('Password has been reset successfully');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });
});
