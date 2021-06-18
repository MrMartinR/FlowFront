import * as userAccountsActions from './state/userAccountsActions'
export const individualTransaction = (
  transaction: any,
  userAccountsState: any,
  loans: any,
  dispatch: any,
  setCounterTotal: any,
  setCounterTransfer: any,
  setCounterTransaction: any,
  setCounterNoPlatform: any,
  setCounterNoLoan: any
) => {
  let loanId = null as any
  setCounterTotal((c:number)=> c+1)
  if (transaction.PlatformID === userAccountsState.userAccountsDetails.attributes.account.platform_id) {
    if (transaction.ID !== '-') {
        setCounterTransaction((c:number)=>c+1)
      loans.map((loan: any) => {
        if (loan.attributes.code === transaction.ID) {
          loanId = loan.id
        }
        return loan.id
      })
      if (loanId !== null) {
          let kind
          if (transaction.Amount<0) {
              kind='Outcome'
          } else kind='Income'
        const form = {
          description: transaction.Concept,
          ref: transaction.Ref,
          amount: transaction.Amount,
          kind,
          date: transaction.Date,
          time: transaction.Time,
          category: transaction.Category,
          user_account_id: userAccountsState.userAccountsDetails.id,
          loan_id: loanId,
        }
        dispatch(userAccountsActions.createTransaction(form))
      } else {
        setCounterNoLoan((c:number)=>c+1)
      }
    } else {
        setCounterTransfer((c:number)=>c+1)
      const form = {
        description: transaction.Concept,
        ref: transaction.Ref,
        amount: transaction.Amount,
        date: transaction.Date,
        kind: 'transfer',
        time: transaction.Time,
        category: transaction.Category,
        user_account_id: userAccountsState.userAccountsDetails.id,
      }
      dispatch(userAccountsActions.createTransaction(form))
    }
  } else setCounterNoPlatform((c:number)=>c+1)
}
