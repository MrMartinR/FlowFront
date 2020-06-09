import React from "react";

function SelectionCheckbox({ isSelected, onChange }) {
  return (
    <>
      <input type="checkbox" style={{ display: "none" }} />
      <label className="checkbox checkbox-single">
        <input type="checkbox" checked={isSelected} onChange={onChange} />
        <span />
      </label>
    </>
  );
}

function groupingItemOnSelect(props) {
  const { ids, setIds, customerId } = props;
  if (ids.some((id) => id === customerId)) {
    setIds(ids.filter((id) => id !== customerId));
  } else {
    const newIds = [...ids];
    newIds.push(customerId);
    setIds(newIds);
  }
}

function groupingAllOnSelect(props) {
  const { isSelected, setIds, data } = props;
  if (!isSelected) {
    const allIds = [];
    data.forEach((el) => allIds.push(el.id));
    setIds(allIds);
  } else {
    setIds([]);
  }

  return isSelected;
}

// check official documentations: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Row%20Selection&selectedStory=Custom%20Selection%20Column%20Header%20Style&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
export function getSelectRow(props) {
  const { data, ids, setIds } = props;
  return {
    mode: "checkbox",
    clickToSelect: true,
    hideSelectAll: false,
    selectionHeaderRenderer: () => {
      const isSelected =
        data && data.length > 0 && data.length === ids.length;
      const props = { isSelected, data, setIds };
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => groupingAllOnSelect(props)}
        />
      );
    },
    selectionRenderer: ({ rowIndex }) => {
      const isSelected = ids.some((el) => el === data[rowIndex].id);
      const props = { ids, setIds, customerId: data[rowIndex].id };
      return (
        <SelectionCheckbox
          isSelected={isSelected}
          onChange={() => groupingItemOnSelect(props)}
        />
      );
    },
  };
}
