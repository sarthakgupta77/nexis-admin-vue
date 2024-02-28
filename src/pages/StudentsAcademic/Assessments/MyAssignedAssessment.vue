<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12" style="width:100%">
          <div class="head-btn-box shadowBoder row">
            <h5 class="col-6">My Assigned Assessments</h5>
            <div class="row col-6" style="justify-content: flex-end">
              <q-select label="Search By" @update:model-value="count = 1" :options="searchOptions" v-model="searchBy"
                label-color="primary" outlined dense class="q-px-sm search" style="width: 26%" />
              <q-input v-if="searchBy === 'Email'" @update:model-value="count = 1" outlined dense type="search"
                class="q-mr-sm button" v-model="emailSearch" label="Search By Email" @keyup="filter">
                <template v-slot:append>
                  <q-btn flat dense icon="search" />
                </template>
              </q-input>
              <q-input v-else outlined dense type="search" @update:model-value="count = 1" class="q-mr-sm"
                v-model="batchSearch" label="Search By Batch" @keyup="filter">
                <template v-slot:append>
                  <q-btn flat dense icon="search" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="table-container shadowBoder">
            <div v-if="data.total > 0" class="q-pa-sm w600"> Total Records : {{ data.total }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Assessment</th>
                  <th scope="col">Batch</th>
                  <th class="text-center" scope="col">Type</th>
                  <th class="text-center" scope="col">Duration</th>
                  <th class="text-center" scope="col" v-if="state.myassigned_view">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in data.records" :key="record.id">
                  <td> {{ count++ }} </td>
                  <td> <q-icon name="person" size="xs" color="primary" class="q-mr-xs" /> {{ record.stu_name }}
                    <br> <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" /> {{ record.stu_email }}
                  </td>
                  <td> <b> Title :</b> {{ record.title }} <br><b> Course :</b> {{ record.course }} </td>
                  <td v-if="record.batch"> {{ record.batch }} </td>
                  <td v-else class="text-center"> - </td>
                  <td>
                    <div v-if="record.type == 1" class="badge-btn">
                      <b>Type :</b>
                      <q-chip color="green-5" size="12px" class="text-center" text-color="white">
                        Evaluation
                      </q-chip>
                      <br />
                    </div>
                    <div v-else-if="record.type == 0" class="badge-btn">
                      <b>Type :</b>
                      <q-chip color="blue-5" size="12px" class="text-center" text-color="white">
                        Practice
                      </q-chip>
                      <br />
                    </div>
                    <div v-else-if="record.type == 2" class="badge-btn">
                      <b>Type :</b>
                      <q-chip color="grey-5" size="12px" class="text-center" text-color="white"> Extra </q-chip>
                      <br />
                    </div>
                    <div>
                      <b> Due_Date :</b> {{ record.end }}
                    </div>
                  </td>
                  <td class="text-center"> {{ record.duration }} </td>
                  <td class="text-center" v-if="state.myassigned_view">
                    <q-btn dense round icon="visibility" color="primary" v-if="record.content_ques != '.'"
                      @click="viewAssignedAssessment(id = record.assessment_key, student_id = record.student_id)">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                        transition-hide="scale">View</q-tooltip>
                    </q-btn>
                    <q-btn dense round icon="visibility" color="primary" v-else disable
                      @click="viewAssignedAssessment(id = record.assessment_key, student_id = record.student_id)">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                        transition-hide="scale">View</q-tooltip>
                    </q-btn>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="showElement" class="q-pa-md col-md-12 foot">
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
const current = ref(1)
const showElement = ref(true)
const searchBy = ref('Email')
const searchOptions = ['Email', 'Batch']
const emailSearch = ref('')
const batchSearch = ref('')
const rescheduleModal = ref(false)
const startDate = ref('')
const endDate = ref('')

const access = LocalStorage.getItem('access_key')
const state = reactive({
  myassigned_view: ref(false),
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

const viewAssignedAssessment = (id, student_id) => {
  window.open("/assessments/my-assigned/view/" + id + "/" + student_id);
  count = 1
}

const convertCourseCode = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].course == 0) {
      array[i].course = "PG Program in Data Science, Machine Learning and Neural Networks";
    } else if (array[i].course == 1) {
      array[i].course = "PG Program in Investment Banking and Financial Modeling";
    } else if (array[i].course == 2) {
      array[i].course = "PG Program In Human Resource Management";
    } else if (array[i].course == 3) {
      array[i].course = "PG Program in E-Commerce and Business Analytics";
    } else if (array[i].course == 4) {
      array[i].course = "PG Program in Full Stack Development Engineering";
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
      api.get("my-assessment-records", {
        params: {
          user_id: LocalStorage.getItem('u_id'),
          email: emailSearch.value
        }
      }).then((response) => {
        data.records = response.data.assessments
        convertCourseCode(data.records)
        count = 1
        showElement.value = false
        Loading.hide()
      });
    } else {
      api.get("my-assessment-records", {
        params: {
          user_id: LocalStorage.getItem('u_id')
        }
      }).then((response) => {
        data.records = response.data.assessments.data
        convertCourseCode(data.records)
        data.from = response.data.assessments.from
        data.to = response.data.assessments.to
        data.total = response.data.assessments.total
        data.last_page = response.data.assessments.last_page
        count = 1
        Loading.hide()
        showElement.value = true

      });
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
      api.get("my-assessment-records", {
        params: {
          user_id: LocalStorage.getItem('u_id'),
          batch: batchSearch.value
        }
      }).then((response) => {
        data.records = response.data.assessments
        convertCourseCode(data.records)
        count = 1
        showElement.value = false
        Loading.hide()
      });
    } else {
      api.get("my-assessment-records", {
        params: {
          user_id: LocalStorage.getItem('u_id')
        }
      }).then((response) => {
        data.records = response.data.assessments.data
        convertCourseCode(data.records)
        data.from = response.data.assessments.from
        data.to = response.data.assessments.to
        data.total = response.data.assessments.total
        data.last_page = response.data.assessments.last_page
        count = 1
        showElement.value = true;
        Loading.hide()
      });
    }
  }
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("my-assessment-records", {
    params: {
      user_id: LocalStorage.getItem('u_id')
    }
  }).then((response) => {
    data.records = response.data.assessments.data
    convertCourseCode(data.records)
    data.from = response.data.assessments.from
    data.to = response.data.assessments.to
    data.total = response.data.assessments.total
    data.last_page = response.data.assessments.last_page
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


@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
  .head-btn-box {
    height: 4vh;
  }

  h5 {
    font-size: 14px;
  }

  .search {
    width: 110px !important;
    font-size: 12px;
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

  .search {
    width: 110px !important;
    font-size: 12px;
  }

  .table-container[data-v-424b9414] {

    padding: 4px;

  }

  .button {
    width: 100px !important;
    font-size: 10px;
  }

  th[data-v-424b9414] {
    padding: 5px 6px;
  }

  th[data-v-424b9414] {

    font-size: 12px;
  }

  .foot {
    width: 500px;
    margin-top: 30px;
  }

}
</style>
