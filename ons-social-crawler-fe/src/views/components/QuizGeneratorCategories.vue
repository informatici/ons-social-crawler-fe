<script setup>
import { ref, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps(['index', 'quiz'])
const { t } = useI18n()
const index = ref(props.index)
const quiz = ref(props.quiz)
</script>

<template>
  <div class="quiz-title-container">
    <span class="quiz-round-number">{{ index }}</span>
    <span>Scelta Categoria</span>
  </div>
  <div><b>Il seguente messaggio contiene dell'odio:</b></div>
  <p>
    "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
    passages, and more recently with desktop publishing software like Aldus PageMaker including
    versions of Lorem Ipsum."
  </p>
  <b>Quali categorie assoceresti?</b>
  <div class="row mt-2 gy-2">
    <div class="col-12 col-md-6">
      <button class="quiz-answer-button">
        {{ t(`categories.aggr_phys`) }}
      </button>
    </div>
    <div class="col-12 col-md-6">
      <button class="quiz-answer-button">
        {{ t(`categories.aggr_verb`) }}
      </button>
    </div>
    <div class="col-12 col-md-6">
      <button class="quiz-answer-button">
        {{ t(`categories.discr`) }}
      </button>
    </div>
    <div class="col-12 col-md-6">
      <button class="quiz-answer-button">
        {{ t(`categories.incivility`) }}
      </button>
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
</style>
