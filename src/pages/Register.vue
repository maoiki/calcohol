<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
} from "src/utils/validation";

export default defineComponent({
  name: "RegisterPage",

  setup() {
    const router = useRouter();

    const { register } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const isPassword = ref(true);

    const form = ref({
      email: "",
      password: "",
      name: "",
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        notifySuccess();
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      form,
      handleRegister,
      isPassword,
      emailValidation,
      passwordValidation,
      usernameValidation,
    };
  },
});
</script>

<template>
  <q-page class="inputs-content q-px-md">
    <h1 class="welcome">{{ $t("welcome") }}</h1>
    <q-btn
      class="google-button"
      @click="handleLoginGoogle"
      no-caps
      unelevated
      align="between"
    >
      <q-icon name="fa-brands fa-google" />

      {{ $t("signUpGoogle") }}

      <q-icon name="fa-brands fa-google" class="invisible" />
    </q-btn>

    <p class="separator">{{ $t("or") }}</p>
    <q-form class="" @submit.prevent="handleRegister">
      <div class="q-gutter-y-lg">
        <q-input
          :label="$t('name')"
          v-model="form.name"
          lazy-rules
          :rules="[usernameValidation($t('nameRequired'))]"
          v-bind="{ ...$visualInput }"
        />
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[emailValidation($t('emailRequired'))]"
          type="email"
          v-bind="{ ...$visualInput }"
        />

        <q-input
          :label="$t('password')"
          v-model="form.password"
          lazy-rules
          :rules="[passwordValidation($t('passwordMinimum'))]"
          :type="isPassword ? 'password' : 'text'"
          :hint="$t('passwordMinimum')"
          v-bind="{ ...$visualInput }"
        >
          <template v-slot:append>
            <q-icon
              :name="isPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPassword = !isPassword"
            />
          </template>
        </q-input>

        <div class="q-pt-md q-gutter-y-sm">
          <q-btn
            :label="$t('register')"
            type="submit"
            v-bind="{ ...$visualRoundButton }"
          />
          <q-btn
            :label="$t('accountAlready')"
            :to="{ name: 'login' }"
            v-bind="{ ...$visualTextButton }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
