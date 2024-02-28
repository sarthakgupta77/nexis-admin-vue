<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 class="q-ma-none q-pt-xs" id="head-1">All Projects</h5>
            <q-btn v-if="state.create" label="create new" to="/projects/add" class="create-btn"></q-btn>
          </div>

          <q-dialog maximized style="padding: 0;" persistent v-model="assignedToModal" full-height position="right">
            <q-card class="modal-card">
              <div>
                <q-card-section class="row create-header">
                  <span class="text-h6 w600">Batch-wise count of Students ({{ data.totalAssigned }})</span>
                  <q-btn icon="close" dense flat @click="closePopup" />
                </q-card-section>
                <q-separator color="primary" />
                <q-card-section class="q-px-sm">
                  <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0"
                    width="100%">
                    <thead class=" bg-grey-4">
                      <tr class="text-left">
                        <th scope="col">Batch</th>
                        <th scope="col">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="count in data.assignedCount">
                        <td> {{ count.batch }} </td>
                        <td class="text-center"> {{ count.count }} </td>
                      </tr>
                    </tbody>
                  </table>
                </q-card-section>
              </div>
            </q-card>
          </q-dialog>

          <div class="table-container  shadowBoder">
            <q-dialog v-model="assignActions" persistent>
              <div style="background: #fff; width: 550px;">
                <q-splitter :limits="[30, 100]" v-model="splitterModel" style="height: 100%;">

                  <template v-slot:before>
                    <q-tabs v-model="tab1" vertical class="shadowBoder" active-color="primary">
                      <q-tab name="assign" class="shadowBoder q-pa-md" label="Assign" @click="resetForm" />
                      <q-tab name="unassign" class="shadowBoder q-pa-md" label="UnAssign" @click="resetForm" />
                      <q-tab name="extend" class="shadowBoder q-pa-md" label="Extend Date" @click="resetForm" />
                    </q-tabs>
                  </template>

                  <template v-slot:after>
                    <div v-if="tab1 == ''" style="display: flex; justify-content:flex-end">
                      <q-btn dense size="16px" flat icon="close" @click="count = 1" v-close-popup />
                    </div>
                    <h4 v-if="tab1 == ''" class="text-center q-ma-md text-primary w600"> Select an Action To Manage</h4>
                    <q-tab-panels v-model="tab1" animated swipeable vertical transition-prev="jump-up"
                      transition-next="jump-up">
                      <q-tab-panel name="assign" class="q-pa-none">
                        <q-form @submit="actions(assign = 0)" @reset="resetForm(type = 'close')">
                          <q-card-section class="row">
                            <q-toolbar>
                              <q-toolbar-title><span class="text-weight-bold">Assign this Project</span>
                              </q-toolbar-title>
                            </q-toolbar>
                          </q-card-section>
                          <q-separator />
                          <q-card-section>
                            <div class="row">
                              <div class="col-md-6">
                                <label class="col-md-12 q-pa-sm" style="font-weight: 600">Select by Batch </label>
                                <q-select v-if="studentEmail == ''" outlined dense class="col-md-12 q-mr-sm"
                                  label="Select Batch" v-model="batch" clearable :options="data.batches" lazy-rules
                                  use-input hide-selected fill-input input-debounce="0" @filter="filterBatch"
                                  :popup-content-style="{ width: '400px', height: '70%' }"
                                  :rules="[val => val !== null || 'Please Select Batch']" />

                                <q-select v-else outlined disable dense class="col-md-12 q-mr-sm" label="Select Batch" />
                              </div>
                              <div class="col-md-6">
                                <label class="col-md-12 q-px-sm" style="font-weight: 600">Date</label>
                                <q-input dense outlined type="date" color="secondary" placeholder="dd-mm-yyyy"
                                  class="col-md-12 q-mr-sm" v-model="date" lazy-rules
                                  :rules="[val => val && val.length > 0 || 'Please Select Due Date']" />
                              </div>
                            </div>
                            <q-separator />
                            <div class="col-md-12 q-pt-md">
                              <label class="col-md-12 q-pa-sm" style="font-weight: 600">Assign Evaluator</label>
                              <q-select outlined dense v-model="selectedEvaluator" label="Select Evaluator"
                                :options="data.evaluatorsName" class="col-md-12 q-mr-sm" lazy-rules
                                :rules="[val => val || 'Please Select Evaluator']" emit-value map-options>
                                <template v-slot:option="scope">
                                  <q-item v-bind="scope.itemProps">
                                    <q-item-section>
                                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                                      <q-item-label caption>{{ scope.opt.course }}</q-item-label>
                                    </q-item-section>
                                  </q-item>
                                </template>
                              </q-select>
                            </div>
                            <q-separator class="q-mt-none" />
                            <div class="col-md-12 q-pt-md">
                              <label class="col-md-12 q-px-sm" style="font-weight: 600">Select Directly a Single
                                Student</label>
                              <q-input v-if="batch == null" dense outlined color="secondary" v-model="studentEmail"
                                placeholder="Enter Student E-mail" class="col-md-12 q-mr-sm" lazy-rules
                                :rules="[val => val && val.length > 0 || 'Please Enter Student Email']" />

                              <q-input v-else disable dense outlined color="secondary" placeholder="Enter Student E-mail"
                                class="col-md-12 q-mr-sm" />
                            </div>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions align="right" style="padding: 20px;">
                            <q-btn label="Close" color="grey-8" type="reset" />
                            <q-btn label="Assign" color="primary" type="submit" />
                          </q-card-actions>
                        </q-form>
                      </q-tab-panel>

                      <q-tab-panel name="unassign" class="q-pa-none">
                        <q-form @submit="actions(assign = 1)" @reset="resetForm(type = 'close')">
                          <q-card-section class="row ">
                            <q-toolbar>
                              <q-toolbar-title><span class="text-weight-bold">UnAssign this Project</span>
                              </q-toolbar-title>
                            </q-toolbar>
                          </q-card-section>
                          <q-separator />
                          <q-card-section>
                            <div class="row">
                              <div class="col-md-12">
                                <label class="col-md-12 q-pa-sm" style="font-weight: 600">Select by Batch </label>
                                <q-select v-if="studentEmail == ''" outlined dense class="col-md-12 q-mr-sm"
                                  label="Select Batch" v-model="batch" clearable :options="data.batches" lazy-rules
                                  use-input hide-selected fill-input input-debounce="0" @filter="filterBatch"
                                  :popup-content-style="{ width: '400px', height: '70%' }"
                                  :rules="[val => val !== null || 'Please Select Batch']" />

                                <q-select v-else outlined disable dense class="col-md-12 q-mr-sm" label="Select Batch" />
                              </div>
                            </div>
                            <q-separator />
                            <div class="col-md-12 q-pt-md">
                              <label class="col-md-12 q-px-sm" style="font-weight: 600">Select Directly a Single
                                Student</label>
                              <q-input v-if="batch == null" dense outlined color="secondary" v-model="studentEmail"
                                placeholder="Enter Student E-mail" class="col-md-12 q-mr-sm" lazy-rules
                                :rules="[val => val && val.length > 0 || 'Please Enter Student Email']" />

                              <q-input v-else dense disable outlined color="secondary" placeholder="Enter Student E-mail"
                                class="col-md-12 q-mr-sm" />
                            </div>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions align="right" style="padding: 20px;">
                            <q-btn label="Close" color="grey-8" type="reset" />
                            <q-btn label="Un-Assign" color="red" type="submit" />
                          </q-card-actions>
                        </q-form>
                      </q-tab-panel>

                      <q-tab-panel name="extend" class="q-pa-none">
                        <q-form @submit="actions(assign = 2)" @reset="resetForm(type = 'close')">
                          <q-card-section class="row ">
                            <q-toolbar>
                              <q-toolbar-title><span class="text-weight-bold">Extend Due Date of Project</span>
                              </q-toolbar-title>
                            </q-toolbar>
                          </q-card-section>
                          <q-separator />
                          <q-card-section>
                            <div class="row">
                              <div class="col-md-6">
                                <label class="col-md-12 q-pa-sm" style="font-weight: 600">Select by Batch </label>
                                <q-select v-if="studentEmail == ''" outlined dense class="col-md-12 q-mr-sm"
                                  label="Select Batch" v-model="batch" use-chips :options="data.batches" lazy-rules
                                  use-input hide-selected fill-input input-debounce="0" @filter="filterBatch"
                                  :popup-content-style="{ width: '400px', height: '70%' }"
                                  :rules="[val => val !== null || 'Please Select Batch']" />

                                <q-select v-else outlined disable dense class="col-md-12 q-mr-sm" label="Select Batch" />
                              </div>
                              <div class="col-md-6">
                                <label class="col-md-12 q-px-sm" style="font-weight: 600">Date</label>
                                <q-input dense outlined type="date" color="secondary" placeholder="dd-mm-yyyy"
                                  class="col-md-12 q-mr-sm" v-model="date" lazy-rules
                                  :rules="[val => val && val.length > 0 || 'Please Select Due Date']" />
                              </div>
                            </div>
                            <q-separator />
                            <div class="col-md-12 q-pt-md">
                              <label class="col-md-12 q-px-sm" style="font-weight: 600">Select Directly a Single
                                Student</label>
                              <q-input v-if="batch == null" dense outlined color="secondary" v-model="studentEmail"
                                placeholder="Enter Student E-mail" class="col-md-12 q-mr-sm" lazy-rules
                                :rules="[val => val && val.length > 0 || 'Please Enter Student Email']" />

                              <q-input v-else dense disable outlined color="secondary" placeholder="Enter Student E-mail"
                                class="col-md-12 q-mr-sm" />
                            </div>
                          </q-card-section>
                          <q-separator />
                          <q-card-actions align="right" style="padding: 20px;">
                            <q-btn label="Close" color="grey-8" type="reset" />
                            <q-btn label="Extend Due Date" color="yellow-9" type="submit" />
                          </q-card-actions>
                        </q-form>
                      </q-tab-panel>
                    </q-tab-panels>
                  </template>

                </q-splitter>
              </div>
            </q-dialog>
            <div v-if="data.projects.length > 0" class="q-pa-sm w600"> Total Records : {{ data.projects.length }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class=" bg-grey-4">
                <tr class="text-left">
                  <th scope="col">#</th>
                  <th scope="col">Title
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Course
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'course', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'course', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col" class="text-center">Type</th>
                  <th v-if="state.view_assigned" scope="col" class="text-center">Assigned To</th>
                  <th v-if="state.assign" scope="col" class="text-center">Assign To</th>
                  <th v-if="state.edit" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in data.projects" :key="project.id">
                  <td class="text-left">{{ count++ }}</td>

                  <td v-if="state.view">
                    <q-item dense class="text-primary" clickable :to="`/projects/view/` + project.id"> {{
                      project.title }} </q-item>
                  </td>
                  <td v-else> {{ project.title }} </td>

                  <td class="text-left">
                    {{ project.course }}
                  </td>

                  <td class="text-center text-black">
                    <div v-if="project.type == 1">
                      <q-chip color="green-5" class="text-center" text-color="white">
                        Evaluation
                      </q-chip>
                      <br />
                    </div>
                    <div v-else-if="project.type == 0">
                      <q-chip color="blue-5" class="text-center" style="padding: 0px 20px;" text-color="white">
                        Practice
                      </q-chip>

                      <br />
                    </div>
                    <div v-else-if="project.type == 2">
                      <q-chip color="grey-5" class="text-center" text-color="white" style="padding: 0px 32px;"> Extra
                      </q-chip>
                      <br />
                    </div>
                  </td>
                  <!-- testing -->

                  <td v-if="state.view_assigned" class="text-center">
                    <div>
                      <q-btn flat rounded color="primary" icon-right="visibility" @click="assignedTo(id = project.id)"
                        label="Count" />
                    </div>
                  </td>
                  <td v-if="state.assign" class="text-center">
                    <q-btn flat color="primary" rounded icon="assignment_ind"
                      @click="actionModal(project_id = project.id, type = project.type)" direction="left" padding="sm" />
                  </td>

                  <td v-if="state.edit" style="width: 20px" class="text-center">
                    <div>
                      <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                        <q-fab-action @click="EditProject(project.id)" color="primary" text-color="white" icon="edit">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Edit</q-tooltip>
                        </q-fab-action>
                      </q-fab>
                    </div>
                  </td>

                </tr>
              </tbody>
            </table>
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
const assignActions = ref(false);
const tab1 = ref('');
const splitterModel = ref(20);
const assignedToModal = ref(false)
const batchOptions = ref([])
let upArrow = ref(true);

const batch = ref(null)
const selectedEvaluator = ref(null)
const studentEmail = ref('')
const date = ref('')


const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  view: ref(false),
  assign: ref(false),
  view_assigned: ref(false),
})

