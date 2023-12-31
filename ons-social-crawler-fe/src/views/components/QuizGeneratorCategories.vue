<script setup>
import { ref, computed, defineProps } from 'vue'
import global from '../../core/helpers/functions.js'

const { decodeHtml, translate } = global()
const props = defineProps(['index', 'quiz'])
const index = computed(() => props.index)
const quiz = computed(() => props.quiz)
const hasAnswered = ref(false)
const right = ref({
  aggr_phys: false,
  aggr_verb: false,
  discr: false,
  incivility: false
})
const selectedCategories = ref({
  aggr_phys: false,
  aggr_verb: false,
  discr: false,
  incivility: false
})

const setAnswer = (value) => {
  if (quiz.value.dimensions) {
    right.value[value] = quiz.value.dimensions[value] > 0
    selectedCategories.value[value] = true
  }
}

const checkAnswer = () => {
  hasAnswered.value = true
}

const checkCorrect = (value) => {
  if (quiz.value.dimensions) {
    return quiz.value.dimensions[value] > 0
  }

  return false
}
</script>

<template>
  <div class="quiz-title-container">
    <span class="quiz-round-number">{{ index }}</span>
    <span>Scelta Categoria</span>
    <!-- <svg
      v-if="hasAnswered && right"
      xmlns="http://www.w3.org/2000/svg"
      height="30"
      width="30"
      fill="turquoise"
      viewBox="0 0 512 512"
    >
      <path
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
      />
    </svg>
    <svg
      v-if="hasAnswered && !right"
      xmlns="http://www.w3.org/2000/svg"
      height="30"
      width="30"
      fill="tomato"
      viewBox="0 0 512 512"
    >
      <path
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
      />
    </svg> -->
  </div>
  <div><b>Il seguente messaggio contiene dell'odio:</b></div>
  <p>"{{ decodeHtml(quiz.description) }}"</p>
  <b>Quali categorie assoceresti?</b>
  <div class="row mt-2 gy-2">
    <div class="col-12 col-md-6">
      <button
        class="quiz-answer-button"
        :class="{
          right: hasAnswered && checkCorrect('aggr_phys'),
          wrong: hasAnswered && !checkCorrect('aggr_phys'),
          select: !hasAnswered && selectedCategories.aggr_phys
        }"
        @click="setAnswer('aggr_phys')"
        :disabled="hasAnswered"
      >
        {{ translate('categories', 'aggr_phys') }}
      </button>
    </div>
    <div class="col-12 col-md-6">
      <button
        class="quiz-answer-button"
        :class="{
          right: hasAnswered && checkCorrect('aggr_verb'),
          wrong: hasAnswered && !checkCorrect('aggr_verb'),
          select: !hasAnswered && selectedCategories.aggr_verb
        }"
        @click="setAnswer('aggr_verb')"
        :disabled="hasAnswered"
      >
        {{ translate('categories', 'aggr_verb') }}
      </button>
    </div>
    <div class="col-12 col-md-6">
      <button
        class="quiz-answer-button"
        :class="{
          right: hasAnswered && checkCorrect('discr'),
          wrong: hasAnswered && !checkCorrect('discr'),
          select: !hasAnswered && selectedCategories.discr
        }"
        @click="setAnswer('discr')"
        :disabled="hasAnswered"
      >
        {{ translate('categories', 'discr') }}
      </button>
    </div>
    <div class="col-12 col-md-6">
      <button
        class="quiz-answer-button"
        :class="{
          right: hasAnswered && checkCorrect('incivility'),
          wrong: hasAnswered && !checkCorrect('incivility'),
          select: !hasAnswered && selectedCategories.incivility
        }"
        @click="setAnswer('incivility')"
        :disabled="hasAnswered"
      >
        {{ translate('categories', 'incivility') }}
      </button>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-12">
      <button class="quiz-answer-check-button" @click="checkAnswer">Verifica</button>
    </div>
  </div>
  <hr />
</template>

<style scoped>
.quiz-title-container {
  display: flex;
  gap: 10px;
}
.quiz-round-number {
  height: 25px;
  width: 25px;
  background-color: #005b9c;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  color: white;
}
.quiz-answer-button {
  width: 100%;
  border: 2px solid lightgray;
  background-color: lightgray;
  border-radius: 8px;
  padding: 8px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  height: 100%;
}

.quiz-answer-button:hover {
  border: 2px solid #005b9c;
  background-color: #005b9c;
  color: white;
}

.quiz-answer-check-button {
  width: 100%;
  border: 2px solid #005b9c;
  background-color: #005b9c;
  border-radius: 8px;
  padding: 8px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  height: 100%;
  color: white;
}

.quiz-answer-button.right {
  border: 2px solid turquoise;
  background-color: turquoise;
  color: white;
}
.quiz-answer-button.wrong {
  border: 2px solid tomato;
  background-color: tomato;
  color: white;
}
.quiz-answer-button.wrong:disabled {
  opacity: 0.2;
}
.quiz-answer-button.select {
  border: 2px solid #005b9c;
  background-color: #005b9c;
  color: white;
}
</style>