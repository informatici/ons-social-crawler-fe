<script setup>
import UserMenu from "@/components/UserMenu.vue"
</script>
<template>
  <div class="header">
    <UserMenu />
  </div>

</template>

<style lang="scss">
.header {
  background-color: green;
  height: var(--header-height);

  display: flex;
  justify-content: flex-end;
}
</style>
