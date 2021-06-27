import { useEffect, useState } from 'react'
import {
  makeStyles,
  Container,
  Card,
  List,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Switch,
  Grid,
} from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'

/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    maxHeight: 700,
    minWidth: 260,
    position: 'relative',
    overflow: 'auto',
  },
  search: {
    minWidth: '100%',
    margin: 6,
  },
  card: {
    background: '#fff', // #707070
    margin: 6,
  },
  avatar: {
    background: 'transparent',
    color: '#fff',
  },
  text: {
    color: '#787878',
  },
})

export const UserAccountsList = (props: any) => {
  /* styles */
  const classes = useStyles()

  const { setSelectedUserAccountId, isLoading, list } = props
  const [active, setActive] = useState(false)
  const [listFiltered, setListFiltered] = useState([] as any)
  const [listFilteredToggle, setListFilteredToggle] = useState([] as any)
  const [kind, setKind] = useState(null as any)
  const handleKind = (event: React.MouseEvent<HTMLElement>, newKind: string | null) => {
    setKind(newKind)
  }
  const handleChange = (e: any) => {
    setActive(e.target.checked)
  }
  useEffect(() => {
    let l
    if (kind === null) {
      setListFilteredToggle(listFiltered)
    } else {
      l = listFiltered.filter((account: any) => account.attributes.category === kind)
      setListFilteredToggle(l)
    }
  }, [listFiltered, kind])
  useEffect(() => {
    if (list !== null) {
      if (active === true) {
        const l = list.filter((account: any) => account.attributes.active === active)
        setListFiltered(l)
      } else setListFiltered(list)
    }
  }, [list, active])

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={10}>
          <ToggleButtonGroup value={kind} exclusive onChange={handleKind}>
            <ToggleButton value="Bank">Bank</ToggleButton>
            <ToggleButton value="Wallet">Wallet</ToggleButton>
            <ToggleButton value="Investment">Investment</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={2}>
          <Switch checked={active} onChange={handleChange} name="active" color="primary" />
        </Grid>
      </Grid>
      <List>
        {isLoading ? (
          <LinearProgress />
        ) : (
          listFilteredToggle.map((item: any, idx: any) => (
            <Card key={item.id} className={classes.card}>
              {/* alternative way to show the card */}
              {/* <ListItem
                button
                onClick={(e) => {
                  setSelectedItemIndex(idx)
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar variant="square" className={classes.avatar}>
                      {item.attributes.name[0]}
                    </Avatar>
                  }
                  title={item.attributes.name}
                  subheader={'Value ' + ' ' + 'Balance '}
                ></CardHeader>
                </ListItem> */}
              <ListItem
                button
                onClick={(e) => {
                  setSelectedUserAccountId(item.id)
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={'/media/svg/contact/icons/' + item.attributes.account.contact_id + '.svg'}
                    alt={item.attributes.name}
                    variant="square"
                    className={classes.avatar}
                  />
                </ListItemAvatar>
                <ListItemText primary={`${item.attributes.name}`} className={classes.text} />
                {/* TODO add the value and balance in the right part of the card */}
                {/* <ListItemText secondary={`${item.attributes.value}`} />
                  <ListItemText secondary={`${item.attributes.balance}`} /> */}
              </ListItem>
            </Card>
          ))
        )}
      </List>
    </Container>
  )
}
