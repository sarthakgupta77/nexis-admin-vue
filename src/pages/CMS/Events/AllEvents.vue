<template>
  <q-page class="q-pa-md">

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Events</h5>
            <q-btn v-if="state.create" label="create new" @click="createNewModal = true; count = 1"
              class="create-btn"></q-btn>
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card style="width: 500px">
              <q-form @submit="updateEvent">
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
              <q-form class="createNew" @submit="addEvent" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Add New Event</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Event Name
                      </label>
                      <q-input dense outlined color="secondary" v-model="event.name" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Event Name']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Location
                      </label>
                      <q-input dense outlined color="secondary" v-model="event.location" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Event Location']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Status
                      </label>
                      <q-select dense outlined color="secondary" v-model="event.status" :options="options" class="col-9"
                        emit-value map-options lazy-rules
                        :rules="[val => val !== null || 'Please Select Event Status']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Date
                      </label>
                      <q-input dense outlined type="date" color="secondary" v-model="event.date" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Fill Date']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Start Time
                      </label>
                      <q-input dense outlined type="time" color="secondary" v-model="event.start_time" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Fill Time']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Duration
                      </label>
                      <q-input dense outlined type="time" v-model="event.duration" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Fill Duration']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Youtube Video Link
                      </label>
                      <q-input dense outlined color="secondary" v-model="event.yt_link" class="col-9" dropdown-icon="none"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Youtube Video Link']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Description
                      </label>
                      <q-input dense outlined color="secondary" v-model="event.description" class="col-9" type="textarea"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Description']" />
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
              <q-form class="createNew" @submit="confirm = true; editModal = false; count = 1">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Update Event Details</span>
                    <q-btn icon="close" dense flat @click="count = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Event Name
                      </label>
                      <q-input dense outlined color="secondary" v-model="data.event.name" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Event Name']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Location
                      </label>
                      <q-input dense outlined color="secondary" v-model="data.event.location" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Event Location']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Date
                      </label>
                      <q-input dense outlined color="secondary" v-model="data.event.date" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Fill Date']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Start Time
                      </label>
                      <q-input dense outlined color="secondary" v-model="data.event.start_time" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Fill Time']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Duration
                      </label>
                      <q-input dense outlined v-model="data.event.duration" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Fill Duration']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Youtube Video Link
                      </label>
                      <q-input dense outlined color="secondary" v-model="data.event.link" class="col-9"
                        dropdown-icon="none" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Youtube Video Link']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Description
                      </label>
                      <q-input dense outlined color="secondary" v-model="data.event.description" class="col-9"
                        type="textarea" lazy-rules input-style="min-height: 190px"
                        :rules="[val => val && val.length > 0 || 'Please Enter Description']" />
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
            <div v-if="data.events.length > 0" class="q-pa-sm w600"> Total Records : {{ data.events.length }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr>
                  <th class="text-center" scope="col">#</th>
                  <th class="text-left" scope="col">Name
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'name', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'name', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th class="text-left" scope="col" style="width: 15%;">Date & Time
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'date', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'date', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th class="text-center" scope="col">Status</th>
                  <th class="text-left" v-if="state.edit || state.status" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in data.events" :key="event.id">
                  <td class="text-center">{{ count++ }}</td>
                  <td class="link">
                    <div class="link" style="width: inherit; overflow-wrap: break-word;">
                      <a :href="event.link"> {{ event.name }} </a>
                    </div>
                  </td>
                  <td class="date-duration">
                    <div class="date-duration" style="overflow-wrap: break-word;">
                      {{ event.date }} <br />
                    </div>
                    <div class="date-duration" style="width: inherit; overflow-wrap: break-word;">
                      {{ event.duration }}
                    </div>
                  </td>

                  <td class="text-center" v-if="event.status == 1">
                    <q-badge rounded color="green" class="status">
                      Active
                    </q-badge>
                  </td>
                  <td class="text-center" v-if="event.status == 0">
                    <q-badge rounded color="red" class="status">
                      InActive
                    </q-badge>
                  </td>
                  <td v-if="state.edit || state.status" style="width: 20px" class="text-center">
                    <div>
                      <q-fab flat color="grey-9" icon="settings" direction="left" padding="sm">
                        <q-fab-action v-if="state.edit" color="primary" text-color="white" icon="edit"
                          @click="openEditModal(id = event.id)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Edit
                          </q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="(event.status == 0) && state.status"
                          @click="ChangeStatus(id = event.id, status = 1)" color="green" text-color="white"
                          icon="change_circle">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Change To Active
                          </q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="(event.status == 1) && state.status" color="red" text-color="white"
                          icon="change_circle" @click="ChangeStatus(id = event.id, status = 0)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Change To InActive
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
import { onBeforeMount, reactive, ref, } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from 'quasar'
import { Loading, QSpinnerPie, QSpinnerGears } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
let upArrow = ref(true);
const access = LocalStorage.getItem('access_key')
const u_id = LocalStorage.getItem('u_id')

const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
})
const createNewModal = ref(false)
const editModal = ref(false)
const confirm = ref(false)
const editNote = ref('')
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
const event = reactive({
  name: '',
  location: '',
  status: 1,
  date: '',
  start_time: '',
  duration: '',
  yt_link: '',
  description: ''
})

