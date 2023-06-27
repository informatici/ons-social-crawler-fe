<script setup>
import { useRoute } from 'vue-router'
import ApiService from '../core/services/ApiService'
import { onMounted, ref } from 'vue'
import DigiTable from '@/components/kt-datatable/DigiTable.vue'
import ModalUserEdit from '@/components/modals/ModalUserEdit.vue'
import global from '../core/helpers/functions.js'
import { useLoadingStore } from "@/stores/loading";
import FiltersToolbar from "@/views/components/FiltersToolbar.vue";


const loading = useLoadingStore();
const route = useRoute()
const { dateTimeFormatter } = global()
const total = ref(0)
const data = ref([])

const init = async () => {
  // loading.show()
  try {
    const res = await ApiService.get('twitter/elasticsearch/twits')
    data.value = res.data.hits.hits ?? []
    data.value = data.value.map(item => {
      item.publishedAt = item._source.data.timestamp // per sort data
      // per filtro odio::START
      item.prediction = null
      if(item._source.data.prediction) {
        item.prediction = item._source.data.prediction
      }
      // per filtro odio::END
      // per sort score::START
      item.predictionScore = 0
      if(item._source.data.prediction) {
        item.predictionScore = item._source.data.prediction.score
      }
      // per sort score::END
      item.text = item._source.data.text // per search

      return item
    })

    total.value = res.data.hits.total.value ?? 0
  } catch (e) {
    console.error("Error: ", e)
  } finally {
    // loading.hide()
  }
}

const searchedFields = ['text']
const search = ref('')
const predictionId = ref(0)

const headerConfig = ref([
  {
    columnName: 'Data',
    columnLabel: 'publishedAt',
    sortEnabled: true,
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
    sortEnabled: true,
    tdClass: 'bg-warning text-center'
  }
])

const onSearch = (newValue) => {
  search.value = newValue
}

const onPrediction = (newValue) => {
  predictionId.value = newValue
}

onMounted(async () => {
  await init()
  setInterval(async () => {
    await init()
  }, 10000)
})
</script>
<template>
  <main class="page-container">
    <div class="page-title">
      <h1><span><i class="title-icon fa-brands fa-twitter"></i></span> {{ route?.meta?.label }}</h1>
    </div>

    <div class="page-content">
      <!--   FILTRI::START   -->
      <FiltersToolbar
          @on-search="onSearch"
          @on-prediction="onPrediction"
      />
      <!--   FILTRI::END   -->

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
          :prediction-filter="predictionId"
          sort-label="publishedAt"
      >
        <template v-slot:twit="{ row: row }">
          {{ row._source.data.text }}
          <template v-if="row._source.data.response">
            <hr />
            <span class="text-success">{{ row._source.data.response }}</span>
          </template>
        </template>
        <template v-slot:publishedAt="{ row: row }">
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
    </div>



  </main>
  <ModalUserEdit :id="selectedId" @close-modal="init"></ModalUserEdit>
</template>
<style lang="scss"></style>
