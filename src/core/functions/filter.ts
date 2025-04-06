export const setDefaultInputFilter = (title: string) => ({
  title: title,
  type: 0
});

export const setDefaultSelectFilter = (
  title: string,
  label: string,
  value: string,
  data: any
) => ({
  title: title,
  data: data,
  label: label,
  value: value,
  type: 1
});

export const setDefaultSelectApiFilter = (
  title: string,
  url: string,
  label: string,
  value: string
) => ({
  title: title,
  url,
  data: null,
  label: label,
  value: value,
  type: 1
});

export const getState = () => [
  {
    pkId: false,
    name: "غیرفعال"
  },
  {
    pkId: true,
    name: "فعال"
  }
];

export const getRowPerItem = (
  index: number,
  currentPage: number,
  rowPerPage: number
) => {
  index += 1;
  if (currentPage > 1) {
    return currentPage * rowPerPage + index - rowPerPage;
  } else {
    return index;
  }
};

export const changeToLocalString = (value: string) => value.replaceAll(",", "");
