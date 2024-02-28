<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <div class="row">
              <q-btn flat round color="white" text-color="positive" class="q-mr-sm" icon="arrow_back" id="back-btn"
                to="/manage-permissions">
                <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
                  transition-hide="scale">
                  Back to Permissions
                </q-tooltip>
              </q-btn>
              <h5 id="head-1">Manage Permission (Name - {{ data.roleName }}) </h5>
            </div>
            <q-btn v-if="tab == 'roleWise' && state.create" label="create new" class="create-btn"
              @click="permissionCreate = true" />

          </div>
          <q-dialog maximized style="padding: 0;" v-model="permissionCreate" full-height position="right">
            <q-card class="column full-height" style="width: 600px">
              <q-card-section class="row create-header">
                <span class="text-h6 w600">Create Permission</span>
                <q-btn icon="close" dense flat @click="onReset" v-close-popup />
              </q-card-section>
              <q-separator color="primary" />
              <q-card-section>
                <div class="row" style="align-items: center;">
                  <span class="col-md-4 w600 q-pb-md">Permission Type</span>
                  <!-- <input class="col-md-8 select-type" type="text" list="categories"
                                        v-model="permissionType" />
                                    <datalist id="categories" >
                                        <option v-for="role in data.roles"> {{ role }} </option>
                                    </datalist> -->
                  <q-select outlined dense v-model="permissionType" use-input @new-value="createValue"
                    :options="filterOptions" @filter="filterFn" class="col-md-8 q-pb-md" />
                </div>
                <div class="row " style="align-items: center;">
                  <span class="col-md-4 w600 q-pb-md">Permission Name</span>
                  <q-input outlined dense class="col-md-8" v-model="permissionName" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please Enter Permission Name']" />
                </div>
                <div class="row " style="align-items: center;">
                  <span class="col-md-4 w600 ">About</span>
                  <q-input outlined dense class="col-md-8" v-model="about" />
                </div>
              </q-card-section>

              <q-card-section class="col q-pt-none">
              </q-card-section>

              <q-separator />

              <q-card-section class="row bg-white" style="justify-content: space-between;">
                <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" @click="onReset" />
                <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" label="Create"
                  @click="createPermission" />
              </q-card-section>
            </q-card>
          </q-dialog>
          <q-dialog maximized style="padding: 0;" v-model="assignUser" full-height position="right">
            <q-card class="assign-card">
              <q-card-section class="q-pa-none">
                <div class="row create-header q-pa-md">
                  <span class="text-h6 w600">Assign User</span>
                  <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                </div>
                <q-separator color="primary" />
                <div class="q-pa-md">
                  <div class="row q-mt-md q-px-md" style="align-items: center; justify-content: space-between">
                    <span class="col-md-2 w600">Enter Email</span>
                    <q-input outlined dense class="col-md-9 q-pr-md" @update:model-value="filterByEmail" v-model="searchEmail" />
                  </div>

                  <div class="table-container modal-table shadowBoder q-mt-sm">
                    <table id="dtBasicExample" class="table table-bordered table-sm" cellspacing="0" width="100%">
                      <thead class="bg-grey-4">
                        <tr>
                          <th></th>
                          <th scope="col" class="text-left">Name</th>
                          <th scope="col" class="text-left">Email</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="user in data.filteredData">
                          <td>
                            <q-checkbox :val="user.id" v-model="val" />
                          </td>
                          <td> {{ user.name }} </td>
                          <td> {{ user.email }} </td>
                          <td>
                            <q-chip v-if="user.status == 1" label="Active" color="green" class="text-center q-py-md" text-color="white" />
                            <q-chip v-if="user.status == 0" label="Inactive" color="red-5" class="text-center q-py-md" text-color="white" />
                          </td>
                        </tr>
                      </tbody>
                      <!-- <tbody v-else>
                        <tr v-for="user in data.filteredData">
                          <td>
                            <q-checkbox :val="user.id" v-model="val" />
                          </td>
                          <td> {{ user.name }} </td>
                          <td> {{ user.email }} </td>
                        </tr>
                      </tbody> -->
                    </table>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div>
                  <q-separator />
                </div>
                <div class="row bg-white q-pa-sm" style="justify-content: space-between;">
                  <q-btn dense outlined class="q-ma-sm q-px-md" label="Cancel" @click="onReset" />
                  <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" label="Assign"
                    @click="addRoleUsers" />
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>
          <q-tabs v-model="tab" align="left" dense active-color="primary">
            <q-tab name="roleWise" label="Role Wise Permission" class="q-mr-sm" />
            <q-tab name="users" label="Assigned Users" />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="roleWise">
              <q-splitter v-model="splitterModel" style="height: 100%;">
                <template v-slot:before>
                  <q-scroll-area style="height: 100vh;">
                    <q-tabs v-for="role in data.roles" class="permission_tab q-pa-sm" switch-indicator v-model="tab1"
                      dense align="left" active-color="primary" vertical style="height: auto">
                      <q-tab :name="role" :label="role" style="justify-content: flex-start"
                        @click="showPermissions(group = role)" />
                    </q-tabs>
                  </q-scroll-area>
                </template>
                <template v-slot:after>
                  <q-scroll-area style="height: 100vh;">
                    <h4 v-if="tab1 == ''" class="text-center text-primary w600"> Select A Permission To Manage</h4>
                    <div v-else class="row d-flex" style="padding: 4px 40px;">
                      <div class="col-4 w600">Name</div>
                      <div class="col-4 w600">About</div>
                      <div class="col-4 w600">Action</div>
                    </div>
                    <q-tab-panels v-for="perm in data.permissions" v-model="tab1">
                      <q-tab-panel :name="perm.name.split('.')[0]">
                        <div class="table-container shadowBoder">

                          <div class="row d-flex" style="align-items: center;">
                            <div class="col-4">{{ perm.name }}</div>
                            <div class="col-4">{{ perm.about }}</div>
                            <div class="col-4">
                              <q-toggle :false-value="null" :true-value="1" v-model="perm.active"
                                @click="assignPermission(id = perm.id, action = perm.active)" />
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
                    </q-tab-panels>
                  </q-scroll-area>
                </template>
              </q-splitter>
            </q-tab-panel>
            <q-tab-panel name="users">
              <div class="table-container shadowBoder q-mt-sm">
                <div class="row table-head q-pb-md">
                  <span class="w600"> No. of users : &nbsp; {{ data.users.length }} </span>
                  <q-btn v-if="tab == 'users' && state.create" label="assign user" class="create-btn"
                    @click="assignModal" />
                </div>
                <table id="dtBasicExample" class="table table-bordered table-sm" cellspacing="0" width="100%">
                  <thead class="bg-grey-4">
                    <tr>
                      <!-- <th scope="col">#</th> -->
                      <th class="text-left" scope="col">Name</th>
                      <th class="text-left" scope="col">Email</th>
                      <th scope="col" class="text-left">Role</th>
                      <th v-if="state.delete" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in data.users">
                      <td> {{ user.name }} </td>
                      <td> {{ user.email }} </td>
                      <td> {{ user.type }} </td>
                      <td v-if="state.delete" class="text-center">
                        <q-btn round icon="delete" @click="removeUserRole(id = user.id)" color="red" text-color="white">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Remove User
                            Role</q-tooltip>
                        </q-btn>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { LocalStorage, Notify } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
