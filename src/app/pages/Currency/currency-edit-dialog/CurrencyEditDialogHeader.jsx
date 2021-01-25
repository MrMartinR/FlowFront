import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Modal, Badge } from 'react-bootstrap'

export function CurrencyEditDialogHeader({ id }) {
  // Currency Redux state
  const { currencyForEdit, actionsLoading } = useSelector(
    (state) => ({
      currencyForEdit: state.currencies.currencyForEdit,
      actionsLoading: state.currencies.actionsLoading
    }),
    shallowEqual
  )

  return (
    <>
      {actionsLoading}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {currencyForEdit && id ? (
            <label>
              {' '}
              Edit currency <Badge variant="secondary">{currencyForEdit.name}</Badge>
            </label>
          ) : (
            'New Currency'
          )}
        </Modal.Title>
      </Modal.Header>
    </>
  )
}
