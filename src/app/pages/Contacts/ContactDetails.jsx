import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import { Avatar as Image, ListItemAvatar as ContactImage, ListItemText as ContactName} from "@material-ui/core";


export const ContactDetails = ({ selectedContact }) => {
    const classes = makeStyles((theme) => ({
      root: {
         width: "100%",
         marginTop: theme.spacing(3),
         overflowX: "auto",
        },
    }))();


  return (
    <Card style={{ marginLeft: "1rem", width: "40%", minWidth: "300px" }}>
      <CardHeader className="pr-0 ">
        <CardHeaderToolbar className="w-100">
                  <>
                    <ContactImage>
                      <Image
                        style={{
                          height: "40px",
                          width: "40px",
                        }}
                        alt={selectedContact.name}
                        src={ null }
                       />
                    </ContactImage>
                    {/* [REV] fix the title name */}
                    <ContactName
                      primary={selectedContact.name+'/'+selectedContact.trade_name}
                      style={{ marginTop: "1rem",}}
                    />
                  </>
        </CardHeaderToolbar>
      </CardHeader>

      <CardBody>
        <Paper className={classes.root}>
        </Paper>
      </CardBody>
    </Card>
  );
};
