<script setup>
import {ref, onMounted} from "vue";
import Nav from "@/components/NavList.vue"
import {useSidebarStore} from "../stores/sidebar";

const sidebarStore = useSidebarStore()


</script>
<template>
  <div :class="['sidebar', sidebarStore.isSidebarOpen ? 'sidebar--open' : '']" @click="sidebarStore.toggleSidebarStatus">
    <section class="logo">logo</section>
    <section class="nav">
      <Nav />
    </section>
  </div>
</template>

<style lang="scss">
$sidebar-opened-width: 10rem;
.sidebar {
  transition: .25s;
  min-width: 5rem;
  flex: 0 1 $sidebar-opened-width;
  background-color: orange;
  min-height: 100vh;

  .logo {
    height: var(--header-height);
    background-color: rgba(0, 0, 0, .7);
  }
}

@media screen and (max-width: 768px) {
  .sidebar {
    transition: .25s;
    min-width: 3rem;
    flex: 0 0 3rem;
    background-color: orange;
    min-height: 100vh;

    .logo {
      height: var(--header-height);
      background-color: rgba(0, 0, 0, .7);
    }
  }
}

.sidebar--open {
  flex: 0 0 $sidebar-opened-width !important;
}

</style>
