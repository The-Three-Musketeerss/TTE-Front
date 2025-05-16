import * as yup from "yup";

export const PaymentResolver = yup.object().shape({
  cardholderName: yup.string().required("Cardholder name is required"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d{16}$/, "Must be 16 digits"),
  expiryMonth: yup.string().required("Month is required"),
  expiryYear: yup.string().required("Year is required"),
  cvc: yup
    .string()
    .required("CVC is required")
    .matches(/^\d{3}$/, "Must be 3 digits"),
  saveCard: yup.boolean(),
});
