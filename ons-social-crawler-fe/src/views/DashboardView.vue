<script setup>
import SocialFilter from "./components/SocialFilter.vue"
import DateRange from "./components/DateRange.vue"
import LatestTransactionsChart from "./components/LatestTransactionsChart.vue"
import TransactionBreakdownChart from "./components/TransactionBreakdownChart.vue"
import LatestTransactionsChartClustered from "./components/LatestTransactionsChartClustered.vue"

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

//filters
const range = ref({
  end: new Date(),
  start: new Date(new Date().setHours(-672, 0, 0, 0)) //4 week
})
const selectedSocial = ref('all');

const toTimestamp = (strDate) => {
  const dt = Date.parse(strDate)
  return dt
}

const filteredTransactions = computed(() => {
  return transactions.value.filter(entry => {
    //console.log(entry)
    //console.log('entry.social : %s', entry.social)
    //console.log('selectedSocial : %s', selectedSocial.value)
    return (
      entry.timestamp >= range.value.start.getTime() &&
      entry.timestamp < range.value.end.getTime() && 
      selectedSocial.value == 'all' ? true : entry.social == selectedSocial.value
    )
  })
})

const updateSocial = (social) => {
  //console.log('in updateSocial -> %s', social)
  selectedSocial.value = social;
  init()
};

const updateRange = (modelData) => {
  range.value.start = modelData[0]
  range.value.end = modelData[1]
  init()
}

const total = ref(0)
const data = ref([])

const init = async () => {
  loading.show()
  try {
    const comments = await ApiService.get(
      'elasticsearch/query',
      `?dateFrom=${range.value.start}&dateTo=${range.value.end}`
    )
    //console.log("in init, query result : ", comments)
    //console.log('selectedSocial : %s', selectedSocial.value)
    data.value = comments.data.hits ?? []
    data.value = data.value.map((hit) => { //hit?._source?.comment || hit?._source?.data) ?? []
      let item = {}
      item = hit._source?.comment || hit._source?.data
      item.social = hit._index == "twitchcomments" ? "twitch" : hit._index == "youtubecomments" ? "youtube" : "twitter"
      item.predictionScore = 0
      if (item.prediction) {
        item.predictionScore = item.prediction.score
      }
      return item
    })
    total.value = comments.data.total.value ?? 0

    //per grafici
    transactions.value = comments.data ?? []
    transactions.value = data.value.map((hit) => hit?._source?.comment) ?? []
    transactions.value = data.value.map((item) => {
      let newItem = {}
      newItem.social = item.social
      newItem.isHate = item.predictionScore > 0 ? 1 : 0
      newItem.timestamp = toTimestamp(item.publishedAt) || toTimestamp(item.created_at)
      newItem.score = item.predictionScore
      newItem.response = item.response
      newItem.dimension = item.prediction ? item.prediction.dimension : ""
      newItem.tokens = item.prediction ? item.prediction.tokens : ""
      return newItem
    })
    //console.log("in init, transactions for graphs : ", transactions.value)
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
    <div class="section">
      <div class="section-content">
        <div class="grid-container">
          <div>
            <DateRange :entries="range" @update:model-value="updateRange" />
          </div>
          <div>
            <SocialFilter @on-social="updateSocial" />
          </div>
        </div>
        <div>
          <LatestTransactionsChart :entries="filteredTransactions" />
        </div>
        <div>
          <LatestTransactionsChartClustered :entries="filteredTransactions" />
        </div>
        <div>
          <TransactionBreakdownChart :entries="filteredTransactions" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.page-container {
  .section {
    margin-bottom: 3.2rem;
    
    .section-title {
      margin-bottom: 1rem;
    }

    .section-content {
      display: grid;
      grid-template-columns: 1fr; /* Single column layout */
      gap: 3rem;
    }

    .grid-container {
      display: grid;
      grid-template-columns: 1fr 1fr; /* Two columns layout for DateRange and SocialFilter */
      gap: 1rem;
    }
  }
}
</style>
