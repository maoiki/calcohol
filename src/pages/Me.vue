<script>
import useAuthUser from 'src/composables/UseAuthUser';
import { defineComponent} from 'vue'

export default defineComponent({
  name: 'MePage',
  setup(){
    const {user} = useAuthUser()
    return{
      user
    }
  }
});
</script>

<template>
  <q-page class="flex flex-center">
      <h1>Olá, {{ user.user_metadata.name }}!</h1>
      <p>{{ user }}</p>
  </q-page>
</template>


