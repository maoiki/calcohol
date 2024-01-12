import { useI18n } from "vue-i18n";

const formatCurrency = (value) => {
  const { locale, numberFormats } = useI18n();

  const currencyCode = numberFormats.value[locale.value].currency.currency;

  const formatted = value.toLocaleString(locale.value, {
    style: "currency",
    currency: currencyCode,
  });

  return formatted;
};

const formatUnitMeasure = (unit, locale) => {
  if (unit > 1000) {
    let unitTreated = unit / 1000;
    return parseFloat(unitTreated.toFixed(2)).toLocaleString(locale) + " L";
  }

  return parseFloat(unit.toFixed(2)).toLocaleString(locale) + " ml";
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
