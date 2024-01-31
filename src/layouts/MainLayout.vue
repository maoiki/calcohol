<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import DarkModeToggle from "components/DarkModeToggle.vue";
import LanguageToggle from "src/components/LanguageToggle.vue";
import { useI18n } from "vue-i18n";

const menuTop = [
  {
    title: "home",
    icon: "fas fa-home",
    routeName: "index",
    alwaysShow: true,
  },
  {
    title: "addDrink",
    icon: "fas fa-plus",
    routeName: "form-beverage",
    requireLogin: true,
  },
  {
    title: "profile",
    icon: "fas fa-heart",
    routeName: "me",
    requireLogin: true,
  },
];

const menuBottom = [
  {
    title: "login",
    icon: "fas fa-user",
    routeName: "login",
  },
  {
    title: "logout",
    icon: "fas fa-right-from-bracket",
    requireLogin: true,
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    DarkModeToggle,
    LanguageToggle,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      menuTop,
      menuBottom,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<template>
  <q-layout view="hhh lpr fff">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <router-link
            :to="{ name: 'index' }"
            class="decoration-none toolbar-title"
          >
            Calcohol
          </router-link>
        </q-toolbar-title>

        <dark-mode-toggle />
        <language-toggle />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="210"
      overlay
      bordered
      :class="$q.dark.isActive ? '' : 'bg-grey-1'"
    >
      <q-list>
        <EssentialLink
          v-for="link in menuTop"
          :key="link.title"
          v-bind="link"
        />
        <div class="fixed-bottom">
          <EssentialLink
            v-for="link in menuBottom"
            :key="link.title"
            v-bind="link"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
