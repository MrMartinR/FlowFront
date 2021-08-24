/* eslint-disable no-restricted-imports*/
import { makeStyles, Container, LinearProgress, List } from '@material-ui/core'
import { ContactListToolbar } from './ContactListToolbar'
import { ContactListItem } from './ContactListItem'
/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    maxHeight: 600,
    position: 'relative',
    overflow: 'auto',
    padding: 12,
  },
})

export const ContactsList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { setSelectedItemIndex, isLoading, list } = props
  return (
    <>
      <ContactListToolbar list={list} setSelectedItemIndex={setSelectedItemIndex} />
      <Container className={classes.root}>
        <List>
          {isLoading ? (
            <LinearProgress />
          ) : (
            list.map((item: any, idx: any) => (
              <ContactListItem key={item.id} setSelectedItemIndex={setSelectedItemIndex} item={item} idx={idx} />
            ))
          )}
        </List>
      </Container>
    </>
  )
}
