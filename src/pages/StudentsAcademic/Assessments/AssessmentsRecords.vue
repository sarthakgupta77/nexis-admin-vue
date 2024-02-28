<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder row">
            <h5 class="col-6">All Assessment Records</h5>
            <div class="row col-6" style="justify-content: flex-end">
              <q-select label="Search By" @update:model-value="count = 1" :options="searchOptions" v-model="searchBy"
                label-color="primary" outlined dense class="q-px-sm search" style="width: 20%" />
              <q-input v-if="searchBy == 'Email'" @update:model-value="count = 1" outlined dense type="search"
                class="button" v-model="emailSearch" label="Search By Email" @keyup="filter">
                <template v-slot:append>
                  <q-btn flat dense icon="search" />
                </template>
              </q-input>
              <q-input v-else outlined dense type="search" v-model="batchSearch" label="Search By Batch" @keyup="filter">
                <template v-slot:append>
                  <q-btn flat dense icon="search" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="table-container shadowBoder">
            <q-dialog v-model="rescheduleModal" persistent>
              <div style="background: #fff; width: 550px;">
                <q-card>
                  <q-form @submit="rescheduleAssessment" @reset="resetForm">
                    <q-card-section class="row">
                      <q-toolbar>
                        <q-toolbar-title><span class="text-weight-bold">Re-Schedule Assessment</span>
                        </q-toolbar-title>
                      </q-toolbar>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                      <div class="row">
                        <div class="col-md-6">
                          <label class="col-md-12 q-px-sm" style="font-weight: 600">Start Date</label>
                          <q-input dense outlined type="date" color="secondary" placeholder="dd-mm-yyyy"
                            class="col-md-12 q-mr-sm" v-model="startDate" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Select Start Date']" />
                        </div>
                        <div class="col-md-6">
                          <label class="col-md-12 q-px-sm" style="font-weight: 600">End Date</label>
                          <q-input dense outlined type="date" color="secondary" placeholder="dd-mm-yyyy"
                            class="col-md-12 q-mr-sm" v-model="endDate" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Select Start Date']" />
                        </div>
                      </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-actions align="right" style="padding: 20px;">
                      <q-btn label="Close" color="grey-8" type="reset" />
                      <q-btn label="Re-Schedule" color="primary" type="submit" />
                    </q-card-actions>
                  </q-form>
                </q-card>
              </div>
            </q-dialog>
            <div v-if="data.total > 0" class="q-pa-sm w600"> Total Records : {{ data.total }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th class="text-center" scope="col">#</th>
                  <th scope="col">Assigned To
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'stu_email', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'stu_email', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Assessment
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Schedule</th>
                  <th class="text-center" scope="col">Marks</th>
                  <th class="text-center" v-if="state.record_reschedule" scope="col">ReSchedule</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in data.records">
                  <td class="number text-center">{{ count++ }}</td>
                  <td class="name">
                    <div class="name">
                      <q-icon name="person" size="xs" color="primary" class="q-mr-xs" /> {{ record.stu_name }} <br>
                      <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" /> {{ record.stu_email }}
                    </div>
                  </td>

                  <td class="assesment">
                    <div class="assesment">
                      {{ record.title }}
                    </div>
                  </td>
                  <td class="date">
                    <div class="date">
                      {{ record.start }}-{{ record.end }}
                    </div>
                  </td>
                  <td class="text-center chip">
                    <q-chip v-if="record.attempted == 1" color="blue-5" class="text-center q-py-md" text-color="white">
                      {{ record.obt_marks }}/{{ record.max_marks }}
                    </q-chip>
                    <q-chip v-else color="red-5" class="text-center q-py-md" text-color="white">
                      N/A
                    </q-chip>
                  </td>
                  <td v-if="state.record_reschedule" class="text-center schedule">
                    <div>
                      <q-btn flat round color="primary" icon="event_repeat" id="event-btn"
                        @click="rescheduleModalOpen(id = record.student_id)" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
        <div v-if="showElement" class="shadowBoder col-md-12 ">
          <div>
            <p class="w600 q-ma-none flex flex-center float-left"> Showing data between {{ Number(data.from) }} to {{
              Number(data.to) }} out of {{ Number(data.total) }}</p>
            <div>
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
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Loading, QSpinnerPie, LocalStorage, Notify } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
const tab = ref('attempted')
const current = ref(1)
const showElement = ref(true)
const rescheduleModal = ref(false)
const startDate = ref('')
const endDate = ref('')
const searchBy = ref('Email')
const searchOptions = ['Email', 'Batch']
const emailSearch = ref('')
const batchSearch = ref('')

let upArrow = ref(true);

const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
  record_reschedule: ref(false)
})

let count = 1;
const data = reactive({
  records: [],
  attempted: [],
  notAttempted: [],
  student_id: null,
  assessment_id: null,
  from: '',
  to: '',
  total: '',
  last_page: ''
});

const rescheduleModalOpen = (stu_id, assessment_id) => {
  rescheduleModal.value = true
  data.student_id = stu_id
  data.assessment_id = assessment_id
  count = 1
}

const paginate = async (current) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  await api.get("https://genesis.datatrained.com/api/admin/assessment-records?page=" + current).then((response) => {
    data.records = response.data.records.data;
    data.from = response.data.records.from
    data.to = response.data.records.to
    data.total = response.data.records.total
    Loading.hide();
    count = 1
  })
}

