import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/countries/countriesActions";
import { CountryEditDialogHeader } from "./CountryEditDialogHeader";
import { MyEnhancedCountryForm } from "./CountryEditForm";
import { useCountriesUIContext } from "../CountriesUIContext";

export function CountryEditDialog({ id, show, onHide }) {
  // Countries UI Context
  const countriesUIContext = useCountriesUIContext();
  const countriesUIProps = useMemo(() => {
    return {
      initCountry: countriesUIContext.initCountry,
    };
  }, [countriesUIContext]);

  // Countries Redux state
  const dispatch = useDispatch();
  const { actionsLoading, countryForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.countries.actionsLoading,
      countryForEdit: state.countries.countryForEdit,
    }),
    shallowEqual
  );
  
  useEffect(() => {
    // server call for getting Country by id
    dispatch(actions.fetchCountry(id));
  }, [id]);
  
  // server request for saving country
  const saveCountry = (country) => {
    if (!id) {
      // server request for creating country
      dispatch(actions.createCountry(country)).then(() => onHide());
    } else {
      // server request for updating country
      dispatch(actions.updateCountry(country)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <CountryEditDialogHeader id={id} />
      <MyEnhancedCountryForm
        saveCountry={saveCountry}
        actionsLoading={actionsLoading}
        country={countryForEdit || countriesUIProps.initCountry}
        onHide={onHide}
      />
    </Modal>
  );
}
