export function sortDataBy(data, field, mode) {
  if (mode === "ASC") {
    return [...data].sort((a, b) => a[field] - b[field]);
  } else {
    console.log("b-a");
    return [...data].sort((a, b) => b[field] - a[field]);
  }
}
export function sortDataWithLocale(data, field, mode) {
  // sắp xếp cho các kí tự ko phải ASCII ( có dấu )

  //src : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  if (mode === "ASC") {
    return [...data].sort((a, b) => a[field].localeCompare(b[field]));
  } else {
    console.log("b-a");
    return [...data].sort((a, b) => b[field].localeCompare(a[field]));
  }
}
export const sortDataSourceDESCByDateAndField = (data, dateField, secondField, mode) => {
  return [...data].sort((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);
    if (mode === "ASC") {
      return dateA - dateB;
    }
    if (dateB - dateA !== 0) {
      return dateB - dateA;
    }

    if (a[secondField] < b[secondField]) {
      return -1;
    }
    if (a[secondField] > b[secondField]) {
      return 1;
    }
    return 0;
  });
};
const sortDataSourceByX = (data, valueField, mode) => {
  return [...data].sort((a, b) => {
    // [...data] : copy lại data ban đầu và sort để state chắc chắn đc update khi call setDataSource
    // vì nếu sort trực tiếp vào array gốc , có thể react ko nhận ra được state changes vì biến tham chiếu đến state đó ko thay đổi
    // nếu copy một array  khác và sort vào array đó -> con trỏ thay đổi -> react phát hiện đc sự thay đổi
    if (mode === "DESC") {
      return b[valueField] - a[valueField];
    }
    return a[valueField] - b[valueField];
  });
};
