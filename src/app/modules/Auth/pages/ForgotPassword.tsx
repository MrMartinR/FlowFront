import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { injectIntl } from "react-intl";
import {
  TextField,
  Button,
  Grid,
  Typography,
  CardMedia,
  FormControl,
} from "@material-ui/core";
import Logo from "../../../../common/media/flow-logo.svg";
import * as auth from "../_redux/authRedux";
import { useForm } from "react-hook-form";
import { requestPassword } from "../_redux/authCrud";
import { yupResolver } from "@hookform/resolvers/yup";

const initialValues = {
  email: "",
};

type PasswordType = {
  email: String;
};

function ForgotPassword(props: any) {
  const [isRequested, setIsRequested] = useState(false);
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Required"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: initialValues,
  });

  const onSubmit = ({ email }: PasswordType) => {
    requestPassword(email)
      .then((res) => {
        setIsRequested(true);
        localStorage.setItem("forgot_pwd_notif", res.data.message);
      })
      .catch(() => {
        setIsRequested(false);
        localStorage.setItem("forgot_pwd_notif", "");
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
          Forgotten Password ?
        </Typography>
      </Grid>
      {/* form */}
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <Grid item xs="auto">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              {(localStorage.getItem("forgot_pwd_notif") === null) === false ? (
                <div>{localStorage.getItem("forgot_pwd_notif")}</div>
              ) : (
                ""
              )}
              <FormControl variant="filled">
                <TextField
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  autoComplete="on"
                  type="email"
                  inputRef={register()}
                  name="email"
                />
                <span> {errors.email && errors.email.message}</span>
              </FormControl>
              <FormControl variant="filled">
                <Button type="submit">Submit</Button>
                <Link to="/auth">
                  <Button
                    type="button"
                    id="kt_login_forgot_cancel"
                    className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                  >
                    Cancel
                  </Button>
                </Link>
              </FormControl>
            </Grid>
          </form>
        </Grid>
      )}
    </Grid>
  );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
