<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
          <p class="col-12 text-h5 text-center"> Register </p>
          <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
            <q-input
                label="Name"
                v-model="form.name"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'Name is required']"
            />

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

            <div class="full-widht q-pt-md q-gutter-y-sm">
                <q-btn
                    label="Register"
                    color="primary"
                    class="full-width"
                    outline
                    rounded
                    type="submit"
                />

                <q-btn
                    label="Back"
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
        notifyError(error)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
