<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const router = useRouter();

    const { login, isLoggedIn, loginWithSocialProvider } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      email: "",
      password: "",
    });

    const isPassword = ref(true);

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

    const handleLoginGoogle = async () => {
      try {
        await loginWithSocialProvider('google')
        notifySuccess();
      } catch (error) {
        notifyError(error.message);
      }
    }

    return {
      form,
      handleLogin,
      handleLoginGoogle,
      isPassword,
    };
  },
});
</script>

<template>
  <q-page padding>
    <q-btn
            :label="$t('signInGoogle')"
            color="#2B2B2B"
            @click="handleLoginGoogle"
            no-caps
            outline
            icon="fa-brands fa-google"
            align="between"
            class="q-py-sm"

          />
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <h1 class="col-12 text-center">{{ $t("login") }}</h1>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('emailRequired')]"
          type="email"
        />
        <q-input
          :label="$t('password')"
          v-model="form.password"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || $t('passwordRequired'),
            (val) => (val && val.length >= 6) || $t('passwordMinimum'),
          ]"
          :type="isPassword ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPassword = !isPassword"
            />
          </template>
        </q-input>
        <div class="full-width q-pt-md">
          <q-btn
            :label="$t('login')"
            color="primary"
            class="full-width"
            type="submit"
            rounded
            outline
          />
        </div>
        <div class="full-width q-gutter-y-md">
          <q-btn
            :label="$t('register')"
            color="primary"
            class="full-width"
            :to="{ name: 'register' }"
            rounded
            flat
          />
          <q-btn
            :label="$t('forgotPassword')"
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
