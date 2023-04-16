<script>
import useAuthUser from "src/composables/UseAuthUser";
import { defineComponent, ref, onMounted } from "vue";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MePage",
  setup() {
    const loading = ref(true);

    const { user } = useAuthUser();

    const router = useRouter();

    const $q = useQuasar();

    const { list, remove } = useApi();

    const { notifyError, notifySuccess } = useNotify();

    const beverages = ref([]);

    const table = "beverages"

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

    const columns = [
      {
        name: "name",
        label: "name",
        align: "left",
        field: "name",
        sortable: true,
      },
      {
        name: "abv",
        label: "abv",
        align: "left",
        field: "abv",
        sortable: true,
      },
      {
        name: "ml",
        label: "ml",
        align: "left",
        field: "ml",
        sortable: true,
      },
      {
        name: "price",
        label: "price",
        align: "left",
        field: "price",
        sortable: true,
      },
      {
        name: "actions",
        align: "right",
        label: "actions",
        field: "actions",
        sortable: true,
      },
    ];

    return {
      user,
      beverages,
      columns,
      loading,
      handleEdit,
      handleRemoveBeverage,
    };
  },
});
</script>

<template>
  <q-page padding>
    <h1>Hi, {{ user.user_metadata.name }}!</h1>
    <div class="col-12">
      <q-table
        :rows="beverages"
        :columns="columns"
        row-key="name"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6"> Beverages </span>
          <q-space />
          <q-btn
            v-if="$q.platform.is.desktop"
            label="Add New"
            color="primary"
            icon="add"
            :to="{ name: 'form-beverage' }"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="edit"
              color="info"
              dense
              size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
            <q-btn
              icon="delete"
              color="negative"
              dense
              size="sm"
              @click="handleRemoveBeverage(props.row)"
            >
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
