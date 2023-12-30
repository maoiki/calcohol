<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "ForgotPasswordPage",

  setup() {
    const { sendPasswordResetEmail } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const email = ref("");

    const handleForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value);
        notifySuccess(`Recovery email sent to: ${email.value}`);
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      email,
      handleForgotPassword,
    };
  },
});
</script>
<template>
  <q-page class="inputs-content q-px-md">
    <h1 class="welcome">{{ $t("forgotPassword") }}</h1>
    <q-form  @submit.prevent="handleForgotPassword">
      <div clas>
        <q-input
          label="Email"
          v-model="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']"
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
            v-if="$q.platform.is.desktop"
            :label="$t('goBack')"
            :to="{ name: 'login' }"
            v-bind="{ ...$visualTextButton }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
