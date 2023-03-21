<script setup>
import {ref, onMounted} from "vue";
import NavList from "@/components/NavList.vue"
import {useSidebarStore} from "../stores/sidebar";

const sidebarStore = useSidebarStore()


</script>
<template>
  <div :class="['sidebar', sidebarStore.isSidebarOpen ? 'sidebar--open' : '']" @click="sidebarStore.toggleSidebarStatus">
    <div class="arrow"></div>
    <section class="logo section-top">
      <div class="logo-image-container">
        <router-link :to="{name: 'dashboard'}">
          <img class="logo-image" src="/odiare-logo.jpeg" alt="logo">
        </router-link>
      </div>
    </section>
    <section class="nav">
      <NavList />
    </section>
<!--    <section class="logo logo-bottom">-->
<!--      <div class="logo-image-container">-->
<!--        <img class="logo-image" src="/public/odiare-logo.jpeg" alt="logo">-->
<!--      </div>-->
<!--    </section>-->
  </div>
</template>

<style lang="scss">
$sidebar-opened-width: 10rem;
$sidebar-padding: var(--sidebar-padding);
.sidebar {
  transition: .25s;
  min-width: 5rem;
  flex: 0 1 $sidebar-opened-width;
  background-color: var(--primary-color);
  min-height: 100vh;
  padding: $sidebar-padding;

  .logo {
  }

  .section-top {
    height: var(--header-height);
    padding-bottom: $sidebar-padding;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .logo-image-container {
      height: 80%;
      transition: transform .1s;

      &:active {
        transform: scale(.9);
        transition: transform .05s;
      }

      &:hover {
        opacity: .95;
      }

      .logo-image {
        height: 100%;
        width: auto;
        border-radius: 4px;
      }
    }
  }

  .section-top::after {
    $width: 70%;
    content: "";
    display: block;
    width: $width;
    height: 1px;
    background-color: lightgrey;
    position: absolute;
    bottom: 0;
    left: calc((100% - $width) / 2);
    //transform: translateY(-50%);
  }

  //.logo-bottom {
  //  display: none;
  //  .logo-image-container {
  //    width: 50%;
  //    margin: 0 auto;
  //    height: auto;
  //
  //    .logo-image {
  //      width: 100%;
  //    }
  //
  //  }
  //
  //}
}

@media screen and (max-width: 768px) {
  .sidebar {
    transition: .25s;
    min-width: 3rem;
    flex: 0 0 3rem;
    min-height: 100vh;

    .logo {
      .logo-image {
        visibility: hidden;
      }
    }
  }
}

.sidebar--open {
  flex: 0 0 $sidebar-opened-width !important;
}

</style>
