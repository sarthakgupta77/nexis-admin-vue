<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">My Referrals</h5>
            <q-btn label="create new" class="create-btn" @click="createNewModal = true" />
          </div>

          <q-dialog maximized style="padding: 0;" persistent v-model="createNewModal" full-height position="right">
            <q-card class="createNew">
              <q-card-section class="q-pa-none">
                <div class="row create-header q-pa-md" style="justify-content:space-between">
                  <span class="text-h6 w600">Add New Referral Case</span>
                  <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                </div>
                <div>
                  <q-separator class="q-pa-none" color="primary" />
                </div>
                <div class="q-pa-md">
                  <div class="row">
                    <label class="text-h6 w600 q-pb-md">Reference Details</label>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Name
                      </label>
                      <q-input dense outlined v-model="reference.name" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Reference Name']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Email
                      </label>
                      <q-input dense outlined v-model="reference.email" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Reference Email']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Phone
                      </label>
                      <q-input dense outlined v-model="reference.phone" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Reference Phone']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">Course</label>
                      <q-select dense outlined color="secondary" :options="data.filteredCourses" option-value="id"
                        option-label="title" :popup-content-style="{ width: '400px', height: '70%' }"
                        v-model="reference.course" use-input @filter="filterFn" lazy-rules emit-value map-options
                        :rules="[val => val !== null || 'Please Enter Batch Course']" class="col-9" />
                    </div>
                  </div>
                  <div class="q-py-md col-12">
                    <q-separator color="primary" />
                  </div>
                  <div class="row">
                    <label class="text-h6 w600 q-pb-md">Referred By</label>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Name
                      </label>
                      <q-input dense outlined v-model="referrer.name" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Referrer Name']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Email
                      </label>
                      <q-input dense outlined v-model="referrer.email" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Referrer Email']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Phone
                      </label>
                      <q-input dense outlined v-model="referrer.phone" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Referrer Phone']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline;">
                      <label class="col-3 w600">Is referrer our student</label>
                      <q-select dense outlined color="secondary" :options="options" v-model="referrer.is_existing"
                        lazy-rules :rules="[val => val !== null || 'Please Select an Option']" class="col-9" />
                    </div>
                    <div v-if="referrer.is_existing == 'Yes'" class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Referrer's Course
                      </label>
                      <q-select dense outlined color="secondary" :options="data.filteredCourses" option-value="id"
                        option-label="title" :popup-content-style="{ width: '400px', height: '70%' }"
                        v-model="referrer.course" use-input @filter="filterFn" lazy-rules emit-value map-options
                        :rules="[val => val !== null || 'Please Enter Batch Course']" class="col-9" />
                    </div>
                    <div v-if="referrer.is_existing == 'Yes'" class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Referrer's Batch
                      </label>
                      <q-select dense outlined color="secondary" :options="data.batches"
                        :popup-content-style="{ width: '400px', height: '70%' }" v-model="referrer.batch" lazy-rules
                        :rules="[val => val !== null || 'Please Select an Option']" class="col-9" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Disburse Date
                      </label>
                      <q-input type="date" dense outlined v-model="referrer.disburse_date" color="secondary" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Select Reward Disburse Date']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Notes
                      </label>
                      <q-input autogrow dense outlined v-model="referrer.note" color="secondary" class="col-9" />
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="row bg-white q-pa-none">
                <div class="col-12 q-pt-md">
                  <q-separator />
                </div>
                <div class="col-12 row q-pa-md" style="justify-content: space-between;">
                  <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" @click="onReset" />
                  <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" @click="createReferralCase"
                    label="Create" />
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th class="text-center" scope="col">#</th>
                  <th style="width: 23%" scope="col">Reference Details
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
                  <th scope="col">Note</th>
                  <th style="width: 15%" scope="col">Status</th>
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
                    <b>Existing Student ? : &nbsp;</b> {{ refer.is_referrer_student }} <br>
                    <b>Course : &nbsp;</b> {{ refer.referrer_course }}
                  </td>
                  <td> {{ refer.note }} </td>
                  <td>
                    <div style="display: flex;align-items: center">
                      <b>Status : &nbsp;</b>
                      <q-chip v-if="refer.reward_disbursed_on !== null" color="primary" text-color="white">
                        Disbursed
                      </q-chip>
                      <q-chip v-else color="red" text-color="white">
                        Pending
                      </q-chip>
                    </div>
                      <b>Disburse Date : &nbsp;</b> {{ refer.reward_disburse_date }}
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

const createNewModal = ref(false)

const route = useRoute();
const router = useRouter();
let upArrow = ref(true);
const current = ref(1);
const showElement = ref(true);
const u_id = LocalStorage.getItem('u_id')
const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  disburse: ref(false),
})

const reference = reactive({
  name: '',
  email: '',
  phone: '',
  course: null
})

const referrer = reactive({
  name: '',
  email: '',
  phone: '',
  is_existing: null,
  course: null,
  batch: null,
  disburse_date: null,
  note: ''
})

let count = 1;
const data = reactive({
  referrals: [],
  courses: [],
  filteredCourses: [],
  batches: [],
  from: '',
  to: '',
  total: '',
  last_page: ''
});

const options = ['Yes', 'No']

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

const createReferralCase = () => {
  api.post('add-referral', {
    user_id: u_id,
    name: reference.name,
    email: reference.email,
    phone: reference.phone,
    course: reference.course,
    referrer_name: referrer.name,
    referrer_email: referrer.email,
    referrer_phone: referrer.phone,
    is_referrer_student: referrer.is_existing,
    referrer_course: referrer.course,
    referrer_batch: referrer.batch,
    reward_disburse_date: referrer.disburse_date,
    note: referrer.note
  }).then((res) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: res.data.msg
    })
    createNewModal.value = false
    count = 1
    api.get("my-referrals", { params: { user_id: u_id } }).then(response => {
      data.referrals = response.data.data.data
      data.to = response.data.data.to
      data.from = response.data.data.from
      data.total = response.data.data.total
      data.last_page = response.data.data.last_page
      api.get('course').then((res) => {
        data.courses = res.data.course
        data.filteredCourses = data.courses
        convertCourseCode(data.referrals)
        count = 1;
        Loading.hide()
      })
    })
  }).catch((err) => {
    console.log('Error:', err)
  })
}

const filterFn = (val, update) => {
  update(() => {
    if (val === '') {
      data.filteredCourses = data.courses
    }
    else {
      const needle = val.toLowerCase()
      data.filteredCourses = data.courses.filter(
        v => v.title.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

const onReset = () => {
  reference.name = ''
  reference.email = ''
  reference.phone = ''
  reference.course = null
  referrer.name = ''
  referrer.email = ''
  referrer.phone = ''
  referrer.is_existing = null
  referrer.disburse_date = null
  referrer.note = ''
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
    // console.log(obj)
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

  await api.get("https://genesis.datatrained.com/api/admin/my-referrals?page=" + current, { params: { user_id: u_id } }).then((response) => {
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

  api.get("my-referrals", { params: { user_id: u_id } }).then(response => {
    data.referrals = response.data.data.data
    data.to = response.data.data.to
    data.from = response.data.data.from
    data.total = response.data.data.total
    data.last_page = response.data.data.last_page
    api.get('course').then((res) => {
      data.courses = res.data.course
      data.filteredCourses = data.courses
      convertCourseCode(data.referrals)
      count = 1;
      Loading.hide()
    })
  })

  api.get('all-batches').then((res) => {
    data.batches = res.data.batches
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
  width: 750px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}
</style>
