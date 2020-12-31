import axios from 'axios';
import { API_URL } from './../modules/Auth/_redux/authCrud';
import * as Yup from 'yup';

export const addCountry = (headerPara, values) => {
    return axios.post(
        `${API_URL}/api/v1/countries`,
        { country: values },
        {
            headers: {
                'access-token': headerPara.authToken,
                client: headerPara.client,
                uid: headerPara.user.fullname,
                expiry: headerPara.expiry,
            },
        },
    );
};

export const getAllCountries = (headerPara) => {
    return axios.get(`${API_URL}/api/v1/countries?page=1`, {
        headers: {
            'access-token': headerPara.authToken,
            client: headerPara.client,
            uid: headerPara.user.fullname,
            expiry: headerPara.expiry,
        },
    });
};

export const CountrySchema = Yup.object().shape({
    continent: Yup.string()
        .min(2, 'Minimum 2 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('This field is required'),
    flag: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('This field is required'),
    iso_code: Yup.string().required('This field is required'),
    name: Yup.string().required('This field is required'),
    currency_id: Yup.string().required('This field is required'),
});
