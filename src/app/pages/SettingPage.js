/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
// import { Form, InputGroup, Col, Row, Image } from "react-bootstrap";
import { Form, Col, Row } from "react-bootstrap";
import { useSubheader } from "../../_metronic/layout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { getAllCountries } from "../actions/countryActions";
import { getUserProfile, updateProfile } from "../actions/userActions";
import { useSelector } from "react-redux";
import { getAllCurrencies } from "../actions/currencyActions";
import CustomizedSnackbars from "../utils/snackbar";
import BadgeAvatars from "../utils/BadgeAvatar";
import { Card, CardHeader } from "../../_metronic/_partials/controls";

export const SettingPage = (props) => {
  const auth = useSelector((state) => state.auth);
  const suhbeader = useSubheader();
  suhbeader.setTitle("Settings");

  const classes = {
    inputRoot: {
      flexWrap: "wrap",
    },
    inputInput: {
      width: "auto",
      flexGrow: 1,
    },
  };
  const [currencies, setCurrencies] = useState([]);
  const [countries, setCountries] = useState([]);
  const [userProfile, setUserProfile] = useState({
    avatar_url: toAbsoluteUrl("/media/logos/flow-logo.svg"),
  });

  const setState = (newState) => {
    setUserProfile({ ...userProfile, ...newState });
  };

  useEffect(() => {
    // Update the document title using the browser API
    getUserProfile(auth)
      .then((res) => setUserProfile(res.data.data[0]))
      .catch((err) => {
        console.log(err);
      });

    getAllCountries(auth)
      .then((res) => setCountries(res.data.data))
      .catch((err) => {
        console.log(err);
      });

    getAllCurrencies(auth)
      .then((res) => {
        const currencies = res.data.data.sort((a, b) =>
          a.code > b.code ? 1 : b.code > a.code ? -1 : 0
        );
        setCurrencies(currencies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  const handleChange = (e, field) => {
    let data;
    if (["country", "currency"].includes(field)) {
      const id = e.currentTarget.id;
      data = { [`${field}_id`]: id };
      setState({ [field]: e.target.value });
    } else {
      data = { [field]: userProfile[field] };
    }

    updateProfile(auth, data)
      .then((res) => {
        if (res.data && res.data.success) {
          setSnackState({
            message: `Saved!`,
            open: true,
            variant: "success",
          });
        }
      })
      .catch((err) => {
        setSnackState({
          message: err.message,
          open: true,
          variant: "error",
        });
      });
  };

  const [snackState, _setSnackState] = useState({
    message: "",
    variant: "success",
    open: false,
  });
  const variant = "outlined";

  const setSnackState = (newState) => {
    _setSnackState({ ...snackState, ...newState });
  };

  const onFileChange = (e) => {
    const file =
      e.target && e.target.files && e.target.files[0] ? e.target.files[0] : "";
    updateProfile(
      auth,
      {
        avatar: file,
      },
      file && file.name ? file.name : false
    )
      .then((res) => {
        if (res.data && res.data.success) {
          setSnackState({
            message: `Saved!`,
            open: true,
            variant: "success",
          });
          setState({
            avatar_url: res.data.data[0].avatar_url,
          });
        }
      })
      .catch((err) => {
        setSnackState({
          message: err.message,
          open: true,
          variant: "error",
        });
      });
  };

  return (
    <>
      <Card className="mt-4">
        <CardHeader
          title={
            <>
              <Row className="h3">User Settings</Row>
              <Row>
                <small>Update your account and settings</small>
              </Row>
            </>
          }
        />

        <CustomizedSnackbars
          {...snackState}
          setSnackState={setSnackState}
          handleClose={() => {
            setSnackState({ open: false });
          }}
        />
        <Row>
          <div className="col-lg-12 order-1 order-xxl-2">
            {/* <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2"> */}
            <div className="card">
              <div className="card-body d-flex flex-column">
                <InputLabel className="font-weight-bold my-7 h2">
                  Personal Information
                </InputLabel>

                <Form.Group as={Row} controlId="formGridAvatar">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 h5 d-none d-sm-block">
                      Avatar
                    </InputLabel>
                  </Col>
                  <Col>
                    <BadgeAvatars
                      src={userProfile.avatar_url}
                      onFileChange={onFileChange}
                    />
                    <small className="ml-3">
                      Allowed file types jpg, jpeg, png.
                    </small>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridName">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 h5 d-none d-sm-block">
                      Name
                    </InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      className="w-100"
                      type="text"
                      label="Name"
                      variant={variant}
                      onBlur={(e) => handleChange(e, "name")}
                      onChange={(e) => setState({ name: e.target.value })}
                      value={userProfile.name ? userProfile.name : ""}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridSurname">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 h5 d-none d-sm-block">
                      Surname
                    </InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      className="w-100"
                      type="text"
                      label="Surname"
                      variant={variant}
                      onChange={(e) => setState({ surname: e.target.value })}
                      onBlur={(e) => handleChange(e, "surname")}
                      value={userProfile.surname ? userProfile.surname : ""}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridDOB">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 h5 d-none d-sm-block">
                      Date of Birth
                    </InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      className="w-100"
                      type="date"
                      label="Date of Birth"
                      variant={variant}
                      value={userProfile.dob ? userProfile.dob : ""}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => setState({ dob: e.target.value })}
                      onBlur={(e) => handleChange(e, "dob")}
                    />
                  </Col>
                </Form.Group>

                <div className="separator separator-dashed my-4"></div>

                <InputLabel className="font-weight-bold my-7 h2">
                  Account Information
                </InputLabel>

                <Form.Group as={Row} controlId="formGridUsername">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 h5 d-none d-sm-block">
                      Username
                    </InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      className="w-100"
                      label="Username"
                      value={userProfile.username ? userProfile.username : ""}
                      disabled={true}
                      onChange={(e) => setState({ username: e.target.value })}
                      onBlur={(e) => handleChange(e, "username")}
                      variant={variant}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridEmail">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 h5 d-none d-sm-block">
                      Email
                    </InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      className="w-100"
                      type="email"
                      disabled={true}
                      label="Email"
                      onBlur={(e) => handleChange(e, "email")}
                      onChange={(e) => setState({ email: e.target.value })}
                      value={userProfile.email ? userProfile.email : ""}
                      variant={variant}
                    />
                    <small>Email will not be publicly displayed</small>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridCounry">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 h5 d-none d-sm-block">
                      Country
                    </InputLabel>
                  </Col>
                  <Col lg={6}>
                    <Select
                      labelId="country-simple-select"
                      id="country-simple-select"
                      className="w-100"
                      variant={variant}
                      onChange={(e) => handleChange(e, "country")}
                      value={
                        userProfile.country && userProfile.country.name
                          ? userProfile.country.name
                          : ""
                      }
                    >
                      {countries.map(({ name, id }, key) => (
                        <MenuItem key={key} id={id} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridCurrency">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 h5 d-none d-sm-block">
                      Currency
                    </InputLabel>
                  </Col>
                  <Col lg={6}>
                    <Select
                      labelId="currency-simple-select"
                      id="currency-simple-select"
                      className="w-100"
                      variant={variant}
                      value={
                        userProfile.currency && userProfile.currency
                          ? userProfile.currency
                          : "ALL"
                      }
                      onChange={(e) => handleChange(e, "currency")}
                    >
                      {currencies.map(({ code, id }, key) => (
                        <MenuItem key={key} id={id} value={code}>
                          {code}
                        </MenuItem>
                      ))}
                    </Select>
                    <small>Select your currency base</small>
                  </Col>
                </Form.Group>
                <div className="separator separator-dashed my-4"></div>

                <InputLabel className="font-weight-bold my-7 h2">
                  Change Password
                </InputLabel>

                <Form.Group as={Row} controlId="formGridCurrPassword">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 h5 d-none d-sm-block">
                      Current Password
                    </InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      type="password"
                      label="Current Password"
                      className="w-100"
                      variant={variant}
                      onChange={(e) =>
                        setState({ currentPassword: e.target.value })
                      }
                    />
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      style={{ color: "#3783e7" }}
                    >
                      Forget Password?
                    </a>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridNewPassword">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 h5 d-none d-sm-block">
                      New Password
                    </InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      type="password"
                      label="New Password"
                      className="w-100"
                      variant={variant}
                      onChange={(e) =>
                        setState({ newPassword: e.target.value })
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridVerifyPassword">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 h5 d-none d-sm-block">
                      Verify Password
                    </InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      type="password"
                      className="w-100"
                      label="Verify Password"
                      variant={variant}
                      onChange={(e) =>
                        setState({ verifyPassword: e.target.value })
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridPassword">
                  <Col lg={9}>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={(classes.button += " h-100 float-right")}
                      style={{
                        textTransform: "none",
                      }}
                      onClick={(e) => handleChange(e, "newPassword")}
                    >
                      Change Password
                    </Button>
                  </Col>
                </Form.Group>
              </div>
            </div>
          </div>
        </Row>
      </Card>
    </>
  );
};
