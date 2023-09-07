<script setup>
import ZingChartVue from 'zingchart-vue';
</script>
<template>
   <ZingChartVue :data="chartConfig" /> 
</template>
<script>
export default {
  props: ['entries'],
  computed: {
    values() {
      const categories = this.entries.reduce((acc, transaction) => {
        acc[transaction.purchase_type] = acc[transaction.purchase_type] || 0;
        acc[transaction.purchase_type]++;
        return acc;
      }, {});
      return Object.keys(categories).map((name) => {
        return {
          values: [categories[name]],
          text: name
        }
      })
     },
    chartConfig() {
      const colors = [
        {
          backgroundColor: '#04A3F5',
          hoverState: {
            backgroundColor: '#45D6C4'
          }
        },
        {
          backgroundColor: '#98D1EE',
          hoverState: {
            backgroundColor: '#45D6C4'
          }
        },
                {
          backgroundColor: '#295A73',
          hoverState: {
            backgroundColor: '#45D6C4'
          }
        },
      ];
      const config ={
        type: 'pie',
        tooltip: {
          text: '%npv%'
        },
        plotarea: {
          margin: '5'
        },
        plot: {
          valueBox: {
            fontSize: 10,
            text: '%t'
          },
          hoverState: {
         	  borderWidth: 2,
          }
        },
        // TODO: Format the data and pass it to the series.
        series: this.values.map((o,index) => Object.assign(o, colors[index])),
      };
      return config;
    },
  }
}
</script>
