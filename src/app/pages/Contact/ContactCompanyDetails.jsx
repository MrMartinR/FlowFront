import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import { ListItemText as ContactName} from "@material-ui/core";


export const CompanyDetails = ({ selectedContact }) => {
    const classes = makeStyles((theme) => ({
      root: {
         width: "100%",
         marginTop: theme.spacing(3),
         overflowX: "auto",
        },
    }))();


  return (
    <Card style={{ marginLeft: "1rem", width: "40%", height: "50%", minWidth: "300px" }}>
       <CardHeader className="pr-0 ">
          <CardHeaderToolbar className="w-100">
                {/* <ContactName
                      primary={selectedContact.trade_name}
                      style={{ marginTop: "1rem",}}
                    /> */}
         </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <p>Company</p>
        </CardBody>
    </Card>
  );
};

// display the name of the component for debugging purposes
CompanyDetails.displayName = "CompanyDetails";

export default CompanyDetails;
