import { Snackbar } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import store from '../../../redux/store'
import * as currenciesActions from './state/currenciesActions'

export const CurrencyAlert = ( ) => {
    const {
        currencies: { error, success }
      } = store.getState()
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch( currenciesActions.resetSuccessCurrency());
      }
    return (
        <>
            {success === true ? (
                <Snackbar open={ true } autoHideDuration={3000} onClose={handleClick}>
                    <Alert
                        severity="success"
                        onClose={ handleClick }
                    >
                        <AlertTitle>Success</AlertTitle>
                    {
                        'Data saved'
                    }
                    </Alert>
                </Snackbar>
            ) : success === false ? (
                <Snackbar open={ true} autoHideDuration={6000} onClose={handleClick}>
                    <Alert
                        severity="error"
                        onClose={ handleClick }
                    >
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                </Snackbar>
            ) : (
                <></>
            )}
        </>
    )
}
