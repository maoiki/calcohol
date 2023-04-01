<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegisterPage',
  
  setup(){
    const router = useRouter()

    const {register} = useAuthUser()

    const form = ref({
      name:'',
      email:'',
      password:'',
    })

    const handleRegister = async() => {
      try{
        await register(form.value)
        router.push({
          name:'email-confirmation',
          query: {email: form.value.email}
        })
      } catch(error){
        alert(error.message)
      }
    }

    return{
      form,
      handleRegister,
    }
  }
});
</script>

<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
    <h1 class="col-12 text-center">Registro</h1>
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
      <q-input label="Nome" v-model="form.name"/>
      <q-input label="Email" v-model="form.email"/>
      <q-input label="Senha" v-model="form.password"/>
      <div class="full-width q-pt-md">
        <q-btn
          label="Registrar"
          color="primary"
          class="full-width"
          type="submit"
          rounded 
          outline
          />
      </div>
    </div>
    </q-form>
  </q-page>
</template>


