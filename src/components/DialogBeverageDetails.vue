<script>
import { defineComponent } from "vue";
import {
  formatAmountAlcohol,
  formatPriceLiterBeverage,
  formatPriceLiterAlcohol,
} from "src/utils/format";

export default defineComponent({
  name: "DialogBeverageDetails",
  props: {
    show: {
      type: Boolean,
      required: true,
    },

    beverage: {
      type: Object,
    },
  },

  setup(props, { emit }) {
    const handleClose = () => {
      emit("hideDialog");
    };

    return {
      formatAmountAlcohol,
      formatPriceLiterBeverage,
      formatPriceLiterAlcohol,
      handleClose,
    };
  },
});
</script>
<template>
  <q-dialog :model-value="show" @before-hide="handleClose">
    <q-card style="min-width: 300px">
      <q-card-section>
        <h1 class="text-h6 no-margin">{{ $t("details") }}</h1>
        <ul class="no-padding column mb-0">
          <li class="flex q-gutter-x-sm">
            <p class="bold">{{ $t("name") + ":" }}</p>
            <p>
              {{ beverage.name }}
            </p>
          </li>
          <li class="flex q-gutter-x-sm">
            <p class="bold">{{ $t("amountAlcohol") }}</p>
            <p>
              {{ formatAmountAlcohol(beverage.abv, beverage.ml) }}
            </p>
          </li>
          <li class="flex q-gutter-x-sm">
            <p class="bold">{{ $t("priceBeverage") }}</p>
            <p>
              {{ formatPriceLiterBeverage(beverage.price, beverage.ml) }}
            </p>
          </li>
          <li class="flex q-gutter-x-sm">
            <p class="bold">{{ $t("priceAlcohol") }}</p>
            <p>
              {{
                formatPriceLiterAlcohol(
                  beverage.abv,
                  beverage.ml,
                  beverage.price
                )
              }}
            </p>
          </li>
        </ul>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          :label="$t('close')"
          color="primary"
          class="primary-button"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
