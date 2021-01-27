import React from 'react'
import { Form } from 'react-bootstrap'

export const Input = ({ type, name, value, error, touched, addClass, onChange, onBlur }) => {
  const handleChange = (e) => {
    // this is going to call setFieldValue and manually update values.topcis
    onChange(name, e.target.value)
  }

  const handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    onBlur(name, true)
  }
  return (
    <>
      <Form.Group className={addClass}>
        {name && <Form.Label>Enter {name}</Form.Label>}

        <Form.Control
          type={type}
          id="username"
          name="username"
          value={value}
          onChange={(e) => handleChange(e)}
          onBlur={() => handleBlur()}
        />
        {!!error && touched && <div style={{ color: 'red', marginTop: '.5rem' }}>{error}</div>}
      </Form.Group>
    </>
  )
}
