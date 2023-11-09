<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(['onSearch', 'onPrediction'])
const props = defineProps({
  predictionFilter: {
    type: Boolean,
    required: false,
    default: true
  }
})

const search = ref('')
const predictionId = ref(0)
const predictions = [
  { label: 'Tutti i commenti', value: 0 },
  { label: 'No', value: 1 },
  { label: 'Sì', value: 2 }
]

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
    <!--     search::START     -->
    <div class="search-element d-flex align-items-center position-relative my-1">
      <!--          <span class="position-absolute ms-6">-->
      <!--            <i class="fa-solid fa-magnifying-glass fs-4"></i>-->
      <!--          </span>-->
      <input
        type="text"
        class="form-control form-control-solid w-250px ps-15"
        :placeholder="'Cerca'"
        v-model="search"
      />
    </div>
    <!--     search::END     -->

    <!--     filtro select odio::START     -->
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
    <!--     filtro select odio::END     -->
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
