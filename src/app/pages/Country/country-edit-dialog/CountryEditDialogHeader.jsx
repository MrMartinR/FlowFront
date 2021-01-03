import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal, Badge } from "react-bootstrap";

export function CountryEditDialogHeader({ id }) {
  // Country Redux state
  const { countryForEdit, actionsLoading } = useSelector(
    (state) => ({
      countryForEdit: state.countries.countryForEdit,
      actionsLoading: state.countries.actionsLoading,
    }),
    shallowEqual
  );

  return (
    <>
      {actionsLoading}
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
