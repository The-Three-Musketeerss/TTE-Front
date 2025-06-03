export const getSecurityQuestions = async () => [
  { id: 1, question: "What is your pet's name?" },
  { id: 2, question: "What is your mother's maiden name?" },
];

export const resetPassword = async () => {
  return { message: "Password reset successfully" };
};

export const Login = async (email: string, password: string) => {
  return Promise.resolve({
    data: {
      token: "mocked-token",
      user: {
        email,
        id: 1,
        role: "user",
      },
    },
  });
};

export const Signup = async (data: any) => {
  return {
    message: `Welcome, ${data.name}!`,
  };
};
