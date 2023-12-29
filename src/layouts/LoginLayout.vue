<script>
import { defineComponent} from 'vue'
import DarkModeToggle from "components/DarkModeToggle.vue";
import LanguageToggle from "src/components/LanguageToggle.vue";

export default defineComponent({
  name: 'LoginLayout',
  components: {
    DarkModeToggle,
    LanguageToggle,
  },
  setup () {
    return {
    }
  }
});
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Calcohol
        </q-toolbar-title>
        <dark-mode-toggle />
        <language-toggle />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

