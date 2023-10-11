<script setup>
import { ref } from 'vue';
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
        const socialCategories = [] // Store unique "social" categories
        const data = {}

        // Iterate through transactions and group data by "social" and "isHate" values
        this.entries.forEach((transaction) => {
          const social = transaction.social
          const isHateValue = transaction.isHate ? 'true' : 'false';

          if (!socialCategories.includes(social)) {
            socialCategories.push(social)
            data[social] = {'true': 0, 'false': 0}
          }

          data[social][isHateValue]++;
        });

        //console.log('%O', socialCategories)
        //console.log('%O', data)

        //Create series data for the chart
        const seriesData = [
          {
            values: [data['twitter']['false'],data['twitch']['false'],data['youtube']['false']],
            text: 'false',
          },
          {
            values: [data['twitter']['true'],data['twitch']['true'],data['youtube']['true']],
            text: 'true',
          },
        ];

        // Function to create series data
        // function createSeriesData(data, socialCategories, isHateValue) {
        //   return {
        //     values: socialCategories.map((social) => data[social][isHateValue]),
        //     text: 'isHate = ' + isHateValue.toString(),
        //   };
        // }

        // // Create series data for the chart
        // const seriesData = [
        //   createSeriesData(data, socialCategories, 'false'),
        //   createSeriesData(data, socialCategories, 'true'),
        // ];

        console.log(seriesData)

        return {
          socialCategories,
          seriesData
        }
    },
    chartConfig() {
      return {
        type: 'bar',
        title: {
          text: 'isHate = true per social',
          position: 'top',
        },
        plot: {
          stacked: false,
          tooltip: {
            text: '%v',
            //decimals: 2, // Set the number of decimal places for values
          },
        },
        scaleX: {
          labels: this.values.socialCategories, // X-axis labels based on social categories
        },
        series: this.values.seriesData,
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
