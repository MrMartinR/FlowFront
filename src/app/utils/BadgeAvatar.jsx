import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

export default function BadgeAvatars({ src, onFileChange, readOnly }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {readOnly ? (
        <Avatar
          style={{
            height: "100px",
            width: "100px",
            //   border: "1px solid #e4dcdc",
            border: "5px solid #f3f3f3",
          }}
          variant="rounded"
          alt="Travis Howard"
          src={src}
        />
      ) : (
        <Badge
          overlap="rectangle"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          badgeContent={
            <label className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow">
              <i className="fa fa-pen icon-sm text-muted"></i>
              <input
                type="file"
                onChange={onFileChange}
                hidden
                accept=".png, .jpg, .jpeg"
              />
            </label>
          }
        >
          <Badge
            overlap="rectangle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <span
                onClick={onFileChange}
                className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
              >
                <i className="ki ki-bold-close icon-xs text-muted"></i>
              </span>
            }
          >
            <Avatar
              style={{
                height: "100px",
                width: "100px",
                //   border: "1px solid #e4dcdc",
                border: "5px solid #f3f3f3",
              }}
              variant="rounded"
              alt="Travis Howard"
              src={src}
            />
          </Badge>
        </Badge>
      )}
    </div>
  );
}
