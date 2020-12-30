import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal, Badge } from "react-bootstrap";
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";

export function AccountCreateDialogHeader({ id }) {
  // Account Redux state
  const { accountForEdit, actionsLoading } = useSelector(
    (state) => ({
      accountForEdit: state.accounts.accountForEdit,
      actionsLoading: state.accounts.actionsLoading,
    }),
    shallowEqual
  );

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {accountForEdit && id ? (
            <label>
              {" "}
              Edit account{" "}
              <Badge variant="secondary">{accountForEdit.name}</Badge>
            </label>
          ) : (
            "Create Account"
          )}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
