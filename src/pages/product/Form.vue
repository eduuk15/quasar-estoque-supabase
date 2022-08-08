<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">
                    Form Product
                </p>
            </div>
            <q-form class="col-md7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
                <q-input
                    label="Name"
                    v-model="form.name"
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || 'Name is required']"
                />

                <q-editor
                  v-model="form.description"
                  min-height="5rem"
                />

                <q-input
                    label="Amount"
                    v-model="form.amount"
                    lazy-rules
                    :rules="[val => !!val || 'Amount is required']"
                    type="number"
                />

                <q-input
                    label="Price"
                    v-model="form.price"
                    lazy-rules
                    :rules="[val => !!val || 'Price is required']"
                    prefix="R$"
                />

                <q-select
                  v-model="form.category_id"
                  :options="optionsCategory"
                  label="Category"
                  option-value="id"
                  option-label="name"
                  map-options
                  emit-value
                  :rules="[val => !!val || 'Category is required']"
                />

                <q-btn
                    :label="isUpdated ? 'Update' : 'Save'"
                    color="primary"
                    class="full-width"
                    rounded
                    type="submit"
                />

                <q-btn
                    label="Cancel"
                    color="primary"
                    class="full-width"
                    rounded
                    flat
                    :to="{ name: 'product' }"
                />
            </q-form>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageFormCategory',
  setup () {
    const table = 'product'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdated = computed(() => route.params.id)

    let product = {}
    const optionsCategory = ref([])

    const form = ref({
      name: '',
      description: '',
      amount: 0,
      price: 0,
      category_id: ''
    })

    onMounted(() => {
      handleListCategories()
      if (isUpdated.value) {
        handleGetProduct(isUpdated.value)
      }
    })

    const handleListCategories = async () => {
      optionsCategory.value = await list('category')
    }

    const handleSubmit = async () => {
      try {
        if (isUpdated.value) {
          await update(table, form.value)
          notifySuccess('Edited successfully!')
        } else {
          await post(table, form.value)
          notifySuccess('Saved successfully!')
        }
        router.push({ name: 'product' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetProduct = async (id) => {
      try {
        product = await getById(table, id)
        form.value = product
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      handleSubmit,
      form,
      isUpdated,
      optionsCategory
    }
  }
})
</script>