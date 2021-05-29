/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Grid, Card, Typography } from '@material-ui/core'
import { UserAccountDetailsToolbar } from './UserAccountDetailsToolbar'

import { LicenseInfo } from '@material-ui/x-license'
import { GridColDef, XGrid } from '@material-ui/x-grid'
LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)
const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', width: 120 },
  // [ToDo] Replace this kind for icons
  { field: 'kind', headerName: 'Type', width: 120 },
  { field: 'category', headerName: 'Category', width: 120 },
  { field: 'description', headerName: 'Description', width: 360 },
  { field: 'amount', headerName: 'Amount', width: 120 },
]
export const UserAccountsDetails = (props: any) => {
  const { actionsLoading, allTransactions, singleAccount } = props
  const [value, setValue] = useState(0)
  const [balance, setBalance] = useState(0)
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
      }
      rows.push(newRow)
      return rows
    })

  return (
    <Grid item xs={12}>
      <UserAccountDetailsToolbar value={value} balance={balance} singleAccount={singleAccount} />
      <Card style={{ marginLeft: '1rem', width: '100%', minWidth: '400px' }}>
        {allTransactions.length === 0 ? (
          <Typography>No transactions found.</Typography>
        ) : (
          <Grid container direction="column">
            <div style={{ height: 600, width: '100%' }}>
              <XGrid rows={rows} columns={columns} disableMultipleSelection={true} loading={actionsLoading} />
            </div>
          </Grid>
        )}
      </Card>
    </Grid>
  )
}
