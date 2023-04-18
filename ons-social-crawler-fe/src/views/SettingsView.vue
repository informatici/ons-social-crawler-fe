<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
// const props = defineProps(["pageTitle"])
import ApiService from '../core/services/ApiService'
import { onMounted, ref, computed } from 'vue'
import DigiTable from "@/components/kt-datatable/DigiTable.vue"

// import { useLoadingStore } from "@/stores/loading";
// import ModalUserEdit from "@/components/modals/ModalUserEdit.vue";
// import ModalUserViewer from "./modals/ModalUserViewer.vue";
import alert from "@/core/helpers/alert";
// import { showModal } from "@/core/helpers/dom";

// const twitter = ref([])
//
// const init = async () => {
//   const res = await ApiService.get('/twitter/elasticsearch/twits')
//   twitter.value = res.data
// }
//
// onMounted(async () => {
//   await init()
// })
//
// const total = computed(() => {
//   return twitter.value?.hits?.total?.value ?? 0
// })
const data = ref([])
const init = async () => {
  const res = await ApiService.get('/auth/')
  data.value = res.data.users ?? []
  console.debug('#c data: ', data.value);
}
//
const searchedFields = [];
const search = ref("");
const headerConfig = ref([
  {
    columnName: "",
    columnLabel: "actions",
    sortEnabled: false,
  },
  {
    columnName: "E-mail",
    columnLabel: "email",
    sortEnabled: true,
  },
  {
    columnName: "Nome",
    columnLabel: "displayName",
    sortEnabled: true,
  },
  {
    columnName: "Ruoli",
    columnLabel: "customClaims",
    sortEnabled: false,
  },
  // {
  //   columnName: "tables.roles",
  //   columnLabel: "roles",
  //   sortEnabled: false,
  // },
]);
const { operationConfirm, warningAlert, dangerAlert } = alert();
const selectedId = ref(0)

const getRoles = (roles) => {
  console.debug('#c roles: ', roles);
  // const strRoles = roles.map((x) => x.RoleName);
  return roles.join(", ");
};

const openItem = (uid, modal) => {
  selectedId.value = uid;
  setTimeout(() => {
    // showModal(modal);
  }, 100);
};

const deleteItem = async (uid) => {
  warningAlert("common.confirmMessage").then(async (res) => {
    if (res.isConfirmed) {
      // loading.show();
      try {
        const data = {
          uid,
        };

        console.debug('#c delete: ', data);
        await ApiService.delete("/auth/", data);
        operationConfirm();
      } catch (e) {
        dangerAlert(e);
      } finally {
        // loading.hide();
        await init();
      }
    }
  });
};


onMounted(async () => {
  await init()
})


</script>
<template>
  <main class="page-container">
    <h1>{{ route?.meta?.label }}</h1>
    <!--    &lt;!&ndash; <div v-for="(twit, ix) in twitter" :key="ix">{{ twit.name }}</div> &ndash;&gt;-->
    <DigiTable
        :data="data"
        :header="headerConfig"
        :searched-fields="searchedFields"
        :search="search"
    >
      <template v-slot:actions="{ row: row }">
        <div class="d-flex gap-5">
          <a href="#" @click="openItem(row.uid, 'kt_modal_user_edit')"
          ><i class="fa-solid fa-pen-to-square text-primary fs-3"></i
          ></a>
<!--          <a href="#" @click="openItem(row.ID, 'kt_modal_user_viewer')"-->
<!--          ><i class="fa-solid fa-circle-info text-primary fs-3"></i-->
<!--          ></a>-->
          <a href="#" @click="deleteItem(row.uid)"
          ><i class="fa-solid fa-trash text-primary fs-3"></i
          ></a>
        </div>
      </template>
      <template v-slot:customClaims="{ row: row }">
        {{ row?.customClaims?.user.join(", ") }}
<!--        {{ getRoles(row?.customClaims?.user) }}-->
      </template>
    </DigiTable>
  </main>
<!--  <ModalUserEdit :id="selectedId" @close-modal="init"></ModalUserEdit>-->
</template>
<style lang="scss"></style>
