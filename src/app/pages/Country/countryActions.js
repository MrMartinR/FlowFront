import axios from 'axios'
import * as Yup from 'yup'
import { API_URL } from '../../modules/Auth/_redux/authCrud'

// TODO: put the headers in a let statement??
// TODO: fullname prop on headers??

// get the data from the API countries table
export const getAllCountries = (headerPara) => axios.get(`${API_URL}/api/v1/countries?page=1`, {
  headers: {
    'access-token': headerPara.authToken,
    client: headerPara.client,
    uid: headerPara.user.fullname,
    expiry: headerPara.expiry,
  },
})

export const addCountry = (headerPara, values) => axios.post(
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
)

// TODO: what is this validation symbols??
export const CountrySchema = Yup.object().shape({
  continent: Yup.string()
    .min(2, 'Minimum 2 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('This field is required'),
  flag: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('This field is required'),
  iso_code: Yup.string().required('This field is required'),
  name: Yup.string().required('This field is required'),
  currency_id: Yup.string().required('This field is required'),
})
