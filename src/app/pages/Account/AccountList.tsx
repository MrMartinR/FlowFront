import {
  Card,
  LinearProgress,
  List,
  makeStyles,
} from '@material-ui/core'
import { AccountListToolbar } from './AccountListToolbar'
import { AccountListItem } from './AccountListItem'
/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    maxHeight: 600,
    position: 'relative',
    overflow: 'auto',
  },
})

export const AccountsList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { setSelectedItemIndex, isLoading, list } = props
  return (
    <>
      <AccountListToolbar setSelectedItemIndex={setSelectedItemIndex} list={list}/>
      <Card className={classes.root}>
        <List>
          {isLoading ? (
            <LinearProgress />
          ) : (
            list.map((item: any, idx: any) => (
              <AccountListItem setSelectedItemIndex={setSelectedItemIndex} item={item} idx={idx}/>
            ))
          )}
        </List>
      </Card>
    </>
  )
}
