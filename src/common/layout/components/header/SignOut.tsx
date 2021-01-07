import React from 'react'
import { useHistory } from 'react-router-dom'

function SignOut() {
  const history = useHistory()

  const logoutClick = () => {
    history.push('/logout')
  }

  return (
    <button
      className="btn btn-light-primary"
      onClick={logoutClick}
      type="button"
    >
      Sign Out
    </button>
  )
}

export default SignOut
