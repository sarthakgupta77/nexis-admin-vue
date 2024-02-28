<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5>All Evaluators</h5>
            <q-btn v-if="state.create" label="create new" @click="openCreateModal" class="create-btn"></q-btn>
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-icon name="error" size="4rem" class="col-12" color="red" />
                <span class="text-h5 w600 col-12 text-center q-py-sm">Are You Sure?</span>
                <span class="text-subtitle1 w600 col-12 text-center text-grey">You won't be able to revert this!</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn label="Yes, Delete !" color="red" @click="deleteEvaluator" />
                <q-btn label="Cancel" color="primary" @click="count = 1" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="createEvalModal" full-height position="right">
            <q-card>
              <q-form class="form-card" @submit="createEvaluator" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row q-pa-md create-header" style="justify-content:space-between">
                    <span class="text-h6 w600">Create Evaluator</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="q-pa-md">
                    <div class="row" style="align-items: baseline;">
                      <span class="col-md-4 w600">Evaluator Email</span>
                      <q-select dense outlined clearable :options="data.filterOptions" option-label="email"
                        option-value="id" use-input emit-value map-options @filter="filterFn" v-model="evaluator.email"
                        class="col-md-8" lazy-rules :rules="[val => val !== null || 'Please Select Evaluator Email']" />
                    </div>
                    <div class="row q-pt-md" style="align-items: baseline;">
                      <span class="col-md-4 w600">Evaluator Type</span>
                      <q-select dense outlined :options="typeOptions" v-model="evaluator.type"
                        class="col-md-8" emit-value map-options lazy-rules :rules="[val => val !== null || 'Please Select Evaluator Type']" />
                    </div>
                    <div class="row q-pt-md" style="align-items: baseline;">
                      <span class="col-md-4 w600">Evaluator Status</span>
                      <q-select :options="options" dense outlined v-model="evaluator.status"
                        class="col-md-8" emit-value map-options lazy-rules :rules="[val => val !== null || 'Please Select Evaluator Status']">
                      </q-select>
                    </div>
                    <div class="row q-pt-md" style="align-items: baseline;">
                      <span class="col-md-4 w600">Evaluator Course</span>
                      <q-select :options="courseOptions" dense outlined :popup-content-style="{ width: '385px' }"
                        v-model="evaluator.course" class="col-md-8" emit-value map-options lazy-rules
                        :rules="[val => val !== null || 'Please Select Evaluator Course']">
                      </q-select>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: space-between;">
                    <q-btn outline label="Clear" type="reset" />
                    <q-btn color="primary" type="submit" label="Create" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="editEvaluator" full-height position="right">
            <q-card>
              <q-form class="form-card" @submit="updateEvaluator">
                <q-card-section class="q-pa-none">
                  <div class="row q-pa-md create-header" style="justify-content:space-between">
                    <span class="text-h6 w600">Edit Evaluator</span>
                    <q-btn icon="close" dense flat @click="count = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="q-pa-md">
                    <div class="row" style="align-items: baseline;">
                      <span class="col-md-4 w600">Evaluator Name</span>
                      <q-input outlined dense class="col-md-8" v-model="data.evaluator.name" disable lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Select Evaluator Type']" />
                    </div>
                    <div class="row q-pt-md" style="align-items: baseline;">
                      <span class="col-md-4 w600">Evaluator Type</span>
                      <q-select dense outlined :options="typeOptions" v-model="data.evaluator.type" emit-value map-options
                        class="col-md-8" lazy-rules :rules="[val => val !== null || 'Please Select Evaluator Type']" />
                    </div>
                    <div class="row q-pt-md" style="align-items: baseline;">
                      <span class="col-md-4 w600">Evaluator Status</span>
                      <q-select :options="options" dense outlined v-model="data.evaluator.is_active" emit-value
                        map-options class="col-md-8" lazy-rules
                        :rules="[val => val !== null || 'Please Select Evaluator Status']">
                      </q-select>
                    </div>
                    <div class="row q-pt-md" style="align-items: baseline;">
                      <span class="col-md-4 w600">Evaluator Course</span>
                      <q-select :options="courseOptions" dense outlined :popup-content-style="{ width: '385px' }"
                        v-model="data.evaluator.course" class="col-md-8" emit-value map-options lazy-rules
                        :rules="[val => val !== null || 'Please Select Evaluator Course']">
                      </q-select>
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: flex-end;">
                    <q-btn color="primary" type="submit" label="Update" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <div class="table-container  shadowBoder">
            <div v-if="data.evaluators.length > 0" class="q-pa-sm w600"> Total Records : {{ data.evaluators.length }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class=" bg-grey-4">
                <tr class="text-left">
                  <th class="text-center" scope="col">#</th>
                  <th scope="col">Name
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'name', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'name', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Course
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'course', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'course', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col" class="text-center">Type</th>
                  <th scope="col" class="text-center">Status</th>
                  <th v-if="state.edit || state.delete || state.status" scope="col" class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-left" v-for="evaluator in data.evaluators" :key="evaluator.id">
                  <td class="text-center">{{ count++ }}</td>
                  <td>{{ evaluator.name }}</td>
                  <td>{{ evaluator.course }}</td>
                  <td class="text-center">
                    <div v-if="evaluator.type == 0">
                      <q-chip color="green-5" class="text-center" text-color="white"> Both </q-chip>
                    </div>
                    <div v-else-if="evaluator.type == 1">
                      <q-chip color="blue-5" class="text-center" text-color="white"> Project </q-chip>
                    </div>
                    <div v-else-if="evaluator.type == 2">
                      <q-chip color="grey-5" class="text-center" text-color="white"> Assignment </q-chip>
                    </div>
                  </td>
                  <td style="width: 60px;" class="text-center" v-if="evaluator.is_active
                    == 1">
                    <q-badge rounded color="green" class="status">
                      Active
                    </q-badge>
                  </td>
                  <td class="text-center" v-if="evaluator.is_active
                    == 0">
                    <q-badge rounded color="red" class="status">
                      InActive
                    </q-badge>
                  </td>
                  <td style="width: 20px" class="text-center">
                    <div>
                      <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                        <q-fab-action v-if="state.edit" @click="evaluatorEdit(user_id = evaluator.user_id)"
                          color="primary" text-color="white" icon="edit">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Edit</q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="evaluator.is_active == 0 && state.status"
                          @click="ChangeStatus(user_id = evaluator.user_id, status = 1)" color="green" text-color="white"
                          icon="change_circle">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Change To Active
                          </q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="evaluator.is_active == 1 && state.status" color="amber-10" text-color="white"
                          icon="change_circle" @click="ChangeStatus(id = evaluator.user_id, status = 0)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Change To InActive
                          </q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="state.delete" @click="confirmDelete(evaluator.user_id)" color="red"
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
let count = 1;
let createEvalModal = ref(false);
const confirm = ref(false);
let upArrow = ref(true);
const editEvaluator = ref(false);

const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
})

