<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5>All Sales Members</h5>
            <div class="row">
              <q-input outlined dense @update:model-value="count = 1" type="search" class="q-mr-sm" v-model="text" label="Search By Email"
                @keyup="filterByEmail">
                <template v-slot:append>
                  <q-btn flat dense icon="search" />
                </template>
              </q-input>
              <q-btn label="create new" @click="openCreateModal" class="create-btn" />
            </div>
          </div>

          <q-dialog maximized style="padding: 0;" persistent v-model="createNewModal" full-height position="right">
            <q-card class="column full-height" style="width: 600px">
              <q-card-section class="row create-header">
                <span class="text-h6 w600">Add New Sales Team Member</span>
                <q-btn icon="close" dense flat @click="clearFields" v-close-popup />
              </q-card-section>
              <q-separator color="primary" />
              <q-card-section>
                <div class="row">
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">
                      Name
                    </label>
                    <q-input dense v-model="name" outlined color="secondary" class="col-10" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter Name']" />
                  </div>
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">
                      Email
                    </label>
                    <q-input dense outlined v-model="email" color="secondary" class="col-10" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter Email']" />
                  </div>
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">
                      Status
                    </label>
                    <q-select :options="options" dense outlined v-model="status" emit-value map-options color="secondary" class="col-10"
                      lazy-rules :rules="[val => val !== null || 'Please Select a Position']">
                    </q-select>
                  </div>
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">
                      Type
                    </label>
                    <q-input dense outlined v-model="type" color="secondary" class="col-10" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter Email']" />
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="col q-pt-none">
              </q-card-section>

              <q-separator />

              <q-card-section class="row bg-white" style="justify-content: space-between;">
                <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" @click="clearFields" />
                <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" label="Create"
                  @click="createUser" />
              </q-card-section>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th class="text-center" scope="col">#</th>
                  <th scope="col">Name
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'name', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'name', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Email
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'email', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'email', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th class="text-center" scope="col">Status</th>
                  <th class="text-center" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in data.users">
                  <td class="text-center"> {{ count++ }} </td>
                  <td> {{ user.name }} </td>
                  <td> {{ user.email }} </td>
                  <td style="width: 60px;" class="text-center">
                    <q-badge v-if="user.status == 1" rounded color="green" class="status">
                      Active
                    </q-badge>
                    <q-badge v-else rounded color="red" class="status">
                      InActive
                    </q-badge>
                  </td>
                  <td class="text-center">
                    <q-fab flat color="grey-9" icon="settings" direction="left" padding="sm">
                      <q-fab-action color="primary" text-color="white" icon="edit_square">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Update Details</q-tooltip>
                      </q-fab-action>
                      <q-fab-action color="red" text-color="white" icon="delete">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Delete</q-tooltip>
                      </q-fab-action>
                    </q-fab>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="shadowBoder col-md-12" v-if="showElement">
          <div>
            <p class="w600 q-ma-none flex flex-center float-left"> Showing data between {{ Number(data.from) }} to {{
              Number(data.to) }} out of {{ Number(data.total) }}</p>
            <div>
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
import { api } from 'src/boot/axios'
import { onBeforeMount, reactive, ref } from 'vue'
import { Loading, QSpinnerPie, Notify } from 'quasar'

const createNewModal = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const position = ref(null)
const current = ref(1)
const showElement = ref(true)
const text = ref('')
let upArrow = ref(true);

let count = 1

const data = reactive({
  users: [],
  to: '',
  from: '',
  total: '',
  last_page: ''
})

const options = [
  {
    label: 'Active',
    value: 1
  },
  {
    label: 'InActive',
    value: 0
  },
]

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.users.sort((a, b) => {
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
        data.users.sort((a, b) => {
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

const openCreateModal = () => {
  createNewModal.value = true
  count = 1
}

const clearFields = () => {
  name.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  position.value = null
  count = 1
}


const filterByEmail = () => {
  if (text.value.length >= 3) {
    api.get('sales-members', { params: { email: text.value } }).then((response) => {
      data.users = response.data.users;
      count = 1
    })
    showElement.value = false;
  }
  else {
    api.get('sales-members').then((response) => {
      data.users = response.data.users.data;
      Loading.hide()
      count = 1
    })
    showElement.value = true;
  }
}

const createUser = () => {
  if (password.value == confirmPassword.value) {
    api.post('add-sales-member', {
      name: name.value,
      email: email.value,
      password: password.value,
      type: position.value
    }).then((response) => {
      createNewModal.value = false
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'green',
        message: response.data.msg
      })
    }).catch((err) => {
      console.log('Error', err)
    })
  } else {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: 'Password not matching'
    })
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

  await api.get("https://genesis.datatrained.com/api/admin/sales-members?page=" + current).then((response) => {
    data.users = response.data.users.data
    data.to = response.data.users.to
    data.from = response.data.users.from
    data.total = response.data.users.total
    data.last_page = response.data.users.last_page
    Loading.hide();
    count = 1
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

  api.get('sales-members').then((response) => {
    data.users = response.data.users.data
    data.to = response.data.users.to
    data.from = response.data.users.from
    data.total = response.data.users.total
    data.last_page = response.data.users.last_page
    Loading.hide()
  })

  // const rights = access.filter(checkEvent);
  // rights.forEach(function (el) {
  //   let key = el.split('.')[1]
  //   if (el.includes('assessment')) {
  //     state[key] = true
  //   }

  // });

  // function checkEvent(keys) {
  //   return keys.includes('assessment');
  // }
})
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

.create-header {
  align-items: center;
  justify-content: space-between;
}
</style>
