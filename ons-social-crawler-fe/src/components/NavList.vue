<script setup>
import {ref} from "vue";
import { RouterLink, RouterView } from 'vue-router'
import {useSidebarStore} from "../stores/sidebar";

const sidebarStore = useSidebarStore()

const navList = ref(["home", "navItem", "nav-item", "nav-item", "nav-item", "nav-item", "nav-item", "nav-item", "nav-item", "nav-item", "nav-item",])
</script>
<template>
  <nav class="nav-list">
    <ul>
      <li v-for="(item, ix) in navList" :key="ix">
        <router-link :to="{name: item}">
          <div class="nav-item">
            <i class="nav-item__icon fa-regular fa-folder"></i>
            <span :class="['nav-item__text', sidebarStore.isSidebarOpen ? 'nav-item__text--d-inline' : '']">{{ item }}</span>
          </div>
        </router-link>
      </li>
    </ul>

  </nav>
</template>

<style lang="scss">
.nav-list {
  background-color: orange;
}

.nav-item__text--d-none {
  display: none !important;
}
.nav-item__text--d-inline {
  display: inline !important;
}

@media screen and (max-width: 768px) {
  .nav-item__text {
    display: none;
  }
}
</style>
