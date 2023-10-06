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

        // Create an object to store the series names
        const seriesNames = {};

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

          // Track series names
          seriesNames[isHateValue] = `isHate = ${isHateValue}`;
        });

        // Convert the aggregated data object to the desired array format
        const result = Object.keys(aggregatedData).map((isHateValue) => {
          return {
            text: seriesNames[isHateValue], // Set the "text" property for each series
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
          text: 'Contenuti al giorno ',
          position: 'top',
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
          },
          step: 'day'
        },
        scaleY: {
          label: {
            text: 'Numero',
          },
          //short:true,
          //shortUnit: 'K',
          item: {
            fontSize: 10
          }
        },
        legend: {
          toggleAction: 'hide', // Optional: Hide or show the series on click
          layout: 'float',
          align: 'center',
          borderWidth: 0,
          backgroundColor: 'none',
          item: {
            fontSize: 12
          },
          verticalAlign: 'bottom',
        },
        crosshairX: {
          lineColor: '#f00', // Customize the crosshair line color
          scaleLabel: {
            backgroundColor: '#f00', // Customize the background color of the scale label
          },
        },
      }
    },
  }
}
</script>
