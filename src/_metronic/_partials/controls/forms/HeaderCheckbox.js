import React from "react"

function HeaderCheckbox({ isChecked, onChange }) {
  return (
    <label htmlFor="label" className="checkbox checkbox-lg checkbox-single">
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span />
    </label>
  )
}

export default HeaderCheckbox
