import React, { useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { registeration } from "../_redux/authCrud";
import { useForm } from "react-hook-form";
import Logo from "../../../../common/media/flow-logo.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TextField,
  Button,
  Grid,
  Typography,
  CardMedia,
  FormControl,
} from "@material-ui/core";

const initialValues = {
  fullname: "",
  email: "",
  username: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

type RegisterType = {
  email: String;
  fullname: String;
  username: String;
  password: String;
};

/**
 * User registration component
 * @param {object} props
 * @author Zeeshan A
 */
function Registration(props: any) {
  const [loading, setLoading] = useState(false);

  const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Required"),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Required"),
    password: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Required"),
    acceptTerms: Yup.bool().required(
      "You must accept the terms and conditions"
    ),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(RegistrationSchema),
    defaultValues: initialValues,
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  const onSubmit = ({ email, fullname, username, password }: RegisterType) => {
    enableLoading();
    registeration(email, fullname, username, password)
      .then((res) => {
        const accessToken = res.headers["access-token"];
        const { uid } = res.headers;
        props.login(accessToken, uid);
        disableLoading();
      })
      .catch((error) => {
        disableLoading();
      });
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      {/* logo */}
      <Grid item xs="auto">
        <CardMedia src={Logo} component="img" />
        <Typography align="center" variant="h6">
          <FormattedMessage id="Become a Flower!" />
        </Typography>
      </Grid>
      {/* form */}
      <Grid item xs="auto">
        <form
          id="kt_login_signin_form"
          className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {/* begin: Username */}
            <FormControl variant="filled">
              <TextField
                id="outlined-uncontrolled"
                label="Username"
                margin="normal"
                variant="outlined"
                autoComplete="true"
                type="text"
                name="username"
                inputRef={register()}
              />
              <span> {errors.username && errors.username.message}</span>
            </FormControl>
            {/* end: Username */}

            {/* begin: Email */}
            <FormControl variant="filled">
              <TextField
                id="outlined-uncontrolled"
                label="Email"
                margin="normal"
                variant="outlined"
                autoComplete="true"
                type="email"
                name="email"
                inputRef={register()}
              />
              <span> {errors.email && errors.email.message}</span>
            </FormControl>
            {/* end: Email */}

            {/* begin: Password */}
            <FormControl variant="filled">
              <TextField
                id="outlined-uncontrolled"
                label="Password"
                margin="normal"
                variant="outlined"
                autoComplete="true"
                type="password"
                name="password"
                inputRef={register()}
              />
              <span> {errors.password && errors.password.message}</span>
            </FormControl>

            {/* end: Password */}

            {/* begin: Terms and Conditions */}
            <FormControl variant="filled">
              <label htmlFor="acceptTerms" className="checkbox">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  id="acceptTerms"
                  ref={register()}
                />{" "}
                <Link to="/terms" target="_blank" rel="noopener noreferrer">
                  I accept the Term & Conditions
                </Link>
                .
                <span />
              </label>
              <span> {errors.acceptTerms && errors.acceptTerms.message}</span>
            </FormControl>
            {/* end: Terms and Conditions */}
            <FormControl variant="filled">
              <Button
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
              >
                <span>Sign Up</span>
                {loading && <span className="ml-3 spinner spinner-white" />}
              </Button>
              <Link to="/auth/login">
                <Button
                  type="button"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Cancel
                </Button>
              </Link>
            </FormControl>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default injectIntl(connect(null, auth.actions)(Registration));
