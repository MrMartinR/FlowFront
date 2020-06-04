import React from "react";
import {toAbsoluteUrl} from "../../_metronic/_helpers";
import {Button, Form, InputGroup, Col, Row, Image} from "react-bootstrap";
import {useSubheader} from "../../_metronic/layout";

export const SettingPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("setting");

  return (<>
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
                            <Form.Control type="text" placeholder="username" />
                          </Form.Group>                          
                        </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridEmail">                            
                            <Form.Control type="email" placeholder="Enter email" />
                          </Form.Group>                          
                        </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control type="password" placeholder="Type New Password" />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridState">
                            <Button variant="primary" type="submit">
                              Change password
                            </Button>                            
                          </Form.Group>

                        </Form.Row>
                        
                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridName">                            
                            <Form.Control type="text" placeholder="Name" />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridSurname">                            
                            <Form.Control type="text" placeholder="Surname" />
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridDOB">
                            <Form.Control type="text" placeholder="Date of Birth" />                            
                          </Form.Group>
                        </Form.Row>

                        <Form.Row>
                          <Form.Group as={Col} controlId="formGridCounry">
                            <Form.Control as="select">
                              <option>Country</option>
                              <option>English</option>
                            </Form.Control>                    
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridCurrency">
                            <Form.Control as="select">
                              <option>Currency</option>
                              <option>Dolar</option>
                            </Form.Control>                    
                          </Form.Group>
                        </Form.Row>
                        
                      </Form>

                    </div>
                  </div>                  
                </div>
            </div>            
          </>);
};


            