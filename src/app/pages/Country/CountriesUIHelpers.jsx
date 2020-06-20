export const CountryStatusCssClasses = ["danger", "success", "info", ""];
export const CountryStatusTitles = ["Suspended", "Active", "Pending", ""];
export const CountryTypeCssClasses = ["success", "primary", ""];
export const CountryTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "name", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
  { text: "10", value: 10 }
];
export const initialFilter = {
  filter: {
    name: "",
  },
  sortOrder: "asc", // asc||desc
  pageNumber: 1,
  pageSize: 10
};
