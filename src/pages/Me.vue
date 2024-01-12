<script>
import useAuthUser from "src/composables/UseAuthUser";
import { defineComponent, ref, onMounted } from "vue";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { noPagination } from "src/pages/table";
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

    const { t } = useI18n();

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
          title: t("confirm"),
          message: t("deleteConfirmation", { beverage: beverage.name }),
          ok: {
            label: t("delete"),
            color: "primary",
            class: "primary-button",
          },
          cancel: {
            label: t("cancel"),
            flat: true,
            color: "primary",
          },
          persistent: false,
        }).onOk(async () => {
          await remove(table, beverage.id);
          notifySuccess(t("deleteSuccess"));
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
      formatCurrency,
      formatPercent,
      formatUnitMeasure,
      noPagination,
    };
  },
});
</script>

<template>
  <q-page class="q-pa-md">
    <h1 class="text-h3">{{ $t("hi", { user: user.user_metadata.name }) }}</h1>
    <q-table
      :title="$t('allBeverages')"
      :rows="beverages"
      row-key="name"
      :loading="loading"
      :filter="filter"
      v-model:pagination="noPagination"
      :hide-pagination="true"
      grid
    >
      <template v-slot:top-right>
        <q-input
          v-bind="{ ...$visualInput, ...$visualClearable }"
          dense
          debounce="300"
          v-model="filter"
          :placeholder="$t('search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <q-card
            flat
            bordered
            class="cursor-pointer"
            v-ripple:primary
            @click="handleShowDetails(props.row)"
          >
            <q-card-section class="row justify-between">
              <strong>{{ props.row.name }}</strong>
              <div class="q-gutter-x-sm">
                <q-btn
                  icon="fas fa-pen"
                  v-bind="{ ...$visualSmallButton }"
                  @click.stop="handleEdit(props.row)"
                >
                  <q-tooltip>{{ $t("edit") }} </q-tooltip>
                </q-btn>
                <q-btn
                  icon="fas fa-trash"
                  v-bind="{ ...$visualSmallButton }"
                  @click.stop="handleRemoveBeverage(props.row)"
                >
                  <q-tooltip> {{ $t("delete") }} </q-tooltip>
                </q-btn>
              </div>
            </q-card-section>
            <q-separator />

            <q-card-section>
              <ul class="no-padding column q-gutter-y-lg mb-0">
                <li class="flex q-gutter-x-lg">
                  <q-icon name="fas fa-wine-bottle" size="24px" />
                  <p class="mb-0">{{ formatUnitMeasure(props.row.ml) }}</p>
                </li>
                <li class="flex q-gutter-x-lg">
                  <q-icon name="fas fa-percent" size="24px" />
                  <p class="mb-0">{{ $n(props.row.abv,)+'%' }}</p>
                </li>
                <li class="flex q-gutter-x-lg">
                  <q-icon name="fas fa-coins" size="24px" />
                  <p class="mb-0">{{ formatCurrency(props.row.price) }}</p>
                </li>
              </ul>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm"> </q-td>
      </template>
    </q-table>
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
  <dialog-beverage-details
    :show="showDialogDetails"
    :beverage="beverageDetails"
    @hide-dialog="showDialogDetails = false"
  />
</template>
