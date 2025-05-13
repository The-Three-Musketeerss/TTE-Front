import * as yup from "yup";

export const EmployeeResolver = yup.object().shape({
  name: yup.string().required("Name is required"),
  userName: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
