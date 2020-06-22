import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/currencies/currenciesActions";
import { CurrencyEditDialogHeader } from "./CurrencyEditDialogHeader";
import { MyEnhancedCurrencyForm } from "./CurrencyEditForm";
import { useCurrenciesUIContext } from "../CurrenciesUIContext";

export function CurrencyEditDialog({ id, show, onHide }) {
  // Currencies UI Context
  const currenciesUIContext = useCurrenciesUIContext();
  const currenciesUIProps = useMemo(() => {
    return {
      initCurrency: currenciesUIContext.initCurrency,
    };
  }, [currenciesUIContext]);

  // Currencies Redux state
  const dispatch = useDispatch();
  const { actionsLoading, currencyForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.currencies.actionsLoading,
      currencyForEdit: state.currencies.currencyForEdit,
    }),
    shallowEqual
  );
  
  useEffect(() => {
    // server call for getting Currency by id
    dispatch(actions.fetchCurrency(id));
  }, [id]);
  
  // server request for saving currency
  const saveCurrency = (currency) => {
    if (!id) {
      // server request for creating currency
      dispatch(actions.createCurrency(currency)).then(() => onHide());
    } else {
      // server request for updating currency
      dispatch(actions.updateCurrency(currency)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CurrencyEditDialogHeader id={id} />
      <MyEnhancedCurrencyForm
        saveCurrency={saveCurrency}
        actionsLoading={actionsLoading}
        currency={currencyForEdit || currenciesUIProps.initCurrency}
        onHide={onHide}
      />
    </Modal>
  );
}
