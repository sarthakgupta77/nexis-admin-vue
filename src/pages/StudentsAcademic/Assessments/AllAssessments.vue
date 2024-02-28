<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5>All Assessments</h5>
            <q-btn v-if="state.create" label="create new" to="/assessments/add" class="create-btn"></q-btn>
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-icon name="error" size="4rem" class="col-12" color="red" />
                <span class="text-h5 w600 col-12 text-center q-py-sm">Are You Sure?</span>
                <span class="text-subtitle1 w600 col-12 text-center text-grey">You won't be able to revert this!</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn label="Yes, Delete !" color="red" @click="deleteAssessment" />
                <q-btn label="Cancel" color="primary" @click="count = 1" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

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
                      <tr>
                        <td></td>
                        <td class="text-center"></td>
                      </tr>
                    </tbody>
                  </table>
                </q-card-section>
              </div>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <q-dialog v-model="assignActions" persistent>
              <div style="background: #fff; width: 550px;">
                <q-card>
                  <q-form style="height: 100%" @submit="assignAssessment" @reset="resetForm">
                    <q-card-section class="row">
                      <q-toolbar>
                        <q-toolbar-title><span class="text-weight-bold">Assign this Assessment</span>
                        </q-toolbar-title>
                      </q-toolbar>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                      <div class="row">
                        <div class="col-md-12">
                          <label class="col-md-12 q-pa-sm" style="font-weight: 600">Select by Batch </label>
                          <q-select v-if="studentEmail == ''" outlined dense class="col-md-12 q-mr-sm"
                            label="Select Batch" v-model="batch" use-chips :options="data.batches" lazy-rules use-input
                            hide-selected fill-input input-debounce="0" @filter="filterBatch"
                            :popup-content-style="{ width: '400px', height: '70%' }"
                            :rules="[val => val !== null || 'Please Select Batch']" />

                          <q-select v-else outlined disable dense class="col-md-12 q-mr-sm" label="Select Batch" />
                        </div>
                      </div>
                      <div class="row q-mt-sm">
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
                            :rules="[val => val && val.length > 0 || 'Please Select End Date']" />
                        </div>
                      </div>
                      <q-separator class="q-mt-sm" />
                      <div class="col-md-12 q-mt-sm">
                        <label class="col-md-12 q-pa-sm" style="font-weight: 600">Select Evaluator</label>
                        <q-select outlined dense v-model="selectedEvaluator" label="Select Evaluator"
                          :options="data.evaluatorsName" class="col-md-12 q-mr-sm" lazy-rules
                          :rules="[val => val !== null || 'Please Select Evaluator']" emit-value map-options>
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
                      <q-separator class="q-mt-sm" />
                      <div class="col-md-12 q-mt-sm">
                        <label class="col-md-12 q-px-sm" style="font-weight: 600">Select Directly a Single
                          Student</label>
                        <q-input v-if="batch == null" dense v-model="studentEmail" outlined color="secondary"
                          placeholder="Enter Student E-mail" class="col-md-12 q-mr-sm" />
                        <q-input v-else disable dense outlined color="secondary"
                          placeholder="Enter Student E-mail" class="col-md-12 q-mr-sm" />
                      </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-actions align="right" style="padding: 20px;">
                      <q-btn label="Close" color="grey-8" type="reset" />
                      <q-btn label="Assign" color="primary" type="submit" />
                    </q-card-actions>
                  </q-form>
                </q-card>
              </div>
            </q-dialog>
            <div v-if="data.total > 0" class="q-pa-sm w600"> Total Records : {{ data.total }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th scope="col">#</th>
                  <th scope="col">Title
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                        id="arrow-icon" style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span id="arrow-icon"
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Course
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'course', direction = 'asc')"><span
                        id="arrow-icon" style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'course', direction = 'dsc')"><span id="arrow-icon"
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th class="text-center" scope="col">Duration</th>
                  <th class="text-center" scope="col">Attempts</th>
                  <th class="text-center" scope="col">Certificate</th>
                  <th class="text-center" scope="col">Assign To</th>
                  <th class="text-center" v-if="state.edit || state.delete" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center" v-for="assessment in data.assessments">
                  <td class="text-left">{{ count++ }}</td>
                  <td class="text-left" v-if="state.view && assessment.content_ques != '.'">
                    <q-item dense class="text-primary" clickable :to="`/assessments/view/` + assessment.id"> {{
                      assessment.title }} </q-item>
                  </td>
                  <td class="text-left" v-else>
                    {{ assessment.title }}
                  </td>
                  <td class="text-left"> {{ assessment.course }} </td>
                  <td> {{ assessment.duration }} Min </td>
                  <td> {{ assessment.attempt }} </td>
                  <td v-if="assessment.certificate > 0"> Yes </td>
                  <td v-else> No </td>
                  <td>
                    <q-btn v-if="state.assign" flat color="primary" rounded icon="assignment_ind" direction="left"
                      id="assignment" padding="sm" @click="actionModal(id = assessment.id)" />
                  </td>
                  <td v-if="state.edit || state.delete" style="width: 20px">
                    <div>
                      <q-fab flat color="grey-9" icon="settings" direction="left" padding="sm">
                        <q-fab-action v-if="state.edit && assessment.content_ques != '.'" color="primary"
                          text-color="white" icon="edit" @click="EditAssessment(id = assessment.id)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Edit</q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="state.delete" color="red" text-color="white" icon="delete"
                          @click="confirmDelete(id = assessment.id)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Delete</q-tooltip>
                        </q-fab-action>
                      </q-fab>
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
const batch = ref(null)
const selectedEvaluator = ref(null)
const studentEmail = ref('')
const startDate = ref('')
const endDate = ref('')
const current = ref(1);
let showElement = ref(true);
const confirm = ref(false)
const batchOptions = ref([])
let upArrow = ref(true);

