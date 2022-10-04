<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
          <p class="col-12 text-h5 text-center"> Registre-se </p>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
                label="Nome"
                v-model="form.name"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'O nome é obrigatório!']"
            />

            <q-input
                label="E-mail"
                v-model="form.email"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'O e-mail é obrigatório!']"
                type="email"
            />

            <q-input
                label="Senha"
                v-model="form.password"
                lazy-rules
                :rules="[val => (val && val.length >= 6) || 'A senha é obrigatória e deve conter 6 ou mais caracteres!']"
                type="password"
            />

            <div class="full-widht q-pt-md q-gutter-y-sm">
                <q-btn
                    label="Registrar"
                    color="primary"
                    class="full-width"
                    outline
                    rounded
                    type="submit"
                />

                <q-btn
                    label="Voltar ao login"
                    color="black"
                    class="full-width"
                    rounded
                    flat
                    :to="{ name: 'login' }"
                />
            </div>
          </div>
      </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageRegister',

  setup () {
    const router = useRouter()

    const { register } = useAuthUser()

    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        notifySuccess('Successfull register!')
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
