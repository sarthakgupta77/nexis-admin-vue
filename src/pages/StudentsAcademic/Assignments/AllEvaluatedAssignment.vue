<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box row shadowBoder">
            <div class="row col-3">
              <h5 class="q-ma-none q-pt-xs" id="head-1">All Evaluated Assignments</h5>
            </div>
            <div class="row col-4" style="justify-content: flex-end">
              <q-select outlined dense label="Search By" label-color="primary" class="col-5 q-mr-sm" v-model="searchBy"
                :options="searchOptions" @update:model-value="count = 1" />
              <div v-if="searchBy == 'Evaluator Email'">
                <q-input outlined dense type="search" class="q-mr-sm" v-model.trim="text" label="Search By Email"
                  @keyup="filterByEmail">
                  <template v-slot:append>
                    <q-btn flat dense icon="search" />
                  </template>
                </q-input>
              </div>
              <div v-if="searchBy == 'Batch'">
                <q-input outlined dense type="search" class="q-mr-sm" v-model.trim="text" label="Search By Batch"
                  @keyup="filterByBatch">
                  <template v-slot:append>
                    <q-btn flat dense icon="search" />
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <q-dialog maximized style="padding: 0;" v-model="submitted" full-height position="right">
            <q-card>
              <q-scroll-area class="modal-card">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md">
                    <span class="text-h6 w600">Project Scores</span>
                    <q-btn icon="close" dense flat @click="closePopup" />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="q-px-sm" v-for="project in data.project" :key="project.id">
                    <div class="row q-pa-sm" style="align-items: center">
                      <span class="col-12">
                        <b> Name :</b> {{ project.stu_name }}
                      </span>
                      <span class="col-12">
                        <b> Email :</b> {{ project.stu_email }}
                      </span>
                    </div>
                    <div class="row q-pa-sm" style="align-items: center">
                      <span class="col-12">
                        <b> Title :</b> {{ project.title }}
                      </span>
                      <span class="col-12">
                        <b> Course :</b> {{ project.course }}
                      </span>
                      <span class="col-12">
                        <b> Batch :</b> {{ project.batch }}
                      </span>
                    </div>
                    <div class="row q-pa-sm" style="align-items: center">
                      <span class="col-12">
                        <b> Evaluator Name :</b> {{ project.evaluator_name }}
                      </span>
                      <span class="col-12">
                        <b> Evaluator Email :</b> {{ project.evaluator_email }}
                      </span>
                    </div>
                    <div class="row q-pa-sm" style="align-items: center">
                      <span class="col-12">
                        <b> Due-Date :</b> {{ project.due_date }}
                      </span>
                      <div class="row col-12" style="justify-content: space-between">
                        <div class="col-5 row" style="align-items: center">
                          <span class="w600 col-3">Type</span>
                          <div class="col-9" v-if="project.type == 1">
                            <q-chip color="green-5" class="text-center" text-color="white">
                              Evaluation
                            </q-chip>
                            <br />
                          </div>
                          <div class="col-9" v-else-if="project.type == 0">
                            <q-chip color="blue-5" class="text-center" text-color="white">
                              Practice
                            </q-chip>
                            <br />
                          </div>
                          <div class="col-9" v-else-if="project.type == 2">
                            <q-chip color="grey-5" class="text-center" text-color="white"> Extra </q-chip>
                            <br />
                          </div>
                        </div>
                        <div class="col-6 row" style="align-items: center">
                          <span class="w600 q-px-sm col-6 text-center">Status</span>
                          <div class="col-6">
                            <q-chip v-if="(project.submission == 1)" color="indigo" class="text-center"
                              text-color="white">
                              Submitted
                            </q-chip>
                            <q-chip v-else color="red-5" class="text-center" text-color="white">
                              Not Submitted
                            </q-chip>
                          </div>
                        </div>
                      </div>
                      <span class="col-12">
                        <b> Submission-Date :</b> {{ project.submission_date }}
                      </span>
                    </div>
                    <div class="q-pa-sm">
                      <h6 class="q-my-md"> Project Scoring Parameters</h6>
                      <div v-if="data.marks.length == 0">
                        <span class="text-subtitle1 text-primary w500">No Project Scoring Parameters Defined</span>
                      </div>
                      <div v-else>
                        <div class="row">
                          <div class="col-8 s coring">
                            <p> <b>Param Name</b> </p>
                          </div>
                          <div class="col-2 q-pl-sm scoring">
                            <p> <b>Max Marks</b> </p>
                          </div>
                          <div class="col-2 q-pl-sm scoring">
                            <p> <b>Obtained</b> </p>
                          </div>
                        </div>
                        <div class="row" v-for="marks in data.marks" :key="marks.id">
                          <div class="col-8 q-mb-sm scoring">
                            <q-input dense square filled class="category-name" v-model="marks.parameter"
                              disable></q-input>
                          </div>
                          <div class="col-2 q-pl-sm scoring">
                            <q-input dense square filled class="category-name" v-model="marks.max_marks"
                              disable></q-input>
                          </div>
                          <div class="col-2 q-pl-sm scoring">
                            <q-input dense square filled class="category-name" v-model="marks.obtained_marks"
                              disable></q-input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-scroll-area>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <div v-if="data.total > 0" class="q-pa-sm w600"> Total Records : {{ data.total }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class=" bg-grey-4">
                <tr class="text-left">
                  <th class="text-center" scope="col">#</th>
                  <th scope="col">Assigned To
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'stu_name', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'stu_name', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Project
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Batch
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'batch', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'batch', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col" style="width: 18%;">Evaluator
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'evaluator_name', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'evaluator_name', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col" style="width: 12%;">Submission</th>
                  <th v-if="state.allevaluated_viewscores" scope="col">Marks</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="assignment in data.assignments">
                  <td class="text-center">{{ count++ }}</td>
                  <td>
                    <q-icon name="person" size="xs" color="primary" class="q-mr-xs" /> {{ assignment.stu_name }} <br>
                    <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" /> {{ assignment.stu_email }}
                  </td>
                  <td> <b> Title :</b> {{ assignment.title }} <br><b> Course :</b> {{ assignment.course }}</td>
                  <td>{{ assignment.batch }}</td>
                  <td>
                    <q-icon name="person" size="xs" color="green" class="q-mr-xs" /> {{ assignment.evaluator_name }} <br>
                    <q-icon name="mail" size="xs" color="green" class="q-mr-xs" /> {{ assignment.evaluator_email }}
                  </td>
                  <td>
                    <div v-if="assignment.type == 1" class="badge-btn">
                      <b>Type :</b> <q-chip color="green-5" size="12px" class="text-center" text-color="white"> Evaluation
                      </q-chip>
                    </div>
                    <div v-else-if="assignment.type == 0" class="badge-btn">
                      <b>Type :</b> <q-chip color="blue-5" size="12px" class="text-center" text-color="white"> Practice
                      </q-chip>
                    </div>
                    <div v-else-if="assignment.type == 2" class="badge-btn">
                      <b>Type :</b> <q-chip color="grey-5" size="12px" class="text-center" text-color="white"> Extra
                      </q-chip>
                    </div>
                    <div v-if="assignment.submission == 0" class="badge-btn">
                      <b>Status :</b> <q-chip color="red-5" size="12px" class="text-center" text-color="white">
                        Not Submitted
                      </q-chip>
                    </div>
                    <div v-else-if="assignment.submission == 1">
                      <div class="badge-btn">
                        <b>Status :</b> <q-chip color="indigo" size="12px" class="text-center" text-color="white">
                          Submitted
                        </q-chip>
                      </div>
                      <b> Due Date :</b> {{ assignment.due_date }} <br>
                      <b>Submit Date : </b> {{ (assignment.submission_date) }}
                      <br />
                    </div>
                  </td>
                  <td v-if="state.allevaluated_viewscores">
                    <q-btn flat round icon="open_in_browser" color="primary"
                      @click="viewProject(student_id = assignment.student_id, submission = assignment.submission, assignment_id = assignment.project_id)">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                        transition-hide="scale">View</q-tooltip>
                    </q-btn>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="shadowBoder col-md-12 ">
              <div v-if="showElement">
                <p class="w600 q-ma-none flex flex-center float-left"> Showing data between {{ Number(data.from) }} to
                  {{
                    Number(data.to) }} out of {{ data.total }}</p>
                <q-pagination class="flex float-right" v-model="current" @click="paginate(current)"
                  :max="Number(data.last_page)" :max-pages="10" :boundary-numbers="true" direction-links />
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
import { Loading, QSpinnerPie, LocalStorage, ClosePopup } from 'quasar'
import { api } from "../../../boot/axios";

const text = ref("")

const route = useRoute();
const router = useRouter();
const searchOptions = ['Evaluator Email', 'Batch']
const showElement = ref(true);
const searchBy = ref('Evaluator Email')
const current = ref(1);
const tab = ref('Pending_With_Submission')
const submitted = ref(false)
const notSubmitted = ref(false)
let upArrow = ref(true);


const access = LocalStorage.getItem('access_key')
const state = reactive({
  allevaluated: ref(false),
  allevaluated_viewscores: ref(false),
})

const data = reactive({
  assignments: [],
  project: [],
  marks: [],
  last_page: '',
  total: '',
  from: '',
  to: '',
});

let count = Number(data.from) + 1;


const sortTable = (field, direction) => {

  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.assignments.sort((a, b) => {
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
        data.assignments.sort((a, b) => {
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

const filterByEmail = () => {
  count = 1
  if (text.value.length >= 3) {
    count = 1;
    api.get("all-evaluated-records", { params: { email: text.value, action: 0 } }).then((response) => {
      data.assignments = response.data.assignments;
    }).finally(() => {
      count = 1
    });
    showElement.value = false;
  }
  else {
    count = 1
    api.get("all-evaluated-records",
      {
        params: { action: 0 }
      }).then((response) => {
        data.assignments = response.data.assignments.data;
        Loading.hide()
      }).finally(() => {
        count = 1
        showElement.value = true;
      });
  }
}
const filterByBatch = () => {
  count = 1
  if (text.value.length >= 3) {
    count = 1;
    api.get("all-evaluated-records", { params: { batch: text.value, action: 0 } }).then((response) => {
      data.assignments = response.data.assignments;
    }).finally(() => {
      count = 1
    });
    showElement.value = false;
  }
  else {
    count = 1
    api.get("all-evaluated-records",
      {
        params: { action: 0 }
      }).then((response) => {
        data.assignments = response.data.assignments.data;
        Loading.hide()
      }).finally(() => {
        count = 1
        showElement.value = true;
      });
  }
}

const viewProject = async (student_id, submission, project_id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  await api.get('evaluated-record-scores', {
    params: {
      student_id: student_id,
      project_id: project_id
    }
  }).then((response) => {
    data.marks = response.data.marks
    Loading.hide()
  });
  data.project = data.assignments.filter((project) => project.student_id == student_id && project.project_id == project_id && project.submission == submission)
  submitted.value = true
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

  await api.get("https://genesis.datatrained.com/api/admin/all-evaluated-records?page=" + current, {
    params: {
      action: 0,
    }
  }).then((response) => {
    data.assignments = response.data.assignments.data
    data.from = response.data.assignments.from;
    data.to = response.data.assignments.to;
    count = 1
    Loading.hide()
  })
}

const closePopup = () => {
  submitted.value = false
  notSubmitted.value = false
  count = 1
}
onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("all-evaluated-records", {
    params: {
      action: 0,
    }
  }).then((response) => {
    data.assignments = response.data.assignments.data;
    for (let i = 0; i < data.assignments.length; i++) {
      if (data.assignments[i].course == 0) {
        data.assignments[i].course = "PG Program in Data Science, Machine Learning and Neural Networks";
      } else if (data.assignments[i].course == 1) {
        data.assignments[i].course = "PG Program in Investment Banking and Financial Modeling";
      } else if (data.assignments[i].course == 2) {
        data.assignments[i].course = "PG Program In Human Resource Management";
      } else if (data.assignments[i].course == 3) {
        data.assignments[i].course = "PG Program in E-Commerce and Business Analytics";
      } else if (data.assignments[i].course == 4) {
        data.assignments[i].course = "PG Program in Full Stack Development Engineering";
      }
      //     api.get("get-user-info", {
      //         params: {
      //             user_id: data.projects[i].student_id
      //         }
      //     }).then((response) => {
      //         data.projects[i]['stu_name'] = response.data.user.name
      //         data.projects[i]['stu_email'] = response.data.user.email
      //         count = 1

      //     });

    }

    data.last_page = response.data.assignments.last_page;
    data.total = response.data.assignments.total;
    data.from = response.data.assignments.from;
    data.to = response.data.assignments.to;
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

td {
  padding: 5px 0px 5px 5px;
}

th {
  padding: 5px 10px;
  font-weight: 600;
  font-size: 14px;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}

.q-chip {
  margin: 0px 5px;
}

.create-header {
  align-items: center;
  justify-content: space-between;
}

.scoring {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modal-card {
  width: 600px;
  height: 100vh !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
