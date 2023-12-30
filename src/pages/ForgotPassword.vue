<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import useValidation from "src/composables/useValidation";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "ForgotPasswordPage",

  setup() {
    const { sendPasswordResetEmail } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const { t } = useI18n();

    const { emailValidation } = useValidation();

    const email = ref("");

    const handleForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value);
        notifySuccess(t("sentRecoveryEmail", { email: email.value }));
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      email,
      handleForgotPassword,
      emailValidation,
    };
  },
});
</script>
<template>
  <q-page class="inputs-content q-px-md">
    <h1 class="welcome">{{ $t("forgotPassword") }}</h1>
    <q-form @submit.prevent="handleForgotPassword">
      <div clas>
        <q-input
          :label="$t('fillEmail')"
          v-model="email"
          lazy-rules
          :rules="[emailValidation()]"
          type="email"
          class="mb-40"
          v-bind="{ ...$visualInput }"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            :label="$t('continue')"
            type="submit"
            v-bind="{ ...$visualRoundButton }"
          />
          <q-btn
            :label="$t('goBack')"
            :to="{ name: 'login' }"
            v-bind="{ ...$visualTextButton }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
