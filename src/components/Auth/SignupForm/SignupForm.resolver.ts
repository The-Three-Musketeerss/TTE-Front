import * as yup from 'yup';

export const SignupResolver = yup.object().shape({
    email: yup.string()
        .email('Invalid email format').required('Email is required'),
    name: yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .required('Name is required'),
    username: yup.string()
        .min(2, 'Username must be at least 2 characters')
        .max(20, 'Username cannot exceed 20 characters')
        .required('Username is required'),
    securityQuestionId: yup
        .number()
        .typeError("Security question is required")
        .required("Security question is required"),
      securityAnswer: yup.string().required("Answer is required"),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});
