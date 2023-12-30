<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmailConfirmationPage",
});
</script>

<template>
  <q-page class="q-px-md">
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
