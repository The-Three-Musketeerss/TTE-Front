import * as yup from 'yup';

export const ProductResolver = yup.object().shape({
    title: yup.string().required('Title is required'),
    price: yup
        .number()
        .typeError('Price must be a number')
        .positive('Price must be a positive number')
        .required('Price is required'),
    description: yup.string().required('Description is required'),
    category: yup.string().required('Category is required'),
    image: yup.string().url('Image must be a valid URL').required('Image is required'),
    total: yup
        .number()
        .typeError('Total must be a number')
        .positive('Total must be a positive number')
        .required('Total is required'),
    available: yup
        .number()
        .typeError('Available must be a number')
        .positive('Available must be a positive number')
        .required('Available is required')
        .max(yup.ref('total'), 'Available must be less than or equal to Total'),
});