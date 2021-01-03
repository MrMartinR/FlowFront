import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";


const IndividualDetails = () => {

  return (
    <Card style={{ marginLeft: "1rem", width: "50%", minHeight: "300px", minWidth: "350px"}}>
      <CardHeader className="pr-0 ">
        <CardHeaderToolbar className="w-100">

        </CardHeaderToolbar>
      </CardHeader>

      <CardBody>
            {/* <ContactName
          primary={selectedContact.name}
          style={{ marginTop: "1rem",}}
        /> */}
         <p>individuals</p>
      </CardBody>
    </Card>
  );
};


// exports the component to use in the ContactsDetails component
export default IndividualDetails;

// Set display names of the componebnt for debugging.
if (process.env.NODE_ENV !== 'production') {
  IndividualDetails.displayName = "IndividualDetails";
}