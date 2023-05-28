<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import {
  formatAmountAlcohol,
  formatPriceLiterBeverage,
  formatPriceLiterAlcohol,
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

    const handleResetFields = () => {
      form.value.ml = "";
      form.value.abv = "";
      form.value.price = "";
    };

    const $q = useQuasar();

    return {
      form,
      formatAmountAlcohol,
      formatPriceLiterBeverage,
      formatPriceLiterAlcohol,
      handleResetFields,
    };
  },
});
</script>
<template>
  <q-page padding>
    <div class="q-gutter-md q-pa-sm">
      <div class="row flex-center">
        <h1 class="text-h5">{{ $t("indexTitle") }}</h1>
        <q-space></q-space>
        <q-btn
          :to="{ name: 'form-beverage' }"
          round
          color="primary"
          icon="add"
        />
      </div>
      <q-input
        standout="bg-primary text-white"
        rounded
        clearable
        clear-icon="close"
        v-model.number="form.ml"
        :label="$t('amountLabel')"
        inputmode="decimal"
      />

      <q-input
        standout="bg-primary text-white"
        rounded
        clearable
        clear-icon="close"
        v-model.number="form.abv"
        :label="$t('abvLabel')"
        inputmode="decimal"
      />
      <q-input
        standout="bg-primary text-white"
        rounded
        clearable
        clear-icon="close"
        v-model.number="form.price"
        :label="$t('priceLabel')"
        prefix="$"
        step="false"
        inputmode="decimal"
      />
    </div>

    <q-btn
      @click="handleResetFields"
      no-caps
      class="q-mt-md flex centralized"
      flat
      rounded
      color="grey-7"
      icon="fas fa-rotate-left"
      :label="$t('reset')"
    />
    
    
    <div
      v-if="$q.platform.is.mobile"
      class="q-pa-md no-margin fixed-bottom container_bg rounded_container"
    >
      <h1 class="text-h5 text-left">
        {{ $t("results") }}
      </h1>
      <div class="flex-center q-gutter-md row">
        <q-card flat class="result_card bg-dark-page">
          <q-card-section horizontal>
            <q-card-section> {{ $t("amountAlcohol") }} </q-card-section>
            <q-space />
            <q-card-section>
              {{ formatAmountAlcohol(form.abv, form.ml) }}
            </q-card-section>
          </q-card-section>
        </q-card>
        <q-card flat class="result_card">
          <q-card-section horizontal>
            <q-card-section> {{ $t("priceBeverage") }} </q-card-section>
            <q-space />
            <q-card-section class="flex-center">
              {{ formatPriceLiterBeverage(form.price, form.ml) }}
            </q-card-section>
          </q-card-section>
        </q-card>
        <q-card flat class="result_card">
          <q-card-section horizontal>
            <q-card-section> {{ $t("priceAlcohol") }} </q-card-section>
            <q-space />
            <q-card-section>
              {{ formatPriceLiterAlcohol(form.abv, form.ml) }}
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else class="q-pa-md no-margin border_desktop bg-secondary">
      <h1 class="text-h5 text-left">
        {{ $t("results") }}
      </h1>
      <div class="row q-gutter-md flex-center">
        <q-card class="border_desktop">
          <q-card-section> {{ $t("amountAlcohol") }} </q-card-section>
          <q-card-section class="text-center">
            {{ formatAmountAlcohol(form.abv, form.ml) }}
          </q-card-section>
        </q-card>
        <q-card class="border_desktop">
          <q-card-section> {{ $t("priceBeverage") }} </q-card-section>
          <q-card-section class="text-center">
            {{ formatPriceLiterBeverage(form.price, form.ml) }}
          </q-card-section>
        </q-card>
        <q-card class="border_desktop">
          <q-card-section> {{ $t("priceAlcohol") }} </q-card-section>
          <q-card-section class="text-center">
            {{ formatPriceLiterAlcohol(form.abv, form.ml) }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
