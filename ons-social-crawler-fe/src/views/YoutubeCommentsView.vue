<script setup>
import { useRoute } from 'vue-router'
import ApiService from '../core/services/ApiService'
import { onMounted, ref } from 'vue'
import DigiTable from '@/components/kt-datatable/DigiTable.vue'
import ModalUserEdit from '@/components/modals/ModalUserEdit.vue'
import global from '../core/helpers/functions.js'
import { useLoadingStore } from "@/stores/loading";

const loading = useLoadingStore();
const route = useRoute()
const { dateTimeFormatter } = global()
const total = ref(0)
const commentsData = ref([])
const videoData = ref({})
const selectedCommentData = ref({})
const otherCommentsData = ref([])

// const openItem = (id, modal) => {
//   selectedId.value = id;
//   setTimeout(() => {
//     showModal(modal);
//   }, 100);
// };

const init = async () => {
  loading.show()
  try {
    const res = await ApiService.get('youtube/elasticsearch/videos/' + route.query.videoId)

    videoData.value = res.data.video ?? {}

    commentsData.value = res.data.comments ?? []
    commentsData.value = commentsData.value.map(comment => {
      return {
        ...comment?._source?.comment,
        score: comment?._score,
      }
    }) ?? [];
    selectedCommentData.value = commentsData.value.find(comment => comment.id === route.params.id) ?? {}
    otherCommentsData.value = commentsData.value.filter(comment => comment.id !== route.params.id) ?? []
    console.debug('#c comment: ', commentsData.value, selectedCommentData.value, route.params.id);
    total.value = otherCommentsData.value.length;
    // total.value = res.data.total.value ?? 0 // todo: manca nella chiamata
  } catch (e) {
    console.error("Error: ", e)
  } finally {
    loading.hide()
  }
}

const searchedFields = []
const search = ref('')
const headerConfig = ref([
  // {
  //   columnName: '',
  //   columnLabel: 'actions',
  //   sortEnabled: false,
  //   columnMinWidth: 50,
  // },
  {
    columnName: 'Data',
    columnLabel: 'publishedAt',
    sortEnabled: false,
    columnMinWidth: 175
  },
  {
    columnName: 'Odio',
    columnLabel: 'prediction',
    sortEnabled: false
  },
  {
    columnName: 'Commento',
    columnLabel: 'textDisplay',
    sortEnabled: false
  },
  {
    columnName: 'Grado',
    columnLabel: 'score',
    sortEnabled: false,
    tdClass: 'bg-warning text-center'
  }
])

onMounted(async () => {
  await init()
  // setInterval(async () => {
  //   await init()
  // }, 10000)
})
</script>
<template>
  <main class="page-container">
    <div class="section page-title">
      <h1>{{ route?.meta?.label }} <br> <span class="commentTitle">"{{ selectedCommentData?.textDisplay }}"</span></h1>
      <router-link :to="{name: 'youTube'}">
        <button class="btn btn-primary" style="background-color: var(--primary-color) !important;">Indietro</button>
      </router-link>
    </div>

    <section class="section video-info">
      <h2 class="section-title">Il video</h2>
      <div class="section-content">
        <div class="section-content__video">

                <div>
                  <iframe
                      class="embedded-video"
                      :src="'https://www.youtube.com/embed/' + videoData.id"
                      :title="videoData.title" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                  >
                  </iframe>
                </div>

<!--                <div class="embedded-video-container">-->
<!--                  <div v-html="videoData.player"></div>-->
<!--                </div>-->
        </div>

        <div class="section-content__info">
          <p class="video-info__row">
            <h4>Titolo</h4>
            <span>{{videoData.title}}</span>
          </p>

          <p class="video-info__row" v-if="videoData.description">
            <h4>Descrizione</h4>
            <span>{{videoData.description}}</span>
          </p>

          <p class="video-info__row">
            <h4>Data e ora di pubblicazione</h4>
            <span>{{dateTimeFormatter(videoData.publishedAt)}}</span>
          </p>
        </div>
      </div>


    </section>

    <section class="section comments-info">
      <h2 class="section-title">Il commento</h2>
