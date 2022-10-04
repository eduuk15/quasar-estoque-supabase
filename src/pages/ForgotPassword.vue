<template>
    <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
          <p class="col-12 text-h5 text-center"> Recuperar senha </p>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">

            <q-input
                label="Email"
                v-model="email"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'O e-mail é obrigatório!']"
                type="email"
            />

            <div class="full-widht q-pt-md q-gutter-y-sm">
                <q-btn
                    label="Enviar e-mail de recuperação"
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
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  setup () {
    const { sendPasswordRestEmail } = useAuthUser()

    const email = ref('')

    const { notifyError, notifySuccess } = useNotify()

    const handleForgotPassword = async () => {
      try {
        await sendPasswordRestEmail(email.value)
        notifySuccess(`Password reset email sent to: ${email.value}`)
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      email,
      handleForgotPassword
    }
  }
})
</script>
