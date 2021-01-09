import React from "react";
import { Card, CardHeader,} from "@material-ui/core";
import { Button } from "@material-ui/core";

export const ContactMethods = () => {


  return (
    <Card style={{ marginLeft: "1rem", width: "50%", height: "100%", minWidth: "300px", minHeight: "300px" }}>
      <CardHeader title="Contact Methods" >
          <Button>
            +
          </Button>
      </CardHeader>
    </Card>
  );
};

export default ContactMethods;