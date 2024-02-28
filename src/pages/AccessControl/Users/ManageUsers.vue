<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box row shadowBoder">
            <h5 id="head-1">Manage Users</h5>
            <div class="row col-5" style="justify-content: flex-end">
              <q-select dense outlined class="q-mr-sm" style="width: 26%" v-model="filterBy" @update:model-value="getUsersData"
                label-color="primary" :options="filterOptions" emit-value map-options label="Filter By" />
              <q-input outlined dense type="search" class="q-mr-sm" @update:model-value="count = 1" v-model.trim="text"
                label="Search By Email" @keyup="filterByEmail">
                <template v-slot:append>
                  <q-btn flat dense icon="search" />
                </template>
              </q-input>
              <q-btn v-if="state.create" label="create new" @click="createUserModal = true" class="create-btn" />
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
                <q-btn label="Yes, Delete !" color="red" @click="deleteUser" />
                <q-btn label="Cancel" color="primary" @click="count = 1" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="createUserModal" full-height position="right">
            <q-card class="column full-height" style="width: 600px">
              <q-card-section class="row create-header" style="justify-content:space-between">
                <span class="text-h6 w600">Add New User</span>
                <q-btn icon="close" dense flat @click="onReset" v-close-popup />
              </q-card-section>
              <q-separator color="primary" />
              <q-card-section>
                <div class="row">
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">
                      Name
                    </label>
                    <q-input dense outlined v-model="name" color="secondary" class="col-10" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter User Name']" />
                  </div>
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">
                      Email
                    </label>
                    <q-input dense outlined v-model="email" color="secondary" class="col-10" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter User Email']" />
                  </div>
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">Status</label>
                    <q-select dense outlined color="secondary" :options="options" emit-value map-options v-model="status"
                      lazy-rules :rules="[val => val !== null || 'Please Enter User Status']" class="col-md-10" />
                  </div>
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">
                      Type
                    </label>
                    <q-input dense outlined v-model="type" color="secondary" class="col-10" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter User Type']" />
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="col q-pt-none">
              </q-card-section>

              <q-separator />

              <q-card-section class="row bg-white" style="justify-content: space-between;">
                <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" @click="onReset" />
                <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" @click="createUser"
                  label="Create" />
              </q-card-section>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="editUserModal" position="right" full-height>
            <q-card class="column full-height" style="width: 600px">
              <q-card-section class="row create-header" style="justify-content:space-between">
                <span class="text-h6 w600">Update User Details</span>
                <q-btn icon="close" dense flat @click="count = 1" v-close-popup />
              </q-card-section>
              <q-separator color="primary" />
              <q-card-section>
                <div class="row">
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">Name</label>
                    <q-input dense outlined color="secondary" v-model="data.users.name" class="col-10" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter User Name']" />
                  </div>
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">Email Id</label>
                    <q-input dense outlined color="secondary" v-model="data.users.email" class="col-10" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter User Email']" />
                  </div>
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">Status</label>
                    <q-select dense outlined color="secondary" :options="options" v-model="data.users.status"
                      class="col-10" emit-value map-options lazy-rules
                      :rules="[val => val !== null || 'Please Enter User Status']" />
                  </div>
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">Type</label>
                    <q-input dense outlined color="secondary" v-model="data.users.type" class="col-10" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter User Type']" />
                  </div>
                  <div class="col-12 row" style="align-items: baseline">
                    <label class="col-2 w600">
                      Password
                    </label>
                    <q-input dense outlined v-model="password" color="secondary" class="col-10" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter User Email']" />
                  </div>
                  <div class="col-12 row">
                    <label class="col-2 w600">
                      Confirm Password
                    </label>
                    <q-input dense outlined v-model="confirmPassword" color="secondary" class="col-10" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter User Email']" />
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="col q-pt-none">
              </q-card-section>

              <q-separator />

              <q-card-section class="row bg-white" style="justify-content: flex-end;">
                <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" @click="updateUser"
                  label="Update" />
              </q-card-section>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr>
                  <th scope="col">#</th>
                  <th class="text-left" scope="col">Name
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'name', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'name', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th class="text-left" scope="col">Email Id
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'email', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'email', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Status</th>
                  <th v-if="state.edit || state.status" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in data.users">
                  <td class="text-center">{{ count++ }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td style="width: 60px;" class="text-center">
                    <q-badge v-if="user.status" rounded color="green" class="status">
                      Active
                    </q-badge>
                    <q-badge v-else rounded color="red" class="status">
                      InActive
                    </q-badge>
                  </td>
                  <td v-if="state.edit || state.status" style="width: 20px" class="text-center">
                    <div>
                      <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                        <q-fab-action v-if="state.edit" @click="openEditModal(id = user.id)" color="primary"
                          text-color="white" icon="edit">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Edit</q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="state.status" color="orange-9" text-color="white" icon="change_circle"
                          @click="ChangeStatus(id = user.id, status = 0)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Change To InActive
                          </q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="state.delete" color="red" text-color="white" icon="delete"
                          @click="confirmDelete(id = user.id)">
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

          <div class="shadowBoder col-md-12 ">
            <div>
              <p class="w600 q-ma-none flex flex-center float-left"> Showing data between {{ Number(data.from) }} to
                {{
                  Number(data.to) }} out of {{ Number(data.total) }}</p>
              <div v-if="showElement">
                <q-pagination id="hide-pagination" class="flex float-right" v-model="current" @click="paginate(current)"
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
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify } from "quasar";
import { Loading, QSpinnerPie, LocalStorage } from 'quasar'
import { api } from "../../../boot/axios";

