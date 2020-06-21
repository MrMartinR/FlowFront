import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal, Badge } from "react-bootstrap";
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";

export function CurrencyEditDialogHeader({ id }) {
  // Currencies Redux state
  const { currencyForEdit, actionsLoading } = useSelector(
    (state) => ({
      currencyForEdit: state.currencies.currencyForEdit,
      actionsLoading: state.currencies.actionsLoading,
    }),
    shallowEqual
  );

  // const [title, setTitle] = useState("");
  // // Title couting
  // useEffect(() => {
  //   let _title = id ? "" : "New Currencies";
  //   if (currencyForEdit && id) {
  //     _title = `Edit currency ${(
  //       <Badge variant="secondary">{currencyForEdit.name}</Badge>
  //     )}`;
  //   }

  //   setTitle(_title);
  //   // eslint-disable-next-line
  // }, [currencyForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {currencyForEdit && id ? (
            <label> Edit currency <Badge variant="secondary">{currencyForEdit.name}</Badge></label>
          ) : (
            "New Currencies"
          )}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
