<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <div class="row">
              <h5 id="head-1">Bulk Upload</h5>
            </div>
          </div>
          <q-tabs v-model="tab" align="left" dense active-color="primary">
            <q-tab name="uploader" label="Upload File" class="q-mr-sm" />
            <q-tab name="template" label="Certificate template" @click="showTextLoading" />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="uploader">
              <div class="table-container shadowBoder">
                <q-card class="my-card bg-grey-3 text-white">
                  <q-form @submit="uploadCertificates" @reset="resetCertificates">
                    <q-card-section>
                      <div class="text-h6 head-color">Upload Certificates File</div>
                    </q-card-section>

                    <q-card-section>
                      <div class="row">
                        <label class="col-md-12 head-color q-pa-xs" style="font-weight: 600">
                          Upload Certificates File
                        </label>
                        <div class="col-md-6">
                          <div class="row">
                            <q-file dense square outlined ref="fileInput1" class=" col-md-9" label="Choose CSV File"
                              v-model="data.cardsFile" lazy-rules
                              :rules="[val => val != null || 'Please Upload Certificate File']" />
                            <q-btn class="col-md-3  browes-btn" label="browse" @click="$refs.fileInput1.$el.click();" />
                          </div>
                        </div>
                        <div class="create-event-btn col-md-6">
                          <q-btn color="primary" outline class="col-md-2 " style="height: 40px" type="button"
                            @click="downloadSampleCertificate" label="Download Sample File" />
                        </div>
                      </div>
                      <div class="create-submit-btn q-mt-md">
                        <q-btn outline label="Reset" type="reset" color="primary" class="q-mr-md" />
                        <q-btn class="submit-btn" label="Submit" type="submit" />
                      </div>
                    </q-card-section>
                  </q-form>
                </q-card>

                <q-card class="my-card bg-grey-3 q-mt-lg text-white">
                  <q-form @submit="uploadWebinarCertificates" @reset="resetWebinarCertificates">
                    <q-card-section>
                      <div class="text-h6 head-color">Upload Webinar Certificates File</div>
                    </q-card-section>
                    <q-card-section>
                      <div class="row">
                        <label class="col-md-12 head-color q-pa-xs" style="font-weight: 600">
                          Upload Webinar Certificates File
                        </label>
                        <div class="col-md-6">
                          <div class="row">
                            <q-file dense square outlined ref="fileInput3" class=" col-md-9" label="Choose CSV File"
                              v-model="data.webinarCertFile" lazy-rules
                              :rules="[val => val != null || 'Please Upload Webinar Certificate File']" />
                            <q-btn class="col-md-3 browes-btn" label="browse" @click="$refs.fileInput3.$el.click();" />
                          </div>
                        </div>
                        <!-- <div class="create-event-btn col-md-6">
                            <q-btn color="primary" outline class="col-md-2 " type="button"
                              @click="downloadSampleCertificate" style="height: 40px" label="Download Sample File" />
                          </div> -->
                      </div>
                      <div class="create-submit-btn q-mt-xl">
                        <q-btn outline label="Reset" type="reset" color="primary" class="q-mr-md" />
                        <q-btn class="submit-btn" label="Submit" type="submit" />
                      </div>
                    </q-card-section>
                  </q-form>
                </q-card>

                <q-card class="my-card bg-grey-3 q-mt-lg text-white">
                  <q-form @submit="uploadCards" @reset="resetReports">
                    <q-card-section>
                      <div class="text-h6 head-color">Upload Report Card File</div>
                    </q-card-section>
                    <q-card-section>
                      <div class="row">
                        <label class="col-md-12 head-color q-pa-xs" style="font-weight: 600">
                          Upload Report Card File
                        </label>
                        <div class="col-md-6">
                          <div class="row">
                            <q-file dense square outlined ref="fileInput2" class=" col-md-9" label="Choose CSV File"
                              v-model="data.marksFile" lazy-rules
                              :rules="[val => val != null || 'Please Upload Report Card File']" />
                            <q-btn class="col-md-3 browes-btn" label="browse" @click="$refs.fileInput2.$el.click();" />
                          </div>
                        </div>
                        <div class="create-event-btn col-md-6">
                          <q-btn color="primary" outline style="height: 40px" class="col-md-2 "
                            label="Download Sample File" />
                        </div>
                      </div>
                      <div class="create-submit-btn q-mt-md">
                        <q-btn outline label="Reset" type="reset" color="primary" class="q-mr-md" />
                        <q-btn class="submit-btn" label="Submit" type="submit" />
                      </div>
                    </q-card-section>
                  </q-form>
                </q-card>
              </div>
            </q-tab-panel>
            <q-tab-panel name="template">
              <div class="row shadowBoder ">
                <div class="col-3 q-pl-sm relative-position  photo-size">
                  <div class="card-example" v-if="visible == true">
                    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
                      label-style="font-size: 1.1em" />
                  </div>
                  <div v-show="showSimulatedReturnData">
                    <a href="https://admin.datatrained.com/img/certificates/1.png" target="_blank">
                      <img src="https://admin.datatrained.com/img/certificates/1.png" alt=""
                        style="height: 80%; width: 100%;">
                    </a>
                    <h6 class="q-mt-xs q-pl-md">Certificate ID-1</h6>
                  </div>
                </div>
                <div class="col-3 q-pl-sm relative-position photo-size">
                  <div class="card-example" v-if="visible == true">
                    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
                      label-style="font-size: 1.1em" />
                  </div>
                  <div v-show="showSimulatedReturnData">
                    <a href="https://admin.datatrained.com/img/certificates/2.png" target="_blank">
                      <img src="https://admin.datatrained.com/img/certificates/2.png" alt=""
                        style="height: 80%; width: 100%;">
                    </a>
                    <h6 class="q-mt-xs q-pl-md">Certificate ID-2</h6>
                  </div>
                </div>
                <div class="col-3 q-pl-sm relative-position photo-size">

                  <div class="card-example" v-if="visible == true">
                    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
                      label-style="font-size: 1.1em" />
                  </div>
                  <div v-show="showSimulatedReturnData">
                    <a href="https://admin.datatrained.com/img/certificates/3.png" target="_blank">
                      <img src="https://admin.datatrained.com/img/certificates/3.png" alt=""
                        style="height: 80%; width: 100%;">
                    </a>
                    <h6 class="q-mt-xs q-pl-md">Certificate ID-3</h6>
                  </div>
                </div>
                <div class="col-3 q-pl-sm relative-position photo-size">
                  <div class="card-example" v-if="visible == true">
                    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
                      label-style="font-size: 1.1em" />
                  </div>
                  <div v-show="showSimulatedReturnData">
                    <a href="https://admin.datatrained.com/img/certificates/4.png" target="_blank">
                      <img src="https://admin.datatrained.com/img/certificates/4.png" alt=""
                        style="height: 80%; width: 100%;">
                    </a>
                    <h6 class="q-mt-xs q-pl-md">Certificate ID-4</h6>
                  </div>
                </div>
                <div class="col-3 q-pl-sm relative-position photo-size">
                  <div class="card-example" v-if="visible == true">
                    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
                      label-style="font-size: 1.1em" />
                  </div>
                  <div v-show="showSimulatedReturnData">
                    <a href="https://admin.datatrained.com/img/certificates/5.png" target="_blank">
                      <img src="https://admin.datatrained.com/img/certificates/5.png" alt=""
                        style="height: 80%; width: 100%;">
                    </a>
                    <h6 class="q-mt-xs q-pl-md">Certificate ID-5</h6>
                  </div>
                </div>
                <div class="col-3 q-pl-sm relative-position photo-size">
                  <div class="card-example" v-if="visible == true">
                    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
                      label-style="font-size: 1.1em" />
                  </div>
                  <div v-show="showSimulatedReturnData">
                    <a href="https://admin.datatrained.com/img/certificates/6.png" target="_blank">
                      <img src="https://admin.datatrained.com/img/certificates/6.png" alt=""
                        style="height: 80%; width: 100%;">
                    </a>
                    <h6 class="q-mt-xs q-pl-md">Certificate ID-6</h6>
                  </div>
                </div>
                <div class="col-3 q-pl-sm relative-position photo-size">
                  <div class="card-example" v-if="visible == true">
                    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
                      label-style="font-size: 1.1em" />
                  </div>
                  <div v-show="showSimulatedReturnData">
                    <a href="https://admin.datatrained.com/img/certificates/7.png" target="_blank">
                      <img src="https://admin.datatrained.com/img/certificates/7.png" alt=""
                        style="height: 80%; width: 100%;">
                    </a>
                    <h6 class="q-mt-xs q-pl-md">Certificate ID-7</h6>
                  </div>
                </div>
                <div class="col-3 q-pl-sm relative-position photo-size">
                  <div class="card-example" v-if="visible == true">
                    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
                      label-style="font-size: 1.1em" />
                  </div>
                  <div v-show="showSimulatedReturnData">
                    <a href="https://admin.datatrained.com/img/certificates/8.png" target="_blank">
                      <img src="https://admin.datatrained.com/img/certificates/8.png" alt=""
                        style="height: 80%; width: 100%;">
                    </a>
                    <h6 class="q-mt-xs q-pl-md">Certificate ID-8</h6>
                  </div>
                </div>
                <div class="col-3 q-pl-sm relative-position photo-size">
                  <div class="card-example" v-if="visible == true">
                    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
                      label-style="font-size: 1.1em" />
                  </div>
                  <div v-show="showSimulatedReturnData">
                    <a href="https://admin.datatrained.com/img/certificates/9.png" target="_blank">
                      <img src="https://admin.datatrained.com/img/certificates/9.png" alt=""
                        style="height: 80%; width: 100%;">
                    </a>
                    <h6 class="q-mt-xs q-pl-md">Certificate ID-9</h6>
                  </div>
                </div>
                <div class="col-3 q-pl-sm relative-position photo-size">
                  <div class="card-example" v-if="visible == true">
                    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
                      label-style="font-size: 1.1em" />
                  </div>
                  <div v-show="showSimulatedReturnData">
                    <a href="https://admin.datatrained.com/img/certificates/10.png" target="_blank">
                      <img src="https://admin.datatrained.com/img/certificates/10.png" alt=""
                        style="height: 80%; width: 100%;">
                    </a>
                    <h6 class="q-mt-xs q-pl-md">Certificate ID-10</h6>
                  </div>
                </div>
                <div class="col-3 q-pl-sm relative-position photo-size">
                  <div class="card-example" v-if="visible == true">
                    <q-inner-loading :showing="visible" label="Please wait..." label-class="text-teal"
                      label-style="font-size: 1.1em" />
                  </div>
                  <div v-show="showSimulatedReturnData">
                    <a href="https://admin.datatrained.com/img/certificates/11.png" target="_blank">
                      <img src="https://admin.datatrained.com/img/certificates/11.png" alt=""
                        style="height: 80%; width: 100%;">
                    </a>
                    <h6 class="q-mt-xs q-pl-md">Certificate ID-11</h6>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { api, local } from "../../boot/axios";
