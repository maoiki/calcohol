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
        await loginWithSocialProvider("google");
        notifySuccess();
      } catch (error) {
        notifyError(error.message);
      }
    };

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
  <q-page padding class="login-content">
    <h1 class="welcome">{{ $t("welcomeBack") }}</h1>

    <q-btn
      class="google-button"
      @click="handleLoginGoogle"
      no-caps
      unelevated
      align="between"
    >        
      <q-icon name="fa-brands fa-google" />

      {{ $t("signInGoogle") }}

      <q-icon name="fa-brands fa-google" class="invisible" />
    </q-btn>

    <p class="separator">{{ $t("or") }}</p>
    <q-form @submit.prevent="handleLogin">
      <div class="q-gutter-y-lg">
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('emailRequired')]"
          type="email"
          v-bind="{ ...$visualInput }"
        />
        <q-input
          :label="$t('password')"
          v-model="form.password"
          v-bind="{ ...$visualInput }"
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
        <div class="q-pt-md">
          <q-btn
            :label="$t('login')"
            class="full-width"
            type="submit"
            v-bind="{ ...$visualRoundButton }"
          />
        </div>
        <div>
          <q-btn
            :label="$t('forgotPassword')"
            class="full-width"
            :to="{ name: 'forgot-password' }"
            v-bind="{ ...$visualTextButton }"
          />
          <q-btn
            :label="$t('signUpButton')"
            class="full-width"
            :to="{ name: 'register' }"
            v-bind="{ ...$visualTextButton }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
