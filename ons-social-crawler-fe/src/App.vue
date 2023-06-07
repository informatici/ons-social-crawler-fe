<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
<template>
  <router-view />
</template>

<style lang="scss">
@import 'bootstrap/dist/css/bootstrap.min.css';

.swal2-container {
  .btn-primary {
    color: white;
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
  }

  .swal2-actions {
    gap: 1rem;
  }
}

#app {
  font-size: 16px;
  font-family: sans-serif;

  .btn-primary {
    color: white;
    background-color: var(--primary-color) !important;
    border-color: var(--primary-color) !important;
  }

  .text-primary {
    color: var(--primary-color) !important;
  }

}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
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
}
</style>
