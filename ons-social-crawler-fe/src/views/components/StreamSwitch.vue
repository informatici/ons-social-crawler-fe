<script>
export default {
  name: "stream-switch"
}
</script>
<script setup>
import {defineProps, defineEmits, ref,} from "vue";
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
  // btnText: {
  //   type: String,
  //   default: "Avvia",
  //   required: false,
  // },
  btnMessage: {
    type: String,
    default: "",
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const isActive = ref(false)
const onClick = () => {
  props.isActive === true ? isActive.value = true : false;
  isActive.value = !isActive.value
  emits("onUpdate", props.name, {origin: "twitch", active: isActive.value})
}

</script>
<template>
  <div :class="['btn-container', 'stream-button', props.labelTop ? 'btn-label--top': 'btn-label--left']">
    <div class="btn-label">
      <span :class="['btn-label__icon', props.labelIcon]"></span>
      {{ props.label }}
    </div>
    <div class="btn-element">

      <button class="switch-element" :disabled="props.disabled" @click="onClick">
<!--        <div class="switch-element&#45;&#45;disabled" v-show="props.disabled"></div>-->
        <div :class="['switch-input', isActive || props.isActive ? 'isActive' : '', props.disabled ? 'switch-input--disabled' : '']" ></div>
      </button>

<!--      <button class="btn-element__input" :disabled="props.disabled" @click="onClick">{{ props.btnText }}</button>-->

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

    .switch-element {
      $btn-input--border-radius: 10rem;
      border-radius: $btn-input--border-radius;
      border: 1px solid lightgrey;
      width: 100%;
      height: 100%;
      $switch-element--padding: .2rem;
      position: relative;
      background-color: white;
      //.switch-element--disabled {
      //  width: 100%;
      //  height: 100%;
      //  z-index: 5;
      //  background-color: hsla(0, 0%, 70%, .5);
      //  border-radius: $btn-input--border-radius;
      //}
      .switch-input {
        $transitionDuration: .15s;
        position: absolute;
        top: 50%;
        //left: $switch-element--padding;
        transform: translate($switch-element--padding, -50%);
        transition: transform $transitionDuration,  background-color $transitionDuration;
        border-radius: 50%;
        border: 1px solid lightgrey;
        background-color: var(--primary-color);
        width: calc($btn-height - ($switch-element--padding * 2));
        height: calc($btn-height - ($switch-element--padding * 2));

        &.switch-input--disabled {
          background-color: lightgrey;
        }

        &.isActive {
          //left: auto !important;
          //right: $switch-element--padding !important;
          transform: translate(calc($btn-width - ($switch-element--padding * 2) - 100%), -50%);
          transition: transform $transitionDuration, background-color $transitionDuration;
          background-color: var(--secondary-color);
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
