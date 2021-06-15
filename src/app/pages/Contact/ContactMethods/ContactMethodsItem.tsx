import { Button } from '@material-ui/core'
import { CardActions, ListItem, Grid, ListItemAvatar, Typography, Avatar, makeStyles } from '@material-ui/core'
import IconFacebook from '../../../../common/layout/components/icons/Facebook'
import IconFacebookGroup from '../../../../common/layout/components/icons/FacebookGroup'
import IconFacebookPage from '../../../../common/layout/components/icons/FacebookPage'
import IconInstagram from '../../../../common/layout/components/icons/Instagram'
import IconLink from '../../../../common/layout/components/icons/Link'
import IconLinkedIn from '../../../../common/layout/components/icons/LinkedIn'
import IconLocation from '../../../../common/layout/components/icons/Location'
import IconMail from '../../../../common/layout/components/icons/Mail'
import IconOptions from '../../../../common/layout/components/icons/Option'
import IconPhone from '../../../../common/layout/components/icons/Phone'
import IconSkype from '../../../../common/layout/components/icons/Skype'
import IconTelegram from '../../../../common/layout/components/icons/Telegram'
import IconTwitter from '../../../../common/layout/components/icons/Twitter'
import IconVimeo from '../../../../common/layout/components/icons/Vimeo'
import IconYouTube from '../../../../common/layout/components/icons/YouTube'
/* styles */
const useStyles = makeStyles({
  cardActions: {
    padding: '0px',
    margin: '0px',
  },
  avatar: {
    height: '3vh',
    width: '3vh',
    backgroundColor: 'transparent',
  },
})
export const ContactMethodsItem = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { itm, handleOpen, canEdit } = props
  return (
    <CardActions className={classes.cardActions}>
      <Grid container alignItems="center">
        {/* renders the icon and data */}
        <Grid item xs={11}>
          <ListItem
            button
            component="a"
            target="_blank"
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
              <Avatar variant="square" className={classes.avatar}>
                {(itm.kind === 'Telegram' && <IconTelegram alt={itm.data} />) ||
                  (itm.kind === 'YouTube' && <IconYouTube alt={itm.data} />) ||
                  (itm.kind === 'Vimeo' && <IconVimeo alt={itm.data} />) ||
                  (itm.kind === 'Twitter' && <IconTwitter alt={itm.data} />) ||
                  (itm.kind === 'LinkedIn' && <IconLinkedIn alt={itm.data} />) ||
                  (itm.kind === 'Instagram' && <IconInstagram alt={itm.data} />) ||
                  (itm.kind === 'FB Profile' && <IconFacebook alt={itm.data} />) ||
                  (itm.kind === 'FB Group' && <IconFacebookGroup alt={itm.data} />) ||
                  (itm.kind === 'FB Page' && <IconFacebookPage alt={itm.data} />) ||
                  (itm.kind === 'Skype' && <IconSkype alt={itm.data} />) ||
                  (itm.kind === 'Email' && <IconMail alt={itm.data} />) ||
                  (itm.kind === 'Phone' && <IconPhone alt={itm.data} />) ||
                  (itm.kind === 'Address' && <IconLocation alt={itm.data} />) || <IconLink alt={itm.data} />}
              </Avatar>
            </ListItemAvatar>
            <Typography noWrap>{itm.data}</Typography>
          </ListItem>
        </Grid>
        {/* the options button */}
        {canEdit && (
          <Grid item xs={1}>
            <Button onClick={(e) => handleOpen(e, 'edit', itm)}>
              <IconOptions />
            </Button>
          </Grid>
        )}
      </Grid>
    </CardActions>
  )
}
