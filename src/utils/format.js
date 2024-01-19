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

const formatAbv = (abv) => {
  if (abv >= 10) {
    let formatted = (abv / 10).toFixed(1);
    let max = 100.0;
    return Math.min(formatted, max);
  }

  return abv;
};

const formatPrice = (price) => {
  return price > 100 ? price / 100 : price;
};

const formatUnitMeasure = (unit) => {
  const { locale } = useI18n();

  if (unit > 1000) {
    let unitTreated = unit / 1000;
    return (
      parseFloat(unitTreated.toFixed(2)).toLocaleString(locale.value) + " L"
    );
  }

  return parseFloat(unit.toFixed(2)).toLocaleString(locale.value) + " ml";
};

const formatPercent = (percent) => {
  const formatted = percent + "%";

  return formatted;
};

const formatAmountAlcohol = (abv, ml) => {
  if (abv && ml) {
    const abvFormatted = formatAbv(abv) / 100;
    const amount = ml * abvFormatted;
    const formatted = formatUnitMeasure(amount);

    return formatted;
  } else {
    return "-";
  }
};

const formatPriceLiterBeverage = (price, ml) => {
  const { locale } = useI18n();

  if (price && ml) {
    const priceFormatted = formatPrice(price);
    const mlFormatted = 1000 / ml;
    const priceLiter = mlFormatted * priceFormatted;
    const formatted = formatCurrency(priceLiter);

    return formatted;
  } else {
    return "-";
  }
};

const formatPriceLiterAlcohol = (abv, ml, price) => {
  if (abv && ml && price) {
    const abvFormatted = formatAbv(abv) / 100;
    const mlFormatted = ml / 1000;

    const amount = mlFormatted * abvFormatted;

    const priceLiter = formatPrice(price) / amount;

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
  formatAbv,
  formatPrice
};
