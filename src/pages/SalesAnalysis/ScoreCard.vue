<template>
  <div>
    <div class="row">
      <div v-if="partyPopup" class="col-12">
        <q-img class="sidebarSearchDropdown" src="../../assets/imgAssets/output-onlinegiftools.gif" alt="" />
        <audio autoplay>
          <source src="../../assets/imgAssets/clap.mp3">
        </audio>
      </div>
    </div>

    <div class="controlAnimation" >
      <!-- <q-btn label="Show" /> -->
      <q-btn  v-if="(status == 0)" @click="checkStatus(status = 1)" color="green" text-color="white" icon="change_circle">
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
          transition-hide="scale">
          Change To Active
        </q-tooltip>
      </q-btn>
      <q-btn v-if="(status == 1)" color="red" text-color="white" icon="change_circle" @click="checkStatus(status = 0)">
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
          transition-hide="scale">
          Change To InActive
        </q-tooltip>
      </q-btn>
    </div>

    <!-- <div>
      <q-btn @click="runParty">
        Confirm
      </q-btn>
    </div> -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Notify, LocalStorage } from 'quasar'

let partyPopup = ref(false);
const status = ref('');


const checkStatus = (status) => {
  if (status == 1) {
    partyPopup.value = true;
    setTimeout(() => {
      partyPopup.value = false;
    }, 4500)
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'amber-7',
      message: "Animation Activated"
    })
  }
  else if (status == 0) {
    partyPopup.value = false;
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'amber-7',
      message: "Animation Inactive"
    })
  }

}


</script>

<style>
.sidebarSearchDropdown {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 9999 !important;
}
</style>
