<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const { notifyError, notifySuccess } = useNotify();

    const table = "beverages";

    const { t } = useI18n();

    const router = useRouter();

    const route = useRoute();

    const { post, getById, update } = useApi();

    const form = ref({
      name: "",
      ml: "",
      abv: "",
      price: "",
    });

    let beverage = {};

    const handleGetBeverage = async (id) => {
      try {
        beverage = await getById(table, id);
        form.value = beverage;
      } catch (error) {
        notifyError(error.message);
      }
    };

    const handleSubmit = async () => {
      try {
        if (isUpdate.value) {
          await update(table, form.value);
          notifySuccess(t("updateSuccess"));
        } else {
          await post(table, form.value);
          notifySuccess(t("saveSuccess"));
        }
        router.push({ name: "me" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    const isUpdate = computed(() => route.params.id);

    onMounted(() => {
      if (isUpdate.value) {
        handleGetBeverage(isUpdate.value);
      }
    });

    return {
      form,
      handleSubmit,
      isUpdate,
    };
  },
});
</script>
<template>
  <q-page class="inputs-content q-pa-md">
    <div class="flex flex-center">
      <h1 class="text-h5">{{ $t("saveDrinkTitle") }}</h1>
    </div>

    <q-form class="q-gutter-y-md q-px-sm" @submit.prevent="handleSubmit">
      <q-input
        class="mb-32"
        v-model="form.name"
        :label="$t('name')"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('nameRequired')]"
        v-bind="{ ...$visualInput, ...$visualClearable }"
      />
      <q-input
        class="mb-32"
        v-model.number="form.ml"
        :label="$t('amountLabel')"
        lazy-rules
        :rules="[
          (val) => (val > 0 && Number.isInteger(val)) || $t('amountRequired'),
        ]"
        v-bind="{ ...$visualInput, ...$visualClearable }"
      />
      <q-input
        class="mb-32"
        v-model.number="form.abv"
        :label="$t('abvLabel')"
        lazy-rules
        :rules="[(val) => val > 0 || $t('abvRequired')]"
        v-bind="{ ...$visualInput, ...$visualClearable }"
      />
      <q-input
        class="mb-32"
        v-model.number="form.price"
        :label="$t('priceLabel')"
        prefix="R$"
        lazy-rules
        :rules="[(val) => val > 0 || $t('priceRequired')]"
        v-bind="{ ...$visualInput, ...$visualClearable }"
      />

      <q-btn
        :label="isUpdate ? $t('update') : $t('save')"
        type="submit"
        v-bind="{ ...$visualRoundButton }"
      />
      <q-btn
        :label="$t('cancel')"
        :to="{ name: 'me' }"
        v-bind="{ ...$visualTextButton }"
      />
    </q-form>
  </q-page>
</template>
