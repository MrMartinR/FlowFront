import { Card, ListItem, ListItemAvatar, Avatar, ListItemText, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  card: {
    background: '#fff', // #707070
    minWidth: '100%',
    margin: 6,
  },
  avatar: {
    background: 'transparent',
    color: '#e6e6e6',
  },
  text: {
    color: '#787878',
  },
})
export const ContactListItem = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { item, setSelectedItemIndex, idx } = props
  return (
    <Card className={classes.card}>
      <ListItem
        button
        onClick={(e) => {
          setSelectedItemIndex(idx)
        }}
      >
        <ListItemAvatar>
          <Avatar
            src={'/media/svg/contact/icons/' + item.id + '.svg'}
            alt={item.attributes.name_header}
            variant="square"
            className={classes.avatar}
          />
        </ListItemAvatar>
        <ListItemText primary={`${item.attributes.name_header}`} className={classes.text} />
      </ListItem>
    </Card>
  )
}
