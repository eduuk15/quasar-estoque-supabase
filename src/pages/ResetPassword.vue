<template>
<q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
          <p class="col-12 text-h5 text-center"> Nova Senha </p>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

            <q-input
                label="Nova Senha"
                v-model="password"
                lazy-rules
                :rules="[val => (val && val.length >= 6) || 'A senha é obrigatória e deve conter 6 ou mais caracteres!']"
            />

            <div class="full-widht q-pt-md q-gutter-y-sm">
                <q-btn
                    label="Registrar nova senha"
                    color="primary"
                    class="full-width"
                    outline
                    rounded
                    type="submit"
                />
            </div>
          </div>
      </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter, useRoute } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageResetPassword',
  setup () {
    const { resetPassword } = useAuthUser()
    const router = useRouter()
    const route = useRoute()
    const token = route.query.token

    const password = ref('')

    const { notifyError, notifySuccess } = useNotify()

    const handlePasswordReset = async () => {
      try {
        await resetPassword(token, password.value)
        notifySuccess('New password sent successfully!')
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      password,
      handlePasswordReset
    }
  }
})
</script>
