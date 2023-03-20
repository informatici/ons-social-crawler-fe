<script setup>
import {ref} from "vue";
import { RouterLink, RouterView } from 'vue-router'
import {useSidebarStore} from "../stores/sidebar";
import { useRoute } from 'vue-router'

const sidebarStore = useSidebarStore()
const route = useRoute()

console.debug('#c: ', route.name);

const navList = ref([
  {
    label: "Dashboard",
    icon: "fa-solid fa-chart-simple",
    routerName: "dashboard",
  },
  {
    label: "YouTube",
    icon: "fa-brands fa-youtube",
    routerName: "youTube",
  },
  {
    label: "Twitch",
    icon: "fa-brands fa-twitch",
    routerName: "twitch",
  },
  {
    label: "Twitter",
    icon: "fa-brands fa-square-twitter",
    routerName: "twitter",
  },
])
</script>
<template>
  <nav class="nav-list">
    <ul>
      <li v-for="(item, ix) in navList" :key="ix">
        <router-link :to="{name: item.routerName}" class="nav-item-link">
          <div :class="['nav-item', item.routerName === route.name ? 'nav-item--active' : '']">
            <div class="nav-item__icon-container">
              <i v-if="item.routerName !== 'dashboard'" :class="['nav-item__icon', item.icon]"></i>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z"/></svg>
            </div>
            <span :class="['nav-item__text', sidebarStore.isSidebarOpen ? 'nav-item__text--d-inline' : '']">{{ item.label }}</span>
          </div>
        </router-link>
      </li>
    </ul>

  </nav>
</template>

<style lang="scss">
.nav-list {
  margin-top: 2.5rem;
  position: relative;
}

.nav-item-link {
  text-decoration: none;
}

$paddingX: .7rem;
.nav-item {
  padding: .4rem $paddingX;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: .5rem;
  color: white;
  cursor: pointer;
  margin-bottom: .5rem;
  transition: .25s;

  .nav-item__icon-container {
    width: 1.4rem;

    svg {
      width: 80%;
    }
  }

  .nav-item__text {
    font-weight: 600;
  }

  &::after{
    content: "";
    visibility: hidden;
    background-color: var(--secondary-color);
    position: absolute;

    height: .25rem;
    //width: calc((100% - $paddingX * 2));
    width: 2.7rem;
    bottom: 0;
    left: $paddingX;

    //$size: .7rem;
    //height: $size;
    //width: $size;
    //border-radius: 50%;
    //left: 0;
    //top: 50%;
    //transform: translateY(-50%);
  }

  &:hover::after {
    visibility: visible;
    transition-property: width;
    transition-duration: .16s;
    transition-timing-function: ease-in-out;
  }

  &:active {

    &::after {
      width: 0;
      transition-property: width;
      transition-duration: .05s;
      transition-timing-function: ease-out;
    }
  }

}

.nav-item--active::after {
  content: "";
  visibility: visible;
  background-color: var(--secondary-color);
  position: absolute;

  height: .25rem;
  //width: calc((100% - $paddingX * 2));
  width: 2.7rem;
  bottom: 0;
  left: $paddingX;
}

.nav-item__text--d-none {
  display: none !important;
}
.nav-item__text--d-inline {
  display: inline !important;
}

@media screen and (max-width: 768px) {
  .nav-item--active::after,
  .nav-item:hover::after {
    content: "";
    visibility: visible;
    background-color: var(--secondary-color);
    position: absolute;

    height: .25rem;
    //width: calc((100% - $paddingX * 2));
    width: 1rem;
    bottom: 0;
    left: $paddingX;
    transition: width 0s !important;
  }

  .nav-item__text {
    display: none;
  }

}
</style>
