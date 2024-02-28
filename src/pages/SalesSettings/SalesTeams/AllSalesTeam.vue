<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">All Sales Team</h5>
            <q-btn label="create team" class="create-btn" @click="openCreateModal" />
          </div>
          <q-dialog v-model="confirm" persistent>
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
          <q-dialog maximized style="padding: 0;" v-model="createTeamModal" full-height position="right">
            <q-card class="modal-card">
              <q-card-section class="q-pa-none">
                <div class="row create-header q-pa-md">
                  <span class="text-h6 w600">Create Sales Team</span>
                  <q-btn icon="close" dense flat v-close-popup />
                </div>
                <q-separator color="primary" />
                <div class="row q-pa-md">
                  <div class="row col-12" style="align-items: center;">
                    <span class="col-md-3 w600">Team Name</span>
                    <q-input outlined dense class="col-md-9" v-model="teamName" />
                  </div>
                  <div class="row col-12 q-pt-md" style="align-items: baseline;">
                    <span class="col-md-3 w600">Team Lead</span>
                    <q-select dense outlined color="secondary" :options="data.filteredUsers" option-label="name"
                      option-value="id" emit-value map-options v-model="teamLead" lazy-rules
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
                  <div class="row col-12" style="align-items: center;">
                    <span class="col-md-3 w600">About</span>
                    <q-input outlined dense class="col-md-9" v-model="about" />
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="row q-pa-none bg-white">
                <div class="col-12">
                  <q-separator />
                </div>
                <div class="row q-pa-md col-12" style="justify-content: space-between;">
                  <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" />
                  <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" @click="createTeam"
                    label="Create" />
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <table id="dtBasicExample" class="table table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th scope="col">Team Name</th>
                  <th scope="col">Lead Name</th>
                  <th scope="col">Lead Email</th>
                  <th scope="col">About</th>
                  <th scope="col">Created At</th>
                  <th class="text-center" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="team in data.teams">
                  <td>
                    <q-item dense class="text-primary" clickable :to="'/manage-team/' + team.id"> {{ team.name }}
                    </q-item>
                  </td>
                  <td>
                    {{ team.lead_name }}
                  </td>
                  <td>
                    {{ team.lead_email }}
                  </td>
                  <td> {{ team.about }} </td>
                  <td> {{ team.created_at }} </td>
                  <td class="text-center">
                    <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                      <!-- <q-fab-action color="primary" text-color="white" icon="edit">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Edit</q-tooltip>
                      </q-fab-action> -->
                      <q-fab-action color="red" text-color="white" icon="delete" @click="confirmDelete(id = team.id)">
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
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LocalStorage, Notify } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
const createTeamModal = ref(false)
const teamName = ref('')
const teamLead = ref(null)
const about = ref('')
const confirm = ref(false)

const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
})
const data = reactive({
  teams: [],
  users: [],
  filteredUsers: [],
  team_id: null
});

const confirmDelete = (id) => {
  data.team_id = id
  confirm.value = true
}

const createTeam = () => {
  api.post('create-sales-team', {
    name: teamName.value,
    lead: teamLead.value,
    about: about.value
  }).then((res) => {
    router.push('manage-team/' + res.data.id)
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: res.data.msg
    })
  })
}

const openCreateModal = () => {
  api.get('users', { params: { status: 1 } }).then((res) => {
    data.users = res.data.users.data
    data.filteredUsers = data.users
    createTeamModal.value = true
  })
}

const filterFn = (val, update) => {
  update(() => {
    if (val === '') {
      data.filteredUsers = data.users
    }
    else {
      const needle = val.toLowerCase()
      data.filteredUsers = data.users.filter(
        v => v.name.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

const deleteTeam = () => {
  api.post('delete-sales-team', {
    team_id: data.team_id
  }).then((res) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: res.data.msg
    })
    confirm.value = false
    api.get("sales-teams").then(response => {
    data.teams = response.data.teams;
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

  api.get("sales-teams").then(response => {
    data.teams = response.data.teams;
    Loading.hide()
  });
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
  font-weight: 600;
  font-size: 14px;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}

.create-header {
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.modal-card {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
