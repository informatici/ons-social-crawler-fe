<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
// const props = defineProps(["pageTitle"])
import ApiService from "../core/services/ApiService";
import {onMounted, ref} from "vue";

const twitter = ref([])

const init = async () => {
  const res = await ApiService.get('/twitter/simple')
  twitter.value = res.data
}

onMounted(async () => {
  await init()
})

</script>
<template>
  <main class="page-container">
    <h1>{{ route?.meta?.label }}</h1>
    <div v-for="(twit, ix) in twitter" :key="ix">{{ twit.name }}</div>
  </main>
</template>
<style lang="scss"></style>
