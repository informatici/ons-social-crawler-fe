<script>
export default {
  name: "streams-settings",
}
</script>
<script setup>
import {computed, defineProps, onMounted, ref} from "vue";
import apiService from "@/core/services/ApiService";
import StreamSwitch from "@/views/components/StreamSwitch.vue";
import {flip} from "@popperjs/core";

const props = defineProps({
  statusData: {
    type: Object,
    default: {},
    required: true,
  }
})

const formData = ref({})
formData.value.youTubeStatus = false;
formData.value.twitterStatus = false;
formData.value.twitchStatus = false;
formData.value.youTubeRecordLength = 0;
formData.value.twitterRecordLength = 0;
formData.value.twitchRecordLength = 0;

const minStreamNumber = 250;
const maxStreamNumber = 2500;
const stepStreamNumber = 250;

const onUpdate = () => {
  console.debug('#c o-u: ', formData.value);
  apiService.post(`/stream/status`, formData.value)
      .then(res => console.log('Call successful: ', res))
      .catch(err => console.error(err))
  // todo: gestione errore tramite swal.fire?
}

const onUpdateStream = (stream, active = null) => { // todo: rinominare in onSubmit
  const key = stream + "Status"
  formData.value[key] = active.active
  console.debug('#c ous: ', stream, active);

  // let command = ""
  // let statusValue = null
  // if(active === null) {
  //   command = "start"
  //   statusValue = true
  // } else {
  //   if(active.active) {
  //     command = "start"
  //     statusValue = true
  //   } else {
  //     command = "stop"
  //     statusValue = false
  //   }
  // }
  //
  // apiService.get(`/stream/${stream}/${command}`)
  //     .then(res => console.log('Call successful: ', stream))
  //     .catch(err => console.error(err))
  // // todo: gestione errore tramite swal.fire?

  // props.statusData[stream] = statusValue // innesca la computed che disabilita altri pulsanti e fa vedere messaggio

  // isSwitchDisabled.value = stream !== "twitch" && statusValue ? true : false
}

// const onStreamNumberUpdate = (e) => {
//   console.debug('#c osnu: ', e.srcElement.name);
//   let key = (e.srcElement.name + "RecordLength") ?? ""
//   formData.value[key] = +e.target.value
// }

onMounted(() => {

  formData.value.youTubeStatus = props.statusData?.youTubeFlag ?? false;
  formData.value.twitterStatus = props.statusData?.twitterFlag ?? false;
  formData.value.twitchStatus = props.statusData?.twitchFlag ?? false;

  let fallBackNumber = 250;
  formData.value.youTubeRecordLength = props.statusData?.youTubeLength ?? fallBackNumber;
  formData.value.twitterRecordLength = props.statusData?.twitterLength ?? fallBackNumber;
  formData.value.twitchRecordLength = props.statusData?.twitchLength ?? fallBackNumber;
})



const btnMessage = ref("") // todo: rendere dinamico il testo
// const streamsMessage = ref("")
// const displayStreamName = (input) => {
//   let result = ""
//   switch(input) {
//     case "twitter":
//       result = "Twitter"
//       break;
//     case "youTube":
//       result = "YouTube"
//       break;
//     case "twitch":
//       result = "Twitch"
//       break;
//     default:
//       result = input
//   }
//   return result;
// }

// const isSwitchDisabled = ref(false)
// const isSwitchActive = computed(() => {
//   const streamControls = document.querySelector(".stream-control__container > .stream-button")
//   let stream = streamControls.dataset?.name ?? ""
//
//
//   return props.statusData.twitch
// })
// const isBtnDisabled = computed(() => {
//   for(let key in props.statusData) {
//     if(props.statusData[key]) {
//
//       if(key === "youTube" || key === "twitter") {
//         streamsMessage.value = `Attendere! Aggiornamento di ${displayStreamName(key)} in corso.`
//         isSwitchDisabled.value = true
//       } else if(key === "twitch") {
//         streamsMessage.value = `Attenzione! L’aggiornamento di ${displayStreamName(key)} - in corso - deve essere fermato manualmente.`
//       }
//
//       return true
//     }
//   }
//   isSwitchDisabled.value = false
//   return false
// })

// const onUpdate = (stream, active = null) => { // todo: rinominare in onSubmit
//
//   let command = ""
//   let statusValue = null
//   if(active === null) {
//     command = "start"
//     statusValue = true
//   } else {
//     if(active.active) {
//       command = "start"
//       statusValue = true
//     } else {
//       command = "stop"
//       statusValue = false
//     }
//   }
//
//   apiService.get(`/stream/${stream}/${command}`)
//       .then(res => console.log('Call successful: ', stream))
//       .catch(err => console.error(err))
//   // todo: gestione errore tramite swal.fire?
//
//   // props.statusData[stream] = statusValue // innesca la computed che disabilita altri pulsanti e fa vedere messaggio
//
//   // isSwitchDisabled.value = stream !== "twitch" && statusValue ? true : false
// }

</script>
<template>
  <div class="streams-container streams-settings">
    <div class="streams-description">
      <h4></h4>
    </div>
    <div class="streams-controls">
