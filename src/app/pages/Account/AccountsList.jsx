import React from "react";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
// } from "../../../../_metronic/_partials/controls";
// import { AccountsFilter } from "./accounts-filter/AccountsFilter";
// import { AccountsTable } from "./accounts-table/AccountsTable";
// import { AccountsGrouping } from "./accounts-grouping/AccountsGrouping";
// import { useAccountsUIContext } from "./AccountsUIContext";
import VirtualizedListComponent from './VirtualizedListComponent';
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/accounts/accountsActions";
import { AutoSizer } from "react-virtualized";


export function AccountsList({newAccountFunc, setSelectedItemIndex, perPage, isLoading, list, currentPage, totalPages}) {

  const dispatch = useDispatch();

  const loadMore = () => {
    if (list.length !== 0) {
      // console.log("Loading...");
      dispatch(actions.fetchNextAccounts({ page: currentPage+1, perPage: perPage }));
    }
  }

  // const [ hasNextPage, setHasNextPage ] = useState(true)

  return (
    <Card style={ window.innerWidth < 600 ? { minWidth: '200px', maxWidth: '200px' } : { minWidth: '250px', maxWidth: '250px' }}>
      <CardHeader title="Accounts">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              newAccountFunc();
              // console.log("e: ", e);
              // formik.handleSubmit(e);
            }}
            // disabled={formik.isSubmitting}
          >
            Create
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <AutoSizer>
        {({height, width}) => 
          {
            return <VirtualizedListComponent
              setSelectedItemIndex={setSelectedItemIndex}
              hasNextPage={currentPage < totalPages}
              isNextPageLoading={isLoading}
              list={list}
              listHeight={height}
              loadNextPage={()=>{loadMore()}} />
          }
        }
      </AutoSizer>
    </Card>
    
  );
}
