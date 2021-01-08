import React from "react";
/* eslint-disable no-restricted-imports*/
import { makeStyles } from '@material-ui/core/styles';

import {Typography, Button, CardContent, CardActions, Card} from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 400,
    position: "relative",
    overflow: "auto",
    maxHeight: 580,
    top: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const ContactDetails = (props) => {
  const { selectedContact } = props;
  const classes = useStyles();
  console.log(selectedContact)
  
  return (
    <Card className={classes.root} variant="outlined">
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {`Company Name: ${selectedContact.company_name}`}
      </Typography>
      <Typography variant="h5" component="h2">
        hehe
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
       something else
      </Typography>
      <Typography variant="body2" component="p">
        Company Description
        <br />
        {`${selectedContact.description}`}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>



  );
};
