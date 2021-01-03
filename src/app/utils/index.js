// Use: array.sort( sortCustom ( 'fieldName', 'asc|desn',(a) =>  a.toUpperCase() ));
const sortCustom = (field, isAsc, primer) => {
    const key = primer
        ? (x) => {
              return primer(x[field]);
          }
        : (x) => {
              return x[field];
          };

    isAsc = isAsc ? 1 : -1;

    return (a, b) => {
        // eslint-disable-next-line
    return (a = key(a)), (b = key(b)), isAsc * ((a > b) - (b > a));
    };
};
export default {
    sortCustom,
};
