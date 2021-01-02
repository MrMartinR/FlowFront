import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import { makeStyles } from "@material-ui/styles";

const ContactDetails = () => {
    const classes = makeStyles((theme) => ({
      root: {
         width: "100%",
         marginTop: theme.spacing(3),
         overflowX: "auto",
        },
    }))();


  return (
    <Card style={{ marginLeft: "1rem", width: "40%", minWidth: "300px"}}>
    {/* <Card style={{ marginLeft: "1rem", width: "40%", minWidth: "300px" }}> */}
      <CardHeader className="pr-0 ">
        <CardHeaderToolbar className="w-100">

        </CardHeaderToolbar>
      </CardHeader>

      <CardBody>
         <p>individuals</p>
      </CardBody>
    </Card>
  );
};


export default function IndividualDetails(){

  return (
    <ContactDetails />
  )
}