<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box row shadowBoder">
            <div class="row col-3">
              <h5 class="q-ma-none q-pt-xs" id="head-1">All Pending Assignment</h5>
            </div>
            <div class="row col-4" style="justify-content: flex-end">
              <q-select outlined dense class="col-5 q-mr-sm" label="Search By" label-color="primary" v-model="searchBy"
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
                <q-input outlined dense type="search" @update:model-value="count = 1" class="q-mr-sm" v-model.trim="text"
                  label="Search By Batch" @keyup="filterByBatch">
                  <template v-slot:append>
                    <q-btn flat dense icon="search" />
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <q-dialog maximized style="padding: 0;" persistent v-model="transferModal" full-height position="right">
            <q-card class="modal-card">
              <div>
                <q-card-section class="row create-header">
                  <span class="text-h6 w600">Transfer Assignment</span>
                  <q-btn icon="close" dense flat @click="closePopup" />
                </q-card-section>
                <q-separator color="primary" />

                <q-card-section class="q-px-sm" v-for="assignment in data.assignment" :key="assignment.id">
                  <div class="row q-pa-sm" style="align-items: center">
                    <span class="col-12">
                      <b> Name :</b> {{ assignment.stu_name }}
                    </span>
                    <span class="col-12">
                      <b> Email :</b> {{ assignment.stu_email }}
                    </span>
                  </div>
                  <div class="row q-pa-sm" style="align-items: center">
                    <span class="col-12">
                      <b> Title :</b> {{ assignment.title }}
                    </span>
                    <span class="col-12">
                      <b> Course :</b> {{ assignment.course }}
                    </span>
                    <span class="col-12">
                      <b> Batch :</b> {{ assignment.batch }}
                    </span>
                  </div>
                  <div class="row q-pa-sm" style="align-items: center">
                    <span class="col-12">
                      <b> Evaluator Name :</b> {{ assignment.evaluator_name }}
                    </span>
                    <span class="col-12">
                      <b> Evaluator Email :</b> {{ assignment.evaluator_email }}
                    </span>
                  </div>
                  <div class="row q-pa-sm" style="align-items: center">
                    <span class="col-12">
                      <b> Due-Date :</b> {{ assignment.due_date }}
                    </span>
                    <div class="row col-12" style="justify-content: space-between">
                      <div class="col-5 row" style="align-items: center">
                        <span class="w600 col-3">Type</span>
                        <div class="col-9" v-if="assignment.type == 1">
                          <q-chip color="green-5" class="text-center" text-color="white">
                            Evaluation
                          </q-chip>
                          <br />
                        </div>
                        <div class="col-9" v-else-if="assignment.type == 0">
                          <q-chip color="blue-5" class="text-center" text-color="white">
                            Practice
                          </q-chip>
                          <br />
                        </div>
                        <div class="col-9" v-else-if="assignment.type == 2">
                          <q-chip color="grey-5" class="text-center" text-color="white"> Extra </q-chip>
                          <br />
                        </div>
                      </div>
                      <div class="col-6 row" style="align-items: center" v-if="assignment.submission == 0">
                        <b>Status :</b> <q-chip color="red-5" class="text-center" text-color="white">
                          Not Submitted
                        </q-chip>
                        <br />
                      </div>
                      <div class="col-6 row" style="align-items: center" v-else-if="assignment.submission == 1">
                        <div class="col-12">
                          <b>Status :</b> <q-chip color="indigo" class="text-center" text-color="white">
                            Submitted
                          </q-chip>
                        </div>
                        <div class="col-12">
                          <b> Due Date :</b> {{ assignment.due_date }} <br>
                        </div>
                        <div class="col-12">
                          <b>Submit Date : </b> {{ (assignment.submission_date) }}
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                  <q-form
                    @submit="changeEvaluator(stu_id = assignment.student_id, project_id = assignment.project_id, tranferTo = tranferToEvaluator)">
                    <div class="row q-pa-md" style="align-items: center">
                      <span class="col-12 w600 text-subtitle1">Transfer Project to Evaluator</span>
                      <label class="col-12 q-pa-xs" style="font-weight: 600">
                        Select Evaluator
                      </label>
                      <div class="col-12 row">
                        <q-select outlined dense v-model="tranferToEvaluator" :options="data.evaluatorsName"
                          class="col-9 q-mr-sm" emit-value map-options lazy-rules
                          :rules="[val => val !== null || 'Please Select Evaluator']">
                          <template v-slot:option="scope">
                            <q-item v-bind="scope.itemProps">
                              <q-item-section>
                                <q-item-label>{{ scope.opt.label }}</q-item-label>
                                <q-item-label caption>{{ scope.opt.course }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                        <q-btn label="Transfer" style="height: 40px" type="submit" outline color="primary" />
                      </div>
                    </div>
                  </q-form>
                </q-card-section>

              </div>
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
                  <th v-if="state.view" style="width: 20%;" scope="col">Evaluator
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'evaluator_name', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'evaluator_name', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col" style="width: 13%;">Submission</th>
                  <th v-if="state.allpending_transfer" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="assignment in data.assignments">
                  <td class="text-center">{{ count++ }}</td>
                  <td> <q-icon name="person" size="xs" color="primary" class="q-mr-xs" /> {{ assignment.stu_name }} <br>
                    <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" /> {{ assignment.stu_email }}
                  </td>
                  <td> <b> Title :</b> {{ assignment.title }} <br><b> Course :</b> {{ assignment.course }}</td>
                  <td>{{ assignment.batch }}</td>
                  <td> <q-icon name="person" size="xs" color="green" class="q-mr-xs" /> {{ assignment.evaluator_name }}
                    <br>
                    <q-icon name="mail" size="xs" color="green" class="q-mr-xs" /> {{ assignment.evaluator_email }}
                  </td>
                  <td>
                    <div v-if="assignment.type == 1" class="badge-btn">
                      <b>Type :</b> <q-chip size="12px" color="green-5" class="text-center" text-color="white"> Evaluation
                      </q-chip>
                    </div>
                    <div v-else-if="assignment.type == 0" class="badge-btn">
                      <b>Type :</b> <q-chip size="12px" color="blue-5" class="text-center" text-color="white"> Practice
                      </q-chip>
                    </div>
                    <div v-else-if="assignment.type == 2" class="badge-btn">
                      <b>Type :</b> <q-chip size="12px" color="grey-5" class="text-center" text-color="white"> Extra
                      </q-chip>
                    </div>
                    <div v-if="assignment.submission == 0" class="badge-btn">
                      <b>Status :</b> <q-chip size="12px" color="red-5" class="text-center" text-color="white">
                        Not Submitted
                      </q-chip>
                      <br />
                    </div>
                    <div v-else-if="assignment.submission == 1" class="badge-btn">
                      <b>Status :</b> <q-chip size="12px" color="indigo" class="text-center" text-color="white">
                        Submitted
                      </q-chip>
                    </div>
                    <b> Due Date :</b> {{ assignment.due_date }} <br>
                    <b>Submit Date : </b> {{ assignment.submission_date }}
                    <br />
                  </td>
                  <td v-if="state.allpending_transfer" class="text-center">
                    <q-btn flat round icon="input  " color="primary"
                      @click="transferAssignment(student_id = assignment.student_id, submission = assignment.submission, project_id = assignment.project_id)">
                      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                        transition-hide="scale">Transfer Assignment</q-tooltip>
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
import { Loading, QSpinnerPie, LocalStorage, Notify } from 'quasar'
import { api } from "../../../boot/axios";

const text = ref("")

const route = useRoute();
const router = useRouter();
const searchOptions = ['Evaluator Email', 'Batch']
const showElement = ref(true);
const searchBy = ref('Evaluator Email')
const current = ref(1);
let upArrow = ref(true);
const transferModal = ref(false)
const tranferToEvaluator = ref(null)

const access = LocalStorage.getItem('access_key')
const state = reactive({
  allpending: ref(false),
  allpending_transfer: ref(false),
})

const data = reactive({
  assignments: [],
  assignment: [],
  evaluators: [],
  evaluatorsName: [],
  last_page: '',
  total: '',
  from: '',
  to: '',
});

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

let count = Number(data.from) + 1;

const transferAssignment = (student_id, submission, assignment_id) => {
  data.assignment = data.assignments.filter((assignment) => assignment.student_id == student_id && assignment.project_id == assignment_id && assignment.submission == submission)
  transferModal.value = true
  count = 1

  api.get("project-evaluators", {
    params: {
      is_project: 0,
    }
  }).then((response) => {
    data.evaluators = response.data.evaluators
    data.evaluators.forEach((evaluator) => data.evaluatorsName.push({
      label: evaluator.name,
      value: evaluator.user_id,
      course: evaluator.title
    }))
  })
}

const changeEvaluator = (stu_id, project_id, transferTo) => {
  api.post('change-evaluator', {
    'student_id': stu_id,
    'project_id': project_id,
    'transferTo': transferTo
  }).then((response) => {
    transferModal.value = false
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
  }).catch((err) => {
    console.log('Error', err)
  })
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


const filterByEmail = () => {
  count = 1
  if (text.value.length >= 3) {
    count = 1;
    api.get("all-pending-records", { params: { email: text.value, action: 0 } }).then((response) => {
      data.assignments = response.data.assignments;
    }).finally(() => {
      count = 1
    });
    showElement.value = false;
  }
  else {
    count = 1
    api.get("all-pending-records",
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

window.onresize = function () {
  count = 1;
}

const filterByBatch = () => {
  count = 1
  if (text.value.length >= 3) {
    count = 1;
    api.get("all-pending-records", { params: { batch: text.value, action: 0 } }).then((response) => {
      data.assignments = response.data.assignments;
    }).finally(() => {
      count = 1
    });
    showElement.value = false;
  }
  else {
    count = 1
    api.get("all-pending-records",
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

const paginate = async (current) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  await api.get("https://genesis.datatrained.com/api/admin/all-pending-records?page=" + current, {
    params: {
      action: 0,
    }
  }).then((response) => {
    data.assignments = response.data.assignments.data
    convertCourseCode(data.assignments)
    data.from = response.data.assignments.from;
    data.to = response.data.assignments.to;
    data.total = response.data.assignments.total;
    count = 1
    Loading.hide()
  })
}

const closePopup = () => {
  transferModal.value = false
  data.evaluatorsName = []
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

  api.get("all-pending-records", {
    params: {
      action: 0,
    }
  }).then((response) => {
    data.assignments = response.data.assignments.data;
    convertCourseCode(data.assignments)
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
  font-weight: 600;
  padding: 5px 10px;
  font-size: 14px;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}

q-chip {
  width: 100px;
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
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
