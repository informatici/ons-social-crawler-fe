<script setup>
import DateRange from "./components/DateRange.vue"
import LatestTransactionsChart from "./components/LatestTransactionsChart.vue"
import TransactionBreakdownChart from "./components/TransactionBreakdownChart.vue"

import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import ApiService from '../core/services/ApiService'
import { useLoadingStore } from "@/stores/loading"
import alert from '@/core/helpers/alert'
import 'zingchart/es6'

const route = useRoute()
const loading = useLoadingStore()
const { dangerAlert } = alert()
const transactions = ref([])

const range = ref({
  end: new Date(),
  start: new Date(new Date().setHours(-672, 0, 0, 0)) //4 week
})

const toTimestamp = (strDate) => {
  const dt = Date.parse(strDate)
  return dt
}

const filteredTransactions = computed(() => {
  return transactions.value.filter(entry => {
    return (
      entry.timestamp >= range.value.start.getTime() &&
      entry.timestamp < range.value.end.getTime()
    )
  })
})

const updateRange = (modelData) => {
  range.value.start = modelData[0]
  range.value.end = modelData[1]
}

const size = ref(4000)
const page = ref(1)
const sortLabel = ref('')
const sortOrder = ref('')
const search = ref('')
const predictionId = ref(0)
const total = ref(0)
const data = ref([])

const init = async () => {
  loading.show()
  try {
    const youtube = await ApiService.get(
      'youtube/comments',
      `?size=${size.value}&page=${page.value}&search=${search.value}&prediction=${predictionId.value}&sortLabel=${sortLabel.value}&sortOrder=${sortOrder.value}`
    )
    //console.log(youtube)
    data.value = youtube.data.hits ?? []
    data.value = data.value.map((hit) => hit?._source?.comment) ?? []
    data.value = data.value.map((item) => {
      // per sorting score
      item.predictionScore = 0
      if (item.prediction) {
        item.predictionScore = item.prediction.score
      }
      return item
    })
    total.value = youtube.data.total.value ?? 0

    //per grafici
    transactions.value = youtube.data.hits ?? []
    transactions.value = data.value.map((hit) => hit?._source?.comment) ?? []
    transactions.value = data.value.map((item) => {
      let newItem = {}
      newItem.social = "youtube"
      newItem.isHate = item.predictionScore
      newItem.timestamp = toTimestamp(item.publishedAt)
      newItem.score = item.predictionScore
      newItem.response = item.response
      newItem.dimension = item.prediction ? item.prediction.dimension : ""
      newItem.tokens = item.prediction ? item.prediction.tokens : ""
      return newItem
    })
    //console.log(transactions.value)
  } catch (e) {
    dangerAlert(e)
  } finally {
    loading.hide()
  }
}


onMounted(async () => {
  await init()
})

</script>

<template>
  <main class="page-container settings-view">
    <div class="page-title">
      <h1>
        <span class="title-icon custom-chart">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z" />
          </svg>
        </span>
        {{ route?.meta?.label }}
      </h1>
    </div>
    <div>
      <div>
        <DateRange :entries="range" @update:model-value="updateRange"/>
      </div>
      <div>
        <LatestTransactionsChart :entries="filteredTransactions" />
      </div>
      <div>
        <TransactionBreakdownChart :entries="filteredTransactions" />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.dashboard-view {
  .section {
    margin-bottom: 3.2rem;

    &.page-title {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }

    .section-title {
      margin-bottom: 1rem;
    }

    .section-content {
      display: flex;
      gap: 3rem;

      border: 1px solid lightgrey;
      border-radius: 6px;
    }
  }

  @media screen and (max-width: 1400px) {
    .section {}
  }

  @media screen and (max-width: 992px) {
    .section {}
  }

  @media screen and (max-width: 768px) {
    .section {}
  }
}
</style>
