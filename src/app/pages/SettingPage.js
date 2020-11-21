import React, { useEffect, useState } from "react";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
// import { Form, InputGroup, Col, Row, Image } from "react-bootstrap";
import { Form, Col } from "react-bootstrap";
import { useSubheader } from "../../_metronic/layout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { getAllCountries } from "../actions/countryActions";
import { getUserProfile } from "../actions/userActions";
import { useSelector } from "react-redux";
import { getAllCurrencies } from "../actions/currencyActions";

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
  const [userProfile, setUserProfile] = useState({});

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
      .then((res) => setCurrencies(res.data.data))
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  const handleChange = (e) => {
    console.log("e: handleChange", e);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12 order-1 order-xxl-2">
          {/* <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2"> */}
          <div className="card">
            <div className="card-body d-flex flex-column">
              <div className="flex-column-auto mt-5">
                <img
                  alt="Logo"
                  className="max-h-200px"
                  src={toAbsoluteUrl("/media/logos/flow-logo.svg")}
                />
              </div>

              <Form className="mt-5">
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridUsername">
                    <TextField
                      className="w-100"
                      label="Username"
                      value={userProfile.username ? userProfile.username : ""}
                      disabled={true}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <TextField
                      className="w-100"
                      type="email"
                      disabled={true}
                      label="Email"
                      value={userProfile.email ? userProfile.email : ""}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <TextField
                      type="password"
                      label="Type New Password"
                      className="col-7"
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      className={(classes.button += " col-5")}
                      style={{ textTransform: "none" }}
                    >
                      Change Password
                    </Button>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridName">
                    <TextField
                      className="w-100"
                      type="text"
                      label="Name"
                      value={userProfile.name ? userProfile.name : ""}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridSurname">
                    <TextField
                      className="w-100"
                      type="text"
                      label="Surname"
                      value={userProfile.lastname ? userProfile.lastname : ""}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridDOB">
                    <TextField
                      className="w-100"
                      type="date"
                      label="Date of Birth"
                      value={""}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridCounry">
                    <InputLabel id="country-simple-select">Country</InputLabel>
                    <Select
                      labelId="country-simple-select"
                      id="country-simple-select"
                      className="w-100"
                      value={""}
                      onChange={handleChange}
                    >
                      {countries.map(({ name }, key) => (
                        <MenuItem key={key} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCurrency">
                    <InputLabel id="currency-simple-select">
                      Currency
                    </InputLabel>
                    <Select
                      labelId="currency-simple-select"
                      id="currency-simple-select"
                      className="w-100"
                      value={""}
                      onChange={handleChange}
                    >
                      {currencies.map(({ code }, key) => (
                        <MenuItem key={key} value={code}>
                          {code}
                        </MenuItem>
                      ))}
                    </Select>
                  </Form.Group>
                  <Form.Group as={Col}></Form.Group>
                </Form.Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
