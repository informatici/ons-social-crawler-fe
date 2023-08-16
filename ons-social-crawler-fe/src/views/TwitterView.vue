<script setup>
import { useRoute } from 'vue-router'
import ApiService from '../core/services/ApiService'
import { onMounted, ref, onUnmounted } from 'vue'
import DigiTable from '@/components/kt-datatable/DigiTable.vue'
import global from '../core/helpers/functions.js'
import { useLoadingStore } from '@/stores/loading'
import FiltersToolbar from '@/views/components/FiltersToolbar.vue'
import StreamButton from '@/views/components/StreamButton.vue'
import alert from '@/core/helpers/alert'

const loading = useLoadingStore()
const { dangerAlert } = alert()
const route = useRoute()
const { dateTimeFormatter } = global()
const total = ref(0)
const data = ref([])
const size = ref(10)
const page = ref(1)
const sortLabel = ref('')
const sortOrder = ref('')

const init = async () => {
  loading.show()
  try {
    const res = await ApiService.get(
      'twitter/twits',
      `?size=${size.value}&page=${page.value}&search=${search.value}&prediction=${predictionId.value}&sortLabel=${sortLabel.value}&sortOrder=${sortOrder.value}`
    )
    data.value = res.data.hits.hits ?? []
    data.value = data.value.map((item) => {
      item.createdAt = item._source.data.createdAt // per sort data
      // per filtro odio::START
      item.prediction = null
      if (item._source.data.prediction) {
        item.prediction = item._source.data.prediction
      }
      // per filtro odio::END
      // per sort score::START
      item.predictionScore = 0
      if (item._source.data.prediction) {
        item.predictionScore = item._source.data.prediction.score
      }
      // per sort score::END
      item.text = item._source.data.text // per search

      return item
    })

    total.value = res.data.hits.total.value ?? 0
  } catch (e) {
    dangerAlert(e)
  } finally {
    loading.hide()
  }
}

const searchedFields = ['text']
const search = ref('')
const predictionId = ref(0)

const headerConfig = ref([
  {
    columnName: 'Data',
    columnLabel: 'createdAt',
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
  page.value = 1
  init()
}

const onPrediction = (newValue) => {
  predictionId.value = newValue
  page.value = 1
  init()
}

let interval = null

onMounted(async () => {
  await init()
})

onUnmounted(() => {
  clearInterval(interval)
})

const streamButtonUpdate = (data) => {
  const twitterStatus = data?.twitter || false
  if (twitterStatus && !interval) {
    interval = setInterval(async () => {
      await init()
    }, 5000)
  } else if (!twitterStatus) {
    clearInterval(interval)
  }
}

const changeItemPerPage = (itemPerPage) => {
  page.value = 1
  size.value = itemPerPage
  init()
}

const changePage = (newPage) => {
  page.value = newPage
  init()
}

const changeSort = (sort) => {
  page.value = 1
  sortLabel.value = sort.label === 'score' ? 'prediction.score' : sort.label
  sortOrder.value = sort.order
  init()
}
</script>
<template>
  <main class="page-container">
    <div class="page-title">
      <h1>
        <span><i class="title-icon fa-brands fa-twitter"></i></span> {{ route?.meta?.label }}
      </h1>
      <StreamButton name="twitter" @on-update="streamButtonUpdate" />
    </div>

    <div class="page-content">
      <!--   FILTRI::START   -->
      <FiltersToolbar @on-search="onSearch" @on-prediction="onPrediction" />
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
        :total="total"
        :cPage="page"
        sort-label="createdAt"
        @on-items-per-page-change="changeItemPerPage"
        @page-change="changePage"
        @on-sort="changeSort"
      >
        <template v-slot:twit="{ row: row }">
          {{ row._source.data.text }}
          <template v-if="row._source.data.response">
            <hr />
            <span class="text-success">{{ row._source.data.response }}</span>
          </template>
        </template>
        <template v-slot:createdAt="{ row: row }">
          {{ dateTimeFormatter(row._source.data.createdAt) }}
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
</template>
<style lang="scss"></style>
