// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import Pagination from "@material-ui/lab/Pagination";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/countries/countriesActions";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../_metronic/_helpers";
import * as uiHelpers from "../CountriesUIHelpers";
import * as columnFormatters from "./column-formatters";
import { useCountriesUIContext } from "../CountriesUIContext";

export function CountriesTable() {
  // Countries UI Context
  const countriesUIContext = useCountriesUIContext();
  const countriesUIProps = useMemo(() => {
    return {
      ids: countriesUIContext.ids,
      setIds: countriesUIContext.setIds,
      queryParams: countriesUIContext.queryParams,
      setQueryParams: countriesUIContext.setQueryParams,
      openEditCountryDialog: countriesUIContext.openEditCountryDialog,
      openDeleteCountryDialog: countriesUIContext.openDeleteCountryDialog,
    };
  }, [countriesUIContext]);

  // Getting curret state of countries list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.countries }),
    shallowEqual
  );
  const {
    countryTable: { entities, page, pages },
    listLoading,
  } = currentState;

  // Countries Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    countriesUIProps.setIds([]);
    // server call by queryParams
    const { pageNumber, pageSize } = countriesUIProps.queryParams;
    dispatch(actions.fetchCountries({ page: pageNumber, perPage: pageSize }));
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
        openEditCountryDialog: countriesUIProps.openEditCountryDialog,
        openDeleteCountryDialog: countriesUIProps.openDeleteCountryDialog
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
        actions.countrySort({ field: sortField, isAsc, entities: data })
      );
    }
  };

  const pagesChange = (e, value) => {
    // const { pageSize } = countriesUIProps.queryParams;
    // // countriesUIProps.setQueryParams((prev) => ({ ...prev, pageNumber: value }))
    // dispatch(actions.fetchCountries({ page: value, perPage: pageSize }));
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
          ids: countriesUIProps.ids,
          setIds: countriesUIProps.setIds,
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
