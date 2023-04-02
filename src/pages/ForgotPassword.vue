<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "ForgotPasswordPage",

  setup() {
    const { sendPasswordResetEmail } = useAuthUser();

    const email = ref("");

    const handleForgotPassword = async () => {
      await sendPasswordResetEmail(email.value);
      alert(`Recovery email sent to: ${email.value}`);
    };

    return {
      email,
      handleForgotPassword,
    };
  },
});
</script>
<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <h1 class="col-12 text-center">Password recovery</h1>
      <div class="col-md-4 col-sm-6 col-xs-10 ">
        <q-input
          label="Email"
          v-model="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']"
          type="email"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send recovery email"
            color="primary"
            class="full-width"
            type="submit"
            rounded
            outline
          />
          <q-btn
            label="Go back"
            color="primary"
            class="full-width"
            :to="{ name: 'login' }"
            rounded
            flat
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
