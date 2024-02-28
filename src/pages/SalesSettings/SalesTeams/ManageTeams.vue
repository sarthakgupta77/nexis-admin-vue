<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <div class="row">
              <q-btn flat round color="white" text-color="positive" class="q-mr-sm" icon="arrow_back" id="back-btn"
                to="/all-sales-teams">
                <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
                  transition-hide="scale">
                  Back to All Sales Teams
                </q-tooltip>
              </q-btn>
              <h5 id="head-1">Manage Team (Name - {{ data.teamName }}) </h5>
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
                <q-btn label="Yes, Delete !" color="red" @click="deleteTeamMembers" />
                <q-btn label="Cancel" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="confirm1" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-icon name="error" size="4rem" class="col-12" color="red" />
                <span class="text-h5 w600 col-12 text-center q-py-sm">Are You Sure?</span>
                <span class="text-subtitle1 w600 col-12 text-center text-grey">You won't be able to revert this!</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn label="Yes, Delete !" color="red" @click="deleteTeam" />
                <q-btn label="Cancel" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" v-model="addTeamModal" full-height position="right">
            <q-card class="modal-card">
              <q-card-section class="q-pa-none">
                <div class="row create-header q-pa-md">
                  <span class="text-h6 w600">Assign New Team</span>
                  <q-btn icon="close" dense flat v-close-popup />
                </div>
                <q-separator color="primary" />
                <div class="q-pa-md">
                  <div class="row col-12 q-pt-md" style="align-items: baseline;">
                    <span class="col-md-3 w600">Add Teams</span>
                    <q-select dense outlined color="secondary" :options="data.filteredTeams" option-label="name"
                      option-value="id" emit-value map-options v-model="data.team" lazy-rules multiple use-chips
                      :rules="[val => val !== null || 'Please Select Team']" use-input @filter="filterTeam"
                      class="col-9">
                      <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps">
                          <q-item-section>
                            <q-item-label>{{ scope.opt.name }}</q-item-label>
                            <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="row q-pa-none bg-white">
                <div class="col-12">
                  <q-separator />
                </div>
                <div class="col-12 row q-pa-md" style="justify-content: space-between;">
                  <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" />
                  <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" label="Create"
                    @click="assignTeams" />
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" v-model="addMemberModal" full-height position="right">
            <q-card class="modal-card">
              <q-card-section class="q-pa-none">
                <div class="row create-header q-pa-md">
                  <span class="text-h6 w600">Assign Member</span>
                  <q-btn icon="close" dense flat v-close-popup />
                </div>
                <q-separator color="primary" />
                <div class="q-pa-md">
                  <div class="row col-12 q-pt-md" style="align-items: flex-start;">
                    <span class="col-md-3 w600">Add Team Members</span>
                    <q-select dense outlined color="secondary" :options="data.filteredUsers" option-label="name"
                      option-value="id" emit-value map-options v-model="data.members" lazy-rules multiple use-chips
                      :rules="[val => val !== null || 'Please Enter Batch Course']" use-input @filter="filterFn"
                      class="col-9">
                      <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps" class="row" style="justify-content: space-between;">
                          <q-item-section class="col-6">
                            <q-item-label>{{ scope.opt.name }}</q-item-label>
                            <q-item-label caption>{{ scope.opt.email }}</q-item-label>
                          </q-item-section>
                          <q-item-section class="col-3">
                            <q-chip v-if="scope.opt.status == 0" color="red" class="q-px-md" text-color="white" label="Inactive" />
                            <q-chip v-if="scope.opt.status == 1" color="green" class="q-px-md" text-color="white" label="Active" />
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="row q-pa-none bg-white">
                <div class="col-12">
                  <q-separator />
                </div>
                <div class="col-12 row q-pa-md" style="justify-content: space-between;">
                  <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" />
                  <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" label="Create"
                    @click="assignMembers()" />
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>

          <q-tabs v-model="tab" align="left" dense active-color="primary">
            <q-tab name="members" label="Members" @click="parentTeam" />
            <q-tab name="teams" label="Teams" class="q-ml-sm" />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="teams">
              <q-splitter v-model="splitterModel" style="height: 100%;">
                <template v-slot:before>
                  <q-scroll-area style="height: 100vh;">
                    <div class=" subteam-tab row" v-for="team in data.subTeams">
                      <q-tabs class="permission_tab bg-grey-3" v-for="user in team" switch-indicator v-model="tab1" dense
                        align="left" active-color="primary" vertical>
                        <q-tab :name="user.id" :label="user.name" @click="getSubTeamMembers(id = user.id)"
                          style="justify-content: flex-start" />
                      </q-tabs>
                      <div class="col-1 ">
                        <q-btn round dense outline icon="delete" color="red" id="delete-btn" @click="confirmDeleteTeam(id = team[0].id)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Remove Team</q-tooltip>
                        </q-btn>
                      </div>
                    </div>
                    <div class="row q-py-md" style="justify-content: center">
                      <q-btn outline dense color="primary" icon="add" label="Assign Team" @click="openAssignTeamModal"
                        class="create-btn col-5" />
                    </div>
                  </q-scroll-area>
                </template>
                <template v-slot:after>
                  <q-scroll-area style="height: 100vh;">
                    <h4 v-if="tab1 == ''" class="text-center text-primary w600"> Select A Team To Manage</h4>
                    <div v-else>
                      <div class="row table-head q-pa-md">
                        <span class="w600"> No. of members : &nbsp; {{ data.subTeamUsers.length }} </span>
                        <div>
                          <q-btn v-if="selection.length != 0" outline label="Remove" color="red" class="q-mr-sm"
                            style="border-radius: 7px" @click="confirm = true" />
                          <q-btn label="Assign Member" class="create-btn" @click="openAssignModal" />
                        </div>
                      </div>
                      <div class="row bg-grey-4 q-mx-md" style="padding: 5px 0px;">
                        <div class="col-1"></div>
                        <div class="col-5 w600">Name</div>
                        <div class="col-5 w600">Email</div>
                        <div class="col-1"></div>
                      </div>
                      <q-tab-panels v-model="tab1">
                        <q-tab-panel :name="tab1">
                          <div class="q-px-md subteam-panel">
                            <div v-for="user in data.subTeamUsers" id="st-row" class="row q-py-xs"
                              style="align-items: center;">
                              <div class="col-1">
                                <q-checkbox v-model="selection" :val="user.id" />
                              </div>
                              <div class="col-5"> {{ user.name }} </div>
                              <div class="col-5"> {{ user.email }} </div>
                              <div class="col-1">
                                <q-btn round outline icon="delete" color="red" id="delete-btn"
                                  @click="confirmDelete(id = user.id)">
                                  <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                    transition-show="scale" transition-hide="scale">Remove User</q-tooltip>
                                </q-btn>
                              </div>
                            </div>
                          </div>
                        </q-tab-panel>
                      </q-tab-panels>
                    </div>
                  </q-scroll-area>
                </template>
              </q-splitter>
            </q-tab-panel>
            <q-tab-panel name="members">
              <div class="table-container shadowBoder q-mt-sm">
                <div class="row table-head q-pb-md">
                  <span class="w600"> No. of members : &nbsp; {{ data.teamUsers.length }} </span>
                  <div>
                    <q-btn v-if="selection.length != 0" outline label="Remove" color="red" class="q-mr-sm"
                      style="border-radius: 7px" @click="confirm = true" />
                    <q-btn label="Assign Member" class="create-btn" @click="openAssignModal" />
                  </div>
                </div>
                <table id="dtBasicExample" class="table table-bordered table-sm" cellspacing="0" width="100%">
                  <thead class="bg-grey-4">
                    <tr class="text-left">
                      <th style="width: 5%"></th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th class="text-center" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in data.teamUsers">
                      <td>
                        <q-checkbox v-model="selection" :val="user.id" />
                      </td>
                      <td>
                        {{ user.name }}
                      </td>
                      <td> {{ user.email }} </td>
                      <td v-if="state.delete" class="text-center">
                        <q-btn round outline icon="delete" id="delete-btn" color="red"
                          @click="confirmDelete(id = user.id)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Remove User</q-tooltip>
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
const addMemberModal = ref(false)
const selection = ref([])
const addTeamModal = ref(false)

