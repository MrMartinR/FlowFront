import { Button } from "@material-ui/core"
import { CardActions, ListItem, Grid, ListItemAvatar, Typography, Avatar, makeStyles } from "@material-ui/core"
/* styles */
const useStyles = makeStyles({
    avatar: {
      height: '2vh',
      width: '2vh',
    },
  })
export const ContactMethodsItem = (props: any) => {
    /* styles */
  const classes = useStyles()
    const { itm, handleOpen, canEdit } = props
    return (
        <CardActions>
              <Grid container alignItems="center">
                {/* renders the icon and data */}
                <Grid item xs={11}>
                  <ListItem
                    button
                    component="a"
                    target='_blank'
                    href={
                      ((itm.kind === 'FB Page' ||
                        itm.kind === 'Telegram' ||
                        itm.kind === 'Instagram' ||
                        itm.kind === 'FB Profile' ||
                        itm.kind === 'FB Group' ||
                        itm.kind === 'LinkedIn' ||
                        itm.kind === 'Twitter' ||
                        itm.kind === 'YouTube' ||
                        itm.kind === 'Vimeo' ||
                        itm.kind === 'Web') &&
                        itm.data.trim()) ||
                      (itm.kind === 'Phone' && `tel:${itm.data.trim()}`) ||
                      (itm.kind === 'Email' && `mailto:${itm.data.trim()}`) ||
                      (itm.kind === 'Skype' && `skype:${itm.data.trim()}?userinfo`) ||
                      (itm.kind === 'Address' && `https://www.google.com/maps/place/${encodeURI(itm.data.trim())}`) ||
                      itm.data
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={'/media/svg/icons/' + itm.kind + '.svg'}
                        alt={itm.data}
                        variant="square"
                        className={classes.avatar}
                      />
                    </ListItemAvatar>
                    <Typography noWrap variant="body1">
                      {itm.data}
                    </Typography>
                  </ListItem>
                </Grid>
                {/* the options button */}
                {canEdit && (
                  <Grid item xs={1}>
                    <Button onClick={(e) => handleOpen(e, 'edit', itm)}>•••</Button>
                  </Grid>
                )}
              </Grid>
            </CardActions>
    )
}
