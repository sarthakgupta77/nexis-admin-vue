<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12" style="width: 100%;">
          <div class="head-btn-box shadowBoder headerbox">
            <h5 id="head-1">Report Cards</h5>
            <div class="row">
              <q-input outlined dense type="search" class="q-mr-sm search-button" v-model.trim="text"
                label="Search By Email" @keyup="filterByEmail">
                <template v-slot:append>
                  <q-btn flat dense id="search-text" icon="search" />
                </template>
              </q-input>
              <q-btn v-if="state.create" label="create report" @click="createNewModal = true; count = 1"
                class="create-btn"></q-btn>
            </div>
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-icon name="error" size="4rem" class="col-12" color="red" />
                <span class="text-h5 w600 col-12 text-center q-py-sm">Are You Sure?</span>
                <span class="text-subtitle1 w600 col-12 text-center text-grey">You won't be able to revert this!</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn label="Yes, Delete !" color="red" @click="deleteReport" />
                <q-btn label="Cancel" color="primary" @click="count = 1" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="updateModal" persistent>
            <q-card style="width: 500px">
              <q-form @submit="updateReports">
                <q-card-section class="row">
                  <div class="col-12 row" style="align-items: baseline;">
                    <label class="w600 q-pa-xs col-12">
                      Note
                    </label>
                    <q-input dense outlined color="secondary" v-model="editNote" class="col-12" type="textarea" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Mention Reason for Editing']" />
                  </div>
                </q-card-section>
                <q-card-actions class="q-px-md" align="right">
                  <q-btn label="Cancel" outline @click="count = 1" v-close-popup />
                  <q-btn label="Update" color="secondary" type="submit" />
                </q-card-actions>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="createNewModal" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="addReport" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Add New Report Card</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm">
                      <div class="col-4 row">
                        <label class="w600 q-pa-xs col-12">
                          Student Name
                        </label>
                        <q-input dense outlined v-model="card.name" color="secondary" class="col-12" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Student Name']" />
                      </div>
                      <div class="col-5 row q-px-md">
                        <label class="w600 q-pa-xs col-12">
                          Email
                        </label>
                        <q-input dense outlined v-model="card.email" color="secondary" class="col-12" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Email']" />
                      </div>
                      <div class="col-3 row">
                        <label class="w600 q-pa-xs col-12">
                          Enrollment ID
                        </label>
                        <q-input dense outlined color="secondary" v-model="card.enrolment_id" class="col-12" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Enrollment Id']" />
                      </div>
                    </div>
                    <div class="col-12 row q-mt-sm">
                      <div class="col-12 row">
                        <label class="w600 q-pa-xs col-12">
                          Course Name
                        </label>
                        <q-select dense outlined v-model="card.course" use-input clearable
                          @new-value="createValue" :options="filterOptions" @filter="filterFn" color="secondary"
                          class="col-12" lazy-rules :popup-content-style="{ width: '385px' }"
                          :rules="[val => val != null || 'Please Select Course']" />
                      </div>
                    </div>
                  </div>
                  <div class="q-px-md q-pb-md">
                    <h6 class="q-ma-none w600">Marks for Data Science Report Card</h6>
                    <div class="row q-pt-sm">
                      <div class="col-6 q-pr-md">
                        <p class="w600">Objective Assessment Scores</p>
                        <div class="row">
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">Python Test</label>
                            <q-input dense outlined color="secondary" v-model="card.python" class="col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">SQL Test</label>
                            <q-input dense outlined color="secondary" v-model="card.sql" class="col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">Statistics Test</label>
                            <q-input dense outlined color="secondary" v-model="card.statistics" class="col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">Machine Learning
                              (ML)</label>
                            <q-input dense outlined color="secondary" v-model="card.machine_learning"
                              class="col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">Data
                              Visualization</label>
                            <q-input dense outlined color="secondary" v-model="card.data_visualization"
                              class="col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">Final Assessment</label>
                            <q-input dense outlined color="secondary" v-model="card.final_assessment"
                              class="col-6 q-py-sm" />
                          </div>
                        </div>
                      </div>
                      <div class="col-6 q-pl-md">
                        <p class="w600">Subjective Assessment Scores</p>
                        <div class="row">
                          <div class="col-12 row">
                            <label class="col-5 w400" style="align-items: center;display: flex;">ML Subjective</label>
                            <q-input dense outlined color="secondary" v-model="card.ml_subjective"
                              class="width1 col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-5 w400" style="align-items: center;display: flex;">Python Subjective</label>
                            <q-input dense outlined color="secondary" v-model="card.python_subjective"
                              class="width1 col-6 q-py-sm" />
                          </div>
                        </div>
                        <p class="w600 q-mt-md">Ability Scores</p>
                        <div class="col-12 row">
                          <label class="col-md-5 w400" style="align-items: center;display: flex;">Project Ability
                            Score</label>
                          <q-input dense outlined color="secondary" v-model="card.abilityScore"
                            class="width1 col-md-6 q-py-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: space-between;">
                    <q-btn outline label="Clear" type="reset" />
                    <q-btn color="primary" label="Create" type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="editModal" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="updateModal = true; editModal = false; count = 1">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Update Report Card</span>
                    <q-btn icon="close" dense flat @click="count = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm">
                      <div class="col-4 row">
                        <label class="w600 q-pa-xs col-12">
                          Student Name
                        </label>
                        <q-input dense outlined v-model="data.marks.name" color="secondary" class="col-12" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Student Name']" />
                      </div>
                      <div class="col-5 row q-px-md">
                        <label class="w600 q-pa-xs col-12">
                          Email
                        </label>
                        <q-input dense outlined v-model="data.card.email" color="secondary" class="col-12" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Email']" />
                      </div>
                      <div class="col-3 row">
                        <label class="w600 q-pa-xs col-12">
                          Enrollment ID
                        </label>
                        <q-input dense outlined color="secondary" v-model="data.card.enrolment_id" class="col-12"
                          lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Enrollment Id']" />
                      </div>
                    </div>
                    <div class="col-12 row q-mt-sm">
                      <div class="col-12 row">
                        <label class="w600 q-pa-xs col-12">
                          Course Name
                        </label>
                        <q-select dense outlined v-model="data.card.course" use-input clearable input-debounce="0"
                          @new-value="createValue" :options="filterOptions" @filter="filterFn" color="secondary"
                          class="col-12" lazy-rules :popup-content-style="{ width: '385px' }"
                          :rules="[val => val != null || 'Please Select Course']" />
                      </div>
                    </div>
                  </div>
                  <div class="q-px-md q-pb-md">
                    <h6 class="q-ma-none w600">Marks for Data Science Report Card</h6>
                    <div class="row q-pt-sm">
                      <div class="col-6 q-pr-md">
                        <p class="w600">Objective Assessment Scores</p>
                        <div class="row">
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">Python Test</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.python" class="col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">SQL Test</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.sql" class="col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">Statistics Test</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.statistics"
                              class="col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">Machine Learning
                              (ML)</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.ml" class="col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">Data
                              Visualization</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.data_visualization"
                              class="col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">Final Assessment</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.finalassessment"
                              class="col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-6 w400" style="align-items: center;display: flex;">Cumulative</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.cumulativeobjective"
                              class="col-6 q-py-sm" />
                          </div>
                        </div>
                      </div>
                      <div class="col-6 q-pl-md">
                        <p class="w600">Subjective Assessment Scores</p>
                        <div class="row">
                          <div class="col-12 row">
                            <label class="col-5 w400" style="align-items: center;display: flex;">Machine Learning</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.ml_subjective"
                              class="width1 col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-5 w400" style="align-items: center;display: flex;">Python</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.python_subjective"
                              class="width1 col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-5 w400" style="align-items: center;display: flex;">Combined</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.combined_subjective"
                              class="width1 col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-5 w400" style="align-items: center;display: flex;">Statistics</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.statistics_subjective"
                              class="width1 col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-5 w400" style="align-items: center;display: flex;">Data Visualization</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.data_visualization_subjective"
                              class="width1 col-6 q-py-sm" />
                          </div>
                          <div class="col-12 row">
                            <label class="col-5 w400" style="align-items: center;display: flex;">Cumulative</label>
                            <q-input dense outlined color="secondary" v-model="data.marks.cumulativesubjective"
                              class="width1 col-6 q-py-sm" />
                          </div>
                        </div>
                        <p class="w600 q-mt-md">Ability Scores</p>
                        <div class="col-12 row">
                          <label class="col-md-5 w400" style="align-items: center;display: flex;">Project Ability
                            Score</label>
                          <q-input dense outlined color="secondary" v-model="data.marks.projectability"
                            class="width1 col-md-6 q-py-sm" />
                        </div>
                        <div class="col-12 row">
                          <label class="col-md-5 w400" style="align-items: center;display: flex;">Cumulative Ability
                            Score</label>
                          <q-input dense outlined color="secondary" v-model="data.marks.cumulativeabilityscore"
                            class="width1 col-md-6 q-py-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: flex-end;">
                    <q-btn color="primary" label="Update" type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <div v-if="data.total > 0" class="q-pa-sm w600"> Total Records : {{ data.total }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th class="text-center textsize" scope="col">#</th>
                  <th class="textsize" scope="col">Assigned To
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'email', direction = 'asc')"><span
                        class="arrow-btn" id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'email', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th class="textsize" scope="col">Course
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'course', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'course', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th class="textsize" scope="col">Enrolment ID
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'enrolment_id', direction = 'asc')"
                      id="arrow-icon">&uarr;&darr;</q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'enrolment_id', direction = 'dsc')"
                      id="arrow-icon">&darr;&uarr;</q-btn>
                  </th>
                  <th class="textsize" scope="col">Certificate ID
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'certificate_id', direction = 'asc')"
                      id="arrow-icon">&uarr;&darr;</q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'certificate_id', direction = 'dsc')"
                      id="arrow-icon">&darr;&uarr;</q-btn>
                  </th>
                  <th class="textsize" scope="col">Issued On
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'created_at', direction = 'asc')"
                      id="arrow-icon">&uarr;&darr;</q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'created_at', direction = 'dsc')"
                      id="arrow-icon">&darr;&uarr;</q-btn>
                  </th>
                  <th class="text-center textsize" scope="col">View</th>
                  <th class="text-center textsize" v-if="state.edit || state.status" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="card in data.reports" :key="card.id">
                  <td class="text-center">{{ count++ }}</td>
                  <td class="assigned">
                    <div class="assigned" style="overflow-wrap: break-word;">
                      <q-icon name="person" size="xs" color="primary" class="q-mr-xs" /> {{
                        JSON.parse(card.marks_data).name }} <br>
                      <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" /> {{ card.email }}
                    </div>
                  </td>
                  <td>
                    <div class="course">
                      {{ card.course }}
                    </div>

                  </td>
                  <td>
                    <div class="enroll-id">
                      {{ card.enrolment_id }}
                    </div>
                  </td>
                  <td>
                    <div class="enroll-id">
                      {{ card.certificate_id }}
                    </div>
                  </td>
                  <td>
                    <div class="enroll-id">
                      {{ card.created_at }}
                    </div>
                  </td>
                  <td class="text-center">
                    <div class="viewtext">
                      <q-btn flat rounded color="primary" class="view-text" label="View"
                        :href="card_url + card.enrolment_id" target="_blank" icon-right="open_in_new" />
                    </div>
                  </td>
                  <td v-if="state.edit || state.delete || state.reset" style="width: 20px" class="text-center">
                    <div>
                      <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                        <q-fab-action v-if="state.edit" @click="openEditModal(id = card.id)" color="primary"
                          text-color="white" icon="edit">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Edit</q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="state.reset" color="amber-10" @click="resetReport(card.id)" icon="lock_reset">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Reset</q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="state.delete" @click="confirmDelete(id = card.id)" color="red"
                          text-color="white" icon="delete">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Delete</q-tooltip>
                        </q-fab-action>
                      </q-fab>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="shadowBoder col-md-12 " style="height: 10vh;">
              <div>
                <p class="w600 q-ma-none flex flex-center float-left"> Showing data between {{ Number(data.from) }} to {{
                  Number(data.to) }} out of {{ Number(data.total) }} </p>
                <div v-if="showElement">
                  <q-pagination class="flex float-right" v-model="current" @click="paginate(current)"
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
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from 'quasar'
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
const text = ref("")
const current = ref(1);
let showElement = ref(true);
const confirm = ref(false)
const createNewModal = ref(false)
const editModal = ref(false)
const updateModal = ref(false)
const editNote = ref('')
const card_url = "https://datatrained.com/api/view-report-card/";
const access = LocalStorage.getItem('access_key')
const u_id = LocalStorage.getItem('u_id')
let upArrow = ref(true);
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
  reset: ref(false),
})

