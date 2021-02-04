import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

function SignOut() {
  const history = useHistory()

  return (
    <Button
      onClick={() => {
        history.push('/logout')
      }}
    >
      Sign Out
    </Button>
  )
}

export default SignOut
