const formatCurrency = (currency) => {
  const formatted = currency.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return formatted;
};

const formatUnitMeasure = (unit) => {
  let formatted = unit;
  if (unit > 1000) {
    formatted = unit / 1000 + " L";
  } else {
    formatted = unit + " ml";
  }
  return formatted;
};

const formatPercent = (percent) => {
  const formatted = percent + "%";
  return formatted;
};

export { formatCurrency, formatUnitMeasure, formatPercent };
