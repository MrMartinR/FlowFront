
import * as userAccountsActions from './state/userAccountsActions'
export const individualTransaction = (transaction: any, userAccountsState: any, loans: any, dispatch: any) => {
    let loanId = null as any
    if (transaction.PlatformID === userAccountsState.userAccountsDetails.attributes.account.platform_id) {
        if (transaction.ID !== '-') {
            console.log('platform correcto transaction')
            loans.map((loan:any) => {
                if (loan.attributes.code === transaction.ID) {
                    loanId = loan.id
                }
                return loan.id
            })
            if (loanId !== null) {
                const form = {
                    description: transaction.Concept,
                    ref: transaction.Ref,
                    amount: transaction.Amount,
                    date: transaction.Date,
                    time: transaction.Time,
                    category: transaction.Category,
                    user_account_id: userAccountsState.userAccountsDetails.id,
                    loan_id: loanId,
                }
                dispatch(userAccountsActions.createTransaction(form))
            } else {
                console.log('No existe el Loan con ese CODE')
            }
        } else {
            console.log('platform correcto transfer')
            const form = {
                description: transaction.Concept,
                ref: transaction.Ref,
                amount: transaction.Amount,
                date: transaction.Date,
                time: transaction.Time,
                category: transaction.Category,
                user_account_id: userAccountsState.userAccountsDetails.id,
            }
            dispatch(userAccountsActions.createTransaction(form))
        }
    }
    else console.log('platform incorrecto')
}
