<script>
import useAuthUser from "src/composables/UseAuthUser";
import { defineComponent, ref, onMounted } from "vue";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { columnsBeverage, noPagination } from "src/pages/table";
import {
  formatCurrency,
  formatPercent,
  formatUnitMeasure,
} from "src/utils/format";

import DialogBeverageDetails from "components/DialogBeverageDetails.vue";

export default defineComponent({
  name: "MePage",
  components: {
    DialogBeverageDetails,
  },

  setup() {
    const loading = ref(true);

    const filter = ref("");

    const { user } = useAuthUser();

    const router = useRouter();

    const $q = useQuasar();

    const { list, remove } = useApi();

    const { notifyError, notifySuccess } = useNotify();

    const beverages = ref([]);

    const table = "beverages";

    const showDialogDetails = ref(false);

    const beverageDetails = ref([]);

    const handleShowDetails = (beverage) => {
      beverageDetails.value = beverage;
      showDialogDetails.value = true;
    };

    const handleListBeverages = async () => {
      try {
        loading.value = true;
        beverages.value = await list(table);
        loading.value = false;
      } catch (error) {
        notifyError(error.message);
      }
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

    onMounted(() => {
      handleListBeverages();
    });

    return {
      user,
      beverages,
      loading,
      showDialogDetails,
      beverageDetails,
      handleShowDetails,
      handleEdit,
      handleRemoveBeverage,
      filter,
      columnsBeverage,
      formatCurrency,
      formatPercent,
      formatUnitMeasure,
      noPagination
    };
  },
});
</script>

<template>
  <q-page padding>
    <h1 class="text-h3">Hi, {{ user.user_metadata.name }}!</h1>
    <div class="col-12">
      <q-table
        title="Beverages"
        :rows="beverages"
        :columns="columnsBeverage"
        row-key="name"
        :loading="loading"
        :filter="filter"
        v-model:pagination="noPagination"
        :hide-pagination="true"
        grid
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-6 col-sm-3 col-md-2">
            <q-card
              flat
              bordered
              class="cursor-pointer"
              v-ripple:primary
              @click="handleShowDetails(props.row)"
            >
              <q-card-section class="flex space-around">
                <strong>{{ props.row.name }}</strong>
              </q-card-section>
              <q-separator />
              <q-card-section class="flex flex-center q-gutter-x-lg">
                <q-icon
                  name="fas fa-wine-bottle"
                  size="24px"
                  class="flex-start"
                />
                <div>{{ formatUnitMeasure(props.row.ml) }}</div>
              </q-card-section>
              <q-card-section class="flex flex-center q-gutter-x-lg">
                <q-icon name="fas fa-percent" size="24px" class="flex-start" />
                <div>{{ formatPercent(props.row.abv) }}</div>
              </q-card-section>
              <q-card-section class="flex flex-center q-gutter-x-lg">
                <q-icon name="fas fa-coins" size="24px" class="" />
                <div class="col-1">{{ formatCurrency(props.row.price) }}</div>
              </q-card-section>
            </q-card>
          </div>
          <dialog-beverage-details
            :show="showDialogDetails"
            :beverage="beverageDetails"
            @hide-dialog="showDialogDetails = false"
          />
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm"> </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-if="$q.platform.is.mobile"
        fab
        color="primary"
        icon="add"
        :to="{ name: 'form-beverage' }"
      />
    </q-page-sticky>
  </q-page>
</template>
