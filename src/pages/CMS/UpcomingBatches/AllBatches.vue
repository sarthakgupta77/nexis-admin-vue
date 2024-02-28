<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12" style="width:100%">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Upcoming Batches</h5>
            <q-btn v-if="state.create" label="create new" class="create-btn" @click="createNewModal = true" />
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-icon name="error" size="4rem" class="col-12" color="red" />
                <span class="text-h5 w600 col-12 text-center q-py-sm">Are You Sure?</span>
                <span class="text-subtitle1 w600 col-12 text-center text-grey">You won't be able to revert this!</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn label="Yes, Delete !" color="red" @click="deleteBatch" />
                <q-btn label="Cancel" color="primary" @click="count = 1" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="updateModal" persistent>
            <q-card style="width: 500px">
              <q-form @submit="updateBatch">
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
              <q-form class="createNew" @submit="createBatch" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Add New Batch Details</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="q-pa-md row">
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">Course</label>
                      <q-select dense outlined color="secondary" :options="data.filteredCourses" option-label="title"
                        option-value="id" :popup-content-style="{ width: '400px', height: '70%' }"
                        v-model="addBatch.course" lazy-rules
                        :rules="[val => val && val !== null || 'Please Select Batch Course']" use-input @filter="filterFn"
                        class="col-9" emit-value map-options />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Batch Name
                      </label>
                      <q-input dense outlined v-model="addBatch.name" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Batch Name']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">Batch Type</label>
                      <q-select dense outlined color="secondary" :options="typeOptions" v-model="addBatch.type" lazy-rules
                        :rules="[val => val !== null || 'Please Select Batch Type']" class="col-9" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">Country</label>
                      <q-select dense outlined color="secondary" :options="countryOption" v-model="addBatch.country"
                        emit-value map-options lazy-rules :rules="[val => val !== null || 'Please Select Country']"
                        class="col-9" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Orientation Date
                      </label>
                      <q-input dense type="date" outlined v-model="addBatch.orientationDate" color="secondary"
                        class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Select Orientation Date']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Orientation Time
                      </label>
                      <q-input dense type="text" placeholder=" 09:30 PM IST - 11:30 PM IST" outlined
                        v-model="addBatch.orientationTime" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Select Orientation Time']" />
                    </div>
                    <div class="col-12 row">
                      <label class="col-3 q-pr-sm w600">
                        Regular Class Start Date
                      </label>
                      <q-input dense type="date" outlined v-model="addBatch.classStartDate" color="secondary"
                        class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Select Regular Class Start Date']" />
                    </div>
                    <div class="col-12 row">
                      <label class="col-3 w600 q-pr-sm">
                        Regular Class Time
                      </label>
                      <q-input dense type="text" outlined placeholder=" 09:30 PM IST - 11:30 PM IST"
                        v-model="addBatch.classTime" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Select Regular Class Time']" />
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md bg-white" style="justify-content: space-between;">
                    <q-btn outline label="Clear" type="reset" />
                    <q-btn color="primary" type="submit" label="Create" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="editBatchModal" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="updateModal = true; editBatchModal = false; count = 1">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Update Upcoming Batch Details</span>
                    <q-btn icon="close" dense flat @click="onReset, count = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">Course</label>
                      <q-select dense outlined color="secondary" v-model="data.batch.course_id"
                        :options="data.filteredCourses" option-value="id" option-label="title"
                        :popup-content-style="{ width: '400px', height: '70%' }" use-input @filter="filterFn" lazy-rules
                        emit-value map-options :rules="[val => val && val !== null || 'Please Select Batch Course']"
                        class="col-9" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Batch Name
                      </label>
                      <q-input dense outlined v-model="data.batch.batch_name" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Batch Name']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">Batch Type</label>
                      <q-select dense outlined color="secondary" :options="typeOptions" v-model="data.batch.batch_type"
                        lazy-rules :rules="[val => val !== null || 'Please Select Batch Type']" class="col-9" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">Country</label>
                      <q-select dense outlined color="secondary" :options="countryOption"
                        v-model="data.batch.country_code" lazy-rules
                        :rules="[val => val !== null || 'Please Select Country']" class="col-9" emit-value map-options />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Orientation Date
                      </label>
                      <q-input dense type="date" outlined v-model="data.batch.induction_date" color="secondary"
                        class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Select Orientation Date']" />
                    </div>
                    <div class="col-12 row" style="align-items: baseline">
                      <label class="col-3 w600">
                        Orientation Time
                      </label>
                      <q-input dense type="text" outlined v-model="data.batch.induction_time" color="secondary"
                        class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Select Orientation Time']" />
                    </div>
                    <div class="col-12 row">
                      <label class="col-3 q-pr-sm w600">
                        Regular Class Start Date
                      </label>
                      <q-input dense type="date" outlined v-model="data.batch.class_date" color="secondary" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Select Regular Class Start Date']" />
                    </div>
                    <div class="col-12 row">
                      <label class="col-3 w600 q-pr-sm">
                        Regular Class Time
                      </label>
                      <q-input dense type="text" outlined v-model="data.batch.class_time" color="secondary" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Select Regular Class Time']" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md bg-white" style="justify-content: flex-end;">
                    <q-btn color="primary" type="submit" label="Update" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <div v-if="data.batches.length > 0" class="q-pa-sm w600"> Total Records : {{ data.batches.length }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr>
                  <th scope="col">#</th>
                  <th class="text-left" scope="col">Course Name
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                        style="font-size: 17px;" class="icon-btn">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span
                        style="font-size: 17px;" class="icon-btn">&darr;&uarr;</span></q-btn>
                  </th>
                  <th class="text-left" scope="col">Batch Name
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'batch_name', direction = 'asc')"><span
                        style="font-size: 17px;" class="icon-btn">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'batch_name', direction = 'dsc')"><span
                        style="font-size: 17px;" class="icon-btn">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col" class="text-left" >Batch Type</th>
                  <!-- <th scope="col">Country Code</th> -->
                  <th scope="col" class="text-left">Program Orientation</th>
                  <th scope="col" class="text-left">Regular Classes</th>
                  <th scope="col" v-if="state.edit || state.delete">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="batch in data.batches">
                  <td class="text-center"> {{ count++ }} </td>
                  <td><b>[ {{ batch.country_code }} ] </b>{{ batch.title }} </td>
                  <td class="batch">
                    <div class="batch" style="overflow-wrap: break-word;">
                      {{ batch.batch_name }}
                    </div>
                  </td>
                  <td>{{ batch.batch_type }}</td>
                  <!-- <td>{{ batch.country_code }}</td> -->
                  <td> <b> Date :</b> {{ batch.induction_date }} <br><b> Time :</b> {{ batch.induction_time }}</td>
                  <td> <b> Date :</b> {{ batch.class_date }} <br><b> Time :</b> {{ batch.class_time }}</td>

                  <td v-if="state.edit || state.delete" class="text-center">
                    <div>
                      <q-fab flat class="action-btn" id="icon-settings" icon="settings" direction="left" padding="sm">
                        <q-fab-action v-if="state.edit" color="primary" text-color="white" icon="edit"
                          @click="batchEdit(id = batch.id)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Edit</q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="state.delete" color="red" @click="confirmDelete(batch.id)" text-color="white"
                          icon="delete">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Delete
                          </q-tooltip>
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

