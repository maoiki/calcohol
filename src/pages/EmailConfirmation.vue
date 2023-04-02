<script>
import { defineComponent, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "EmailConfirmationPage",
  setup() {
    const router = useRouter();
    const { isLoggedIn } = useAuthUser();

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: "me" });
      }
    });
  },
});
</script>

<template>
  <q-page padding>
    <h1>Thanks for registering!</h1>
    <p class="text-body1">
      Please confirm your email address to complete the registration:
      <strong>{{ $route.query.email }}</strong>
    </p>
    <div class="col-md-4 col-sm-6 col-xs-10 flex flex-center">
      <q-btn
        label="Go back to login"
        color="primary"
        :to="{ name: 'login' }"
        rounded
      />
    </div>
  </q-page>
</template>
