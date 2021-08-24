import {
  makeStyles,
  Toolbar,
  Dialog,
  DialogContent,
  Grid,
  CardHeader,
  Button,
  Avatar,
} from '@material-ui/core/'
import { useState } from 'react'
import IconOption from '../../../common/layout/components/icons/Option'
import { CreateTransactionForm } from './CreateTransactionForm'
import { CreateTransferForm } from './CreateTransferForm'
import { ImportTransactions } from './ImportTransactions'
import { AddUserAccount } from './AddUserAccount'
import { EditUserAccount } from './EditUserAccount'
import { DeleteUserAccount } from './DeleteUserAccount'
/* styles */
const useStyles = makeStyles({
  root: {
    // background: '#f1f1f1',
    maxWidth: '100%',
    position: 'relative',
    overflow: 'auto',
  },
})

export const UserAccountDetailsToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { value, balance, singleAccount } = props
  const [open, setOpen] = useState(false)
  const [option, setOption] = useState('')
  const handleTransaction = () => {
    setOption('transaction')
    setOpen(true)
  }
  const handleTransfer = () => {
    setOption('transfer')
    setOpen(true)
  }
  const handleClick = () => {
    setOption('edit')
    setOpen(true)
  }
  const handleAdd = () => {
    setOption('add')
    setOpen(true)
  }
  const handleImport = () => {
    setOption('import')
    setOpen(true)
  }
  /* function close dialog window */
  const handleClose = () => {
    setOpen(false)
  }
const handleDelete = () => {
    setOption('delete')
    setOpen(true)
}
  const body =
    option === 'transaction' ? (
      <CreateTransactionForm handleClose={handleClose} />
    ) : option === 'transfer' ? (
      <CreateTransferForm handleClose={handleClose} />
    ) : option === 'import' ? (
      <ImportTransactions handleClose={handleClose} />
    ) : option === 'edit' ? (
      <>
        
        <EditUserAccount handleClose={handleClose} singleAccount={singleAccount} handleDelete={handleDelete}/>
      </>
    ) : option === 'add' ? (
        <AddUserAccount handleClose={handleClose} />
    ) : option === 'delete' && (
        <DeleteUserAccount handleClose={handleClose} singleAccount={singleAccount} />
    )
  return (
    <Toolbar variant="dense" className={classes.root}>
      <Grid container>
        <Grid item xs={12} container justify='flex-end'>
          <Button onClick={handleAdd}>Add User Account</Button>
        </Grid>
        <Grid item xs={12}>
          {singleAccount !== null && (
            <CardHeader
              avatar={
                <Avatar
                  src={'/media/svg/contact/icons/' + singleAccount.attributes?.account?.contact_id + '.svg'}
                  alt={singleAccount.attributes?.name}
                  variant="square"
                />
              }
              title={singleAccount.attributes?.name}
              subheader={'Value ' + value + ' Balance ' + balance.toFixed(2)}
              action={
                <>
                  <Button onClick={handleTransfer}>Add Transfer</Button>
                  <Button onClick={handleTransaction}>Add Transaction</Button>
                  <Button onClick={handleImport}>Import</Button>
                  <Button onClick={handleClick}>
                    <IconOption />
                  </Button>
                </>
              }
            ></CardHeader>
          )}
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{body}</DialogContent>
      </Dialog>
    </Toolbar>
  )
}
