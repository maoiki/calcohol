<script>
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'EmailConfirmationPage',
});
</script>

<template>
  <q-page padding>
    <h1>Obrigado por se registrar!</h1>
    <p class="text-body1">Por favor confirme seu email para finalizar o cadastro: <strong>{{ $route.query.email}}</strong> </p>
  </q-page>
</template>