const data = reactive({
  events: [],
  event: [],
  event_id: null
});

let count = 1;

window.onresize = function () {
  count = 1;
}

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow.value = false;
    count = 1;
    switch (field) {
      case field:
        data.events.sort((a, b) => {
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
        data.events.sort((a, b) => {
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

const openEditModal = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.event_id = id
  api.get("edit-event/" + id).then((response) => {
    data.event = response.data.event;
    editModal.value = true
    count = 1
    Loading.hide()
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
    .post("event-action", {
      action: 1,
      id: id,
      status: status
    }).then((response) => {
      api.get("events").then((response) => {
        data.events = response.data.events;
        Notify.create({
          timeout: 2000,
          position: 'top-right',
          color: 'amber-7',
          message: 'Status Changed Successfully...'
        })
        count = 1;
        Loading.hide()
      });
    }).catch((error) => {
      console.log("Error", error);
    });
};

const updateEvent = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("update-event", {
    id: data.event_id,
    name: data.event.name,
    date: data.event.date,
    duration: data.event.duration,
    start_time: data.event.start_time,
    location: data.event.location,
    description: data.event.description,
    link: data.event.link,
    updated_by: u_id,
    updated_why: editNote.value
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
      message: response.data.msg
    })
    confirm.value = false
    api.get("events").then((response) => {
      data.events = response.data.events;
      Loading.hide()
      count = 1;
      editNote.value = ''
    });
  }).catch((error) => {
    console.log("Error", error);
  });
};

const addEvent = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post('add-event', {
    name: event.name,
    date: event.date,
    duration: event.duration,
    location: event.location,
    start_time: event.start_time,
    description: event.description,
    link: event.yt_link,
    status: event.status,
    added_by: u_id,
  }).then(function (response) {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    createNewModal.value = false
    api.get("events").then((response) => {
      data.events = response.data.events;
      Loading.hide()
      count = 1;
    });
  }).catch(function (error) {
    console.log(error);
  });
}

const onReset = () => {
  event.name = '',
    event.location = '',
    event.date = '',
    event.start_time = '',
    event.duration = '',
    event.yt_link = '',
    event.description = '',
    event.status = 1,
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

  api.get("events").then((response) => {
    data.events = response.data.events;
    Loading.hide()
    count = 1;
  });

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('event')) {
      state[key] = true
    }
  });
  function checkEvent(keys) {
    return keys.includes('event');
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
  width: 700px;
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

td,
th {
  border: 1px solid #e6e6e6;
}

td,
th {
  padding: 5px 10px;
}

th {
  font-weight: bold;
  font-size: 15px;
  white-space: nowrap;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}


@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {

  .link {
    width: 160px;
  }

  th {
    font-size: 13px;
    white-space: nowrap;
  }

  .status {
    width: 80px;
    font-size: 13px;
    padding: 5px;
  }

}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation : portrait) {
  .link {
    width: 80px;
  }

  td {
    font-size: 9px;
    padding: 6px 4px;
  }

  th {
    font-size: 12px;
    white-space: nowrap;
    padding: 5px 5px;
  }

  .status {
    width: 40px;
    font-size: 9px;
    padding: 3px;
  }

  .date-duration {
    width: 90px !important;
  }

  h5 {
    font-size: 15px;
  }

  .create-btn {
    width: 120px;
    font-size: 11px;
    height: 2vh;
  }

  .head-btn-box {
    height: 5vh;
  }

  .table-container {
    padding: 0 !important;
  }

  // .name{
  //   width: 90px;
  // }
}
</style>