const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
})
const tab = ref('members');
const tab1 = ref('');
const splitterModel = ref(30);
const confirm = ref(false)
const confirm1 = ref(false)

const data = reactive({
  teamUsers: [],
  subTeams: [],
  subTeamUsers: [],
  teamName: '',
  team: [],
  teamOptions: [],
  filteredTeams: [],
  team_id: route.params.id,
  users: [],
  id: null,
  members: [],
  filteredUsers: []
});

const getSubTeamMembers = (id) => {
  api.get("sales-team-members", { params: { team_id: id } }).then(response => {
    data.subTeamUsers = response.data.team_users
    data.team_id = id
    Loading.hide()
  });
}

const openAssignModal = () => {
  api.get('users').then((res) => {
    data.users = res.data.users.data
    data.filteredUsers = data.users
    addMemberModal.value = true
  })
}

const filterFn = (val, update) => {
  update(() => {
    if (val === '') {
      data.filteredUsers = data.users
    }
    else {
      const needle = val.toLowerCase()
      api.get('users',{params:{email: needle}}).then((res)=>{
        data.filteredUsers = res.data.users
      })
    }
  })
}
const filterTeam = (val, update) => {
  update(() => {
    if (val === '') {
      data.filteredTeams = data.teamOptions
    }
    else {
      const needle = val.toLowerCase()
      data.filteredTeams = data.teamOptions.filter(
        v => v.name.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

const confirmDelete = (id) => {
  data.id = id
  confirm.value = true
}

const deleteTeamMembers = () => {
  if (selection.value.length != 0) {
    api.post('remove-sales-team-members', {
      team_id: data.team_id,
      members: JSON.stringify(selection.value)
    }).then((res) => {
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'delete',
        message: res.data.msg
      })
      confirm.value = false
      api.get("sales-team-members", { params: { team_id: route.params.id } }).then(response => {
        data.teamUsers = response.data.team_users;
        data.subTeams = response.data.sub_teams;
        Loading.hide()
      });
      getSubTeamMembers(data.team_id)
    })
  } else {
    selection.value.push(data.id)
    api.post('remove-sales-team-members', {
      team_id: data.team_id,
      members: JSON.stringify(selection.value)
    }).then((res) => {
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'delete',
        message: res.data.msg
      })
      confirm.value = false
      api.get("sales-team-members", { params: { team_id: route.params.id } }).then(response => {
        data.teamUsers = response.data.team_users;
        data.subTeams = response.data.sub_teams;
        Loading.hide()
      });
      getSubTeamMembers(data.team_id)
    })
  }
}

const assignMembers = () => {
  api.post('add-sales-team-members', {
    team_id: data.team_id,
    members: JSON.stringify(data.members)
  }).then((res) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
      message: res.data.msg
    })
    addMemberModal.value = false
    api.get("sales-team-members", { params: { team_id: route.params.id } }).then(response => {
      data.teamUsers = response.data.team_users;
      data.subTeams = response.data.sub_teams;
      Loading.hide()
    });
    getSubTeamMembers(data.team_id)
  }).catch((err) => {
    console.log('Error: ', err)
  })
}

