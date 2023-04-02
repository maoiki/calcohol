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
    };
  },
});
</script>
<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <h1 class="col-12 text-center">Password reset</h1>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New password"
          v-model="password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Password is required',
          (val) => (val && val.length >= 6) || 'Password must contain at least 6 characters',
        ]"
          hint="Password must contain at least 6 characters"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Confirm new password"
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
            :to="{ name: 'me' }"
            rounded
            flat
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
