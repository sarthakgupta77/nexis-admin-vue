<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <div class="row">
              <h5 id="head-1">Upload Leads to NPF</h5>
            </div>
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-icon name="error" size="4rem" class="col-12" color="red" />
                <span class="text-h5 w600 col-12 text-center q-py-sm">Are You Sure?</span>
                <span class="text-subtitle1 w600 col-12 text-center text-grey">You won't be able to revert this!</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn label="Yes, Delete !" color="red" @click="removeLeads" />
                <q-btn label="Cancel" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <div style="width: auto">
              <q-form class="row" style="justify-content: space-between">
                <q-card class="col-12 row text-white bg-grey-3">
                  <q-card-section class="col-6">
                    <div class="row">
                      <label class="w600 q-pb-md col-12 text-h6 text-black text1">
                        Upload Domestic / International Leads CSV File
                      </label>
                      <div class="col-12 q-py-md row buttons">
                        <q-file dense square outlined v-model="data.leadsFile" class="col-md-9 input-box" lazy-rules label="Choose CSV File" />
                        <q-btn class="col-3 browes-btn" color="primary" v-model="data.leadsFile" label="browse" @click="$refs.fileInput2.$el.click();" />
                      </div>
                      <div class="q-pt-md row col-12" style="justify-content: space-between">
                        <div class="button2">
                          <q-btn outline label="Reset" class="q-mr-sm reset-btn" color="primary" />
                          <q-btn label="Upload Leads" class="q-mr-sm upload-btn" color="primary" @click="uploadLeads" />
                        </div>
                        <!-- <q-btn outline label="Download Sample File" icon="download" color="primary" /> -->
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card class="col-12 q-mt-md text-white bg-grey-3">
                  <q-card-section>
                    <div class="row">
                      <span class="text-h6 q-pb-md col-12 text-black w600 text1">Manage Leads</span>
                      <label class="col-12 text-black w600 text-subtitle1 q-py-md text1"> Total ({{ data.leads.length }}) Records Found </label>
                      <div class="q-pt-md">
                        <q-btn label="Remove All Records" class="q-mr-sm remove-btn" color="red-5" @click="confirm = true" />
                        <q-btn label="Transfer" color="primary" class="transfer-btn" @click="transferLeads" />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { onBeforeMount, reactive, ref } from "vue";

const confirm = ref(false)

const data = reactive({
  leads: [],
  leadsFile: null,
  FormData: null
})

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


function transferLeads() {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get('get-leads')
    .then(function (res) {
      res.data.data.forEach((data) => {
        api.post('transfer-leads-to-npf', {
          data
        })
          .then(function (res) {
            // console.log(res.response.status)
          })
          .catch(function (error) {
            // console.log(error.response.status == 500);
            var email = JSON.parse(error.response.config.data).data.email;
            console.log(email)
          });
        sleep(60000);
      })
      Loading.hide()
    })
    .catch(function (error) {
      console.log(error);
    });
}

const uploadLeads = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.FormData = new FormData();
  data.FormData.append("npfLeads", data.leadsFile)
  api.post('upload-npf-leads', data.FormData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  }).then((response)=>{
    Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'green',
        message: response.data.msg
      })
      data.leadsFile = null
      Loading.hide()
  }).catch((err)=>{
    console.log('Error:',err)
  })
}

const removeLeads = () =>{
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post('remove-npf-leads').then((response)=>{
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red-7',
      message: response.data.msg
    })
    Loading.hide()
  }).catch((err)=>{
    console.log('Error:',err)
  })
}

onBeforeMount(()=>{
  api.get('get-leads').then((response)=>{
    data.leads = response.data.data
  })
})
</script>
<style scoped lang="scss">
.head-btn-box {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  #back-btn:hover {
    color: #7b94e6 !important;
  }

  h5 {
    margin: 0;
    font-weight: 500;
  }

  #head-1 {
    padding-top: 4px;
  }
}

.container {
  width: auto;
  height: 100%;
}

.browes-btn {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.create-submit-btn {
  display: flex;
  justify-content: flex-start;
  // margin-top: 2rem;
}

@media only screen and (min-width: 1024px)
 and (max-width: 1366px)
  and (orientation: portrait){
    .head-btn-box{
      height: 4vh;
    }
    h5{
      font-size: 16px;
    }
    .text1{
      font-size: 15px;
    }
    .browes-btn{
      margin-left: -24px;
    }
   .table-container{
    padding: 20px 20px;
   }

  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1023px) and (orientation : portrait){

    .head-btn-box{
      height: 4vh;
    }
    h5{
      font-size: 14px;
    }
    .text1{
      font-size: 14px;
    }

   .table-container{
    padding: 20px 20px;
   }
  //  .input-box{
  //   width: 177px;
  //  }
  .buttons{
    display: flex;
  }
  .input-box{
    width: 140px;
    font-size: 12px;
  }
      .browes-btn{
      font-size: 11px;
    width: 70px;
    margin-right: -73px;

 }
 .button2{
  display: flex;
 }
 .reset-btn{
  font-size: 11px;
    width: 70px;
    padding: 0;
    height: 2vh;
 }
 .upload-btn{
  font-size: 11px;
    width: 95px;
    padding: 0;
    height: 2vh;
 }
 .buttons{
  .q-file{
    font-size: 12px;
  }
 }
 .remove-btn{
  width: 151px;
    font-size: 11px;
 }
 .transfer-btn{
  width: 80px;
    font-size: 12px;
 }
}
</style>
