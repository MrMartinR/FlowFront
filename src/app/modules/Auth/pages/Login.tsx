import React, { useState } from "react";
import * as Yup from "yup";
import { connect } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  Typography,
  CardMedia,
} from "@material-ui/core";
import * as auth from "../_redux/authRedux.js";
import { login } from "../_redux/authCrud";
import Logo from "../../../../common/media/flow-logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function Login(props: any) {
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(6, "Minimum 6 characters")
      .max(50, "Maximum 50 characters")
      .required("Required"),
    password: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Required"),
  });

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const onSubmit = (values: any) => {
    console.log("submitting..");
    localStorage.removeItem("forgot_pwd_notif");
    enableLoading();
    setTimeout(() => {
      login(values.email, values.password)
        .then((res) => {
          disableLoading();
          const accessToken = res.data.token.token;
          const userData = res.data.data;
          const { uid } = userData;
          const { client } = res.data.token;
          const { expiry } = res.data.token;
          const { token } = res.data.token;
          props.login(accessToken, uid, client, expiry, token, userData);
        })
        .catch(() => {
          disableLoading();
        });
    }, 1000);
  };

  return (
    // main Grid
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
          Hello Flower!
        </Typography>
      </Grid>
      {/* form */}
      <Grid item xs="auto">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          {(localStorage.getItem("forgot_pwd_notif") === null) === false ? (
            <div>
              <div>{localStorage.getItem("forgot_pwd_notif")}</div>
            </div>
          ) : (
            ""
          )}
          <div></div>
          <TextField
            label="Email"
            margin="normal"
            variant="outlined"
            autoComplete="on"
            type="email"
            inputRef={register()}
            name="email"
          />
          <div>
            <span> {errors.email && errors.email.message}</span>

            <div>
              <TextField
                label="Password"
                margin="normal"
                variant="outlined"
                autoComplete="on"
                type="password"
                inputRef={register()}
                name="password"
              />
            </div>
            <span> {errors.password && errors.password.message}</span>
            <div>
              <Button type="submit">
                Sign In
                {loading}
              </Button>
            </div>
          </div>
        </form>
      </Grid>
    </Grid>
  );
}

export default connect(null, auth.actions)(Login);
