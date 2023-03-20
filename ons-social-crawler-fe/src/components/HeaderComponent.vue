<script setup>
import UserMenu from "@/components/UserMenu.vue"
</script>
<template>
  <div class="header">
    <UserMenu />
  </div>

</template>

<style lang="scss">
$header-height: var(--header-height);
$sidebar-padding: var(--sidebar-padding);
.header {
  background-color: var(--secondary-color);
  height: calc($header-height + $sidebar-padding);

  display: flex;
  justify-content: flex-end;
}
</style>
