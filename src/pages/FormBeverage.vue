<script>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const { notifyError, notifySuccess } = useNotify();

    const table = "beverages";

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
          notifySuccess("Update Successfully");
        } else {
          await post(table, form.value);
          notifySuccess("Saved Successfully");
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
  <q-page class="flex flex-center">
    <q-form
      class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md"
      @submit.prevent="handleSubmit"
    >
      <q-input
        clearable
        clear-icon="close"
        filled
        v-model="form.name"
        label="Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Name is required']"
      />
      <q-input
        clearable
        clear-icon="close"
        filled
        v-model.number="form.ml"
        label="Amount of ml"
        lazy-rules
        :rules="[
          (val) =>
            (val > 0 && Number.isInteger(val)) ||
            'Amount is required and must be a positive integer',
        ]"
      />
      <q-input
        clearable
        clear-icon="close"
        filled
        v-model.number="form.abv"
        label="ABV"
        lazy-rules
        :rules="[
          (val) => val > 0 || 'ABV is required and must be a positive number',
        ]"
      />
      <q-input
        clearable
        clear-icon="close"
        filled
        v-model.number="form.price"
        label="Price"
        lazy-rules
        :rules="[
          (val) => val > 0 || 'Price is required and must be a positive number',
        ]"
      />

      <q-btn
        :label="isUpdate ? 'Update' : 'Save'"
        rounded
        color="primary"
        class="full-width"
        type="submit"
      />
      <q-btn
        label="Cancel"
        color="primary"
        class="full-width"
        :to="{ name: 'me' }"
        rounded
        flat
      />
    </q-form>
  </q-page>
</template>
