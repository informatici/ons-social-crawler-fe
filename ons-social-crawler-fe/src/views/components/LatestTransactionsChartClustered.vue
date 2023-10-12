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
    formatValueBox(p) {
        //console.log('p %O', p.values)
        //return p.values.seriesData[0].percentages[0]
        return [[p.values.seriesData[0].percentages[0],p.values.seriesData[0].percentages[1],p.values.seriesData[0].percentages[2]],
                [p.values.seriesData[1].percentages[0],p.values.seriesData[1].percentages[1],p.values.seriesData[1].percentages[2]]]
    },
    values() {
        // return this.entries[0].values;
        //console.log(this.entries)

        // Create an object to store the aggregated data grouped by isHate value
        const socialCategories = [] // Store unique "social" categories
        const data = {}
        let seriesData = []

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

        //Example of returning data
        // seriesData = [
        //   {
        //     values: [data['twitter']['false'],data['twitch']['false'],data['youtube']['false']],
        //     text: 'false',
        //     percentages: [70, 80, 50]
        //   },
        //   {
        //     values: [data['twitter']['true'],data['twitch']['true'],data['youtube']['true']],
        //     text: 'true',
        //     percentages: [30, 20, 50]
        //   },
        // ];

        // Function to create series data
        function createSeriesData(data, socialCategories, isHateValue) {
          const total = socialCategories.reduce((acc, social) => acc + data[social][isHateValue], 0);

          return {
            values: socialCategories.map((social) => data[social][isHateValue]),
            text: 'isHate = ' + isHateValue.toString(),
            percentages: socialCategories.map((social) => {
              const total = data[social]['true'] + data[social]['false'];
              return ((data[social][isHateValue] / total) * 100).toFixed(1);
            })
          };
        }

        // // Create series data for the chart
        seriesData = [
          createSeriesData(data, socialCategories, 'false'),
          createSeriesData(data, socialCategories, 'true'),
        ];

        //console.log(seriesData)

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
          valueBox: {
          rules:[ // TODO: didn't find a better way to optimize this, maybe using jsRule?
                {
                  rule: '%p == 0 && "%kl" == "twitter"',
                  text: this.formatValueBox[0][0] + '%'
                },
                {
                  rule: '%p == 1 && "%kl" == "twitter"',
                  text: this.formatValueBox[1][0] + '%'
                },
                {
                  rule: '%p == 0 && "%kl" == "twitch"',
                  text: this.formatValueBox[0][1] + '%'
                },
                {
                  rule: '%p == 1 && "%kl" == "twitch"',
                  text: this.formatValueBox[1][1] + '%'
                },
                {
                  rule: '%p == 0 && "%kl" == "youtube"',
                  text: this.formatValueBox[0][2] + '%'
                },
                {
                  rule: '%p == 1 && "%kl" == "youtube"',
                  text: this.formatValueBox[1][2] + '%'
                },
              ]
          },
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