const text = ref("")

const route = useRoute();
const router = useRouter();
const current = ref(1);
let upArrow = ref(true);
let showElement = ref(true);
const name = ref('')
const email = ref('')
const status = ref('')
const password = ref('')
const confirmPassword = ref('')
const type = ref(null)
const filterBy = ref(2)

const createUserModal = ref(false)
const editUserModal = ref(false)
const confirm = ref(false)

const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
})

const tab = ref('active');
let count = 1;
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

const filterOptions = [
  {
    label: 'Active Users',
    value: 1
  },
  {
    label: 'InActive Users',
    value: 0
  },
  {
    label: 'All Users',
    value: 2
  },
]

const data = reactive({
  users: [],
  activeUsers: [],
  inactiveUsers: [],
  from: '',
  to: '',
  total: '',
  last_page: '',
  id: null
});

const ChangeStatus = (id, status) => {
  api
    .post("users-action", {
      action: 1,
      id: id,
      status: status
    }).then((response) => {
      api.get("users").then((response) => {
        data.users = response.data.users;
      });
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'amber-7',
        message: response.data.msg
      })
    }).finally(() => {
      count = 1;
    }).catch((error) => {
      console.log("Error", error);
    });
};

const filterByEmail = () => {
  count = 1
  if (text.value.length >= 3) {
    count = 1;
    api.get("users", { params: { email: text.value } }).then((response) => {
      data.users = response.data.users;
      Loading.hide()
      count = 1
    })
    showElement.value = false;
  }
  else {
    count = 1
    api.get("users").then((response) => {
      data.users = response.data.users.data;
      Loading.hide()
      count = 1
    })
    showElement.value = true;
  }
}

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

window.onresize = function () {
  count = 1;
}

const deleteUser = () => {
  api.get("delete-user", { params: { user_id: data.id } }).then(response => {
    Loading.show({
      spinner: QSpinnerPie,
      spinnerColor: 'primary',
      messageColor: 'black',
      backgroundColor: 'white',
      message: 'Loading Page Data. Please Wait!'
    })

    api.get("users", { params: { status: 1 } }).then(response => {
      data.activeUsers = response.data.users.data;
      data.from = response.data.users.from
      data.last_page = response.data.users.last_page
      data.to = response.data.users.to
      data.total = response.data.users.total
      Loading.hide()
    })
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red-7',
      message: response.data.msg
    })
    count = 1
  }).catch((error) => {
    console.log("Error", error);
  });
}

const openEditModal = (id) => {
  count = 1
  editUserModal.value = true
  api.get('get-user-info', { params: { user_id: id } }).then((res) => {
    data.users = res.data.user
  })
}

