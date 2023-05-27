<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({

  setup() {
    const darkMode = ref(false);

    const $q = useQuasar();

    watch(darkMode, (darkMode) => {
      $q.dark.set(darkMode);
      $q.localStorage.set("darkMode", darkMode);
      // const value = $q.localStorage.getItem(key)
    });

    onMounted(() => {
      const darkModeIsActive = $q.localStorage.getItem("darkMode");

      if (darkModeIsActive) {
        darkMode.value = true;
      }
    });

    return {
      darkMode,
    };
  },
});
</script>

<template>
  <q-toggle
    v-model="darkMode"
    checked-icon="fas fa-moon"
    color="blue-grey"
    unchecked-icon="fas fa-sun"
    size="lg"
  />
</template>
