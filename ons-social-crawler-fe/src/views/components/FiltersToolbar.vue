<script setup>
import { ref, watch, toRaw } from 'vue'
import DateRange from './DateRange.vue'

const emits = defineEmits(['onSearch', 'onPrediction', 'updateRange'])
const props = defineProps({
  predictionFilter: {
    type: Boolean,
    required: false,
    default: true
  },
  rangeFilter: {
    type: Boolean,
    required: false,
    default: true
  },
  range: {
    type: Object,
    required: false,
    default: {
      end: new Date(new Date(new Date().setHours(-24)).setHours(23, 59, 59, 999)), // yesterday, end of the day
      start: new Date(new Date().setHours(-168, 0, 0, 0)) //1 week
    }
  }
})

const search = ref('')
const predictionId = ref(0)
const predictions = [
  { label: 'Tutti i commenti', value: 0 },
  { label: 'No', value: 1 },
  { label: 'Sì', value: 2 }
]
const range = ref(props.range)

const updateRange = (value) => {
  emits('updateRange', toRaw(value))
}

watch(
  () => search.value,
  (currentValue, prevValue) => {
    emits('onSearch', currentValue)
  }
)

watch(
  () => predictionId.value,
  (currentValue, prevValue) => {
    emits('onPrediction', currentValue)
  }
)
</script>
<template>
  <div class="filter-toolbar">
    <div class="search-element d-flex align-items-center position-relative my-1">
      <input
        type="text"
        class="form-control form-control-solid w-250px ps-15"
        :placeholder="'Cerca'"
        v-model="search"
      />
    </div>

    <div
      class="filter-element d-flex align-items-center position-relative my-1"
      v-if="props.predictionFilter"
    >
      <span class="filter-element__label">Odio: </span>
      <select
        class="filter-element__input form-select form-select-solid w-250px ps-15"
        v-model="predictionId"
      >
        <option v-for="(a, ix) in predictions" :key="ix" :value="a.value">
          {{ a.label }}
        </option>
      </select>
    </div>

    <div
      v-if="props.rangeFilter"
      class="filter-element d-flex align-items-center position-relative my-1"
    >
      <DateRange :entries="range" @update:model-value="updateRange" />
    </div>
  </div>
</template>
<style lang="scss">
.filter-toolbar {
  display: flex;
  gap: 2rem;
  .search-element {
    flex-basis: 15rem !important;
  }
  .filter-element {
    .filter-element__label {
      font-size: 1.2rem;
      font-weight: 400;
      //text-transform: uppercase;
      display: inline-block;
      padding: 0.5rem;
    }
  }
}
</style>
