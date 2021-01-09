// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Pagination from "@material-ui/lab/Pagination";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/currencies/currenciesActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../_metronic/_helpers";
import * as uiHelpers from "../CurrenciesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { useCurrenciesUIContext } from "../CurrenciesUIContext";


import { LicenseInfo } from '@material-ui/x-grid';
LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x',
);

import { XGrid } from '@material-ui/x-grid';


export function CurrenciesTable() {
  // Currencies UI Context
  const currenciesUIContext = useCurrenciesUIContext();
  const currenciesUIProps = useMemo(() => {
    return {
      ids: currenciesUIContext.ids,
      setIds: currenciesUIContext.setIds,
      queryParams: currenciesUIContext.queryParams,
      setQueryParams: currenciesUIContext.setQueryParams,
      openEditCurrencyDialog: currenciesUIContext.openEditCurrencyDialog,
      openDeleteCurrencyDialog: currenciesUIContext.openDeleteCurrencyDialog,
    };
  }, [currenciesUIContext]);

  // Getting curret state of currencies list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.currencies }),
    shallowEqual
  );
  const {
    currencyTable: { entities, page, pages },
    listLoading,
  } = currentState;

  // Currencies Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    currenciesUIProps.setIds([]);
    // server call by queryParams
    const { pageNumber, pageSize } = currenciesUIProps.queryParams;
    dispatch(actions.fetchCurrencies({ page: pageNumber, perPage: pageSize }));
  }, []);

  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "id",
      sort: true,
      hidden: true,
    },
    {
      dataField: "flag",
      text: "Flag",
      sort: true,
      sortCaret: sortCaret,
      // headerSortingClasses,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret: sortCaret,
      // headerSortingClasses,
    },
    {
      dataField: "iso_code",
      text: "ISO Code",
    },
    {
      dataField: "continent",
      text: "Continent",
      sort: true,
      sortCaret: sortCaret,
    },
    // {
    //   dataField: "currency_id",
    //   text: "Currencies",
    //   sort: true,
    //   sortCaret: sortCaret,
    //   // headerSortingClasses,
    // },
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
        openEditCurrencyDialog: currenciesUIProps.openEditCurrencyDialog,
        openDeleteCurrencyDialog: currenciesUIProps.openDeleteCurrencyDialog
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];

  const sortCustom = (type, { sortField, sortOrder, data }) => {
    if (data !== null) {
      let isAsc = sortOrder === "asc" ? true : false;
      dispatch(
        actions.currencySort({ field: sortField, isAsc, entities: data })
      );
    }
  };

  const pagesChange = (e, value) => {
    // const { pageSize } = currenciesUIProps.queryParams;
    // // currenciesUIProps.setQueryParams((prev) => ({ ...prev, pageNumber: value }))
    // dispatch(actions.fetchCurrencies({ page: value, perPage: pageSize }));
  };

  
  return (

    <div style={{ height: 520, width: '100%' }}>
    <XGrid
      {...data}
      loading={data.rows.length === 0}
      rowHeight={38}
      checkboxSelection
    />
  </div>,


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
          ids: currenciesUIProps.ids,
          setIds: currenciesUIProps.setIds,
        })}
      >
        <PleaseWaitMessage entities={entities} />
        <NoRecordsFoundMessage entities={entities} />
      </BootstrapTable>
      <Pagination
        count={pages}
        page={page}
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
        onChange={pagesChange}
      />
    </Fragment>
  );
}
