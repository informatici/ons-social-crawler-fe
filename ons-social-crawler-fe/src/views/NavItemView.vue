<script setup>
import {useRoute} from "vue-router";
const route = useRoute()
// const props = defineProps(["pageTitle"])

</script>
<template>
  <main class="page-container">
    <h1>{{ route?.meta?.label }}</h1>
  </main>
</template>
<style lang="scss">

</style>
