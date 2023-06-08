<script setup>
import { useRoute } from 'vue-router'
import ApiService from '../core/services/ApiService'
import { onMounted, ref } from 'vue'
import DigiTable from '@/components/kt-datatable/DigiTable.vue'
import ModalUserEdit from '@/components/modals/ModalUserEdit.vue'
import global from '../core/helpers/functions.js'

const route = useRoute()
const { dateTimeFormatter } = global()
const total = ref(0)
const data = ref([])

// const openItem = (id, modal) => {
//   selectedId.value = id;
//   setTimeout(() => {
//     showModal(modal);
//   }, 100);
// };

const init = async () => {
  try {
    const res = await ApiService.get('youtube/elasticsearch/comments/' + route.params.id)
    data.value = res.data.hits ?? []
    data.value = data.value.map(hit => {
      return {
        ...hit?._source?.comment,
        score: hit?._score,
      }
    }) ?? [];
    total.value = res.data.total.value ?? 0
  } catch (e) {
    console.log(e)
  }
}

const searchedFields = []
const search = ref('')
const headerConfig = ref([
  {
    columnName: '',
    columnLabel: 'actions',
    sortEnabled: false,
    columnMinWidth: 50,
  },
  {
    columnName: 'Data',
    columnLabel: 'publishedAt',
    sortEnabled: false,
    columnMinWidth: 175
  },
  {
    columnName: 'Odio',
    columnLabel: 'prediction',
    sortEnabled: false
  },
  {
    columnName: 'Commento',
    columnLabel: 'textDisplay',
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
  // setInterval(async () => {
  //   await init()
  // }, 10000)
})
</script>
<template>
  <main class="page-container">
    <div style="display: flex; justify-content: space-between; gap: 1rem;">
      <h1>{{ route?.meta?.label }} <br> "{{ route.query.videoTitle }}"</h1>
      <router-link :to="{name: 'youTube'}">
        <button class="btn btn-primary" style="background-color: var(--primary-color) !important;">Indietro</button>
      </router-link>
    </div>
    <div class="col-12 text-end">
      <span class="fs-5 text-gray-800"
      >Commenti processati: <span class="fw-bold text-primary">{{ total }}</span></span
      >
    </div>
    <DigiTable
        :data="data"
        :header="headerConfig"
        :searched-fields="searchedFields"
        :search="search"
    >
      <template v-slot:actions="{ row: row }">
        <div class="d-flex gap-3">
          <a
              :href="'https://www.youtube.com/watch?v=' + row.videoId" target="_blank"
              style="color: #f00;"
          ><i class="fa-brands fa-youtube fs-5"></i
          ></a>
        </div>
      </template>

      <template v-slot:publishedAt="{ row: row }">
        {{ dateTimeFormatter(row.publishedAt) }}
      </template>

      <template v-slot:prediction="{ row: row }">
        <span v-if="row.prediction" class="badge bg-success">Si</span>
        <span v-else class="badge bg-danger">No</span>
      </template>

      <template v-slot:textDisplay="{ row: row }">
        {{ row.textDisplay }}
        <template v-if="row.response">
          <hr />
          <span class="text-success">{{ row.response }}</span>
        </template>
      </template>

      <template v-slot:score="{ row: row }">
        <span v-if="row.prediction" class="">
          {{ row.prediction.score }}</span
        >
        <span v-else></span>
      </template>
    </DigiTable>
  </main>
  <!--  <ModalUserEdit :id="selectedId" @close-modal="init"></ModalUserEdit>-->
</template>
<style lang="scss"></style>
