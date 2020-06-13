// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import CustomPagination from "./CustomPagination";
import Pagination from '@material-ui/lab/Pagination';
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
  const { accountTable: { entities, page, pages }, listLoading } = currentState;

  // Accounts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    accountsUIProps.setIds([]);
    // server call by queryParams
    const { pageNumber, pageSize } = accountsUIProps.queryParams;
    dispatch(actions.fetchAccounts({ page: pageNumber, perPage: pageSize }));
  }, []);

  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "id",
      sort: true,
      hidden: true
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret: sortCaret,
      // headerSortingClasses,
    },
    {
      dataField: "image",
      text: "Image",
    },
    {
      dataField: "currenc",
      text: "Currency",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "category",
      text: "Category",
      sort: true,
      sortCaret: sortCaret,
      // headerSortingClasses,
    },
    {
      dataField: "countr",
      text: "Country",
      sort: true,
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
        openDeleteAccountDialog: accountsUIProps.openDeleteAccountDialog
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    }
  ];

  const sortCustom = (type, { sortField, sortOrder, data }) => {
    if (data !== null) {
      let isAsc = sortOrder === 'asc' ? true : false;
      dispatch(actions.accountSort({ field: sortField, isAsc, entities: data }));
    }
  }

  const pagesChange = (e, value) => {
    const { pageSize } = accountsUIProps.queryParams;
    // accountsUIProps.setQueryParams((prev) => ({ ...prev, pageNumber: value }))
    dispatch(actions.fetchAccounts({ page: value, perPage: pageSize }));
  };
  return (
    <Fragment>
      <BootstrapTable
        wrapperClasses="table-responsive"
        bordered={false}
        classes="table table-head-custom table-vertical-center table-hover"
        bootstrap4
        remote

        keyField="id"
        data={entities === null ? [] : entities}
        columns={columns}
        defaultSorted={uiHelpers.defaultSorted}
        onTableChange={sortCustom}
        selectRow={getSelectRow({
          entities,
          ids: accountsUIProps.ids,
          setIds: accountsUIProps.setIds,
        })}
      >
        <PleaseWaitMessage entities={entities} />
        <NoRecordsFoundMessage entities={entities} />
      </BootstrapTable>
      <Pagination
        count={pages}
        page={page}
        style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
        onChange={pagesChange} />
    </Fragment>
  );
}
