<script setup>
import { useRoute } from 'vue-router'
import ApiService from '../core/services/ApiService'
import { onMounted, ref, computed } from 'vue'
import DigiTable from '@/components/kt-datatable/DigiTable.vue'

// import { useLoadingStore } from "@/stores/loading";
import ModalUserEdit from '@/components/modals/ModalUserEdit.vue'
import alert from '@/core/helpers/alert'
import { showModal } from '@/core/helpers/dom'
import { isArray } from '@vue/shared'
import { useI18n } from "vue-i18n";
import { useLoadingStore } from "@/stores/loading";

const loading = useLoadingStore();
const { t } = useI18n();
const route = useRoute()
const data = ref([])
const selectedId = ref('')

const init = async () => {
  // loading.show()
  selectedId.value = ''
  const res = await ApiService.get('/auth/')
  data.value = res.data.users ?? []
  console.debug('#c data: ', data.value)
  // loading.hide()
}

const searchedFields = []
const search = ref('')
const headerConfig = ref([
  {
    columnName: '',
    columnLabel: 'actions',
    sortEnabled: false
  },
  {
    columnName: 'E-mail',
    columnLabel: 'email',
    sortEnabled: true
  },
  {
    columnName: 'Nome',
    columnLabel: 'displayName',
    sortEnabled: true
  },
  {
    columnName: 'Ruoli',
    columnLabel: 'customClaims',
    sortEnabled: false
  }
])
const { operationConfirm, warningAlert, dangerAlert } = alert()

const getRoles = (roles) => {
  return isArray(roles) ? roles.join(', ') : ''
}

const openItem = (uid, modal) => {
  selectedId.value = uid
  setTimeout(() => {
    showModal(modal)
  }, 100)
}

const deleteItem = async (uid) => {
  warningAlert(t('common.confirmMessage')).then(async (res) => {
    if (res.isConfirmed) {
      // loading.show();
      try {
        const data = {
          uid
        }

        console.debug('#c delete: ', data)
        await ApiService.delete('/auth/', data)
        operationConfirm()
      } catch (e) {
        dangerAlert(e)
      } finally {
        // loading.hide();
        await init()
      }
    }
  })
}

onMounted(async () => {
  await init()
})
</script>
<template>
  <main class="page-container">
    <h1>{{ route?.meta?.label }}</h1>
    <div class="row pb-3">
      <div class="col-6"></div>
      <div class="col-6 text-end">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_user_edit"
        >
          Aggiungi Utente
        </button>
      </div>
    </div>
    <DigiTable
      :data="data"
      :header="headerConfig"
      :searched-fields="searchedFields"
      :search="search"
    >
      <template v-slot:actions="{ row: row }">
        <div class="d-flex gap-3">
          <a href="#" @click="openItem(row.uid, 'kt_modal_user_edit')"
            ><i class="fa-solid fa-pen-to-square text-primary fs-5"></i
          ></a>
          <a href="#" @click="deleteItem(row.uid)"
            ><i class="fa-solid fa-trash-can text-primary fs-5"></i
          ></a>
        </div>
      </template>
      <template v-slot:customClaims="{ row: row }">
        {{ getRoles(row?.customClaims?.user) }}
      </template>
    </DigiTable>
  </main>
  <ModalUserEdit :id="selectedId" @close-modal="init"></ModalUserEdit>
</template>
<style lang="scss"></style>
