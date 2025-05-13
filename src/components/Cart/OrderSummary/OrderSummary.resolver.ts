import * as yup from 'yup';

export const couponResolver = yup.object().shape({
    couponCode: yup.string()
        .matches(/^[A-Z0-9]+$/, 'Coupon code must be alphanumeric'),
});