const resetForm = () => {
  rescheduleModal.value = false
  startDate.value = ''
  endDate.value = ''
  count = 1
}

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.records.sort((a, b) => {
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
        data.records.sort((a, b) => {
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

window.onresize = function () {
  count = 1;
}

const filter = () => {
  if (searchBy.value == 'Email') {
    Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
    if (emailSearch.value.length >= 3) {
      api.get("assessment-records", { params: { email: emailSearch.value } }).then((response) => {
        data.records = response.data.records;
        showElement.value = false
        count = 1
        Loading.hide()
      })
    }
    else {
      api.get("assessment-records").then((response) => {
        data.records = response.data.records.data;
        data.from = response.data.records.from
        data.to = response.data.records.to
        data.total = response.data.records.total
        data.last_page = response.data.records.last_page
        Loading.hide()
        count = 1
        showElement.value = true
      })
    }
  } else {
    Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
    if (batchSearch.value.length >= 3) {
      api.get("assessment-records", { params: { batch: batchSearch.value } }).then((response) => {
        data.records = response.data.records.data;
        showElement.value = false
        count = 1
        Loading.hide()
      })
    }
    else {
      api.get("assessment-records").then((response) => {
        data.records = response.data.records.data;
        data.from = response.data.records.from
        data.to = response.data.records.to
        data.total = response.data.records.total
        data.last_page = response.data.records.last_page
        Loading.hide()
        count = 1
        showElement.value = true
      })
    }
  }
}

const rescheduleAssessment = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post('reschedule-assessment', {
    student_id: data.student_id,
    assessment_id: data.assessment_id,
    startDate: startDate.value,
    endDate: endDate.value
  }).then((response) => {
    rescheduleModal.value = false
    api.get("assessment-records").then((response) => {
      data.records = response.data.records.data;
      data.from = response.data.records.from
      data.to = response.data.records.to
      data.total = response.data.records.total
      data.last_page = response.data.records.last_page
      count = 1
    });
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    count = 1
    Loading.hide()
  }).catch((err) => {
    console.log('Error', err)
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

  api.get("assessment-records").then((response) => {
    data.records = response.data.records.data;
    data.from = response.data.records.from
    data.to = response.data.records.to
    data.total = response.data.records.total
    data.last_page = response.data.records.last_page
    Loading.hide()
  });

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('assessment')) {
      state[key] = true
    }
  });

  function checkEvent(keys) {
    return keys.includes('assessment');
  }
});
</script>

<style lang="scss" scoped>
.head-btn-box {
  background-color: #fff;
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
  overflow-x: auto;
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

.create-header {
  align-items: center;
  justify-content: space-between;
}

//for alignment of header and arrow
th {
  white-space: nowrap;
}

.mail {
  width: 190px;
}

@media only screen and (max-width: 1250px) {
  .mail {
    width: 120px;
  }

  .assesment {
    width: 90px;
  }
}

@media only screen and (max-width: 1177px) {
  .mail {
    width: 100px;
  }

  .assesment {
    width: 90px;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
  .head-btn-box {
    height: 4vh;
  }

  h5 {
    font-size: 13px;
  }

  .mail {
    width: 90px;
    font-size: 12px;
  }

  .assesment {
    width: 100px;
    font-size: 12px;
  }

  .chip {
    .q-chip {
      width: fit-content;
      font-size: 7px;
      padding-top: 9px;
      padding-bottom: 9px;
    }
  }

  .table {
    th {
      font-size: 12px;
    }

    td {
      padding: 5px 5px;
    }
  }

  .name {
    font-size: 12px;
    width: 60px;
  }

  .schedule {
    width: 50px !important;
  }

  .date {
    font-size: 11px;
  }

  .search {
    width: 150px !important;
    font-size: 10px;
  }

  .button {
    width: 132px !important;
    font-size: 10px;
  }

  .table {
    padding: 3px !important;

  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1023px) and (orientation : portrait) {
  .head-btn-box {
    height: 50px;
    padding-top: 5px;
  }

  h5 {
    font-size: 12px;
  }

  .mail {
    width: 90px;
    font-size: 10px;
    text-align: center;
  }

  .assesment {
    width: 100px;
    font-size: 9px;
  }

  .chip {
    .q-chip {
      width: fit-content;
      font-size: 6px;
      padding-top: 9px;
      padding-bottom: 9px;
    }
  }

  .table {
    th {
      font-size: 10px;
      padding: 5px 1px;
      text-align: center;
    }

    td {
      padding: 5px 1px;
    }
  }

  .name {
    font-size: 10px;
    width: 60px;
    text-align: -webkit-center;
  }

  .schedule {
    width: 50px !important;
  }

  .date {
    font-size: 9px;
    text-align: center;
  }

  .search {
    width: 100px !important;
    font-size: 9px;
  }

  .button {
    width: 100px !important;
    font-size: 10px;
  }


  #arrow-icon {
    margin-left: -18px;
    font-size: 10px;
  }

  .table-container[data-v-2238590b] {

    padding: 3px;

  }

  table[data-v-2238590b] {
    padding: 1px;
  }

  .number {
    font-size: 9px;
    text-align: center;
  }

  #event-btn {
    font-size: 10px;
  }
}
</style>
