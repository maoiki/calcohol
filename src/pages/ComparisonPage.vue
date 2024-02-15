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

    const forms = ref([
      { selectedOption: null, data: { ml: "", abv: "", price: "" } },
      { selectedOption: null, data: { ml: "", abv: "", price: "" } },
    ]);

    const handleResetFields = (form) => {
      form.data.ml = "";
      form.data.abv = "";
      form.data.price = "";
      form.data.name = "";
      form.selectedOption = null;
    };

    const validateAbv = (form) => {
      if (form.data.abv > 1000) {
        form.data.abv = 1000;
      }
    };

    const compareMore = ref(true);
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
        forms.value[0].selectedOption = beverage;
        forms.value[0].data = beverage;
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

    forms.value.forEach((form) => {
      watch(
        () => form.selectedOption,
        (newVal) => {
          form.selectedOption = newVal;
          form.data = { ...newVal };
        }
      );
    });

    const showResults = () => {
      return forms.value.some((form) => {
        return form.data.ml && (form.data.abv || form.data.price);
      });
    };

    const canResetField = (form) => {
      return form.abv || form.ml || form.price;
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
      compareMore,
      forms,
      canResetField,
    };
  },
});
</script>
<template>
  <q-page class="flex column q-pa-md">
    <div
      :class="$q.platform.is.mobile ? '' : 'q-mx-auto'"
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
      <div class="row q-gutter-x-md">
        <div
          v-for="(form, index) in forms"
          :key="index"
          class="q-gutter-y-md q-mb-lg"
        >
          <q-select
            v-model="form.selectedOption"
            v-bind="{ ...$visualInput, ...$visualClearable }"
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
            v-model="form.data.ml"
            :label="$t('amountLabel')"
            v-bind="{ ...$visualInput, ...$visualClearable, ...$formMlInput }"
          />
          <q-input
            v-model="form.data.abv"
            :label="$t('abvLabel')"
            :mask="$t('percentMask')"
            v-bind="{ ...$visualInput, ...$visualClearable, ...$formAbvInput }"
            @update:model-value="validateAbv(form)"
          />
          <q-input
            v-model="form.data.price"
            :label="$t('priceLabel')"
            :prefix="$t('currencySymbol')"
            :mask="$t('priceMask')"
            v-bind="{
              ...$visualInput,
              ...$visualClearable,
              ...$formPriceInput,
            }"
          />
          <transition
            appear
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
          >
            <q-btn
              @click="handleResetFields(form)"
              no-caps
              class="q-mt-md"
              flat
              rounded
              color="grey-7"
              icon="fas fa-rotate-left"
              :label="$t('reset')"
              v-if="canResetField(form.data)"
            />
          </transition>
        </div>
      </div>
    </div>

    <transition
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div
        v-if="showResults()"
        class="q-pa-md row container_bg rounded_container gap-16px"
        :class="$q.platform.is.desktop ? 'q-mx-auto' : 'no-margin'"
        key="result"
      >
        <div
          class="column flex-center"
          v-for="(form, index) in forms"
          :key="index"
        >
          <h1 class="results_title">
            {{ form.data.name || $t("genericBeverage", { number: index + 1 }) }}
          </h1>
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
              {{ formatAmountAlcohol(form.data.abv, form.data.ml) }}
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
              {{ formatPriceLiterBeverage(form.data.price, form.data.ml) }}
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
              {{
                formatPriceLiterAlcohol(
                  form.data.abv,
                  form.data.ml,
                  form.data.price
                )
              }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </transition>
  </q-page>
</template>
