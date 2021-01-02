import React from "react";
import { Card, CardHeader, CardHeaderToolbar,} from "../../../../_metronic/_partials/controls";

export const ContactMethods = () => {


  return (
    <Card style={{ marginLeft: "1rem", width: "40%", height: "50%", minWidth: "300px", height: "400px" }}>
      <CardHeader title="Contact Methods" >
        <CardHeaderToolbar>
          <button>
            +
          </button>
        </CardHeaderToolbar>
      </CardHeader>
    </Card>
  );
};

export default ContactMethods;