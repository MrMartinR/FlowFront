/* eslint-disable no-return-assign */
// Use: array.sort( sortCustom ( 'fieldName', 'asc|desn',(a) =>  a.toUpperCase() ));
const sortCustom = (field, isAsc, primer) => {
  const key = primer ? (x) => primer(x[field]) : (x) => x[field]

  isAsc = isAsc ? 1 : -1

  return (a, b) => [(a = key(a)), (b = key(b)), isAsc * ((a > b) - (b > a))]
}
export default {
  sortCustom,
}
