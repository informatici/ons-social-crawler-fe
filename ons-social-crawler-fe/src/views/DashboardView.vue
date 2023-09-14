<script setup>
import { useRoute } from 'vue-router'
import 'zingchart/es6';
const route = useRoute()
</script>

<script>
import transactions from './data/transactions.js';
import DateRange from "./components/DateRange.vue";
import LatestTransactionsChart from "./components/LatestTransactionsChart.vue";
import TransactionBreakdownChart from "./components/TransactionBreakdownChart.vue";
export default {
  name: 'dashboard',
  // Register the components to be used
  components: {
    DateRange,
    LatestTransactionsChart,
    TransactionBreakdownChart,
  },
  data() {
    return {
      transactions,
      range: {
        start: new Date(new Date().setHours(0,0,0,0)),
        end: new Date(new Date().setHours(24,0,0,0))
      },
    }
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter(entry => {
        return (
          entry.timestamp >= this.range.start.getTime() &&
          entry.timestamp < this.range.end.getTime()
        );
      });
    },
  },
  methods: {
    updateRange(range) {
      // console.log(range);
      this.range = range;
    }
  }
}
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
        <DateRange :entries="range" @rangeChanged="updateRange" />
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
