/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { makeStyles, Container, Grid, Card, Dialog, DialogContent } from '@material-ui/core'
import { UserAccountDetailsToolbar } from './UserAccountDetailsToolbar'

import { LicenseInfo } from '@material-ui/x-license'
import { GridColDef, XGrid } from '@material-ui/x-grid'
import { EditTransactionForm } from './EditTransactionForm'
LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

/* styles */
const useStyles = makeStyles({
  table: {
    height: 600,
    minWidth: 400,
    overflow: 'auto',
    position: 'relative',
    // margin: 6,
  },
})

/* define the columns for the table */
const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', width: 120, headerAlign: 'right', align: 'right' },
  /*
   * @ToDo Replace this kind for icons
   */
  { field: 'kind', headerName: 'Type', width: 120 },
  { field: 'category', headerName: 'Category', width: 120 },
  { field: 'description', headerName: 'Description', width: 360 },
  { field: 'amount', headerName: 'Amount', width: 120, headerAlign: 'right', align: 'right' },
]

export const UserAccountsDetails = (props: any) => {
  /* styles */
  const classes = useStyles()

  const { actionsLoading, allTransactions, singleAccount } = props
  const [value, setValue] = useState(0)
  const [balance, setBalance] = useState(0)
  const [transaction, setTransaction] = useState(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setBalance(0)
    setValue(0)
    let aux = 0
    allTransactions.map((transaction: any) => {
      if (transaction.attributes.amount !== null) aux += transaction.attributes.amount
      return aux
    })
    setBalance(aux)
  }, [allTransactions])
  const handleClick = (e: any) => {
    setTransaction(e.row)
    setOpen(true)
  }
  const rows = [] as any
  if (allTransactions.length > 0)
    allTransactions.map((transaction: any) => {
      const newRow = {
        id: transaction.id,
        date: transaction.attributes.date,
        kind: transaction.attributes.kind,
        category: transaction.attributes.category,
        description: transaction.attributes.description,
        amount: transaction.attributes.amount,
        loanId: transaction.attributes.loan?.id
      }
      rows.push(newRow)
      return rows
    })
  /* function close dialog window */
  const handleClose = () => {
    setOpen(false)
  }

  const body = <EditTransactionForm transaction={transaction} handleClose={handleClose} userId={singleAccount?.id} />
  return (
    <Container>
      <Grid item xs={12}>
        <UserAccountDetailsToolbar value={value} balance={balance} singleAccount={singleAccount} />
        <Card>
          <Grid className={classes.table}>
            <XGrid
              rows={rows}
              columns={columns}
              hideFooterSelectedRowCount={true}
              disableMultipleSelection={true}
              loading={actionsLoading}
              rowHeight={32}
              onRowClick={handleClick}
            />
          </Grid>
        </Card>
        {/* invoke the add edit delete window */}
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>{body}</DialogContent>
        </Dialog>
      </Grid>
    </Container>
  )
}
