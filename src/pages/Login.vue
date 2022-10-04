<template>
  <q-page padding>
      <q-form class="row justify-center" @submit.prevent="handleLogin">
          <p class="col-12 text-h5 text-center"> Login </p>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
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

            <div class="full-widht q-pt-md">
                <q-btn
                    label="Login"
                    color="primary"
                    class="full-width"
                    outline
                    rounded
                    type="submit"
                />
            </div>

            <div class="full-widht q-gutter-y-sm">
                <q-btn
                    label="Registre-se"
                    color="primary"
                    class="full-width"
                    flat
                    to="/register"
                    size="sm"
                />
            </div>

            <div class="full-widht q-gutter-y-sm">
                <q-btn
                    label="Esqueceu a senha?"
                    color="primary"
                    class="full-width"
                    flat
                    :to="{ name: 'forgot-password'}"
                    size="sm"
                />
            </div>
          </div>
      </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageLogin',
  setup () {
    const router = useRouter()

    const { login, isLoggedIn } = useAuthUser()

    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        notifySuccess('Login efetuado com sucesso!')
        router.push({ name: 'me' })
      } catch (error) {
        notifyError(error.message)
        // alert(error.message)
      }
    }
    return {
      form,
      handleLogin
    }
  }
})
</script>
