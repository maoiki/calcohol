const formatCurrency = (currency) => {
  const formatted = currency.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
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

const formatAmountAlcohol = (abv, ml) => {
  if (abv && ml) {
    const abvFormatted = abv / 100;
    const amount = ml * abvFormatted;
    const formatted = formatUnitMeasure(amount);

    return formatted;
  } else {
    return "-";
  }
};

const formatPriceLiterBeverage = (price, ml) => {
  if (price && ml) {
    const mlFormatted = 1000 / ml;
    const priceLiter = mlFormatted * price;
    const formatted = formatCurrency(priceLiter);

    return formatted;
  } else {
    return "-";
  }
};

const formatPriceLiterAlcohol = (abv, ml) => {
  if (abv && ml) {
    const mlFormatted = 1000 / ml;
    const abvFormatted = abv / 100;
    const priceLiter = mlFormatted * abvFormatted;

    const formatted = formatCurrency(priceLiter);
    return formatted;
  } else {
    return "-";
  }
};

export {
  formatCurrency,
  formatUnitMeasure,
  formatPercent,
  formatAmountAlcohol,
  formatPriceLiterBeverage,
  formatPriceLiterAlcohol
};
