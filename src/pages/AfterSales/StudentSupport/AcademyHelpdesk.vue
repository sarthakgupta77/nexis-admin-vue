<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <div class="row">
              <h5 id="head-1">Academy Helpdesk</h5>
            </div>
          </div>
          <div class="table-container shadowBoder">

            <template>
              <q-dialog v-model="otpModal">
                <div style="background: #fff; width: 550px;">
                  <q-card>
                    <q-card-section class="row items-center">
                      <q-icon name="check_circle" size="4rem" class="col-12" color="green" />
                      <span class="text-h6 w600 col-12 text-center text-grey">Your OTP is : </span>
                      <span class="text-h4 w600 col-12 text-center q-py-sm"> {{ otp }} </span>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn label="Done" flat color="primary" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </div>
              </q-dialog>
            </template>

            <div class="q-pa-md" style="width: auto">
              <q-form class="q-gutter-xs">
                <q-card class="my-card bg-grey-3 text-white">
                  <q-card-section>
                    <div class="text-h6 head-color">Login OTP</div>
                  </q-card-section>
                  <q-card-section>
                    <div class="row">
                      <label class="col-md-12 head-color q-pa-xs" style="font-weight: 600">
                        Enter Student Email:
                      </label>
                      <div class="col-md-8">
                        <div class="row">
                          <q-input dense square outlined class="col-md-9" v-model="email" lazy-rules
                            placeholder="Enter Email" />
                        </div>
                      </div>
                    </div>
                    <div class="create-submit-btn q-mt-xl">
                      <q-btn label="Get OTP" @click="getOtp" class="q-mr-md submit-btn" />
                      <q-btn class="submit-btn" label="Go To Academy" @click="goToAcademy" />
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
import { onBeforeMount, reactive, ref } from "vue";
import { api, local } from "../../../boot/axios";
import { Notify } from 'quasar'

const email = ref('')
const otp = ref('')
const otpModal = ref(false)

const getOtp = () => {
  api.post('academy-login-otp', {
    email: email.value
  }).then((response) => {
    otp.value = response.data.msg
    otpModal.value = true
  })
}

const goToAcademy = () => {
  api.post('goto-academy', {
    email: email.value
  }).then((response) => {
    window.open('http://academy.datatrained.com/academyDte?' + 'user=' + response.data.user + '&stu_name=' + response.data.stu_name + '&userToken=' + response.data.access_token, '_blank', "incognito");
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
</style>
