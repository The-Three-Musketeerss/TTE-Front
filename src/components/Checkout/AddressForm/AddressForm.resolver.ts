import * as yup from "yup";

export const AddressResolver = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required"),
    
  lastName: yup
    .string()
    .required("Last name is required"),

  address: yup
    .string()
    .required("Address is required"),

  apartment: yup
    .string()
    .notRequired(),

  country: yup
    .string()
    .required("Country is required"),

  city: yup
    .string()
    .required("City is required"),

  zipcode: yup
    .string()
    .required("Zipcode is required")
    .matches(/^\d{5}$/, "Zipcode must be a 5-digit number"),

  optional: yup
    .string()
    .notRequired(),

  saveContact: yup
    .boolean()
    .notRequired(),
});
