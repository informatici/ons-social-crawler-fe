<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
import ApiService from '../core/services/ApiService'
import { onMounted, ref, computed } from 'vue'

const twitch = ref([])

const init = async () => {

}

onMounted(async () => {
  await init()
})

const total = computed(() => {
  // return twitch.value?.hits?.total?.value ?? 0
})
</script>
<template>
  <main class="page-container">
    <h1>{{ route?.meta?.label }}</h1>
    Total {{ total }}
  </main>
</template>
<style lang="scss"></style>
