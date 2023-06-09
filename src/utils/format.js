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
    let unitTreated = (unit / 1000)
    formatted = parseFloat(unitTreated.toFixed(2)) + " L";
  } else {
    formatted = parseFloat(unit.toFixed(2)) + " ml";
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
    const amountFormatted = parseFloat(amount.toFixed(2));
    const formatted = formatUnitMeasure(amountFormatted);

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
  formatPriceLiterAlcohol,
};
