import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import * as authActions from '../../../../app/modules/Auth/state/authActions'
export const SignOut = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(authActions.logout())
  }
  return (
    <Button 
      onClick = { handleClick }
    >
      Sign Out
    </Button>
  )
}
