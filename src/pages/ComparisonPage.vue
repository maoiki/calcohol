<script>
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

import {
  formatAmountAlcohol,
  formatPriceLiterBeverage,
  formatPriceLiterAlcohol,
} from "src/utils/format";

import useAuthUser from "src/composables/UseAuthUser";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "ComparisonPage",

  setup() {
    const { t } = useI18n();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const { isLoggedIn } = useAuthUser();
    const { getById, list } = useApi();
    const { notifyError } = useNotify();
    const table = "beverages";

    const form = ref({
      name: "",
      ml: "",
      abv: "",
      price: "",
    });

    const form2 = ref({
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

    const validateAbv = () => {
      if (form.value.abv > 1000) {
        form.value.abv = 1000;
      }
    };

    const compareMore = ref(true);
    const selectedOption = ref(null);
    const tableValues = ref([]);

    const handleGetBeverageList = async (table) => {
      try {
        tableValues.value = await list(table);
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleGetBeverage = async (id) => {
      let beverage = {};
      try {
        beverage = await getById(table, id);
        selectedOption.value = beverage;
        form.value = beverage;
      } catch (error) {
        notifyError(error.message);
      }
    };

    const idBeverage = computed(() => route.params.id);
    const formData = computed(() => route.query);
    const isFormDataFilled = Object.keys(formData.value).length !== 0;

    onMounted(() => {
      if (isLoggedIn()) {
        handleGetBeverageList(table);
      }

      if (idBeverage.value && isLoggedIn()) {
        handleGetBeverage(idBeverage.value);
      } else if (isFormDataFilled) {
        form.value = formData.value;
      }
    });

    watch(selectedOption, (newVal) => {
      form.value = { ...newVal };
    });

    const showResults = () => {
      let r = form.value.ml && (form.value.abv || form.value.price);
      return !!r;
    };

    return {
      form,
      formatAmountAlcohol,
      formatPriceLiterBeverage,
      formatPriceLiterAlcohol,
      handleResetFields,
      showResults,
      validateAbv,
      tableValues,
      selectedOption,
      compareMore,
    };
  },
});
</script>
<template>
  <q-page class="flex column q-pa-md">
    <div
      :class="$q.platform.is.mobile ? '' : 'max_container  q-mx-auto'"
      class="q-gutter-y-md"
    >
      <div class="row flex-center">
        <h1 class="text-h5">{{ $t("compareTitle") }}</h1>
        <q-space></q-space>
        <q-btn
          round
          :icon="compareMore ? 'fas fa-plus' : 'fas fa-minus'"
          class="primary-button"
          @click="compareMore = !compareMore"
        />
      </div>

      <q-select
        v-model="selectedOption"
        :options="tableValues"
        :label="$t('name')"
        :option-value="
          (opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)
        "
        :option-label="
          (opt) =>
            Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'
        "
      />
      <q-input
        :mask="$t('mlMask')"
        v-model="form.ml"
        :label="$t('amountLabel')"
        v-bind="{ ...$visualInput, ...$visualClearable, ...$formMlInput }"
      />

      <q-input
        v-model="form.abv"
        :label="$t('abvLabel')"
        :mask="$t('percentMask')"
        v-bind="{ ...$visualInput, ...$visualClearable, ...$formAbvInput }"
        @update:model-value="validateAbv"
      />
      <q-input
        v-model="form.price"
        :label="$t('priceLabel')"
        :prefix="$t('currencySymbol')"
        :mask="$t('priceMask')"
        v-bind="{ ...$visualInput, ...$visualClearable, ...$formPriceInput }"
      />
    </div>

    <transition
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <q-btn
        @click="handleResetFields"
        no-caps
        class="q-mt-md q-mx-auto q-mt-sm q-mb-lg"
        flat
        rounded
        color="grey-7"
        icon="fas fa-rotate-left"
        :label="$t('reset')"
        v-if="form.abv || form.ml || form.price"
      />
    </transition>

    <transition
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div
        v-if="showResults()"
        class="q-pa-md container_bg rounded_container"
        :class="
          $q.platform.is.desktop ? 'q-mx-auto max_container' : 'no-margin'
        "
        key="result"
      >
        <h1
          class="results_title q-mt-none"
          :class="$q.platform.is.desktop ? 'title_results' : ''"
        >
          {{ $t("results") }}
        </h1>
        <div class="row q-gutter-md flex-center">
          <q-card
            flat
            class="rounded_container"
            :class="
              $q.platform.is.desktop
                ? 'result_card_desktop text-center'
                : 'result_card'
            "
          >
            <q-card-section> {{ $t("amountAlcohol") }} </q-card-section>
            <q-card-section>
              {{ formatAmountAlcohol(form.abv, form.ml) }}
            </q-card-section>
          </q-card>
          <q-card
            flat
            class="rounded_container"
            :class="
              $q.platform.is.desktop
                ? 'result_card_desktop text-center'
                : 'result_card'
            "
          >
            <q-card-section> {{ $t("priceBeverage") }} </q-card-section>
            <q-card-section>
              {{ formatPriceLiterBeverage(form.price, form.ml) }}
            </q-card-section>
          </q-card>
          <q-card
            flat
            class="rounded_container"
            :class="
              $q.platform.is.desktop
                ? 'result_card_desktop text-center'
                : 'result_card'
            "
          >
            <q-card-section> {{ $t("priceAlcohol") }} </q-card-section>
            <q-card-section>
              {{ formatPriceLiterAlcohol(form.abv, form.ml, form.price) }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </transition>
  </q-page>
</template>