const permissionCreate = ref(false)
const assignUser = ref(false)
const permissionName = ref('')
const permissionType = ref('')
const about = ref('')
const searchBy = ref('Name')
const options = ['Name', 'Email']
const searchName = ref('')
const searchEmail = ref('')
const val = ref([])


const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
})
const tab = ref('roleWise');
const tab1 = ref('');
const splitterModel = ref(30);

const data = reactive({
  permissions: [],
  roles: [],
  users: [],
  usersId: [],
  filteredData: [],
  roleName: ''
});

const filterOptions = ref(data.roles)
const showPermissions = (group) => {
  api.get("permission-groups", { params: { action: 1, role_id: route.params.id, group: group } }).then(response => {
    data.permissions = response.data.permissions;
  });
}

const assignPermission = (id, action) => {
  if (action == null) {
    action = 0
  }

  api.post('assign-permission', {
    permission_id: id,
    action: action,
    role_id: route.params.id
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    // fullHeight.value = false
  }).catch((error) => {
    console.log('Error', error)
  })
}

const onReset = () => {
  permissionName.value = ''
  permissionType.value = ''
  about.value = ''
  searchName.value = ''
  searchEmail.value = ''
  val.value = []
}
const createPermission = () => {
  const name = permissionType.value + '.' + permissionName.value.toLocaleLowerCase()
  if (permissionName.value == '' || permissionType.value == '') {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: 'Please fill the required fields'
    })
  }
  else {
    api.post('create-permission', {
      name: name,
      about: about.value
    }).then((response) => {
      permissionCreate.value = false
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'amber-7',
        message: response.data.msg
      })
    }).finally(() => {
      onReset()
    }).catch((error) => {
      console.log(error)
    })
  }
}

