import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Form } from "react-bootstrap";

const options = [
  { value: "Food", label: "Food" },
  { value: "Being Fabulous", label: "Being Fabulous" },
  { value: "Ken Wheeler", label: "Ken Wheeler" },
  { value: "ReasonML", label: "ReasonML" },
  { value: "Unicorns", label: "Unicorns" },
  { value: "Kittens", label: "Kittens" },
];
const animatedComponents = makeAnimated();

export const MultiSelect = ({
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  addClass,
  multi=false
}) => {
  const handleChange = (value) => {
    // this is going to call setFieldValue and manually update values.topcis
    onChange(name, value);
  };

  const handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    onBlur(name, true);
  };
  return (
    <Form.Group className={addClass}>
      <label htmlFor="color">{name} (select at least 3) </label>
      <Select
        isMulti={multi}
        components={animatedComponents}
        isSearchable={true}
        closeMenuOnSelect={false}
        options={options}
        onChange={() => handleChange()}
        onBlur={() => handleBlur()}
        value={value}
      />
      {!!error && touched && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{error}</div>
      )}
    </Form.Group>
  );
};
