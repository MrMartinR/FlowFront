// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/accounts/accountsActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../_metronic/_helpers";
import * as uiHelpers from "../AccountsUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../_metronic/_partials/controls";
import { useAccountsUIContext } from "../AccountsUIContext";

export function AccountsTable() {
  // Accounts UI Context
  const accountsUIContext = useAccountsUIContext();
  const accountsUIProps = useMemo(() => {
    return {
      ids: accountsUIContext.ids,
      setIds: accountsUIContext.setIds,
      queryParams: accountsUIContext.queryParams,
      setQueryParams: accountsUIContext.setQueryParams,
      openEditAccountDialog: accountsUIContext.openEditAccountDialog,
      openDeleteAccountDialog: accountsUIContext.openDeleteAccountDialog,
    };
  }, [accountsUIContext]);

  // Getting curret state of accounts list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.accounts }),
    shallowEqual
  );
  const { total_pages, data, listLoading } = currentState;
  console.log('data', data)

  // Accounts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    accountsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchAccounts(accountsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "category",
      text: "Category",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "image",
      text: "Image",
      sort: true,
      sort: false,
      sortCaret: sortCaret,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditAccountDialog: accountsUIProps.openEditAccountDialog,
        openDeleteAccountDialog: accountsUIProps.openDeleteAccountDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    }
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: total_pages,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: accountsUIProps.queryParams.pageSize,
    page: accountsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                remote
                keyField="id"
                data={data === null ? [] : data}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  accountsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  data,
                  ids: accountsUIProps.ids,
                  setIds: accountsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage data={data} />
                <NoRecordsFoundMessage data={data} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
