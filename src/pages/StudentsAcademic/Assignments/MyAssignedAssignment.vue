<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder row">
            <h5 class="col-6" id="head-1">My Assigned Assignments</h5>
            <div class="row col-6" style="justify-content: flex-end">
              <q-select label="Search By" @update:model-value="count = 1" :options="searchOptions" v-model="searchBy"
                label-color="primary" outlined dense class="q-px-sm" style="width: 17%" />
              <q-input v-if="searchBy === 'Email'" @update:model-value="count = 1" clearable outlined dense type="search"
                class="q-mr-sm" v-model="emailSearch" label="Search By Email" @keyup="filter">
                <template v-slot:append>
                  <q-btn flat dense icon="search" />
                </template>
              </q-input>
              <q-input v-else outlined dense type="search" class="q-mr-sm" v-model="batchSearch" label="Search By Batch"
                @keyup="filter">
                <template v-slot:append>
                  <q-btn flat dense icon="search" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="table-container shadowBoder">
            <div v-if="data.total > 0" class="q-pa-sm w600"> Total Records : {{ data.total }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class=" bg-grey-4">
                <tr class="text-left">
                  <th scope="col">#</th>
                  <th style="width: 15%" scope="col">Assigned To</th>
                  <th scope="col">Assignment</th>
                  <th scope="col">Batch</th>
                  <th style="width: 11%" scope="col" class="text-center">Type </th>
                  <th style="width: 12%" scope="col">Submission</th>
                  <th class="text-center" v-if="state.myassigned_view" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="assignment in data.assignments">
                  <td class="text-left">{{ count++ }}</td>
                  <td> <q-icon name="person" size="xs" color="primary" class="q-mr-xs" /> {{ assignment.name }} <br>
                    <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" /> {{ assignment.email }}
                  </td>
                  <td> <b> Title :</b> {{ assignment.title }} <br><b> Course :</b> {{ assignment.course }}</td>
                  <td v-if="assignment.batch">{{ assignment.batch }}</td>
                  <td v-else class="text-center">-</td>
                  <td class=" text-black">
                    <div v-if="assignment.type == 1" class="badge-btn">
                      <b>Type :</b>
                      <q-chip color="green-5" size="12px" class="text-center" text-color="white">
                        Evaluation
                      </q-chip>
                      <br />
                    </div>
                    <div v-else-if="assignment.type == 0" class="badge-btn">
                      <b>Type :</b>
                      <q-chip color="blue-5" size="12px" class="text-center" text-color="white">
                        Practice
                      </q-chip>
                      <br />
                    </div>
                    <div v-else-if="assignment.type == 2" class="badge-btn">
                      <b>Type:</b>
                      <q-chip color="grey-5" size="12px" class="text-center" text-color="white"> Extra </q-chip>
                      <br />
                    </div>
                    <div>
                      <b> Due_Date :</b> {{ assignment.due_date }}
                    </div>
                  </td>
                  <td>
                    <div v-if="assignment.submission == 0" class="badge-btn">
                      <b>Status :</b> <q-chip color="red-5" size="12px" class="text-center" text-color="white">
                        Not Submitted
                      </q-chip>
                      <br />
                    </div>
                    <div v-else-if="assignment.submission == 1">
                      <div class="badge-btn">
                        <b>Status :</b> <q-chip color="indigo" size="12px" class="text-center" text-color="white">
                          Submitted
                        </q-chip>
                      </div>
                      <b>Submit Date : </b> {{ assignment.submission_date }}
                      <br />
                    </div>
                  </td>
                  <td class="text-center" v-if="state.myassigned_view">
                    <q-btn dense round icon="visibility" color="primary"
                      @click="viewProject(project_id = assignment.project_id, student_id = assignment.student_id)">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                        transition-hide="scale">Evaluate Assignment</q-tooltip>
                    </q-btn>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="q-pa-md col-md-12 ">
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
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Loading, QSpinnerPie, LocalStorage } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
const showElement = ref(true)
const searchBy = ref('Email')
const searchOptions = ['Email', 'Batch']
const emailSearch = ref('')
const batchSearch = ref('')
const current = ref(1)
const access = LocalStorage.getItem('access_key')
const state = reactive({
  myassigned: ref(false),
  myassigned_view: ref(false),
})

let count = 1;
const data = reactive({
  assignments: [],
  submittedAssignments: [],
  notSubmittedAssignments: [],
  from: '',
  to: '',
  total: '',
  last_page: ''
});

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
      api.get("my-assigned-records", {
        params: {
          is_project: 0,
          user_id: LocalStorage.getItem('u_id'),
          email: emailSearch.value
        }
      }).then((response) => {
        data.assignments = response.data.records
        convertCourseCode(data.assignments)
        data.from = response.data.records.from
        data.to = response.data.records.to
        data.total = response.data.records.total
        data.last_page = response.data.records.last_page
        showElement.value = false;
        count = 1
        Loading.hide()
      });
    } else {
      api.get("my-assigned-records", {
        params: {
          is_project: 0,
          user_id: LocalStorage.getItem('u_id')
        }
      }).then((response) => {
        data.assignments = response.data.records.data
        convertCourseCode(data.assignments)
        data.from = response.data.records.from
        data.to = response.data.records.to
        data.total = response.data.records.total
        data.last_page = response.data.records.last_page
        count = 1
        Loading.hide()
        showElement.value = true;
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
      api.get("my-assigned-records", {
        params: {
          is_project: 0,
          user_id: LocalStorage.getItem('u_id'),
          batch: batchSearch.value
        }
      }).then((response) => {
        data.assignments = response.data.records.data
        convertCourseCode(data.assignments)
        data.from = response.data.records.from
        data.to = response.data.records.to
        data.total = response.data.records.total
        data.last_page = response.data.records.last_page
        showElement.value = false;
        Loading.hide()

      });
    } else {
      api.get("my-assigned-records", {
        params: {
          is_project: 0,
          user_id: LocalStorage.getItem('u_id')
        }
      }).then((response) => {
        data.assignments = response.data.records.data
        convertCourseCode(data.assignments)
        data.from = response.data.records.from
        data.to = response.data.records.to
        data.total = response.data.records.total
        data.last_page = response.data.records.last_page
        showElement.value = true;
        Loading.hide()
      });
    }
  }
}

const viewProject = (project_id, student_id) => {
  window.open("/assignment/my-assigned/view/" + project_id + "/" + student_id);
  count = 1
};

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("my-assigned-records", {
    params: {
      is_project: 0,
      user_id: LocalStorage.getItem('u_id')
    }
  }).then((response) => {
    data.assignments = response.data.records.data
    convertCourseCode(data.assignments)
    data.from = response.data.records.from
    data.to = response.data.records.to
    data.total = response.data.records.total
    data.last_page = response.data.records.last_page
    Loading.hide()
  });

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('assignment')) {
      state[key] = true
    }
  });

  function checkEvent(keys) {
    return keys.includes('assignment');
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

q-chip {
  width: 100px;
}
</style>
