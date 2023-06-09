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
    const {isLoggedIn } = useAuthUser();

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

    const handleRedirectLogin = () => {
      if (isLoggedIn()) {
        router.replace({ name: "form-beverage" });
      } else {
        $q.dialog({
          title: t("redirectLoginTitle"),
          message: t("redirectLoginMessage"),
          ok: {
            label: t("login"),
          },
          cancel: true,
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
        <q-btn @click="handleRedirectLogin" round color="primary" icon="add" />
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
      class="q-mt-md q-mx-auto q-mt-sm q-mb-xl"
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
        <q-card flat class="result_card">
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

    <div
      v-else
      class="q-pa-md q-mx-auto max_container border_desktop container_bg"
    >
      <h1 class="text-h5 text-left title_results">
        {{ $t("results") }}
      </h1>
      <div class="row q-gutter-md flex-center">
        <q-card flat class="border_desktop result_card_desktop text-center">
          <q-card-section> {{ $t("amountAlcohol") }} </q-card-section>
          <q-card-section>
            {{ formatAmountAlcohol(form.abv, form.ml) }}
          </q-card-section>
        </q-card>
        <q-card flat class="border_desktop result_card_desktop text-center">
          <q-card-section> {{ $t("priceBeverage") }} </q-card-section>
          <q-card-section>
            {{ formatPriceLiterBeverage(form.price, form.ml) }}
          </q-card-section>
        </q-card>
        <q-card flat class="border_desktop result_card_desktop text-center">
          <q-card-section> {{ $t("priceAlcohol") }} </q-card-section>
          <q-card-section>
            {{ formatPriceLiterAlcohol(form.abv, form.ml) }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
