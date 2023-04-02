<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const router = useRouter();

    const { login, isLoggedIn } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      email: "",
      password: "",
    });

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: "me" });
      }
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        notifySuccess();
        router.push({ name: "me" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>

<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <h1 class="col-12 text-center">Login</h1>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email is required']"
          type="email"
        />
        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Password is required',
            (val) =>
              (val && val.length >= 6) ||
              'Password must contain at least 6 characters',
          ]"
        />
        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            type="submit"
            rounded
            outline
          />
        </div>
        <div class="full-width q-gutter-y-md">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            :to="{ name: 'register' }"
            rounded
            flat
          />
          <q-btn
            label="Forgot your password?"
            color="primary"
            class="full-width"
            size="sm"
            :to="{ name: 'forgot-password' }"
            rounded
            flat
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
