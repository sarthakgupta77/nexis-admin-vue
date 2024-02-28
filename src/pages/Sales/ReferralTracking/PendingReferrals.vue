<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Pending Referrals</h5>
          </div>

          <q-dialog maximized style="padding: 0;" persistent v-model="disburseModal" full-height position="right">
            <q-card class="createNew">
              <q-card-section class="q-pa-none">
                <div class="row create-header q-pa-md" style="justify-content:space-between">
                  <span class="text-h6 w600">Disburse Referral Case</span>
                  <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                </div>
                <div>
                  <q-separator class="q-pa-none" color="primary" />
                </div>
                <div class="q-pa-md">
                  <div class="row">
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Disburse Amount
                      </label>
                      <q-input dense outlined v-model="disburse_amount" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Disburse Amount']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Disburse Date
                      </label>
                      <q-input type="date" dense outlined v-model="disburse_date" color="secondary" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Disburse Date']" />
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="row bg-white q-pa-none">
                <div class="col-12 q-py-md">
                  <q-separator />
                </div>
                <div class="col-12 row q-pa-md" style="justify-content: space-between;">
                  <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" @click="onReset" />
                  <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" @click="disburseReferral"
                    label="Disburse" />
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th class="text-center" scope="col">#</th>
                  <th scope="col">Reference Details
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'name', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'name', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Referred By
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'referrer_name', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'referrer_name', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col" style="width: 14%">Referrer Batch & Course</th>
                  <th scope="col" style="width: 9%">Disburse Date</th>
                  <th scope="col">Note</th>
                  <th class="text-center" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="refer in data.referrals">
                  <td class="text-center"> {{ count++ }} </td>

                  <td>
                    <q-icon name="person" size="xs" color="primary" class="q-mr-xs" /> {{ refer.name }} <br>
                    <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" /> {{ refer.email }} <br>
                    <q-icon name="call" size="xs" color="primary" class="q-mr-xs" /> {{ refer.phone }} <br>
                    <b>Course : &nbsp;</b> {{ refer.course }}
                  </td>
                  <td>
                    <q-icon name="person" size="xs" color="green" class="q-mr-xs" /> {{ refer.referrer_name }} <br>
                    <q-icon name="mail" size="xs" color="green" class="q-mr-xs" /> {{ refer.referrer_email }} <br>
                    <q-icon name="call" size="xs" color="green" class="q-mr-xs" /> {{ refer.referrer_phone }} <br>
                    <b>Existing Student ? : &nbsp;</b> {{ refer.is_referrer_student }}
                  </td>
                  <td v-if="refer.is_referrer_student == 'Yes'">
                    <b>Batch : &nbsp;</b> {{ refer.referrer_batch }} <br>
                    <b>Course : &nbsp;</b> {{ refer.referrer_course }}
                  </td>
                  <td v-else></td>
                  <td> {{ refer.reward_disburse_date }} </td>
                  <td> {{ refer.note }} </td>
                  <td class="text-center">
                    <div>
                      <q-btn outline dense label="Disburse" class="q-px-md" color="primary"
                        @click="openDisburseModal(id = refer.id)" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="shadowBoder col-md-12 ">
          <div>
            <p class="w600 q-ma-none flex flex-center float-left"> Showing data between {{ Number(data.from) }} to {{
              Number(data.to) }} out of {{ Number(data.total) }}</p>
            <div v-if="showElement">
              <q-pagination id="hide-pagination" class="flex float-right" v-model="current" @click="paginate(current)"
                :max="Number(data.last_page)" :max-pages="10" :boundary-numbers="true" direction-links />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
let upArrow = ref(true);
const current = ref(1)
const showElement = ref(true)
const disburseModal = ref(false)
const disburse_amount = ref('')
const disburse_date = ref(null)
const u_id = LocalStorage.getItem('u_id')
const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
})

let count = 1;
const data = reactive({
  referrals: [],
  courses: [],
  from: '',
  to: '',
  total: '',
  last_page: '',
  id: null
});

window.onresize = function () {
  count = 1;
}

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.referrals.sort((a, b) => {
          let fa = a[field].toLowerCase();
          let fb = b[field].toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        })
        break;
    }
  }
  else if (direction == 'dsc') {
    upArrow = true;
    count = 1;
    switch (field) {
      case field:
        data.referrals.sort((a, b) => {
          let fa = a[field].toLowerCase();
          let fb = b[field].toLowerCase();

          if (fa > fb) {
            return -1;
          }
          if (fa < fb) {
            return 1;
          }
          return 0;
        })
    }
  }
}

const openDisburseModal = (id) => {
  disburseModal.value = true
  count = 1
  data.id = id
}

const disburseReferral = () => {
  if (disburse_date.value !== null) {
    api.post('disburse-referral-reward', {
      referral_id: data.id,
      user_id: u_id,
      disburse_amount: disburse_amount.value,
      reward_disbursed_on: disburse_date.value
    }).then((res) => {
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'green',
        message: res.data.msg
      })
      disburseModal.value = false
      count = 1
      api.get("pending-referrals").then(response => {
        data.referrals = response.data.data.data;
        data.from = response.data.data.from
        data.last_page = response.data.data.last_page
        data.to = response.data.data.to
        data.total = response.data.data.total
        api.get('course').then((res) => {
          data.courses = res.data.course
          convertCourseCode(data.referrals)
          count = 1;
          Loading.hide()
        })
      })
    }).catch((err) => {
      console.log('Error: ', err)
    })
  } else {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: 'Please provide a Disburse Date'
    })
  }
}

const onReset = () => {
  disburse_amount.value = ''
  disburse_date.value = null
  count = 1
}

const convertCourseCode = (array) => {
  array.forEach((refer) => {
    let obj = data.courses.find(({ id }) => id == refer.course)
    refer.course = obj.title
    if (refer.is_referrer_student == 'Yes') {
      let obj1 = data.courses.find(({ id }) => id == refer.referrer_course)
      refer.referrer_course = obj1.title
    }
  })
}

const paginate = async (current) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  await api.get("https://genesis.datatrained.com/api/admin/pending-referrals?page=" + current).then((response) => {
    data.referrals = response.data.data.data;
    convertCourseCode(data.referrals)
    data.from = response.data.data.from
    data.to = response.data.data.to
    data.total = response.data.data.total
    count = 1
    Loading.hide();
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

  api.get("pending-referrals").then(response => {
    data.referrals = response.data.data.data;
    data.from = response.data.data.from
    data.last_page = response.data.data.last_page
    data.to = response.data.data.to
    data.total = response.data.data.total
    api.get('course').then((res) => {
      data.courses = res.data.course
      convertCourseCode(data.referrals)
      count = 1;
      Loading.hide()
    })
  })

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('story')) {
      state[key] = true
    }

  });

  function checkEvent(keys) {
    return keys.includes('story');
  }
});
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
    font-weight: 500;
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

.heading {
  margin-left: 7px;
  padding-block: 10px;
}

.head-2 {
  margin-left: 5px;
  font-size: 20px;
  font-weight: 500;
}

table {
  padding: 5px;

  td,
  th {
    border: 1px solid #e6e6e6;
  }
}

td,
th {
  padding: 5px 10px;
}

th {
  font-weight: 600;
  font-size: 14px;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}

.createNew {
  width: 600px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}
</style>
