import React from 'react'
/* eslint-disable no-restricted-imports*/
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import {
  Typography,
  Card,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { green } from '@material-ui/core/colors'
import Avatar from '@material-ui/core/Avatar'
import AssignmentIcon from '@material-ui/icons/Assignment'
import StarIcon from '@material-ui/icons/Star'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      position: 'relative',
      overflow: 'auto',
      height: '100%',
      top: 20,
    },
    green: {
      color: '#fff',
      backgroundColor: green[500],
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      margin: 'auto',
    },
  })
)

export const ContactMethod = (props: any) => {
  const { methodLoading, listMethods } = props
  const classes = useStyles()
  const err = 'Not Found'
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Card className={classes.root} variant="outlined">
      {methodLoading === true ? (
        <CircularProgress color="secondary" />
      ) : listMethods.length >= 1 ? (
        listMethods.map((itm: any, idx: any) => (
          <Accordion expanded={expanded === `panel${idx}`} onChange={handleChange(`panel${idx}`)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
              <Avatar className={classes.green}>
                <AssignmentIcon />
              </Avatar>

              <Typography className={classes.secondaryHeading}>{itm.kind || err}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List component="nav" className={classes.root} aria-label="contacts">
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={itm.data} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Visibility" />
                  {itm.visibility}
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </Card>
  )
}
