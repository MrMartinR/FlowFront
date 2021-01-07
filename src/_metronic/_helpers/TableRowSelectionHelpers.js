import React from "react"

function SelectionCheckbox({ isSelected, onChange }) {
  return (
    <>
      <input type="checkbox" style={{ display: "none" }} />
      <label htmlFor="selected" className="checkbox checkbox-single">
        <input
          type="checkbox"
          id="selected"
          checked={isSelected}
          onChange={onChange}
        />
        <span />
      </label>
    </>
  )
}

function groupingItemOnSelect(props) {
  const { ids, setIds, customerId } = props
  if (ids.some((id) => id === customerId)) {
    setIds(ids.filter((id) => id !== customerId))
  } else {
    const newIds = [...ids]
    newIds.push(customerId)
    setIds(newIds)
  }
}

function groupingAllOnSelect(props) {
  const { isSelected, setIds, entities } = props
  if (!isSelected) {
    const allIds = []
    entities.forEach((el) => allIds.push(el.id))
    setIds(allIds)
  } else {
    setIds([])
  }

  return isSelected
}

// check official documentations: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Row%20Selection&selectedStory=Custom%20Selection%20Column%20Header%20Style&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
function getSelectRow(props) {
  const { entities, ids, setIds } = props
  return {
    mode: "checkbox",
    clickToSelect: true,
    hideSelectAll: false,
    selectionHeaderRenderer: () => {
      const isSelected =
        entities && entities.length > 0 && entities.length === ids.length
      const propValues = { isSelected, entities, setIds }
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => groupingAllOnSelect(propValues)}
        />
      )
    },
    selectionRenderer: ({ rowIndex }) => {
      const isSelected = ids.some((el) => el === entities[rowIndex].id)
      const propValues = { ids, setIds, customerId: entities[rowIndex].id }
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => groupingItemOnSelect(propValues)}
        />
      )
    },
  }
}

export default getSelectRow
