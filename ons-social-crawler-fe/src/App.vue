<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from "@/components/HeaderComponent.vue"
import SideBar from "@/components/SideBar.vue"
import FooterComponent from "@/components/FooterComponent.vue"
import LoginView from "@/views/LoginView.vue"
// import HelloWorld from '@/components/HelloWorld.vue'

</script>
<template>
  <div class="wrapper">
    <SideBar />
    <div class="drawer">
      <Header />
      <div class="page">
        <RouterView />
      </div>
      <FooterComponent />
    </div>
  </div>
<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->

<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </header>-->

<!--  <RouterView />-->

</template>

<style lang="scss">
:root {
  font-size: 16px;
  font-family: sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.wrapper {
  display: flex;
  position: relative;

  .drawer {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //background-color: rgb(240, 240, 240);

    .page {
      flex: 1;
      padding: 1rem var(--drawer-paddingX);
    }
  }
}





</style>
