<script>
import useAuthUser from "src/composables/UseAuthUser";
import { defineComponent, ref, onMounted } from "vue";
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "MePage",
  setup() {
    const loading = ref(true);

    const { user } = useAuthUser();

    const { list } = useApi();

    const { notifyError } = useNotify();

    const beverages = ref([]);

    const handleListBeverages = async () => {
      try {
        loading.value = true;
        beverages.value = await list("beverages");
        loading.value = false;
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
            <q-btn icon="edit" color="info" dense size="sm">
              <q-tooltip> Edit </q-tooltip>
            </q-btn>
            <q-btn icon="delete" color="negative" dense size="sm">
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
