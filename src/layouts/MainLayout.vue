<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import DarkModeToggle from "components/DarkModeToggle.vue";
import LanguageToggle from "src/components/LanguageToggle.vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const linksList = [
  {
    title: "Home",
    icon: "fas fa-home",
    routeName: "index",
  },
  {
    title: "Add drink",
    icon: "fas fa-plus",
    routeName: "form-beverage",
  },
  {
    title: "Saved drinks",
    icon: "fas fa-heart",
    routeName: "me",
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

    const router = useRouter();

    const $q = useQuasar();

    const { logout, isLoggedIn } = useAuthUser();

    const miniState = ref(true);

    const handleLogout = async () => {
      $q.dialog({
        title: "Logout",
        message: "Do you really want to leave?",
        cancel: true,
        persistent: false,
      }).onOk(async () => {
        await logout();
        router.replace({ name: "login" });
      });
    };

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
      miniState,
      isLoggedIn,
    };
  },
});
</script>

<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Calcohol </q-toolbar-title>

        <dark-mode-toggle />
        <language-toggle />

        <q-btn-dropdown v-if="isLoggedIn()" flat icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="200"
      :breakpoint="500"
      bordered
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
