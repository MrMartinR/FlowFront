import React from "react";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
// import { Form, InputGroup, Col, Row, Image } from "react-bootstrap";
import { Form, Col } from "react-bootstrap";
import { useSubheader } from "../../_metronic/layout";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export const SettingPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("setting");

  const classes = {
    inputRoot: {
      flexWrap: "wrap",
    },
    inputInput: {
      width: "auto",
      flexGrow: 1,
    },
  };

  const handleChange = (e) => {
    console.log("e: handleChange", e);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2">
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
                    <TextField label="Username" />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <TextField type="email" label="Enter email" />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <TextField type="password" label="Type New Password" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                    >
                      Change password
                    </Button>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridName">
                    <TextField type="text" label="Name" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridSurname">
                    <TextField type="text" label="Surname" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridDOB">
                    <TextField type="text" label="Date of Birth" />
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
                      <MenuItem value={"UK"}>UK</MenuItem>
                      <MenuItem value={"US"}>US</MenuItem>
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
                      <MenuItem value={"USD"}>USD</MenuItem>
                      <MenuItem value={"AED"}>AED</MenuItem>
                      <MenuItem value={"GBP"}>GBP</MenuItem>
                    </Select>
                  </Form.Group>
                </Form.Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
