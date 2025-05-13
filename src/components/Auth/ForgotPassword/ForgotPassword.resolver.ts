import * as yup from "yup";

export const ForgotPasswordResolver = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  securityQuestionId: yup
    .number()
    .typeError("Security question is required")
    .required("Security question is required"),
  securityAnswer: yup.string().required("Answer is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm your password"),
});
