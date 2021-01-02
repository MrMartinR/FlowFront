import React from "react";

import CompanyDetails from "./ContactCompanyDetails";
import IndividualDetails from "./ContactIndividualDetails";
import ContactMethods from "./ContactMethods/ContactMethods";
// import ContactDetailsImage from "./ContactDetailsImage";



  export const ContactDetails = ({ selectedContact }) => {

  return (
    <>
   {/* <ContactDetailsImage /> */}

    {/* <IndividualDetails /> */}
    <CompanyDetails/>
    <IndividualDetails/>
    <ContactMethods/>
    </>


  );
};


// <Card style={{ marginLeft: "1rem", width: "40%", height: "50%", minWidth: "300px" }}>
// <CardHeader className="pr-0 ">
//   <CardHeaderToolbar className="w-100">
//             <>
//               <ContactImage>
//                 <Image
//                   style={{
//                     height: "40px",
//                     width: "40px",
//                   }}
//                   alt={selectedContact.name}
//                   src={ null }
//                  />
//               </ContactImage>
//               {/* [REV] fix the title name */}
//               <ContactName
//                 primary={selectedContact.name+'/'+selectedContact.trade_name}
//                 style={{ marginTop: "1rem",}}
//               />
//             </>
//   </CardHeaderToolbar>
// </CardHeader>

// <CardBody>
// body
// </CardBody>
// </Card>