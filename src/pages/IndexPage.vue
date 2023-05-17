<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",

  setup() {
    const form = ref({
      name: "",
      ml: "",
      abv: "",
      price: "",
    });

    return {
      form,
    };
  },
});
</script>
<template>
  <q-page class="flex flex-center">
    <div class="q-gutter-x-md row">
      <q-input
        clearable
        clear-icon="close"
        filled
        v-model.number="form.ml"
        label="Amount of ml"
        type="number"
        step="false"
      />
      <q-input
        clearable
        clear-icon="close"
        filled
        v-model.number="form.abv"
        label="ABV"
      />
      <q-input
        clearable
        clear-icon="close"
        filled
        v-model.number="form.price"
        label="Price"
        prefix="R$"
      />
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section> amount of alcohol: </q-card-section>
        <q-card-section>
          {{ ((form.ml * form.abv) / 100).toFixed(2) }}ml
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section> price per liter of beverage: </q-card-section>
        <q-separator />
        <q-card-section class="flex-center">
          R${{ ((1000 / form.ml) * form.price).toFixed(2) }}
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section> price per liter of alcohol: </q-card-section>
        <q-card-section>
          R${{
            ((1000 / ((form.ml * form.abv) / 100)) * form.price).toFixed(2)
          }}
        </q-card-section>
      </q-card>
    </div>
    <q-btn :to="{ name: 'form-beverage' }" color="primary" icon="add" />
  </q-page>
</template>
