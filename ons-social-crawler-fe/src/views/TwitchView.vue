<script setup>
import { useRoute, RouterLink } from 'vue-router'
import ApiService from '../core/services/ApiService'
import { onMounted, onUnmounted, ref, watch } from 'vue'
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
      'twitch/comments',
      `?size=${size.value}&page=${page.value}&search=${search.value}&prediction=${predictionId.value}&sortLabel=${sortLabel.value}&sortOrder=${sortOrder.value}`
    )
    data.value = res.data.hits ?? []
    data.value = data.value.map((hit) => hit?._source?.comment) ?? []
    data.value = data.value.map((item) => {
      // per sorting score
      item.predictionScore = 0
      if (item.prediction) {
        item.predictionScore = item.prediction.score
      }
      return item
    })

    total.value = res.data.total.value ?? 0
  } catch (e) {
    dangerAlert(e)
  } finally {
    loading.hide()
  }
}

const searchedFields = ['textDisplay']
const search = ref('')
const predictionId = ref(0)

const headerConfig = ref([
  {
    columnName: '',
    columnLabel: 'actions',
    sortEnabled: false,
    columnMinWidth: 100
  },
  {
    columnName: 'Data',
    columnLabel: 'publishedAt',
    sortEnabled: true,
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
    sortEnabled: true,
    tdClass: 'bg-warning text-center'
  }
  // {
  //   columnName: 'Canale',
  //   columnLabel: 'channelTitle',
  //   sortEnabled: false
  // },
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
  const twitchStatus = data?.twitch || false
  if (twitchStatus && !interval) {
    interval = setInterval(async () => {
      await init()
    }, 5000)
  } else if (!twitchStatus) {
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
  sortLabel.value = sort.label === 'score' ? 'prediction.score' : sort.label
  sortOrder.value = sort.order
  init()
}
</script>
<template>
  <main class="page-container">
    <div class="page-title">
      <h1>
        <span><i class="title-icon fa-brands fa-twitch"></i></span> {{ route?.meta?.label }}
      </h1>
      <StreamButton name="twitch" @on-update="streamButtonUpdate" />
    </div>

    <div class="page-content">
      <!--   FILTRI::START   -->
      <FiltersToolbar @on-search="onSearch" @on-prediction="onPrediction" />
      <!--   FILTRI::END   -->

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
        :prediction-filter="predictionId"
        :total="total"
        :cPage="page"
        sort-label="publishedAt"
        @on-items-per-page-change="changeItemPerPage"
        @page-change="changePage"
        @on-sort="changeSort"
      >
        <template v-slot:actions="{ row: row }">
          <div class="d-flex gap-3">
            <router-link
              :to="{
                name: 'twitchDetail',
                params: { id: row.id },
                query: { videoTitle: row.title, streamId: row.streamId }
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="action-icon view-detail-icon"
                viewBox="0 0 512 512"
              >
                <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                />
              </svg>
            </router-link>
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
          <span v-if="row.prediction" class=""> {{ row.prediction.score }}</span>
          <span v-else></span>
        </template>
      </DigiTable>
    </div>
  </main>
</template>
<style lang="scss">
.action-icon {
  &.fa-youtube {
  }

  &.view-comments-icon,
  &.view-detail-icon {
    fill: var(--primary-color);
    height: 1.4rem;
  }
}
</style>
