<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5>Sales Settings</h5>
          </div>

          <div class="table-container shadowBoder">
            <div class="row q-px-md" v-for="setting in data.settings">
              <div class="col-12 row q-py-sm" style="align-items: center;">
                <label class="w600 col-2 text-subtitle1"> {{ setting.name }} </label>
                <q-input dense outlined class="col-4" v-model="setting.value" />
              </div>
            </div>
            <div class="q-py-md">
              <q-separator inset />
            </div>
            <div class="row q-px-md" style="justify-content: flex-end">
              <q-btn glossy label="Save Changes" @click="updateSettings" color="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { onBeforeMount, reactive, ref } from 'vue'
import { Loading, QSpinnerPie, Notify } from 'quasar'

const data = reactive({
  settings: []
})

const updateSettings = () =>{
  api.post('update-sales-settings',{

  })
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get('sales-settings').then((response)=>{
    data.settings = response.data.data
    Loading.hide()
  })

  // const rights = access.filter(checkEvent);
  // rights.forEach(function (el) {
  //   let key = el.split('.')[1]
  //   if (el.includes('assessment')) {
  //     state[key] = true
  //   }

  // });

  // function checkEvent(keys) {
  //   return keys.includes('assessment');
  // }
})
</script>

<style lang="scss" scoped>
.head-btn-box {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  h5 {
    margin: 0;
    font-weight: 600;

  }
}

.container {
  width: auto;
  height: 100%;
}

.table-container {
  background-color: #fff;
  padding: 15px;
  width: auto;
}

</style>
