<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
import useValidation from "src/composables/useValidation";

export default defineComponent({
  name: "ResetPasswordPage",

  setup() {
    const { resetPassword } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const { passwordValidation } = useValidation();

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
      passwordValidation,
    };
  },
});
</script>
<template>
  <q-page class="inputs-content q-pa-md">
    <h1 class="welcome">{{ $t("passwordReset") }}</h1>
    <q-form  @submit.prevent="handlePasswordReset">
        <q-input
          :label="$t('newPassword')"
          v-model="password"
          lazy-rules
          :rules="[passwordValidation()]"
          :type="isPassword ? 'password' : 'text'"
          :hint="$t('passwordMinimum')"
          v-bind="{ ...$visualInput }"
          class="mb-40"
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
            type="submit"
            v-bind="{ ...$visualRoundButton }"
          />
          <q-btn
            :label="$t('goBack')"
            :to="{ name: 'me' }"
            v-bind="{ ...$visualTextButton }"
          />
      </div>
    </q-form>
  </q-page>
</template>
