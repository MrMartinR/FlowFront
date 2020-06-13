import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";

export function AccountEditDialogHeader({ id }) {
  // Account Redux state
  const { accountForEdit, actionsLoading } = useSelector(
    (state) => ({
      accountForEdit: state.accounts.accountForEdit,
      actionsLoading: state.accounts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Account";
    if (accountForEdit && id) {
      _title = `Edit account '${accountForEdit.firstName} ${accountForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [accountForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