const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  assign: ref(false),
  view_assigned: ref(false),
  view: ref(false)
})

let count = 1;
const data = reactive({
  assessments: [],
  assessment_id: null,
  batches: [],
  evaluators: [],
  evaluatorsName: [],
  from: '',
  to: '',
  total: '',
  last_page: ''
});

const EditAssessment = (id) => {
  router.push("/assessments/edit/" + id);
};

window.onresize = function () {
  count = 1;
}

const deleteAssessment = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post('delete-assessment', {
    assessment_id: data.assessment_id
  }).then(response => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red-7',
      message: response.data.msg
    })
    Loading.hide()
    location.reload();
    count = 1
  }).catch((error) => {
    console.log("Error", error);
  });
}

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.assessments.sort((a, b) => {
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
        data.assessments.sort((a, b) => {
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

const actionModal = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.assessment_id = id
  api.get('all-batches').then((response) => {
    data.batches = response.data.batches
    batchOptions.value = data.batches
    Loading.hide()
    assignActions.value = true
  })
  count = 1
}

const filterBatch = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()
    data.batches = batchOptions.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

const closePopup = () => {
  assignedToModal.value = false
  count = 1
}

const confirmDelete = (id) => {
  confirm.value = true
  data.assessment_id = id
  count = 1;
}

const resetForm = () => {
  tab1.value = ''
  assignActions.value = false
  batch.value = null
  studentEmail.value = ''
  selectedEvaluator.value = ''
  startDate.value = ''
  endDate.value = ''
  count = 1
};

const paginate = async (current) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  await api.get("https://genesis.datatrained.com/api/admin/assessments?page=" + current).then((response) => {
    data.assessments = response.data.assessments.data
    data.from = response.data.assessments.from;
    data.to = response.data.assessments.to;
    data.total = response.data.assessments.total;
    Loading.hide();
    count = 1
  })
}

const assignAssessment = () => {
  if (studentEmail.value !== '') {
    batch.value = ''
  }
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post('assign-assessment', {
    assessment_id: data.assessment_id,
    batch: batch.value,
    startDate: startDate.value,
    endDate: endDate.value,
    evaluator_id: selectedEvaluator.value,
    student_email: studentEmail.value
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

  api.get("assessments").then((response) => {
    data.assessments = response.data.assessments.data;
    convertCourseCode(data.assessments)
    data.from = response.data.assessments.from
    data.to = response.data.assessments.to
    data.total = response.data.assessments.total
    data.last_page = response.data.assessments.last_page
    Loading.hide()
  });

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
  white-space: nowrap;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}

.create-header {
  align-items: center;
  justify-content: space-between;
}

.modal-card {
  width: 600px;
  height: 100% !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#arrow-icon {
  margin-left: -17px;
}


@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {

  .table-container[data-v-3247410a] {
    // background-color: #fff;
    padding: 6px;
    // width: auto;
  }

}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation : portrait) {

  .table-container[data-v-3247410a] {
    padding: 1px;
  }

  th[data-v-3247410a] {
    font-size: 10px;
    text-align: center;
  }

  td[data-v-3247410a] {
    font-size: 10px;
    text-align: center;
  }

  #arrow-icon {
    font-size: 11px !important;
  }


  td[data-v-3247410a],
  th[data-v-3247410a] {
    padding: 5px 3px;
  }

  h5 {
    font-size: 14px;
  }

  .create-btn {
    width: 120px;
    font-size: 11px;
  }

  .head-btn-box[data-v-3247410a] {
    height: 5vh;
  }

  #assignment {
    font-size: 10px;
  }

}
</style>
