<template>
  <q-page padding>
      <q-form class="row justify-center" @submit.prevent="handleLogin">
          <p class="col-12 text-h5 text-center"> Login </p>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
                label="Email"
                v-model="form.email"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Email is required']"
                type="email"
            />

            <q-input
                label="Password"
                v-model="form.password"
                lazy-rules
                :rules="[val => (val && val.length >= 6) || 'Password is required and it has to contain 6 or more characters']"
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
                    label="Register"
                    color="primary"
                    class="full-width"
                    flat
                    to="/register"
                    size="sm"
                />
            </div>

            <div class="full-widht q-gutter-y-sm">
                <q-btn
                    label="Forgot Password?"
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
        notifySuccess('Successfull login!')
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