<!--      <div class="col-12 text-end">-->
<!--        <span class="fs-5 text-gray-800">Commenti processati: <span class="fw-bold text-primary">{{ total }}</span></span-->
<!--        >-->
<!--      </div>-->
      <DigiTable
          :data="[selectedCommentData]"
          :header="headerConfig"
          :searched-fields="searchedFields"
          :search="search"
          :tableFooter="false"
      >
        <!--      <template v-slot:actions="{ row: row }">-->
        <!--        <div class="d-flex gap-3">-->
        <!--          <a-->
        <!--              :href="'https://www.youtube.com/watch?v=' + row.videoId" target="_blank"-->
        <!--              style="color: #f00;"-->
        <!--          ><i class="fa-brands fa-youtube fs-5"></i-->
        <!--          ></a>-->
        <!--        </div>-->
        <!--      </template>-->

        <template v-slot:publishedAt="{ row: row }">
          {{ dateTimeFormatter(row.publishedAt) }}
        </template>

        <template v-slot:prediction="{ row: row }">
          <span v-if="row.prediction" class="badge bg-success">Si</span>
          <span v-else class="badge bg-danger">No</span>
        </template>

        <template v-slot:textDisplay="{ row: row }">
          {{ row.textDisplay }}
          <template v-if="row.response">
            <hr />
            <span class="text-success">{{ row.response }}</span>
          </template>
        </template>

        <template v-slot:score="{ row: row }">
        <span v-if="row.prediction" class="">
          {{ row.prediction.score }}</span
        >
          <span v-else></span>
        </template>
      </DigiTable>
    </section>

    <section class="section comments-info">
      <h2 class="section-title">Gli altri commenti</h2>
      <div class="col-12 text-end">
        <span class="fs-5 text-gray-800">Commenti processati: <span class="fw-bold text-primary">{{ total }}</span></span
        >
      </div>
      <DigiTable
          :data="otherCommentsData"
          :header="headerConfig"
          :searched-fields="searchedFields"
          :search="search"
      >
        <!--      <template v-slot:actions="{ row: row }">-->
        <!--        <div class="d-flex gap-3">-->
        <!--          <a-->
        <!--              :href="'https://www.youtube.com/watch?v=' + row.videoId" target="_blank"-->
        <!--              style="color: #f00;"-->
        <!--          ><i class="fa-brands fa-youtube fs-5"></i-->
        <!--          ></a>-->
        <!--        </div>-->
        <!--      </template>-->

        <template v-slot:publishedAt="{ row: row }">
          {{ dateTimeFormatter(row.publishedAt) }}
        </template>

        <template v-slot:prediction="{ row: row }">
          <span v-if="row.prediction" class="badge bg-success">Si</span>
          <span v-else class="badge bg-danger">No</span>
        </template>

        <template v-slot:textDisplay="{ row: row }">
          {{ row.textDisplay }}
          <template v-if="row.response">
            <hr />
            <span class="text-success">{{ row.response }}</span>
          </template>
        </template>

        <template v-slot:score="{ row: row }">
        <span v-if="row.prediction" class="">
          {{ row.prediction.score }}</span
        >
          <span v-else></span>
        </template>
      </DigiTable>
    </section>

  </main>
  <!--  <ModalUserEdit :id="selectedId" @close-modal="init"></ModalUserEdit>-->
</template>
<style lang="scss">
.videoTitle,
.commentTitle {
  font-size: 1.4rem;
}

.section {
  --video-height: 22rem;
  --video-width: calc(22rem * 1.9);
  --section-video-height: var(--video-height);

  margin-bottom: 3.2rem;

  &.page-title {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .section-title {
    margin-bottom: 1rem;
  }

  .section-content {
    display: flex;
    gap: 3rem;

    embedded-video-container {
      height: var(--section-video-height);
      width: 50rem;
      outline: 1px dashed blue;
    }
    .embedded-video {
      height: var(--section-video-height);
      width: var(--video-width);
    }

    .section-content__info {
      overflow: auto;
      height: var(--section-video-height);

      .video-info__row {
        margin-bottom: 2.2rem;
        max-width: 70rem;
      }

    }
    .section-content__video {
      height: var(--section-video-height);
    }
  }



}

@media screen and (max-width: 1400px)  {

  .section {
    &.video-info {
      .section-content {
        flex-direction: column;
        gap: 3rem;

        .section-content__info {
          height: auto;
        }
      }
    }
  }
}

@media screen and (max-width: 992px)  {

  .section {
    --video-height: 300px;
    --video-width: calc(300px * 1.9);
    --section-video-height: var(--video-height);
  }
}

@media screen and (max-width: 768px)  {

  .section {
    --video-height: 220px;
    --video-width: calc(220px * 1.9);
    --section-video-height: var(--video-height);
  }
}

</style>
