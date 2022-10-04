<template>
  <q-page padding>
    <p class="text-body1">
      Obrigado por se registrar!
    </p>
    <p class="text-body1">
      Por favor, confirme seu e-mail para terminar seu registro: <strong>{{ $route.query.email }}</strong>
    </p>
  <div class="row justify-center">
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
      <q-btn
      label="Back to Login"
      color="black"
      class="full-width"
      rounded
      :to="{ name: 'login' }"
    />
    </div>
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
