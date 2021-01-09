import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal, Badge } from "react-bootstrap";
import { ModalProgressBar } from "@material-ui/core";

export function AccountEditDialogHeader({ id }) {
  // Account Redux state
  const { accountForEdit, actionsLoading } = useSelector(
    (state) => ({
      accountForEdit: state.accounts.accountForEdit,
      actionsLoading: state.accounts.actionsLoading,
    }),
    shallowEqual
  );

  // const [title, setTitle] = useState("");
  // // Title couting
  // useEffect(() => {
  //   let _title = id ? "" : "New Account";
  //   if (accountForEdit && id) {
  //     _title = `Edit account ${(
  //       <Badge variant="secondary">{accountForEdit.name}</Badge>
  //     )}`;
  //   }

  //   setTitle(_title);
  //   // eslint-disable-next-line
  // }, [accountForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {accountForEdit && id ? (
            <label> Edit account <Badge variant="secondary">{accountForEdit.name}</Badge></label>
          ) : (
            "New Account"
          )}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
