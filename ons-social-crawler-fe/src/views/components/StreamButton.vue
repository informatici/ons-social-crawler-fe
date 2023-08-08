<script>
export default {
  name: "stream-button"
}
</script>
<script setup>
import {defineProps, defineEmits, ref, onMounted, computed, onUnmounted, watch} from "vue";
import ApiService from "@/core/services/ApiService";
const emits = defineEmits(["onUpdate"])
const props = defineProps({
  label: {
    type: String,
    default: "",
    required: false,
  },
  labelIcon: {
    type: String,
    default: "",
    required: false,
  },
  labelTop: {
    type: Boolean,
    default: false,
    required: false,
  },
  name: {
    type: String,
    default: "",
    required: true,
  },
  btnMessage: {
    type: String,
    default: "",
    required: false,
  },
  // disabled: {
  //   type: Boolean,
  //   default: false,
  //   required: false,
  // }
})

const onClick = async () => {
  try {
    emits("onUpdate", props.name)
    isActive.value = true;
    await ApiService.get(`/stream/${props.name}/start`)
  } catch (err) {
    console.error(err)
    // todo: swal.fire?
  }
}

const statusData = ref({})

const isVisible = computed(() => {
  if(props?.name && props.name !== "") {
    let key = props.name + "Flag"
    return statusData.value[key]
  }
  return false
})

const isActive = ref(false)
const handleIsActive = () => {
  if(props?.name && props.name !== "") {
    let key = props.name
    isActive.value = statusData.value[key]
  } else {
    isActive.value = false
  }
}

watch(statusData, () => {
  handleIsActive()
});

const isDisabled = computed(() => {
  let isSomeStreamsActive = false;
  if(Object.keys(statusData.value).length > 0) {
    for(let key in statusData.value) {
      if(key === "twitch" || key === "youTube" || key === "twitter") {
        if(statusData.value[key] === true) isSomeStreamsActive = true
      }
    }
  }

  return isSomeStreamsActive || isActive.value;
})

const fetchStatusData = async () => {
  let tempStatusData = await ApiService.get('/stream/status')
  statusData.value = tempStatusData?.data ?? {}
}

const init = async () => {
  await fetchStatusData()
}

let interval = null

onMounted(async () => {
  await init()

   interval = setInterval(async () => {
    await fetchStatusData()
  }, 5000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>
<template>
  <div :class="['btn-container', 'stream-update-button', props.labelTop ? 'btn-label--top': 'btn-label--left']" v-show="!isVisible">
    <div class="btn-label">
      <span :class="['btn-label__icon', props.labelIcon]"></span>
      {{ props.label }}
    </div>
    <div class="btn-element">
      <button :class="['btn-element__input', isActive ? 'isActive' : '', isDisabled ? 'btn-input--disabled' : '']" :disabled="isDisabled" @click="onClick">
        <svg class="update-icon" xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg>
      </button>
      <p class="btn-element__message">{{ props.btnMessage }}</p>
    </div>
  </div>
</template>
<style lang="scss">
.stream-update-button {
  display: flex;

  &.btn-label--left {
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }
  &.btn-label--top {
    flex-direction: column;
    gap: .7rem;
  }

  .btn-label {
    $label--font-size: 1.25rem;
    font-weight: 500;
    font-size: $label--font-size;
    line-height: 1.2rem;
    .btn-label__icon {
      margin-right: .07rem;
      font-size: calc($label--font-size + .15rem) !important;
    }
  }

  .btn-element {
    $btn-input--border-radius: 6px;
    border-radius: $btn-input--border-radius;

    .btn-element__input {
      height: 100%;
      width: 100%;
      border-radius: $btn-input--border-radius;
      border: none;
      background-color: var(--primary-color);
      color: white;
      position: relative;
      text-align: center;
      padding: .7rem;
      border-radius: 50%;

      .update-icon {
        fill: white;
        height: 1.5rem;
        width: auto;
      }

      &.btn-input--disabled {
        background-color: lightgrey;
      }

      &.isActive {
        background-color: var(--secondary-color);
        .update-icon {
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .btn-label__icon {
      display: none;
    }
  }
}
</style>
