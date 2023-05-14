<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import {
  formatAmountAlcohol,
  formatPriceLiterBeverage,
  formatPriceLiterAlcohol,
} from "src/utils/format";

export default defineComponent({
  name: "DialogBeverageDetails",
  props: {
    show: {
      type: Boolean,
      required: true,
    },

    beverage: {
      type: Object,
    },
  },

  setup(props, { emit }) {
    const router = useRouter();

    const $q = useQuasar();

    const handleClose = () => {
      emit("hide dialog");
    };

    const handleEdit = (beverage) => {
      router.push({ name: "form-beverage", params: { id: beverage.id } });
    };

    const handleRemoveBeverage = async (beverage) => {
      try {
        $q.dialog({
          title: "Confirm",
          message: `Do you really want to delete ${beverage.name} ?`,
          cancel: true,
          persistent: false,
        }).onOk(async () => {
          await remove(table, beverage.id);
          notifySuccess("Successfully deleted");
          handleListBeverages();
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      formatAmountAlcohol,
      formatPriceLiterBeverage,
      formatPriceLiterAlcohol,
      handleClose,
      handleEdit,
      handleRemoveBeverage,
    };
  },
});
</script>
<template>
  <q-dialog :model-value="show" @before-hide="handleClose">
    <q-card style="min-width: 230px">
      <q-card-section>
        <div class="text-h6">Detalhes</div>
      </q-card-section>
      <q-card-section class="flex space-around">
        <strong>{{ beverage.name }}</strong>
        <q-space />
        <q-card-section class="q-gutter-x-sm no-padding">
          <q-btn
            icon="fas fa-pen"
            color="blue-grey-3"
            outline
            round
            size="xs"
            @click="handleEdit(beverage)"
          >
            <q-tooltip> Edit </q-tooltip>
          </q-btn>
          <q-btn
            icon="fas fa-trash"
            color="blue-grey-3"
            outline
            round
            size="xs"
            @click="handleRemoveBeverage(beverage)"
          >
            <q-tooltip> Delete </q-tooltip>
          </q-btn>
        </q-card-section>
      </q-card-section>

      <q-card-section>
        <div class="text-h6">
          {{ formatAmountAlcohol(beverage.abv, beverage.ml) }}
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" outline v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