import { ref, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const createNewModal = ref(false)
const editBatchModal = ref(false)
const updateModal = ref(false)
const editNote = ref('')

const route = useRoute();
const router = useRouter();
let upArrow = ref(true);
const confirm = ref(false);
const access = LocalStorage.getItem('access_key')
const u_id = LocalStorage.getItem('u_id')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
})

const typeOptions = ["Weekend (Sat-Sun)"]

const countryOption = [
  {
    label: 'India',
    value: 'IN'
  },
  {
    label: 'United States',
    value: 'US'
  },
  {
    label: 'United Kingdom',
    value: 'UK'
  },
  {
    label: 'Singapore',
    value: 'SG'
  },
  {
    label: 'Australia',
    value: 'AU'
  },
  {
    label: 'United Arab Emirates',
    value: 'UAE'
  },
  {
    label: 'Canada',
    value: 'Ca'
  },
]

let count = 1;
const data = reactive({
  batches: [],
  batch: [],
  courses: [],
  filteredCourses: [],
  id: null,
  FormData: null,
});

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow.value = false;
    count = 1;
    switch (field) {
      case field:
        data.batches.sort((a, b) => {
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
    upArrow.value = true;
    count = 1;
    switch (field) {
      case field:
        data.batches.sort((a, b) => {
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

const filterFn = (val, update) => {
  update(() => {
    if (val === '') {
      data.filteredCourses = data.courses
    }
    else {
      const needle = val.toLowerCase()
      data.filteredCourses = data.courses.filter(
        v => v.title.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

const addBatch = reactive({
  course: null,
  name: null,
  type: null,
  country: null,
  orientationDate: null,
  orientationTime: null,
  classStartDate: null,
  classTime: null,
})

const batchEdit = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  editBatchModal.value = true;
  api.get("edit-batch", {
    params: {
      id: id
    }
  }).then(response => {
    data.batch = response.data.batches
    Loading.hide()
  })
}

const updateBatch = (() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.FormData = new FormData();
  data.FormData.append("id", data.batch.id)
  data.FormData.append("course", data.batch.course_id),
    data.FormData.append("batch_name", data.batch.batch_name),
    data.FormData.append("batch_type", data.batch.batch_type),
    data.FormData.append("country_code", data.batch.country_code),
    data.FormData.append("induction_date", data.batch.induction_date),
    data.FormData.append("induction_time", data.batch.induction_time),
    data.FormData.append("class_date", data.batch.class_date),
    data.FormData.append("class_time", data.batch.class_time),
    data.FormData.append('updated_by', u_id),
    data.FormData.append('updated_why', editNote.value)
  api.post("update-batch", data.FormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => {
    Notify.create({
      timeout: 3000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    updateModal.value = false
    editNote.value = ''
    api.get("upcoming-batches"
    ).then((response) => {
      data.batches = response.data.batches;
      count = 1
      Loading.hide()
    })
  }).catch((error) => {
    console.log("Error", error);
  })
})


const createBatch = (() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.FormData = new FormData();
  data.FormData.append("course", addBatch.course),
    data.FormData.append("batch_name", addBatch.name),
    data.FormData.append("batch_type", addBatch.type),
    data.FormData.append("country_code", addBatch.country),
    data.FormData.append("induction_date", addBatch.orientationDate),
    data.FormData.append("induction_time", addBatch.orientationTime),
    data.FormData.append("class_date", addBatch.classStartDate),
    data.FormData.append("class_time", addBatch.classTime),
    data.FormData.append('added_by', u_id)
  api.post("add-batch", data.FormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((response) => {
    Notify.create({
      timeout: 3000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    createNewModal.value = false;
    api.get("upcoming-batches").then((response) => {
      data.batches = response.data.batches;
      count = 1
      Loading.hide()
    })
  }).catch((error) => {
    console.log("Error", error);
  });
})

const onReset = () => {
  addBatch.course = ''
  addBatch.name = ''
  addBatch.type = ''
  addBatch.country = ''
  addBatch.orientationDate = ''
  addBatch.orientationTime = ''
  addBatch.classStartDate = ''
  addBatch.classTime = ''
  count = 1;
}


const deleteBatch = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  confirm.value = true
  api.post("batch-action", {
    id: data.id,
  }).then((response) => {
    api.get("upcoming-batches"
    ).then((response) => {
      data.batches = response.data.batches;
    })
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red-7',
      message: response.data.msg
    })
    count = 1
    Loading.hide()
  }).finally(() => {
    confirm.value = false;
  }).catch((error) => {
    console.log("Error", error);
  });
}

const confirmDelete = (id) => {
  confirm.value = true
  data.id = id
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

  api.get('course').then((response) => {
    data.courses = response.data.course
    data.filteredCourses = data.courses
  })

  api.get("upcoming-batches").then(response => {
    data.batches = response.data.batches;
    Loading.hide()
    count = 1;
  })
  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('upcoming-batches')) {
      state[key] = true
    }
  });

  function checkEvent(keys) {
    return keys.includes('upcoming-batches');
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
  width: 600px;
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

@media only screen and (min-device-width: 768px) and (max-device-width: 1023px) and (orientation : portrait) {

  td {
    font-size: 7px;
    padding: 5px 1px;
    text-align: center;
  }

  th {
    font-size: 6px;
    white-space: nowrap;
    padding: 5px 0px;
  }


  h5 {
    font-size: 12px;
  }

  .create-btn {
    width: 100px !important;
    font-size: 10px;

  }

  .head-btn-box {
    height: 4vh;
  }

  .table-container {
    padding: 0 !important;
  }

  .batch {
    width: 90px;
  }

  .icon-btn {
    font-size: 11px !important;
  }

  // .action-btn{
  //   font-size: 17px !important;
  // }
  .q-fab {
    #icon-settings {
      font-size: 17px !important;
    }
  }

  .q-btn--fab .q-icon {
    font-size: 12px !important;
  }



}
</style>
