import * as yup from 'yup';

export const CategorySchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    });