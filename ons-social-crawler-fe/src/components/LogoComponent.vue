<script setup></script>
<template>
  <div class="logo-image-container">
    <router-link :to="{name: 'dashboard'}">
      <img class="logo-image" src="/odiare-logo.jpeg" alt="logo">
    </router-link>
  </div>
</template>
<style lang="scss">
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

@media screen and (max-width: 992px) {

}
</style>