<!--      <form @submit.prevent="onUpdate"> {{formData.twitchRecordLength}} {{formData.twitchStatus}}-->
      <div class="streams-controls__inputs">
        <div class="stream-control__container">
          <h4><i class="title-icon fa-brands fa-youtube"></i> YouTube</h4>
          <StreamSwitch label="Aggiornamento" label-icon="" name="youTube" :disabled="false" :btn-message="btnMessage" @on-update="onUpdateStream" :isActive="formData.youTubeStatus"/>
          <div class="stream-record-number">
            <label for="twitch-record-number" class="stream-record-number__label">Q.tà commenti</label>
            <input id="twitch-record-number" name="youTube" class="stream-record-number__input" type="number" :min="minStreamNumber" :max="maxStreamNumber" :step="stepStreamNumber" placeholder="250" v-model="formData.youTubeRecordLength" />
          </div>
        </div>

        <div class="stream-control__container">
          <h4><i class="title-icon fa-brands fa-twitch"></i> Twitch</h4>
          <StreamSwitch label="Aggiornamento" label-icon="" name="twitch" :disabled="false" :btn-message="btnMessage" @on-update="onUpdateStream" :isActive="formData.twitchStatus"/>
          <div class="stream-record-number">
            <label for="twitch-record-number" class="stream-record-number__label">Q.tà commenti</label>
            <input id="twitch-record-number" name="twitch" class="stream-record-number__input" type="number" :min="minStreamNumber" :max="maxStreamNumber" :step="stepStreamNumber" placeholder="250" v-model="formData.twitchRecordLength" />
          </div>
        </div>

        <div class="stream-control__container">
          <h4><i class="title-icon fa-brands fa-twitter"></i> Twitter</h4>
          <StreamSwitch label="Aggiornamento" label-icon="" name="twitter" :disabled="false" :btn-message="btnMessage" @on-update="onUpdateStream" :isActive="formData.twitterStatus"/>
          <div class="stream-record-number">
            <label for="twitch-record-number" class="stream-record-number__label">Q.tà commenti</label>
            <input id="twitch-record-number" name="twitter" class="stream-record-number__input" type="number" :min="minStreamNumber" :max="maxStreamNumber" :step="stepStreamNumber" placeholder="250" v-model="formData.twitterRecordLength" />
          </div>
        </div>
      </div>


        <div class="streams-control__actions">
<!--          <input type="submit" value="Invia">-->
          <button @click="onUpdate" class="btn btn-primary">Invia</button>
        </div>
<!--      </form>-->

<!--      <StreamSwitch label="Twitch" label-icon="title-icon fa-brands fa-twitch" name="twitch" :disabled="isSwitchDisabled" :btn-message="btnMessage" @on-update="onUpdate" :isActive="isSwitchActive"/>-->
<!--      <StreamSwitch label="Twitch" label-icon="title-icon fa-brands fa-twitch" name="twitch" :disabled="isSwitchDisabled" :btn-message="btnMessage" @on-update="onUpdate" :isActive="isSwitchActive"/>-->
    </div>
<!--    <div :class="['streams-message', !isBtnDisabled ? '' : 'streams-message&#45;&#45;visible']" >-->
<!--      <p>{{ streamsMessage }}</p>-->
<!--    </div>-->
  </div>
</template>
<style lang="scss">
.streams-settings p {
  margin: 0;
}

.streams-settings {
  width: 100%;
  padding: 1rem;
  position: relative;
  overflow: hidden;

  .streams-description,
  .streams-message {
    //padding: 1rem;
  }

  .streams-description {
    p {
      font-weight: 400;
    }
  }

  .streams-controls {
    //display: flex;
    //flex-direction: column;
    //align-items: center;

    .streams-controls__inputs {
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      column-gap: 3rem;
      row-gap: 5rem;
      padding-top: 2rem;
      padding-bottom: 2.7rem;
      flex-wrap: wrap;

      .stream-control__container {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        min-width: fit-content;

        .stream-record-number {
          text-align: right;

          .stream-record-number__label {
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.2rem;
            margin-right: 1rem;
          }

          .stream-record-number__input {
            border-radius: 4px;
            border: 1px solid lightgrey;
            padding: .15rem 0 .15rem .5rem ;
          }
        }
      }
    }

    .streams-control__actions {
      display: flex;
      justify-content: flex-end;

      button {
        border-radius: 4px;
        border: none;
        //padding: .5rem .7rem;
      }
    }
  }

  .streams-message {
    $stream-message--transition-time: .25s;
    //display: none;
    display: inline-block;
    width: 100%;
    background-color: red;
    border-radius: 0 0 4px 4px;
    padding: .5rem 1.25rem;
    color: white;


    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 150%);
    transition: transform $stream-message--transition-time;

    &.streams-message--visible {
      //display: inline-block;
      transform: translate(-50%, 0%);
      transition: transform $stream-message--transition-time;
    }

    p {
      margin-bottom: 0;
      font-weight: 600;
      overflow-x: auto;
      width: 100%;
      white-space: nowrap;
    }
  }

  @media screen and (max-width: 992px){
    .stream-control__container {

    }
  }
}
</style>
