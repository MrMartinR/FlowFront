import axios from 'axios';
import { API_URL } from './../modules/Auth/_redux/authCrud';

export const updateProfile = (headerPara, details, fileName = false) => {
    const formData = new FormData();
    for (const k in details) {
        if (details.hasOwnProperty(k)) {
            const data = details[k];
            if (fileName) {
                formData.append(`user[${k}]`, data, fileName);
            } else {
                formData.append(`user[${k}]`, data);
            }
        }
    }
    return axios.post(`${API_URL}/api/v1/update_profile`, formData, {
        headers: {
            'access-token': headerPara.authToken,
            client: headerPara.client,
            uid: headerPara.user.fullname,
            expiry: headerPara.expiry,
        },
    });
};

export const getUserProfile = (headerPara) => {
    return axios.get(`${API_URL}/api/v1/user_profile`, {
        headers: {
            'access-token': headerPara.authToken,
            client: headerPara.client,
            uid: headerPara.user.fullname,
            expiry: headerPara.expiry,
        },
    });
};