const parentTeam = () => {
  data.team_id = route.params.id
  selection.value = []
  tab1.value = ''
}

const openAssignTeamModal = () => {
  api.get('get-subteams',{params:{team_id: route.params.id}}).then((res)=>{
    data.teamOptions = res.data.sub_teams
    data.filteredTeams = data.teamOptions
    addTeamModal.value = true
  })
}

const assignTeams = () =>{
  api.post('manage-subteams',{
    team_id: route.params.id,
    subteams: JSON.stringify(data.team),
    action: 1
  }).then((res)=>{
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: res.data.msg
    })
    addTeamModal.value = false
    api.get("sales-team-members", { params: { team_id: route.params.id } }).then(response => {
      data.teamUsers = response.data.team_users;
      data.subTeams = response.data.sub_teams;
      Loading.hide()
    });
  })
}

const confirmDeleteTeam = (id) => {
  data.team_id = id
  confirm1.value = true
}

const deleteTeam = () => {
  api.post('manage-subteams',{
    team_id: route.params.id,
    subteams: JSON.stringify([data.team_id]),
    action: 0
  }).then((res)=>{
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: res.data.msg
    })
    confirm1.value = false
    api.get("sales-team-members", { params: { team_id: route.params.id } }).then(response => {
      data.teamUsers = response.data.team_users;
      data.subTeams = response.data.sub_teams;
      Loading.hide()
    });
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

  api.get("sales-team-members", { params: { team_id: route.params.id } }).then(response => {
    data.teamUsers = response.data.team_users;
    data.subTeams = response.data.sub_teams;
    Loading.hide()
  });

  api.get('sales-teams').then((res) => {
    // data.teamOptions = res.data.teams
    let obj = res.data.teams.find(({ id }) => id == route.params.id)
    data.teamName = obj.name
  })

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
});
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

  td {
    padding: 5px;
  }

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
  align-items: center;
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
  padding: 0;
  width: 89%;
}

.modal-card {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#delete-btn {
  visibility: hidden;
}

.subteam-tab:hover {
  #delete-btn {
    visibility: visible;
  }
}

tr:hover {
  #delete-btn {
    visibility: visible;
  }
}

#st-row:hover {
  #delete-btn {
    visibility: visible;
  }
}

.subteam-panel {
  border-radius: 5px;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1);
}

.subteam-tab {
  justify-content: space-between;
  margin: 0px 8px 8px 0px;
}
</style>