let count = 1;
const data = reactive({
  projects: [],
  batches: [],
  evaluators: [],
  evaluatorsName: [],
  assignedCount: [],
  project_id: null,
  type: null,
  totalAssigned: 0,
  FormData: null
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

const sortTable = (field, direction) => {

  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.projects.sort((a, b) => {
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
        data.projects.sort((a, b) => {
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


const EditProject = (id) => {
  router.push("/projects/edit/" + id);
};

const actionModal = (project_id, type) => {
  assignActions.value = true
  data.project_id = project_id
  data.type = type
  api.get('all-batches').then((response) => {
    data.batches = response.data.batches
    batchOptions.value = data.batches
  })
  api.get("project-evaluators", {
    params: {
      is_project: 1,
    }
  }).then((response) => {
    data.evaluators = response.data.evaluators
    data.evaluators.forEach((evaluator) => data.evaluatorsName.push({
      label: evaluator.name,
      value: evaluator.user_id,
      course: evaluator.title
    }))
  })
  count = 1
}

const filterBatch = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()
    data.batches = batchOptions.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

const actions = (assign) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  if (assign == 0) {
    data.FormData = new FormData();
    data.FormData.append('assign', assign)
    data.FormData.append('student_email', studentEmail.value)
    if (studentEmail.value == '') {
      data.FormData.append('batch', batch.value)
    } else {
      data.FormData.append('batch', '')
    }
    data.FormData.append('project_id', data.project_id)
    data.FormData.append('type', data.type)
    data.FormData.append('evaluator', selectedEvaluator.value)
    data.FormData.append('due_date', date.value)
  }
  else if (assign == 1) {
    data.FormData = new FormData();
    data.FormData.append('assign', assign)
    data.FormData.append('student_email', studentEmail.value)
    if (studentEmail.value == '') {
      data.FormData.append('batch', batch.value)
    } else {
      data.FormData.append('batch', '')
    }
    data.FormData.append('project_id', data.project_id)
    data.FormData.append('type', data.type)
    // data.FormData.append('evaluator',selectedEvaluator.value)
    // data.FormData.append('due_date',date.value)
  }
  else if (assign == 2) {
    data.FormData = new FormData();
    data.FormData.append('assign', assign)
    data.FormData.append('student_email', studentEmail.value)
    if (studentEmail.value == '') {
      data.FormData.append('batch', batch.value)
    } else {
      data.FormData.append('batch', '')
    }
    data.FormData.append('project_id', data.project_id)
    data.FormData.append('type', data.type)
    // data.FormData.append('evaluator',selectedEvaluator.value)
    data.FormData.append('due_date', date.value)
  }

  api.post('assign-project', data.FormData, {
    header: {
      "content-type": "multipart/form-data",
    },
  }).then((response) => {
    assignActions.value = false
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    count = 1
    Loading.hide()
  }).catch((err) => {
    console.log(err)
  })
}
const resetForm = (type) => {
  if (type === 'close') {
    tab1.value = ''
    data.evaluatorsName = []
    assignActions.value = false
  } else {
    batch.value = null
    selectedEvaluator.value = null
    studentEmail.value = ''
    date.value = ''
    count = 1
  }
};

const assignedTo = (id) => {
  data.totalAssigned = 0
  assignedToModal.value = true
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get('project-students', { params: { 'project_id': id } }).then((response) => {
    data.assignedCount = response.data.count
    data.assignedCount.forEach((count) => {
      data.totalAssigned += count.count
    })
    Loading.hide()
  })
  count = 1
}

const closePopup = () => {
  assignedToModal.value = false
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

  api.get("projects").then((response) => {
    data.projects = response.data.projects.data
    convertCourseCode(data.projects)
    Loading.hide()
  }).finally(() => {
    count = 1;
  });;

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('project')) {
      state[key] = true
    }

  });

  function checkEvent(keys) {
    return keys.includes('project');
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

.modal-card {
  width: 600px;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.create-header {
  align-items: center;
  justify-content: space-between;
}
</style>