const createUser = () => {
  api.post('add-user', {
    name: name.value,
    email: email.value,
    status: status.value,
    type: type.value
  }).then((res) => {
    Loading.show({
      spinner: QSpinnerPie,
      spinnerColor: 'primary',
      messageColor: 'black',
      backgroundColor: 'white',
      message: 'Loading Page Data. Please Wait!'
    })

    api.get("users", { params: { status: 1 } }).then(response => {
      data.activeUsers = response.data.users.data;
      data.from = response.data.users.from
      data.last_page = response.data.users.last_page
      data.to = response.data.users.to
      data.total = response.data.users.total
      Loading.hide()
    })
    Notify.create({
      timeout: 3000,
      position: 'top-right',
      color: 'green',
      message: res.data.msg
    })
    createUserModal.value = false
    count = 1
  }).catch((err) => {
    console.log('Error:', err)
  })
}

const updateUser = () => {
  api.post('update-user', {
    id: data.users.id,
    name: data.users.name,
    email: data.users.email,
    status: data.users.status,
    type: data.users.type,
    password: password.value,
    confPass: confirmPassword.value
  }).then((res) => {
    Loading.show({
      spinner: QSpinnerPie,
      spinnerColor: 'primary',
      messageColor: 'black',
      backgroundColor: 'white',
      message: 'Loading Page Data. Please Wait!'
    })

    api.get("users", { params: { status: 1 } }).then(response => {
      data.activeUsers = response.data.users.data;
      data.from = response.data.users.from
      data.last_page = response.data.users.last_page
      data.to = response.data.users.to
      data.total = response.data.users.total
      Loading.hide()
    })
    Notify.create({
      timeout: 3000,
      position: 'top-right',
      color: 'green',
      message: res.data.msg
    })
    count = 1
    editUserModal.value = false
  })
}

const confirmDelete = (id) => {
  confirm.value = true
  data.id = id
  count = 1;
}

const paginate = async (current) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  if(filterBy.value == 0 || filterBy.value == 1){
    await api.get("https://genesis.datatrained.com/api/admin/users?page=" + current,{params:{
      status: filterBy.value
    }}).then((response) => {
      data.users = response.data.users.data
      data.from = response.data.users.from;
      data.to = response.data.users.to;
      data.total = response.data.users.total;
      data.last_page = response.data.users.last_page
      Loading.hide();
      count = 1;
    })
  }else{
    await api.get("https://genesis.datatrained.com/api/admin/users?page=" + current).then((response) => {
      data.users = response.data.users.data
      data.from = response.data.users.from;
      data.to = response.data.users.to;
      data.total = response.data.users.total;
      data.last_page = response.data.users.last_page
      Loading.hide();
      count = 1;
    })
  }
}

const getUsersData = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  if (filterBy.value == 1 || filterBy.value == 0) {
    api.get("users", { params: { status: filterBy.value } }).then(response => {
      data.users = response.data.users.data;
      data.from = response.data.users.from
      data.last_page = response.data.users.last_page
      data.to = response.data.users.to
      data.total = response.data.users.total
      count = 1
      Loading.hide()
    })
  } else {
    api.get("users").then(response => {
      data.users = response.data.users.data;
      data.from = response.data.users.from
      data.last_page = response.data.users.last_page
      data.to = response.data.users.to
      data.total = response.data.users.total
      Loading.hide()
      count = 1
    })
  }
}

const onReset = () => {
  name.value = '',
    email.value = '',
    type.value = '',
    status.value = null,
    password.value = '',
    confirmPassword.value = ''
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

  api.get("users").then(response => {
    data.users = response.data.users.data;
    data.from = response.data.users.from
    data.last_page = response.data.users.last_page
    data.to = response.data.users.to
    data.total = response.data.users.total
    Loading.hide()
  })
  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('user')) {
      state[key] = true
    }
  });

  function checkEvent(keys) {
    return keys.includes('user');
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
    font-weight: 500;
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
  font-weight: 500;
  font-size: 14px;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}

.btn-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-bottom: 20px;
}
</style>
