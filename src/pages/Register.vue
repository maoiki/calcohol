<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";

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
    };
  },
});
</script>

<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <h1 class="col-12 text-center">{{ $t('register') }}</h1>
      <div class="col-md-4 col-sm-6 col-xs-10">
        <q-input
          :label="$t('Name')"
          v-model="form.name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || $t('nameRequired') ]"
        />
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
            :label="$t('register')"
            color="primary"
            class="full-width"
            type="submit"
            rounded
            outline
          />
          <q-btn
            :label="$t('goBack')"
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