import { Loading, Notify, QSpinnerPie } from 'quasar'


const tab = ref('uploader');
const visible = ref(false)
const showSimulatedReturnData = ref(false)
const value = ref(false)
const five = 5;

const data = reactive({
  cards: null,
  cardsFile: null,
  webinar: null,
  webinarCertFile: null,
  marks: null,
  marksFile: null,
});

const showTextLoading = () => {
  visible.value = true
  showSimulatedReturnData.value = false

  setTimeout(() => {
    visible.value = false
    showSimulatedReturnData.value = true
  }, 3000)
}

const resetCertificates = () => {
  data.cardsFile = null
}
const resetReports = () => {
  data.marksFile = null
}
const resetWebinarCertificates = () => {
  data.webinarCertFile = null
}

const downloadSampleCertificate = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get("download-sample-certificate-file", {

  }).then(response => {
    data.certs = response.data
    let csv = data.certs;

    const anchor = document.createElement('a');
    anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    // anchor.target = '_blank';
    anchor.download = 'CertificatesSample.csv';
    anchor.click();
    Loading.hide()
  });
}
const uploadCertificates = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.marks = new FormData();
  data.marks.append("certificates", data.cardsFile)
  api.post('upload-certificates', data.marks, {
    header: {
      "content-type": "multipart/form-data",
    },
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    data.cardsFile = null
    Loading.hide()
  }).catch((error) => {
    console.log(error)
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: "Failed - Please Check the Data Format."
    })
  })
}
const uploadWebinarCertificates = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.webinar = new FormData();
  data.webinar.append("webinarCertificates", data.webinarCertFile)
  api.post('upload-webinar-certificates', data.webinar, {
    header: {
      "content-type": "multipart/form-data",
    },
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    data.webinarCertFile = null
    Loading.hide()
  }).catch((error) => {
    console.log(error)
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: "Failed - Please Check the Data Format."
    })
  })
}

const uploadCards = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.cards = new FormData();
  data.cards.append("reportCard", data.marksFile)
  api.post('upload-cards', data.cards, {
    header: {
      "content-type": "multipart/form-data",
    },
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    data.marksFile = null
    Loading.hide()
  }).catch((error) => {
    console.log(error)
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: "Failed - Please Check the Data Format."
    })

  })
}
</script>
<style lang="scss" scoped>
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
  background-color: #3b49e7;
  color: #fff;
  height: 40px;
}

.create-submit-btn {
  display: flex;
  justify-content: flex-start;
  // margin-top: 2rem;
}

.head-color {
  color: rgb(22, 22, 22);
}

.template-box {
  width: 100px;
  height: 100px;
  background-color: #7b94e6;
}

.template-box-container {
  display: grid;
  grid-template-columns: auto auto auto;
}

.card-example {
  width: 280px;
  height: 237px;
}

@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
  .browes-btn {
    margin-left: -22px;
  }

}

@media only screen and (min-device-width: 768px) and (max-device-width: 1023px) and (orientation : portrait) {
  .photo-size {
    width: 200px !important;
  }
}
</style>
