<script setup>
import { useRoute } from 'vue-router'
import ApiService from '../core/services/ApiService'
import { onMounted, ref } from 'vue'
import DigiTable from '@/components/kt-datatable/DigiTable.vue'
import ModalUserEdit from '@/components/modals/ModalUserEdit.vue'
import global from '../core/helpers/functions.js'
import { useLoadingStore } from "@/stores/loading";

const route = useRoute()
const { dateTimeFormatter } = global()
const total = ref(0)
const data = ref([])
const loading = useLoadingStore();

const init = async () => {
  // loading.show()
  try {
    const res = await ApiService.get('twitter/elasticsearch/twits')
    data.value = res.data.hits.hits ?? []
    total.value = res.data.hits.total.value ?? 0
  } catch (e) {
    console.log(e)
  } finally {
    // loading.hide()
  }
}

const searchedFields = []
const search = ref('')
const headerConfig = ref([
  {
    columnName: 'Data',
    columnLabel: 'date',
    sortEnabled: false,
    columnMinWidth: 175
  },
  {
    columnName: 'Odio',
    columnLabel: 'isHate',
    sortEnabled: false
  },
  {
    columnName: 'Tweet',
    columnLabel: 'twit',
    sortEnabled: false
  },
  {
    columnName: 'Grado',
    columnLabel: 'score',
    sortEnabled: false,
    tdClass: 'bg-warning text-center'
  }
])

onMounted(async () => {
  await init()
  setInterval(async () => {
    await init()
  }, 10000)
})
</script>
<template>
  <main class="page-container">
    <h1>{{ route?.meta?.label }}</h1>
    <div class="col-12 text-end">
      <span class="fs-5 text-gray-800"
        >Tweet processati: <span class="fw-bold text-primary">{{ total }}</span></span
      >
    </div>
    <DigiTable
      :data="data"
      :header="headerConfig"
      :searched-fields="searchedFields"
      :search="search"
    >
      <template v-slot:twit="{ row: row }">
        {{ row._source.data.text }}
        <template v-if="row._source.data.response">
          <hr />
          <span class="text-success">{{ row._source.data.response }}</span>
        </template>
      </template>
      <template v-slot:date="{ row: row }">
        {{ dateTimeFormatter(row._source.data.timestamp) }}
      </template>
      <template v-slot:isHate="{ row: row }">
        <span v-if="row._source.data.prediction" class="badge bg-success">Si</span>
        <span v-else class="badge bg-danger">No</span>
      </template>
      <template v-slot:score="{ row: row }">
        <span v-if="row._source.data.prediction" class="">
          {{ row._source.data.prediction.score }}</span
        >
        <span v-else></span>
      </template>
    </DigiTable>
  </main>
  <ModalUserEdit :id="selectedId" @close-modal="init"></ModalUserEdit>
</template>
<style lang="scss"></style>
