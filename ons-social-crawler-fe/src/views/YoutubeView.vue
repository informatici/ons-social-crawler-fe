<script setup>
import { useRoute, RouterLink, RouterView  } from 'vue-router'
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
    const res = await ApiService.get('youtube/elasticsearch/videos')
    data.value = res.data.hits ?? []
    data.value = data.value.map(hit => hit?._source?.video) ?? [];
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
    columnMinWidth: 100,
  },
  {
    columnName: 'Data',
    columnLabel: 'publishedAt',
    sortEnabled: false,
    columnMinWidth: 175
  },
  {
    columnName: 'Titolo',
    columnLabel: 'title',
    sortEnabled: false
  },
  {
    columnName: 'Canale',
    columnLabel: 'channelTitle',
    sortEnabled: false
  },
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
    <h1>{{ route?.meta?.label }}</h1>
    <div class="col-12 text-end">
      <span class="fs-5 text-gray-800"
      >Video processati: <span class="fw-bold text-primary">{{ total }}</span></span
      >
    </div>
    <DigiTable
        :data="data"
        :header="headerConfig"
        :searched-fields="searchedFields"
        :search="search"
    >
<!--      <template v-slot:twit="{ row: row }">-->
<!--        {{ row._source.data.text }}-->
<!--        <template v-if="row._source.data.response">-->
<!--          <hr />-->
<!--          <span class="text-success">{{ row._source.data.response }}</span>-->
<!--        </template>-->
<!--      </template>-->

      <template v-slot:actions="{ row: row }">
        <div class="d-flex gap-3">
          <a
              :href="'https://www.youtube.com/watch?v=' + row.id" target="_blank"
              style="color: #f00;"
          ><i class="fa-brands fa-youtube fs-5"></i
          ></a>
<!--              @click="openItem(row.ID, 'kt_modal_asset_edit')"-->
          <router-link :to="{name: 'youTubeDetail', params: {id: row.id}, query: {videoTitle: row.title}}"
          >
            <i class="fa-solid fa-info text-primary fs-5"></i>
<!--            <i class="fa-brands fa-youtube"></i>-->
          </router-link>


        </div>
      </template>

      <template v-slot:publishedAt="{ row: row }">
        {{ dateTimeFormatter(row.publishedAt) }}
      </template>

<!--      <template v-slot:isHate="{ row: row }">-->
<!--        <span v-if="row._source.data.prediction" class="badge bg-success">Si</span>-->
<!--        <span v-else class="badge bg-danger">No</span>-->
<!--      </template>-->

<!--      <template v-slot:score="{ row: row }">-->
<!--        <span v-if="row._source.data.prediction" class="">-->
<!--          {{ row._source.data.prediction.score }}</span-->
<!--        >-->
<!--        <span v-else></span>-->
<!--      </template>-->
    </DigiTable>
  </main>
<!--  <ModalUserEdit :id="selectedId" @close-modal="init"></ModalUserEdit>-->
</template>
<style lang="scss"></style>
