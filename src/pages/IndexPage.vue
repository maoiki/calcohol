<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

import {
  formatAmountAlcohol,
  formatPriceLiterBeverage,
  formatPriceLiterAlcohol,
} from "src/utils/format";

import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const { t } = useI18n();
    const $q = useQuasar();
    const router = useRouter();
    const { isLoggedIn } = useAuthUser();

    const form = ref({
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

    const showResults = () => {
      let r = form.value.ml && (form.value.abv || form.value.price);
      return !!r;
    };

    const handleRedirectLogin = () => {
      if (isLoggedIn()) {
        router.push({ name: "form-beverage", query: form.value });
      } else {
        $q.dialog({
          title: t("redirectLoginTitle"),
          message: t("redirectLoginMessage"),
          ok: {
            label: t("login"),
            color: "primary",
            class: "primary-button",
          },
          cancel: {
            label: t("cancel"),
            flat: true,
            color: "primary",
          },
          persistent: false,
        }).onOk(() => {
          router.push({ name: "login" });
        });
      }
    };

    return {
      form,
      formatAmountAlcohol,
      formatPriceLiterBeverage,
      formatPriceLiterAlcohol,
      handleResetFields,
      handleRedirectLogin,
      showResults,
      validateAbv,
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
        <h1 class="text-h5">{{ $t("indexTitle") }}</h1>
        <q-space></q-space>
        <q-btn
          @click="handleRedirectLogin"
          round
          icon="bookmark"
          class="primary-button"
        />
      </div>
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

    <q-btn
      @click="handleResetFields"
      no-caps
      class="q-mt-md q-mx-auto q-mt-sm q-mb-lg"
      flat
      rounded
      color="grey-7"
      icon="fas fa-rotate-left"
      :label="$t('reset')"
    />

    <transition
      appear
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div
        v-if="showResults()"
        class="q-pa-md container_bg rounded_container"
        :class="
          $q.platform.is.desktop
            ? 'q-mx-auto max_container'
            : 'no-margin'
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
