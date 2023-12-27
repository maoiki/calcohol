<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "LanguageToggle",
  setup() {
    const $q = useQuasar();
    const currentLocale = ref("");

    const { locale } = useI18n({ useScope: "global" });

    watch(currentLocale, (newLocale) => {
      $q.localStorage.set("appLocale", newLocale);
    });

    onMounted(() => {
      currentLocale.value = $q.localStorage.getItem("appLocale") || "pt-BR";
    });

    const changeLanguage = (newLocale) => {
      currentLocale.value = newLocale;
      locale.value = newLocale;
    };

    return {
      currentLocale,
      changeLanguage
    };
  },
});
</script>

<template>
  <q-btn-dropdown icon="translate" flat>
    <q-list>
      <q-item @click="changeLanguage('en-US')" clickable v-close-popup>
        <q-item-section>
          <q-item-label> English </q-item-label>
        </q-item-section>
      </q-item>

      <q-item @click="changeLanguage('pt-BR')" clickable v-close-popup>
        <q-item-section>
          <q-item-label> Português </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
