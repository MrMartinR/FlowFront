import axios from "axios";
import { API_URL } from "./../modules/Auth/_redux/authCrud";
import * as Yup from "yup";

export const addCurrency = (headerPara, values) => {
  return axios.post(
    `${API_URL}/api/v1/currencies`,
    { currency: values },
    {
      headers: {
        "access-token": headerPara.authToken,
        client: headerPara.client,
        uid: headerPara.user.fullname,
        expiry: headerPara.expiry,
      },
    }
  );
};

export const getAllCurrencies = (headerPara) => {
  return axios.get(`${API_URL}/api/v1/currencies?page=1`, {
    headers: {
      "access-token": headerPara.authToken,
      client: headerPara.client,
      uid: headerPara.user.fullname,
      expiry: headerPara.expiry,
    },
  });
};

export const CurrencySchema = Yup.object().shape({
  code: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("This field is required"),
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("This field is required"),
  fx_eur: Yup.string().required("This field is required"),
  kind: Yup.string().required("This field is required"),
  symbol: Yup.string().required("This field is required"),
  decimal_places: Yup.string().required("This field is required"),
});

export const currencyInitialValues = {
  symbol: "",
  code: "",
  name: "",
  kind: "",
  fx_eur: "",
  decimal_places: "",
};