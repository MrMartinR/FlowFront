import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal, Badge } from "react-bootstrap";
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";

export function CountryEditDialogHeader({ id }) {
  // Country Redux state
  const { countryForEdit, actionsLoading } = useSelector(
    (state) => ({
      countryForEdit: state.Countries.countryForEdit,
      actionsLoading: state.Countries.actionsLoading,
    }),
    shallowEqual
  );

  // const [title, setTitle] = useState("");
  // // Title couting
  // useEffect(() => {
  //   let _title = id ? "" : "New Country";
  //   if (countryForEdit && id) {
  //     _title = `Edit country ${(
  //       <Badge variant="secondary">{countryForEdit.name}</Badge>
  //     )}`;
  //   }

  //   setTitle(_title);
  //   // eslint-disable-next-line
  // }, [countryForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {countryForEdit && id ? (
            <label> Edit country <Badge variant="secondary">{countryForEdit.name}</Badge></label>
          ) : (
            "New Country"
          )}
        </Modal.Title>
      </Modal.Header>
    </>
  );
}
