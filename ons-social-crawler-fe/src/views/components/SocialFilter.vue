<script setup>

import { ref, watch } from 'vue'

const emits = defineEmits(['onSearch', 'onSocial'])
const socialId = ref('all')
const socials = [
  { label: 'Tutti i social', value: 'all' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Twitch', value: 'twitch' },
  { label: 'Youtube', value: 'youtube' }
]

watch(
  () => socialId.value,
  (currentValue, prevValue) => {
    emits('onSocial', currentValue)
  }
)

const selectInput = ref(null);

const focus = () => {
  selectInput.value.focus();
}

defineExpose({
  focus
})

</script>

<template>
  <div class="filter-toolbar">
    <div class="filter-element">
      <label class="filter-element__label">Social:</label>
      <select class="filter-element__input form-select form-select-solid" v-model="socialId" ref="selectInput">
        <option v-for="(a, ix) in socials" :key="ix" :value="a.value">
          {{ a.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style lang="scss">
.filter-toolbar {
  display: flex;
  gap: 2rem;
  
  .filter-element {
    display: flex;
    align-items: center; /* Vertically center the label with the select */
    
    .filter-element__label {
      padding: 0.5rem;
    }
    
    .filter-element__input {
      /* Add any additional styles for the select component here */
    }
  }
}
</style>


