import { ref } from "vue";
import {
  formatCurrency,
  formatPercent,
  formatUnitMeasure,
} from "src/utils/format";

const columnsBeverage = [
  {
    name: "name",
    label: "name",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "abv",
    label: "abv",
    align: "left",
    field: "abv",
    sortable: true,
    format: (val) => formatPercent(val),
  },
  {
    name: "ml",
    label: "ml",
    align: "left",
    field: "ml",
    sortable: true,
    format: (val) => formatUnitMeasure(val),
  },
  {
    name: "price",
    label: "price",
    align: "left",
    field: "price",
    sortable: true,
    format: (val) => formatCurrency(val),
  },
  {
    name: "actions",
    align: "right",
    label: "actions",
    field: "actions",
    sortable: false,
  },
];

const noPagination = ref({
  page: 1,
  rowsPerPage: 0,
});

export { columnsBeverage, noPagination };
