<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ResetPasswordPage",

  setup() {
    const { resetPassword } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const router = useRouter();

    const password = ref("");

    const isPassword = ref(true);

    const handlePasswordReset = async () => {
      try {
        await resetPassword(password.value);
        notifySuccess();
        router.push({ name: "me" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      password,
      handlePasswordReset,
      isPassword,
    };
  },
});
</script>
<template>
  <q-page class="inputs-content q-px-md">
    <h1 class="col-12 text-center">{{ $t("passwordReset") }}</h1>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          :label="$t('newPassword')"
          v-model="form.password"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || $t('passwordRequired'),
            (val) => (val && val.length >= 6) || $t('passwordMinimum'),
          ]"
          :type="isPassword ? 'password' : 'text'"
          :hint="$t('passwordMinimum')"
        >
          <template v-slot:append>
            <q-icon
              :name="isPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPassword = !isPassword"
            />
          </template>
        </q-input>

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            :label="$t('confirmNewPassword')"
            color="primary"
            class="full-width"
            type="submit"
            rounded
            outline
          />
          <q-btn
            v-if="$q.platform.is.desktop"
            :label="$t('goBack')"
            :to="{ name: 'me' }"
            v-bind="{ ...$visualTextButton }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
