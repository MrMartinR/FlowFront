import React from "react"

function Checkbox({ isSelected, onChange, children }) {
  return (
    <>
      <input type="checkbox" style={{ display: "none" }} />
      <label
        htmlFor="selectedCheckbox"
        className="checkbox checkbox-lg checkbox-single"
      >
        <input
          id="selectedCheckbox"
          type="checkbox"
          checked={isSelected}
          onChange={onChange}
        />
        {children}
        <span />
      </label>
    </>
  )
}

export default Checkbox
