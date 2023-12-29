<template>
  <q-item
    clickable
    :to="{ name: routeName }"
    exact
    v-if="requireLogin == isLoggedIn() || alwaysShow"
    :class="classes"
    @click="title == 'logout' ? handleLogout() : ''"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ $t(title) }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import useAuthUser from "src/composables/UseAuthUser";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    routeName: {
      type: String,
      default: "null",
    },

    icon: {
      type: String,
      default: "",
    },

    requireLogin: {
      type: Boolean,
      default: false,
    },

    alwaysShow: {
      type: Boolean,
      default: false,
    },

    classes: {
      type: String,
      default: "",
    },
  },
  setup() {
    const router = useRouter();
    const $q = useQuasar();
    const { t } = useI18n();
    const { logout, isLoggedIn } = useAuthUser();

    const handleLogout = async () => {
      $q.dialog({
        title: t("logout"),
        message: t("logoutMessage"),
        ok: {
          label: t("ok"),
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
        await logout();
        router.replace({ name: "index" });
      });
    };

    return {
      isLoggedIn,
      handleLogout,
    };
  },
});
</script>
