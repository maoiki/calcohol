<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import {
  formatAmountAlcohol,
  formatPriceLiterBeverage,
  formatPriceLiterAlcohol
} from "src/utils/format";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const form = ref({
      name: "",
      ml: "",
      abv: "",
      price: "",
    });

    const $q = useQuasar();

    return {
      form,
      formatAmountAlcohol,
      formatPriceLiterBeverage,
      formatPriceLiterAlcohol
    };
  },
});
</script>
<template>
  <q-page padding>
    <div class="q-gutter-md q-pa-sm">
      <div class="row flex-center">
        <p class="text-h5">beverage details</p>
        <q-space></q-space>
        <q-btn :to="{ name: 'form-beverage' }" round color="primary" icon="add" />
      </div>
      <q-input
        clearable
        clear-icon="close"
        v-model.number="form.ml"
        label="Amount of ml"
        inputmode="decimal"/>
      
      <q-input
        clearable
        clear-icon="close"
        v-model.number="form.abv"
        label="ABV"
        inputmode="decimal"
      />
      <q-input
        clearable
        clear-icon="close"
        v-model.number="form.price"
        label="Price"
        prefix="$"
        step="false"
        inputmode="decimal"
      />
      
    </div>
    <div v-if="$q.platform.is.mobile"  class="q-pa-md no-margin flex-center row items-start q-gutter-md fixed-bottom bg-secondary rounded_container">
      <q-card class="result_card">
        <q-card-section horizontal>
          <q-card-section> {{ $t('amountAlcohol') }}  </q-card-section>
          <q-space />
          <q-card-section>
            {{ formatAmountAlcohol(form.abv, form.ml) }}
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="result_card">
        <q-card-section horizontal>
          <q-card-section> {{ $t('priceBeverage') }} </q-card-section>
          <q-space />
          <q-card-section class="flex-center">
            {{ formatPriceLiterBeverage(form.price, form.ml) }}
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="result_card">
        <q-card-section horizontal>
          <q-card-section> {{ $t('priceAlcohol') }}  </q-card-section>
          <q-space />
          <q-card-section>
            {{ formatPriceLiterAlcohol(form.abv, form.ml) }}
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
    <div v-else class="q-pa-md no-margin row items-start q-gutter-md  bg-secondary ">
      <q-card class="my-card">
        <q-card-section> {{ $t('amountAlcohol') }} </q-card-section>
        <q-card-section>
          {{ formatAmountAlcohol(form.abv, form.ml) }}
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section> {{ $t('priceBeverage') }} </q-card-section>
        <q-separator />
        <q-card-section class="flex-center">
          {{ formatPriceLiterBeverage(form.price, form.ml) }}
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section> {{ $t('priceAlcohol') }} </q-card-section>
        <q-card-section>
          {{ formatPriceLiterAlcohol(form.abv, form.ml) }}
        </q-card-section>
      </q-card>
    </div>
    
  </q-page>
</template>
