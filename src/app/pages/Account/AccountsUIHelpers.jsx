export const AccountStatusCssClasses = ["danger", "success", "info", ""];
export const AccountStatusTitles = ["Suspended", "Active", "Pending", ""];
export const AccountTypeCssClasses = ["success", "primary", ""];
export const AccountTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    username: "",
    email: "",
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
};
