import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";


const CompanyDetails = () => {
   
  return (
    <Card style={{ marginLeft: "1rem", width: "50%", minHeight: "300px", minWidth: "350px" }}>
       <CardHeader className="pr-0">
          <CardHeaderToolbar className="w-100">
         </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
              {/* <ContactName
          primary={selectedContact.trade_name}
          style={{ marginTop: "1rem",}}
        /> */}
          <p>Company</p>
        </CardBody>
    </Card>
  );
};


// exports the component to use in the ContactsDetails component
export default CompanyDetails;

// Set display names of the componebnt for debugging.
if (process.env.NODE_ENV !== 'production') {
  CompanyDetails.displayName = "CompanyDetails";
}