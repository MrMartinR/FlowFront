import { ListItemAvatar, Avatar, ListItemText, ListItem, Card, makeStyles } from "@material-ui/core"
/* styles */
const useStyles = makeStyles({
    avatar: {
      background: 'transparent',
      color: '#e6e6e6',
    },
  })
export const AccountListItem = (props: any) => {
    /* styles */
  const classes = useStyles()
    const { setSelectedItemIndex, item, idx } =props
  return (
    <Card>
      <ListItem
        button
        onClick={(e) => {
          setSelectedItemIndex(idx)
        }}
      >
        <ListItemAvatar>
          <Avatar
            src={'/media/svg/contact/icons/' + item.attributes.contact.id + '.svg'}
            alt={item.attributes.contact.trade_name}
            variant="square"
            className={classes.avatar}
          />
        </ListItemAvatar>
        <ListItemText primary={`${item.attributes.contact.trade_name}`} />
      </ListItem>
    </Card>
  )
}