const card = reactive({
  name: null,
  email: null,
  course: null,
  enrolment_id: null,
  python: null,
  sql: null,
  statistics: null,
  machine_learning: null,
  data_visualization: null,
  ml_subjective: null,
  python_subjective: null,
  final_assessment: null,
  abilityScore: null,
  FormData: null
});

const options = [
  "PG Program in Data Science, Machine Learning and Neural Networks",
  "Applied Machine Learning with Python",
  "Strategic Program in Digital Marketing",
  "Data Science Master Class",
  "PG Program in Full Stack Development Engineering",
  "PG Program in Investment Banking and Capital Market",
  "Data Science and Machine Learning Projects",
  "PG Program in Human Resource Management and People",
];

const filterOptions = ref(options);
const createValue = (val, done) => {
  if (val.length > 0) {
    if (!options.includes(val)) {
      options.push(val)
    }
    done(val, 'toggle')
  }
}

const filterFn = (val, update) => {
  update(() => {
    if (val === '') {
      filterOptions.value = options
    }
    else {
      const needle = val.toLowerCase()
      filterOptions.value = options.filter(
        v => v.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

const data = reactive({
  reports: [],
  report_id: null,
  card: [],
  marks: [],
  last_page: '',
  from: '',
  to: '',
  total: ''
});

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.reports.sort((a, b) => {
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
        data.reports.sort((a, b) => {
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

const updateReports = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("update-report-card", {
    id: data.card.id,
    name: data.marks.name,
    email: data.card.email,
    course: data.card.course,
    enrolment_id: data.card.enrolment_id,
    python: data.marks.python,
    sql: data.marks.sql,
    statistics: data.marks.statistics,
    ml: data.marks.ml,
    data_visualization: data.marks.data_visualization,
    finalassessment: data.marks.finalassessment,
    cumulativeobjective: data.marks.cumulativeobjective,
    ml_subjective: data.marks.ml_subjective,
    python_subjective: data.marks.python_subjective,
    combined_subjective: data.marks.combined_subjective,
    statistics_subjective: data.marks.statistics_subjective,
    data_visualization_subjective: data.marks.data_visualization_subjective,
    cumulativesubjective: data.marks.cumulativesubjective,
    projectability: data.marks.projectability,
    cumulativeabilityscore: data.marks.cumulativeabilityscore,
    updated_by: u_id,
    updated_why: editNote.value
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
      message: response.data.msg
    })
    updateModal.value = false
    editNote.value = ''
    api.get("report-cards").then((response) => {
      data.reports = response.data.cards.data;
      data.last_page = response.data.cards.last_page;
      data.from = response.data.cards.from;
      data.to = response.data.cards.to;
      data.total = response.data.cards.total;
      count = 1;
    })
    Loading.hide()
  }).catch((error) => {
    console.log("Error", error);
  });
};

const addReport = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  card.FormData = new FormData();
  card.FormData.append("enrolment_id", card.enrolment_id),
    card.FormData.append("name", card.name),
    card.FormData.append("email", card.email),
    card.FormData.append("course", card.course),
    card.FormData.append("python", card.python),
    card.FormData.append("sql", card.sql),
    card.FormData.append("statistics", card.statistics),
    card.FormData.append("ml", card.machine_learning),
    card.FormData.append("data_visualization", card.data_visualization),
    card.FormData.append("ml_subjective", card.ml_subjective),
    card.FormData.append("python_subjective", card.python_subjective),
    card.FormData.append("finalassessment", card.final_assessment),
    card.FormData.append("projectability", card.abilityScore),
    card.FormData.append('added_by', u_id)

    api.post('add-report-card', card.FormData, {
      header: {
        "content-type": "multipart/form-data",
      },
    }).then(function (response) {
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'green',
        message: response.data.msg
      })
      createNewModal.value = false
      api.get("report-cards").then((response) => {
        data.reports = response.data.cards.data;
        data.last_page = response.data.cards.last_page;
        data.from = response.data.cards.from;
        data.to = response.data.cards.to;
        data.total = response.data.cards.total;
        Loading.hide()
        count = 1;
      })
    }).catch(function (error) {
      console.log(error);
    });

}

const onReset = () => {
  card.name = null,
    card.email = null,
    card.course = null,
    card.enrolment_id = null,
    card.python = null,
    card.sql = null,
    card.statistics = null
  card.machine_learning = null
  card.final_assessment = null
  card.ml_subjective = null
  card.python_subjective = null
  count = 1
}

let count = Number(data.from) + 1;

const openEditModal = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get("edit-report-card", {
    params: {
      id: id
    }
  }).then(response => {
    data.card = response.data.cards;
    data.marks = JSON.parse(response.data.cards.marks_data);
    editModal.value = true
    count = 1
    Loading.hide()
  });
}

const resetReport = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get("reset-report/" + id).then(response => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'amber-7',
      message: 'Certificate Successfully Reset'
    })
    location.reload();
    count = 1
    Loading.hide()
  })
}

