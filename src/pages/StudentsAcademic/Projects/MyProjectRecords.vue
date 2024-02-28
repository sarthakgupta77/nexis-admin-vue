<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <div class="row">
              <h5 class="q-ma-none q-pt-xs" id="head-1">My Projects Records</h5>
            </div>
          </div>

          <q-dialog maximized style="padding: 0;" persistent v-model="transferModal" full-height position="right">
            <q-card class="modal-card">
              <div>
                <q-card-section class="q-pa-none">
                  <div class="row q-pa-md create-header">
                  <span class="text-h6 w600">Project Scores</span>
                  <q-btn icon="close" dense flat @click="closePopup" />
                </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="q-pa-md" v-for="project in data.project" :key="project.id">
                    <div class="row q-pa-sm" style="align-items: center">
                      <span class="col-12">
                        <b> Name :</b> {{ project.name }}
                      </span>
                      <span class="col-12">
                        <b> Email :</b> {{ project.email }}
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
                            <q-chip v-if="(project.submission == 1)" color="indigo" class="text-center" text-color="white">
                              Submitted
                            </q-chip>
                            <q-chip v-else color="red-5" class="text-center" text-color="white">
                              Not Submitted
                            </q-chip>
                          </div>
                        </div>
                        <span v-if="project.submission == 1" class="col-12">
                          <b> Submission-Date :</b> {{ project.submission_date }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="q-pa-md">
                    <h6 class="q-my-md"> Project Scoring Parameters</h6>
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
                        <q-input dense square filled class="category-name" v-model="marks.parameter" disable></q-input>
                      </div>
                      <div class="col-2 q-pl-sm scoring">
                        <q-input dense square filled class="category-name" v-model="marks.max_marks" disable></q-input>
                      </div>
                      <div class="col-2 q-pl-sm scoring">
                        <q-input dense square filled class="category-name" v-model="marks.obtained_marks"
                          disable></q-input>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <q-tabs v-model="tab" class="text-secondary" align="justify" :breakpoint="0">
              <q-tab name="allEvaluatedRecords" label="Evaluated Records" @click="evaluatedRecords" />
              <q-tab name="pendingRecords" label="pending Records" @click="pendingRecords" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated swipeable>
              <q-tab-panel name="allEvaluatedRecords">
                <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0"
                  width="100%">
                  <thead class=" bg-grey-4">
                    <tr class="text-left">
                      <th scope="col">#</th>
                      <th scope="col">Assigned To</th>
                      <th scope="col">Project</th>
                      <th scope="col">Batch</th>
                      <th scope="col">Type </th>
                      <th scope="col">Submission</th>
                      <th v-if="state.myrecords_viewscore || state.myrecords_publish" class="text-center" scope="col">
                        Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="project in data.allEvaluatedRecords">
                      <td class="text-left">{{ count++ }}</td>

                      <td> <q-icon name="person" size="xs" color="primary" class="q-mr-xs" /> {{ project.name }} <br>
                        <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" /> {{ project.email }}
                      </td>
                      <td> <b> Title :</b> {{ project.title }} <br><b> Course :</b> {{ project.course }}</td>
                      <td v-if="project.batch">{{ project.batch }}</td>
                      <td v-else class="text-center">-</td>
                      <td class=" text-black">

                        <div v-if="project.type == 1" class="badge-btn">
                          <b>Type :</b>
                          <q-chip color="green-5" class="text-center" size="12px" text-color="white">
                            Evaluation
                          </q-chip>
                          <br />
                        </div>
                        <div v-else-if="project.type == 0" class="badge-btn">
                          <b>Type :</b>
                          <q-chip color="blue-5" class="text-center" size="12px" text-color="white">
                            Practice
                          </q-chip>
                          <br />
                        </div>
                        <div v-else-if="project.type == 2" class="badge-btn">
                          <b>Type :</b>
                          <q-chip color="grey-5" class="text-center" size="12px" text-color="white"> Extra </q-chip>
                          <br />
                        </div>
                        <div>
                          <b> Due_Date :</b> {{ project.due_date }}
                        </div>
                      </td>
                      <td>
                        <div v-if="project.submission == 0" class="badge-btn">
                          <b>Status :</b> <q-chip color="red-5" size="12px" class="text-center" text-color="white">
                            Not Submitted
                          </q-chip>
                          <br />
                        </div>
                        <div v-else class="badge-btn">
                          <b>Status :</b> <q-chip color="indigo" size="12px" class="text-center" text-color="white">
                            Submitted
                          </q-chip>
                          <br>
                        </div>
                        <div v-if="project.published == 1" class="badge-btn">
                          <b>Status :</b> <q-chip color="green" size="12px" text-color="white" class="text-center">
                            Publish
                          </q-chip>
                        </div>
                        <div v-else class="badge-btn">
                          <b>Status :</b> <q-chip color="red" size="12px" text-color="white" class="text-center">
                            UnPublish
                          </q-chip>
                        </div>
                      </td>
                      <td style="width: 20px" class="text-center">
                        <div>
                          <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                            <q-fab-action v-if="state.myrecords_viewscore"
                              @click="viewProjectMarks(student_id = project.student_id, submission = project.submission, project_id = project.project_id)"
                              color="primary" text-color="white" icon="open_in_browser">
                              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="scale" transition-hide="scale">View Project Scores</q-tooltip>
                            </q-fab-action>
                            <q-fab-action v-if="project.published == 0 && state.myrecords_publish"
                              @click="publishProject(publish = 1, student_id = project.student_id, project_id = project.project_id)"
                              color="green" text-color="white" icon="change_circle">
                              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="scale" transition-hide="scale">
                                Click to Publish Scores
                              </q-tooltip>
                            </q-fab-action>
                            <q-fab-action v-if="project.published == 1 && state.myrecords_publish" color="red"
                              text-color="white" icon="change_circle"
                              @click="publishProject(publish = 0, student_id = project.student_id, project_id = project.project_id)">
                              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="scale" transition-hide="scale">
                                Click to Unpublish Scores
                              </q-tooltip>
                            </q-fab-action>
                          </q-fab>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="q-pa-md col-md-12 ">
                  <div>
                    <p class="w600 q-ma-none flex flex-center float-left"> Showing data between {{ Number(data.from) }} to
                      {{
                        Number(data.to) }} out of {{ Number(data.total) }}</p>
                    <div v-if="showElement">
                      <q-pagination id="hide-pagination" class="flex float-right" v-model="current"
                        @click="paginate(current)" :max="Number(data.last_page)" :max-pages="10" :boundary-numbers="true"
                        direction-links />
                    </div>
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="pendingRecords">
                <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0"
                  width="100%">
                  <thead class=" bg-grey-4">
                    <tr class="text-left">
                      <th scope="col">#</th>
                      <th scope="col">Assigned To</th>
                      <th scope="col">Project</th>
                      <th scope="col">Batch</th>
                      <th scope="col">Type </th>
                      <th scope="col">Submission</th>
                      <th v-if="state.myrecords_view" class="text-center" scope="col">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="project in data.projects">
                      <td class="text-left">{{ count2++ }}</td>

                      <td> <q-icon name="person" size="xs" color="primary" class="q-mr-xs" /> {{ project.name }} <br>
                        <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" /> {{ project.email }}
                      </td>
                      <td> <b> Title :</b> {{ project.title }} <br><b> Course :</b> {{ project.course }}</td>
                      <td v-if="project.batch">{{ project.batch }}</td>
                      <td v-else class="text-center">-</td>
                      <td class=" text-black">
                        <div v-if="project.type == 1" class="badge-btn">
                          <b>Type :</b>
                          <q-chip color="green-5" class="text-center" size="12px" text-color="white">
                            Evaluation
                          </q-chip>
                          <br />
                        </div>
                        <div v-else-if="project.type == 0" class="badge-btn">
                          <b>Type:</b>
                          <q-chip color="blue-5" class="text-center" size="12px" text-color="white">
                            Practice
                          </q-chip>
                          <br />
                        </div>
                        <div v-else-if="project.type == 2" class="badge-btn">
                          <b>Type:</b>
                          <q-chip color="grey-5" class="text-center" size="12px" text-color="white"> Extra </q-chip>
                          <br />
                        </div>
                        <div>
                          <b> Due_Date :</b> {{ project.due_date }}
                        </div>
                      </td>
                      <td>
                        <div v-if="project.submission == 0" class="badge-btn">
                          <b>Status :</b> <q-chip color="red-5" size="12px" class="text-center" text-color="white">
                            Not Submitted
                          </q-chip>
                          <br />
                        </div>
                        <div v-else class="badge-btn">
                          <b>Status :</b> <q-chip color="indigo" size="12px" class="text-center" text-color="white">
                            Submitted
                          </q-chip>
                          <br>
                          <b> Submit Date : </b> {{ (project.submission_date) }}
                          <br />
                        </div>
                      </td>
                      <td>
                        <q-btn v-if="state.myrecords_view" dense round icon="open_in_new" color="primary"
                          @click="viewProject(project_id = project.project_id, student_id = project.student_id)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">View</q-tooltip>
                        </q-btn>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="q-pa-md col-md-12 ">
                  <div>
                    <p class="w600 q-ma-none flex flex-center float-left"> Showing data between {{ Number(data.from) }} to
                      {{
                        Number(data.to) }} out of {{ Number(data.total) }}</p>
                    <div v-if="showElement">
                      <q-pagination id="hide-pagination" class="flex float-right" v-model="current"
                        @click="paginatePending(current)" :max="Number(data.last_page)" :max-pages="10"
                        :boundary-numbers="true" direction-links />
                    </div>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
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
const tab = ref('allEvaluatedRecords')
const transferModal = ref(false)
const current = ref(1)
const showElement = ref(true)
const access = LocalStorage.getItem('access_key')
const state = reactive({
  myrecords_viewscore: ref(false),
  myrecords_view: ref(false),
  myrecords_publish: ref(false)
})

let count = 1;
let count2 = 1;
const data = reactive({
  allEvaluatedRecords: [],
  projects: [],
  project: [],
  publishedRecords: [],
  unpublishedRecords: [],
  marks: [],
  from: '',
  to: '',
  total: '',
  last_page: '',
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

window.onresize = function () {
  count = 1;
}

const paginate = async (current) => {
  Loading.show({
    spinner: QSpinner,
    size: '3em',
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  await api.get("https://genesis.datatrained.com/api/admin/my-evaluated-records?page=" + current, {
    params: {
      is_project: 1,
      user_id: LocalStorage.getItem('u_id')
    }
  }).then((response) => {
    data.allEvaluatedRecords = response.data.records.data
    convertCourseCode(data.allEvaluatedRecords)
    data.from = response.data.records.from;
    data.to = response.data.records.to;
    data.total = response.data.records.total;
    count = 1
    Loading.hide();
  }).finally(() => {
    count = 1
  })
}

const paginatePending = async (current) => {
  Loading.show({
    spinner: QSpinner,
    size: '3em',
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  await api.get("https://genesis.datatrained.com/api/admin/my-pending-records?page=" + current, {
    params: {
      is_project: 1,
      submission: 1,
      user_id: LocalStorage.getItem('u_id')
    }
  }).then((response) => {
    data.projects = response.data.records.data
    convertCourseCode(data.projects)
    data.from = response.data.records.from;
    data.to = response.data.records.to;
    data.total = response.data.records.total;
    count2 = 1
    Loading.hide();
  }).finally(() => {
    count = 1
  })
}

const evaluatedRecords = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("my-evaluated-records", {
    params: {
      is_project: 1,
      user_id: LocalStorage.getItem('u_id')
    }
  }).then((response) => {
    data.allEvaluatedRecords = response.data.records.data
    convertCourseCode(data.allEvaluatedRecords)
    data.from = response.data.records.from
    data.to = response.data.records.to
    data.total = response.data.records.total
    data.last_page = response.data.records.last_page
    Loading.hide()
    count = 1;
    count2 = 1;
  });
}

const pendingRecords = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("my-pending-records", {
    params: {
      is_project: 1,
      submission: 1,
      user_id: LocalStorage.getItem('u_id')
    }
  }).then((response) => {
    data.projects = response.data.records.data
    convertCourseCode(data.projects)
    data.from = response.data.records.from
    data.to = response.data.records.to
    data.total = response.data.records.total
    data.last_page = response.data.records.last_page
    Loading.hide()
  }).finally(() => {
    count = 1;
    count2 = 1;
  });
}

const viewProject = (project_id, student_id) => {
  window.open("/projects/my-assigned/view/" + project_id + "/" + student_id);
  count = 1
};


const viewProjectMarks = async (student_id, submission, project_id) => {
  data.project = data.allEvaluatedRecords.filter((project) => project.student_id == student_id && project.project_id == project_id && project.submission == submission)
  transferModal.value = true
  count = 1
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
}

const closePopup = () => {
  transferModal.value = false
  data.marks = []
  count = 1
}

const publishProject = (publish, student_id, project_id) => {
  data.FormData = new FormData();
  data.FormData.append('publish', publish)
  data.FormData.append('student_id', student_id)
  data.FormData.append('project_id', project_id)
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("publish-records",
    data.FormData, {
  }).then((response) => {
    api.get("my-evaluated-records", {
      params: {
        is_project: 1,
        user_id: LocalStorage.getItem('u_id')
      }
    }).then((response) => {
      data.allEvaluatedRecords = response.data.records.data
      convertCourseCode(data.allEvaluatedRecords)
      data.from = response.data.records.from
      data.to = response.data.records.to
      data.total = response.data.records.total
      data.last_page = response.data.records.last_page
      count = 1
      Loading.hide()
    });

    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })

  }).catch((err) => {
    console.log(err)
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

  api.get("my-evaluated-records", {
    params: {
      is_project: 1,
      user_id: LocalStorage.getItem('u_id')
    }
  }).then((response) => {
    data.allEvaluatedRecords = response.data.records.data
    convertCourseCode(data.allEvaluatedRecords)
    data.from = response.data.records.from
    data.to = response.data.records.to
    data.total = response.data.records.total
    data.last_page = response.data.records.last_page
    Loading.hide()
    count = 1;
    count2 = 1;
  });

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
}</style>
