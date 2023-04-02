<script>
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'EmailConfirmationPage',
});
</script>

<template>
  <q-page padding>
    <h1>Thanks for registering!</h1>
    <p class="text-body1">Please confirm your email address to complete the registration: <strong>{{ $route.query.email}}</strong> </p>
  </q-page>
</template>