const deleteReport = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get("delete-report-card/" + data.report_id).then(response => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red-7',
      message: response.data.msg
    })
    location.reload()
    count = 1
    Loading.hide()
  }).catch((error) => {
    console.log("Error", error);
  });
}

const ChangeStatus = (id, status) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api
    .post("article-action", {
      action: 1,
      id: id,
      status: status
    }).then((response) => {
      api.get("articles").then((response) => {
        data.articles = response.data.articles;
        Notify.create({
          timeout: 2000,
          position: 'top-right',
          color: 'amber-7',
          message: 'Status Changed Successfully'
        })
      });
      Loading.hide()
    }).catch((error) => {
      console.log("Error", error);
    });
};

const filterByEmail = () => {
  count = 1;
  if (text.value.length >= 3) {
    count = 1;
    Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
    api.get("get-report-card", { params: { email: text.value } }).then((response) => {
      data.reports = response.data.cards;
      Loading.hide()
    }).finally(() => {
      count = 1;
    });
    showElement = false;
  }
  else if (text.value.length < 3) {
    count = 1;
    Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
    api.get("report-cards").then((response) => {
      data.reports = response.data.cards.data;
      Loading.hide()
    }).finally(() => {
      count = 1;
    });
    showElement = true;
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

  await api.get("https://genesis.datatrained.com/api/admin/report-cards?page=" + current).then((response) => {
    data.reports = response.data.cards.data
    data.from = response.data.cards.from;
    data.to = response.data.cards.to;
    data.total = response.data.cards.total;
    Loading.hide();
    count = 1;
  }).finally(() => {
    count = 1
  });
}

const confirmDelete = (id) => {
  confirm.value = true
  data.report_id = id
  count = 1;
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("report-cards").then((response) => {
    data.reports = response.data.cards.data;
    data.last_page = response.data.cards.last_page;
    data.from = response.data.cards.from;
    data.to = response.data.cards.to;
    data.total = response.data.cards.total;
    Loading.hide()
    count = 1;
  })

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('report-card')) {
      state[key] = true
    }
  });

  function checkEvent(keys) {
    return keys.includes('report-card');
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

.createNew {
  width: 900px;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.container {
  width: auto;
  height: 100%;
}

.table-container {
  background-color: #fff;
  padding: 15px;
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
  font-size: 15px;
  white-space: nowrap;
}

td {
  color: #4f4f4f;
}

.viewtext {
  width: max-content;
}

@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
  .assigned {
    width: 130px;
    font-size: 11px;
    text-align: left;
    padding: 3px;
  }

  .textsize {
    font-size: 12px;
  }

  .viewtext {
    width: max-content;
  }

  #head-1 {
    font-size: 15px;
  }

  .search-button {
    width: 185px;
    // font-size: 12px;
  }

  #search-text {
    font-size: 12px;
  }

  .create-btn {
    font-size: 10px;
    width: 110px;
  }

  .headerbox {
    height: 4vh;
  }

  .course {
    font-size: 11px;
    width: 90px;
  }

  .enroll-id {
    font-size: 11px;
  }

  .view-text {
    font-size: 11px;
  }

  .view-icon {
    font-size: 16px;
  }

  .table-container {
    padding: 0;
  }

  .action-btn {
    font-size: 5px;
  }

  .arrow-btn {
    font-size: 10px;
  }

  .q-btn {
    font-size: 11px;
    padding: 0;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1023px) and (orientation : portrait) {
  td {
    padding: 5px 0px;
    font-size: 7px;
  }

  .assigned {
    width: 70px;
    font-size: 7px;
    text-align: left;
    padding: 3px;
  }

  .textsize {
    font-size: 8px;
  }

  .viewtext {
    width: max-content;
  }

  #head-1 {
    font-size: 14px;
  }

  .search-button {
    width: 92px;
    // font-size: 12px;
    height: 4vh;
  }

  #search-text {
    font-size: 10px;
  }

  .create-btn {
    width: 90px;
    height: 30px;
    margin-top: 6px;
  }

  .headerbox {
    height: 5vh;
  }

  .course {
    font-size: 7px;
    width: 65px;
    text-align: left;
    padding: 3px;
  }

  .enroll-id {
    font-size: 7px;
  }

  .view-text {
    font-size: 7px;
  }

  .table-container {
    padding: 0;
  }

  .action-btn {
    font-size: 5px;
  }

  #arrow-icon {
    font-size: 10px !important;
    font-weight: 600;
  }

  .view-icon {
    font-size: 8px;
  }

  .q-btn {
    font-size: 7px;
    padding: 0;
  }

  .action-btn {
    font-size: 12px;
  }

  // .q-field--dense .q-field_control, .q-field--dense .q-field_marginal {
  //     height: 31px;
  // }

}
</style>
