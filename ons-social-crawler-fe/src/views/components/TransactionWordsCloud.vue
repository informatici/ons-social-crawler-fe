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
      // return this.entries[0].values;
      //console.log(this.entries)

      // Use Array.reduce to concatenate the "tokens" values
      const text = this.entries.reduce((concatenatedText, item) => {
          return concatenatedText + " " + item.tokens;
      }, "");

      console.log(text)
      return text
    },
    chartConfig() {
      const config = {
        type: 'wordcloud',
        options: {
          text: this.values,
          normalize: true
        }
      };
      return config;
    },
  }
}
</script>
