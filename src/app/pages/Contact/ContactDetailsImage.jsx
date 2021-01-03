import React from "react";
import { Avatar as Image, ListItemAvatar as ContactImage } from "@material-ui/core";


export const ContactDetailsImage = ({ selectedContact }) => {

  return (
    
    <ContactImage>
      <Image
      style={{
      height: "40px",
      width: "40px",
      }}
      src={ null }
      />
  </ContactImage>                   

  );
};


