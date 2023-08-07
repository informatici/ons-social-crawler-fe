<script>
export default {
  name: "stream-button"
}
</script>
<script setup>
import {defineProps, defineEmits, ref} from "vue";
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
    required: true,
  },
  name: {
    type: String,
    default: "",
    required: true,
  },
  btnText: {
    type: String,
    default: "Avvia",
    required: false,
  },
  btnMessage: {
    type: String,
    default: "",
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  }
})

const isActive = ref(false)

const onClick = () => {
  // todo: valutare se aggiungere condizione per dare stato active a pulsante (come switch)
  emits("onUpdate", props.name)
}
</script>
<template>
  <div :class="['btn-container', 'stream-button', props.labelTop ? 'btn-label--top': 'btn-label--left']">
    <div class="btn-label">
      <span :class="['btn-label__icon', props.labelIcon]"></span>
      {{ props.label }}
    </div>
    <div class="btn-element">
      <button :class="['btn-element__input', isActive ? 'isActive' : '', props.disabled ? 'btn-input--disabled' : '']" :disabled="props.disabled" @click="onClick">
        {{ props.btnText }}
<!--        <span class="switch-element&#45;&#45;disabled" v-show="props.disabled"></span>-->
      </button>
      <p class="btn-element__message">{{ props.btnMessage }}</p>
    </div>
  </div>
</template>
<style lang="scss">
.stream-button {
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
      //height: $label--font-size !important;
      //width: auto;
    }
  }

  .btn-element {
    $btn-width: 4rem;
    $btn-height: calc($btn-width /1.6);
    width: $btn-width;
    height: $btn-height;
    $btn-input--border-radius: 10rem;
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

      &.btn-input--disabled {
        background-color: lightgrey;
      }
      //
      //.switch-element--disabled {
      //  display: inline-block;
      //  position: absolute;
      //  top: 0;
      //  left: 0;
      //  width: 100%;
      //  height: 100%;
      //  background-color: hsla(0, 0%, 70%, .5);
      //  border-radius: $btn-input--border-radius;
      //}

      &.isActive {
        background-color: var(--secondary-color);
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