const assignModal = () => {
  api.get("users").then(response => {
    data.filteredData = response.data.users.data
  }).finally(() => {
    assignUser.value = true
  });
}

const addRoleUsers = () => {
  val.value.forEach((ele) => {
    data.usersId.push(ele)
  })
  api.post('assign-users-role', {
    users: data.usersId,
    role_id: route.params.id
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
  }).catch((error) => {
    console.log(error)
  })
}

// const removeUserRole = (id) => {
//   api.post('remove-users-role', {
//     user_id: id,
//     role_id: route.params.id
//   }).then((response) => {
//     Notify.create({
//       timeout: 2000,
//       position: 'top-right',
//       color: 'red',
//       message: response.data.msg
//     })
//   }).catch((error) => {
//     console.log(error)
//   })
// }

const filterByEmail = () => {
  if(searchEmail.value.length > 2){
    api.get('users',{params:{email: searchEmail.value}}).then((res)=>{
      data.filteredData = res.data.users
    })
  }else{
    api.get('users').then((res)=>{
      data.filteredData = res.data.users.data
    })
  }
}

const createValue = (val, done) => {
  if (val.length > 0) {
    if (!data.roles.includes(val)) {
      data.roles.push(val)
    }
    done(val, 'toggle')
  }
}

const filterFn = (val, update) => {
  update(() => {
    if (val === '') {
      filterOptions.value = data.roles
    }
    else {
      const needle = val.toLocaleLowerCase()
      filterOptions.value = data.roles.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
    }
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

  api.get("permission-groups", { params: { action: 0 } }).then(response => {
    data.roles = response.data.groups;
    Loading.hide()
  });

  api.get('users-in-role', { params: { role_id: route.params.id } }).then((response) => {
    data.users = response.data.users
    Loading.hide()
  })
  api.get('roles').then((response) => {
    response.data.roles.forEach((role) => {
      if (role.id == route.params.id) {
        data.roleName = role.name
      }
    })
  })
});
const rights = access.filter(checkEvent);
rights.forEach(function (el) {
  let key = el.split('.')[1]
  if (el.includes('role')) {
    state[key] = true
  }
});

function checkEvent(keys) {
  return keys.includes('role');
}
</script>
<style lang="scss" scoped>
.head-btn-box {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  #back-btn:hover {
    color: #7b94e6 !important;
  }

  h5 {
    margin: 0;
    font-weight: 500;
  }

  #head-1 {
    padding-top: 4px;
  }
}

.container {
  width: auto;
  height: 100%;
}

.create-header {
  width: 100%;
  align-items: center;
  justify-content: space-between;
}


.table-container {
  background-color: #fff;
  padding: 15px;
  width: auto;

  td,
  th {
    padding: 10px;
  }
}

.modal-table {
  max-height: calc(100vh - 280px);
  overflow-y: auto;
}

.table-head {
  justify-content: space-between;
}

input {
  border: 1px solid rgb(196, 196, 196);
  outline: none;
  border-radius: 5px;
  /*   border-bottom: none; */
}

input:focus {
  border: 1px solid blue;
}

.permission_tab {
  border-radius: 5px;
  box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.1);
}

.assign-card{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 800px;
}
</style>