const options = [
  {
    label: 'Active',
    value: 1,
  },
  {
    label: 'Inactive',
    value: 0
  }
];

const typeOptions = [
  {
    label: 'Both',
    value: 0,
  },
  {
    label: 'Projects',
    value: 1,
  },
  {
    label: 'Assignments',
    value: 2,
  },
]

const courseOptions = [
  {
    label: 'Program in Data Science, Machine Learning and Neural Networks',
    value: 0,
  },
  {
    label: 'PG Program in Investment Banking and Financial Modeling',
    value: 1,
  },
  {
    label: 'PG Program In Human Resource Management',
    value: 2,
  },
  {
    label: 'PG Program in E-Commerce and Business Analytics',
    value: 3,
  },
  {
    label: 'PG Program in Full Stack Development Engineering',
    value: 4,
  },
]

const data = reactive({
  evaluators: [],
  users: [],
  evaluator: [],
  filterOptions: [],
  user_id: null,
  FormData: null
});

const evaluator = reactive({
  email: null,
  type: null,
  status: null,
  course: null,
})

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.evaluators.sort((a, b) => {
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
        data.evaluators.sort((a, b) => {
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


const openCreateModal = (() => {
  api.get("users", {
  }).then(response => {
    data.users = response.data.users.data
    data.filterOptions = data.users
    createEvalModal.value = true
    count = 1
  })
})

const filterFn = (val, update) => {
  update(() => {
    if (val === '') {
      data.filterOptions = data.users
    }
    else {
      const needle = val.toLowerCase()
      api.get("users", {
        params: {
          email: needle
        }
      }).then(response => {
        data.filterOptions = response.data.users
      })
    }
  })
}

const evaluatorEdit = (user_id) => {
  api.get("edit-evaluator", {
    params: {
      user_id: user_id
    }
  }).then(response => {
    data.evaluator = response.data.evaluator
    editEvaluator.value = true;
  })
}

const updateEvaluator = (() => {
  data.FormData = new FormData();
  data.FormData.append("user_id", data.evaluator.user_id),
    data.FormData.append("type", data.evaluator.type),
    data.FormData.append("is_active", data.evaluator.is_active),
    data.FormData.append("course", data.evaluator.course),

    Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
    api.post("update-evaluator", data.FormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      api.get("project-evaluators", {
        params: {
          type: "evaluator"
        }
      }).then((response) => {
        data.evaluators = response.data.evaluators;
        convertCourseCode(data.evaluators)
      })
      Notify.create({
        timeout: 3000,
        position: 'top-right',
        color: 'green',
        message: response.data.msg
      })
      count = 1
      editEvaluator.value = false;
      Loading.hide()
    }).catch((error) => {
      console.log("Error", error);
    })
})

const ChangeStatus = (user_id, status) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api
    .post("evaluator-action", {
      action: 1,
      user_id: user_id,
      status: status
    }).then((response) => {
      api.get("project-evaluators", {
        params: {
          type: "evaluator"
        }
      }).then((response) => {
        data.evaluators = response.data.evaluators;
        convertCourseCode(data.evaluators)
        Notify.create({
          timeout: 2000,
          position: 'top-right',
          color: 'red-7',
          message: 'Status Changed Successfully'
        })
        count = 1
        Loading.hide()
      });
    }).catch((error) => {
      console.log("Error", error);
    });
};

const onReset = () => {
  evaluator.email = ''
  evaluator.type = ''
  evaluator.status = ''
  evaluator.course = ''
  count = 1
}

const createEvaluator = (() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("add-evaluator", {
    user_id: evaluator.email,
    type: evaluator.type,
    is_active: evaluator.status,
    course: evaluator.course,
  }).then((response) => {
    Notify.create({
      timeout: 3000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    count = 1
    createEvalModal.value = false
    api.get("project-evaluators", {
      params: {
        type: "evaluator"
      }
    }).then((response) => {
      data.evaluators = response.data.evaluators;
      convertCourseCode(data.evaluators)
      Loading.hide()
      count = 1
    })
  }).catch((error) => {
    console.log("Error", error);
  });
})

const deleteEvaluator = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("evaluator-action", {
    action: 0,
    user_id: data.user_id,
  }).then((response) => {
    api.get("project-evaluators", {
      params: {
        type: "evaluator"
      }
    }).then((response) => {
      data.evaluators = response.data.evaluators;
      convertCourseCode(data.evaluators)
    })
    Loading.hide()
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red-7',
      message: response.data.msg
    })
    count = 1
    confirm.value = false;
  }).catch((error) => {
    console.log("Error", error);
  });
}

const confirmDelete = (user_id) => {
  confirm.value = true
  data.user_id = user_id
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

  api.get("project-evaluators", {
    params: {
      type: "evaluator"
    }
  }).then((response) => {
    data.evaluators = response.data.evaluators;
    convertCourseCode(data.evaluators)
    Loading.hide()
    count = 1;
  })

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('evaluator')) {
      state[key] = true
    }
  });

  function checkEvent(keys) {
    return keys.includes('evaluator');
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

.form-card {
  width: 600px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
}

.tabs-area {
  min-width: 30%;
  height: 100%;
}
</style>
