import numberFormats from "src/i18n/numberFormats";
// import i18n from "src/boot/i18n";

const formatCurrency = (value, locale = "pt-BR") => {
  // console.log(i18n)
  const currencyCode = numberFormats[locale].currency.currency;

  const formatted = value.toLocaleString(locale, {
    style: "currency",
    currency: currencyCode,
  });

  return formatted;
};

const formatUnitMeasure = (unit, locale) => {
  let formatted = unit;
  if (unit > 1000) {
    let unitTreated = unit / 1000;
    formatted =
      parseFloat(unitTreated.toFixed(2)).toLocaleString(locale) + " L";
  } else {
    formatted = parseFloat(unit.toFixed(2)).toLocaleString(locale) + " ml";
  }
  console.log("entrou!", formatted, locale);
  return formatted;
};

const formatPercent = (percent) => {
  const formatted = percent + "%";

  return formatted;
};

const formatAmountAlcohol = (abv, ml, locale) => {
  if (abv && ml) {
    const abvFormatted = abv / 100;
    const amount = ml * abvFormatted;
    const formatted = formatUnitMeasure(amount, locale);

    return formatted;
  } else {
    return "-";
  }
};

const formatPriceLiterBeverage = (price, ml, locale) => {
  if (price && ml) {
    const mlFormatted = 1000 / ml;
    const priceLiter = mlFormatted * price;
    const formatted = formatCurrency(priceLiter, locale);

    return formatted;
  } else {
    return "-";
  }
};

const formatPriceLiterAlcohol = (abv, ml, price, locale) => {
  if (abv && ml && price) {
    const abvFormatted = abv / 100;
    const mlFormatted = ml / 1000;

    const amount = mlFormatted * abvFormatted;

    const priceLiter = price / amount;

    const formatted = formatCurrency(priceLiter, locale);

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
