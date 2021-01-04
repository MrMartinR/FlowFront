import React from "react";

import CompanyDetails from "./ContactCompanyDetails";
import IndividualDetails from "./ContactIndividualDetails";
import ContactMethods from "./ContactMethods/ContactMethods";
// import ContactDetailsImage from "./ContactDetailsImage";


  export const ContactDetails = ({ selectedContact }) => {

  return (

    <>
    <div>
        <div>
        <CompanyDetails/>
        </div>
        <div>
        <IndividualDetails/>
        </div>
    </div>
    <ContactMethods/>
</>
  );
};
