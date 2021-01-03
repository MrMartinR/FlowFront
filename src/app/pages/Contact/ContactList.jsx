import React from "react";
import { Card, CardHeader, CardHeaderToolbar,} from "../../../_metronic/_partials/controls";
import VirtualizedList from "./ContactsListComponent";
import { AutoSizer } from "react-virtualized";

export const ContactsList = (props) => {
  const {
    setSelectedItemIndex,
    isLoading,
    list,
    currentPage,
    totalPages,
  } = props;


  return (
    <Card
      style={
        window.innerWidth < 600
          ? { minWidth: "200px", maxWidth: "200px" }
          : { minWidth: "250px", maxWidth: "250px" }
      }
    >
      <CardHeader>
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              //Filter Private Contacts
            }}
          >
            Private
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <VirtualizedList
              setSelectedItemIndex={setSelectedItemIndex}
              hasNextPage={currentPage < totalPages}
              isNextPageLoading={isLoading}
              list={list}
              listHeight={height}
            />
          );
        }}
      </AutoSizer>
    </Card>
  );
};
