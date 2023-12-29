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
    let unitTreated = unit / 1000;
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

const formatPriceLiterAlcohol = (abv, ml, price) => {
  if (abv && ml && price) {
    const abvFormatted = abv / 100;
    const mlFormatted = ml / 1000;

    const amount = mlFormatted * abvFormatted;

    const priceLiter = price / amount;

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
