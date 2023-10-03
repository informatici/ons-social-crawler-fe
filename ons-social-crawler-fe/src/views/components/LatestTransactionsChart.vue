<script setup>
import ZingChartVue from 'zingchart-vue';
</script>
<template>
    <ZingChartVue :data="chartConfig"/>
</template>
<script>
export default {
  props: ['entries'],
  computed: {
    values() {
        // return this.entries[0].values;
        //console.log(this.entries)

        // Create an object to store the aggregated data grouped by isHate value
        const aggregatedData = {};

        // Iterate through transactions and group data by isHate value
        this.entries.forEach((transaction) => {
          const isHateValue = transaction.isHate ? true : false;
          const date = new Date(transaction.timestamp);
          const timestamp = date.getTime(); // Timestamp
          const day = date.toISOString().split('T')[0]; // Extract YYYY-MM-DD

          if (!aggregatedData[isHateValue]) {
            aggregatedData[isHateValue] = {};
          }

          if (!aggregatedData[isHateValue][day]) {
            aggregatedData[isHateValue][day] = 0;
          }

          aggregatedData[isHateValue][day]++;
        });

        // Convert the aggregated data object to the desired array format
        const result = Object.keys(aggregatedData).map((isHateValue) => {
          return {
            values: Object.entries(aggregatedData[isHateValue]).map(([day, count]) => [
              new Date(day).getTime(),
              count,
            ]),
          };
        });

        //console.log(result);
        return result
    },
    chartConfig() {
      // TODO: Add a series object
      return {
        type: 'bar',
        title: {
          text: 'Transactions per day'
        },
        plot: {
          stacked: true
        },
        series: this.values,
        scaleX: {
          transform: {
            type: 'date',
            all: '%d/%m/%y'
          },
          item: {
            fontSize: 10
          }
        },
        scaleY: {
          label: {
            text: 'Number',
          },
          //short:true,
          //shortUnit: 'K',
          item: {
            fontSize: 10
          }
        }
      }
    },
  }
}
</script>
