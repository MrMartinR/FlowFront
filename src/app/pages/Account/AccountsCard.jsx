import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
} from "@material-ui/core";
// } from "../../../../_metronic/_partials/controls";
// import { AccountsFilter } from "./accounts-filter/AccountsFilter";
import { AccountsTable } from "./accounts-table/AccountsTable";
// import { AccountsGrouping } from "./accounts-grouping/AccountsGrouping";
import { useAccountsUIContext } from "./AccountsUIContext";

export function AccountsCard() {
  const accountsUIContext = useAccountsUIContext();
  const accountsUIProps = useMemo(() => {
    return {
      ids: accountsUIContext.ids,
      newAccountButtonClick: accountsUIContext.newAccountButtonClick,
    };
  }, [accountsUIContext]);

  return (
    <Card>
      <CardHeader title="Accounts list">
          <button
            type="button"
            className="btn btn-primary"
            onClick={accountsUIProps.newAccountButtonClick}
          >
            New Account
          </button>
      </CardHeader>
      <CardBody>
        {/* <AccountsFilter /> */}
        {/* {accountsUIProps.ids.length > 0 && <AccountsGrouping />} */}
        <AccountsTable />
      </CardBody>
    </Card>
  );
}
