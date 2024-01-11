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
      const abv = parseFloat(form.value.abv);

      if (abv > 100) {
        form.value.abv = '100.0';
      }
    };

    const showResults = () => {
      let r = form.value.ml && (form.value.abv || form.value.price);
      return !!r;
    };

    const handleRedirectLogin = () => {
      if (isLoggedIn()) {
        router.replace({ name: "form-beverage" });
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
          router.replace({ name: "login" });
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
  <q-page padding class="flex column">
    <div
      :class="$q.platform.is.mobile ? '' : 'max_container  q-mx-auto'"
      class="q-gutter-md q-pa-sm"
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
        maxlength="15"
        mask="#"
        reverse-fill-mask
        v-model="form.ml"
        :label="$t('amountLabel')"
        inputmode="decimal"
        v-bind="{ ...$visualInput, ...$visualClearable }"
      />

      <q-input
        maxlength="5"
        v-model="form.abv"
        :label="$t('abvLabel')"
        inputmode="decimal"
        mask="###.#"
        reverse-fill-mask
        v-bind="{ ...$visualInput, ...$visualClearable }"
        @update:model-value="validateAbv"
      />
      <q-input
        maxlength="15"
        v-model="form.price"
        :label="$t('priceLabel')"
        prefix="$"
        inputmode="decimal"
        mask="#.##"
        reverse-fill-mask
        v-bind="{ ...$visualInput, ...$visualClearable }"
      />
    </div>

    <q-btn
      @click="handleResetFields"
      no-caps
      class="q-mt-md q-mx-auto q-mt-sm q-mb-xl"
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
        class="q-pa-md container_bg"
        :class="
          $q.platform.is.desktop
            ? 'q-mx-auto max_container border_desktop '
            : 'no-margin fixed-bottom rounded_container'
        "
        key="result"
      >
        <h1
          class="text-h5 text-left"
          :class="$q.platform.is.desktop ? 'title_results' : ''"
        >
          {{ $t("results") }}
        </h1>
        <div class="row q-gutter-md flex-center">
          <q-card
            flat
            :class="
              $q.platform.is.desktop
                ? 'border_desktop result_card_desktop text-center'
                : 'result_card'
            "
          >
            <q-card-section> {{ $t("amountAlcohol") }} </q-card-section>
            <q-card-section>
              {{ formatAmountAlcohol(form.abv, form.ml, $i18n.locale) }}
            </q-card-section>
          </q-card>
          <q-card
            flat
            :class="
              $q.platform.is.desktop
                ? 'border_desktop result_card_desktop text-center'
                : 'result_card'
            "
          >
            <q-card-section> {{ $t("priceBeverage") }} </q-card-section>
            <q-card-section>
              {{ formatPriceLiterBeverage(form.price, form.ml, $i18n.locale) }}
            </q-card-section>
          </q-card>
          <q-card
            flat
            :class="
              $q.platform.is.desktop
                ? 'border_desktop result_card_desktop text-center'
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
