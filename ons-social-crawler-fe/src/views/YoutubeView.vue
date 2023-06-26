<script setup>
import { useRoute, RouterLink, RouterView  } from 'vue-router'
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
const data = ref([])

// const openItem = (id, modal) => {
//   selectedId.value = id;
//   setTimeout(() => {
//     showModal(modal);
//   }, 100);
// };

const init = async () => {
  // loading.show();
  try {
    const res = await ApiService.get('youtube/elasticsearch/comments')
    data.value = res.data.hits ?? []
    data.value = data.value.map(hit => hit?._source?.comment) ?? [];
    total.value = res.data.total.value ?? 0
  } catch (e) {
    console.error("Error: ", e)
  } finally {
    // loading.hide()
  }
}

const searchedFields = ['textDisplay']
const search = ref('')
const predictionId = ref(0)
const predictions = [
  {label: 'Tutti i commenti', value: 0},
  {label: 'No', value: 1},
  {label: 'Yes', value: 2}
]
const headerConfig = ref([
  {
    columnName: '',
    columnLabel: 'actions',
    sortEnabled: false,
    columnMinWidth: 100,
  },
  {
    columnName: 'Data',
    columnLabel: 'publishedAt',
    sortEnabled: true,
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
  },
  // {
  //   columnName: 'Canale',
  //   columnLabel: 'channelTitle',
  //   sortEnabled: false
  // },
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
    <div class="page-title">
      <h1><span><i class="title-icon fa-brands fa-youtube"></i></span> {{ route?.meta?.label }}</h1>
    </div>
    <div class="page-content">
      <!--   FILTRI::START   -->
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
          <div class="filter-element d-flex align-items-center position-relative my-1">
            <span class="filter-element__label">Odio: </span>
            <select
                class="filter-element__input form-select form-select-solid w-250px ps-15"
                :placeholder="$t('Filtra')"
                v-model="predictionId"
            >
              <option v-for="(a, ix) in predictions" :key="ix" :value="a.value">
                {{ a.label }}
              </option>
            </select>
          </div>
          <!--     filtro select odio::END     -->

        </div>
        <!--   FILTRI::END   -->

      <div class="col-12 text-end">
      <span class="fs-5 text-gray-800"
      >Commenti processati: <span class="fw-bold text-primary">{{ total }}</span></span
      >
      </div>
      <DigiTable
          :data="data"
          :header="headerConfig"
          :searched-fields="searchedFields"
          :search="search"
          :prediction-filter="predictionId"
          sort-label="publishedAt"
      >
        <template v-slot:actions="{ row: row }">
          <div class="d-flex gap-3">
            <a style="display: flex; align-items: center"
               :href="'https://www.youtube.com/watch?v=' + row.videoId" target="_blank"
            ><i class="action-icon fa-brands fa-youtube fs-5"></i
            ></a>
            <!--              @click="openItem(row.ID, 'kt_modal_asset_edit')"-->
            <router-link :to="{name: 'youTubeDetail', params: {id: row.id}, query: {videoTitle: row.title, videoId: row.videoId}}"
            >
              <!--            <i class="fa-solid fa-info text-primary fs-5"></i>-->
              <svg xmlns="http://www.w3.org/2000/svg" class="action-icon view-detail-icon" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
              <!--            <svg class="action-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">&lt;!&ndash;! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. &ndash;&gt;<path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>-->
              <!--            <i class="fa-sharp fa-solid fa-comments fs-5"></i>-->
              <!--            <i class="fa-solid fa-comment fs-5"></i>-->
              <!--            <svg xmlns="http://www.w3.org/2000/svg" class="action-icon view-comments-icon" viewBox="0 0 512 512">&lt;!&ndash;! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. &ndash;&gt;<path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/></svg>-->
            </router-link>


          </div>
        </template>

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
    </div>


  </main>
<!--  <ModalUserEdit :id="selectedId" @close-modal="init"></ModalUserEdit>-->
</template>
<style lang="scss">
.action-icon {
  &.fa-youtube {
  }

  &.view-comments-icon,
  &.view-detail-icon {
    fill: var(--primary-color);
    height: 1.4rem;
  }
}

.page-title {
  margin-bottom: 2.5rem;
}

.page-content {
  //border: 1px solid #ced4da;
  //border: none;
  border-radius: 6px;
  //padding: .7rem;

  .dataTables_wrapper .table-responsive {
    //border: none !important;
    border: 1px solid #ced4da !important;
    border-radius: 6px !important;
    margin-bottom: 1rem;
  }


  .dataTables_wrapper .table-responsive table {
    border: none !important;
    margin-bottom: 0 !important;

    //border: 1px solid #ced4da !important;
    //border-radius: 6px !important;

    thead tr {
      //border-bottom: 0 !important;
    }


    >:not(caption)>*>* {
      border-bottom: none !important;
    }
  }
}

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
      text-transform: uppercase;
      display: inline-block;
      padding: .5rem;
    }
  }
}
</style>
