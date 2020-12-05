import React from "react";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import VirtualizedListComponent from "../Account/VirtualizedListComponent";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/accounts/accountsActions";
import { AutoSizer } from "react-virtualized";

export const UserAccountsList = (props) => {
  const {
    newAccountFunc,
    setSelectedItemIndex,
    perPage,
    isLoading,
    list,
    currentPage,
    totalPages,
  } = props;
  const dispatch = useDispatch();

  const loadMore = () => {
    if (list.length !== 0) {
      // console.log("Loading...");
      dispatch(
        actions.fetchNextAccounts({ page: currentPage + 1, perPage: perPage })
      );
    }
  };

  // const [ hasNextPage, setHasNextPage ] = useState(true)

  return (
    <Card
      style={
        window.innerWidth < 600
          ? { minWidth: "200px", maxWidth: "200px" }
          : { minWidth: "250px", maxWidth: "250px" }
      }
    >
      <CardHeader title="User Accounts">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              newAccountFunc();
            }}
          >
            Create
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <VirtualizedListComponent
              setSelectedItemIndex={setSelectedItemIndex}
              hasNextPage={currentPage < totalPages}
              isNextPageLoading={isLoading}
              list={list}
              listHeight={height}
              loadNextPage={() => {
                loadMore();
              }}
            />
          );
        }}
      </AutoSizer>
    </Card>
  );
};
