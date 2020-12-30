import React from "react";
import { useHistory } from "react-router-dom";

export function SignOut() {
  const history = useHistory();

  const logoutClick = () => {
    history.push("/logout");
  };

  return (
    <button className="btn btn-light-primary" onClick={logoutClick}>
      Sign Out
    </button>
  );
}
