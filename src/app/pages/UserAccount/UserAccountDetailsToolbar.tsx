import { makeStyles, Toolbar, Dialog, DialogContent, Grid, CardHeader, Button, Avatar, Typography } from '@material-ui/core/'
import { useState } from 'react'
import IconOption from '../../../common/layout/components/icons/Option'

import { CreateTransactionForm } from './CreateTransactionForm'
import { CreateTransferForm } from './CreateTransferForm'
import { ImportTransactions } from './ImportTransactions'
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
  const [ open, setOpen ] = useState(false)
  const [ option, setOption ] = useState('')
  const handleTransaction = () => {
    setOption('transaction')
    setOpen(true)
  }
  const handleTransfer = () => {
    setOption('transfer')
    setOpen(true)
  }
  const handleClick = () => {}
  const handleImport = () => {
    setOption('import')
    setOpen(true)
  }
  /* function close dialog window */
  const handleClose = () => {
    setOpen(false)
  }

  const body =
    option==='transaction' ? (
      <>
        <Typography variant="h4">Create Transaction</Typography>
        <CreateTransactionForm handleClose={handleClose} />
      </>
    ) : (
      option==='transfer' ? (
        <>
          <Typography variant="h4">Create Transfer</Typography>
          <CreateTransferForm handleClose={handleClose} />
        </>
      ) : (
        option==='import' && (
          <>
            <Typography variant="h4">Import Transactions</Typography>
            <ImportTransactions handleClose={handleClose} />
          </>
        )
      )
    )
  return (
    <Toolbar variant="dense" className={classes.root}>
      <Grid item xs={12}>
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
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{body}</DialogContent>
      </Dialog>
    </Toolbar>
  )
}
