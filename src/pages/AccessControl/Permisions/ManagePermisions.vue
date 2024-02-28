<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Manage Permissions</h5>
            <q-btn v-if="state.create" label="create role" @click="fullHeight = true" class="create-btn"></q-btn>
          </div>
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-icon name="error" size="4rem" class="col-12" color="red" />
                <span class="text-h5 w600 col-12 text-center q-py-sm">Are You Sure?</span>
                <span class="text-subtitle1 w600 col-12 text-center text-grey">You won't be able to revert this!</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn label="Yes, Delete !" color="red" @click="deleteRole" />
                <q-btn label="Cancel" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-tabs v-model="tab" dense active-color="primary">
            <q-tab name="permGroup" label="Permission Groups" class="col-md-6" />
            <q-tab name="permDirect" label="Direct Permissions" class="col-md-6" />
          </q-tabs>
          <q-separator class="q-mb-sm" />
          <q-dialog maximized style="padding: 0;" v-model="fullHeight" full-height position="right">
            <q-card class="column full-height" style="width: 600px">
              <q-card-section class="row create-header">
                <span class="text-h6 w600">Create Permission Group (Role)</span>
                <q-btn icon="close" dense flat @click="clearFields" v-close-popup />
              </q-card-section>
              <q-separator color="primary" />
              <q-card-section>
                <div class="row" style="align-items: center;">
                  <span class="col-md-4 w600">Permission Group Name</span>
                  <q-input outlined dense class="col-md-8" v-model="groupName" />
                </div>
                <div class="row q-pt-md" style="align-items: center;">
                  <span class="col-md-4 w600">Message</span>
                  <q-input outlined dense class="col-md-8" v-model="message" />
                </div>
              </q-card-section>

              <q-card-section class="col q-pt-none">
              </q-card-section>

              <q-separator />

              <q-card-section class="row bg-white" style="justify-content: space-between;">
                <q-btn dense outlined class="q-ma-sm q-px-md" label="Clear" @click="clearFields" />
                <q-btn dense outlined flat class="bg-primary text-white q-ma-sm q-px-md" @click="createRole"
                  label="Create" />
              </q-card-section>
            </q-card>
          </q-dialog>

          <q-tab-panels v-model="tab" animated swipeable>
            <q-tab-panel name="permGroup">
              <div class="table-container shadowBoder">
                <!-- <q-span class="head-2">Website Pages </q-span> -->
                <table id="dtBasicExample" class="table table-bordered table-sm" cellspacing="0" width="100%">
                  <thead class="bg-grey-4">
                    <tr>
                      <!-- <th scope="col">#</th> -->
                      <th class="text-left" scope="col">Role Group</th>
                      <th scope="col">User</th>
                      <th scope="col" class="text-left">Message</th>
                      <th scope="col" class="text-left">Updated On</th>
                      <th v-if="state.edit || state.delete" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="role in data.roles">
                      <td>
                        <q-item dense class="text-primary" clickable :to="`assigned-permissions/` + role.id"> {{ role.name
                        }} </q-item>
                      </td>
                      <td class="text-center"> {{ role.user_count }} </td>
                      <td> {{ role.message }} </td>
                      <td> {{ role.updated_at }} </td>
                      <td v-if="state.edit || state.delete" class="text-center">
                        <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                          <q-fab-action v-if="state.edit" color="primary" text-color="white" icon="edit">
                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                              transition-hide="scale">Edit</q-tooltip>
                          </q-fab-action>
                          <q-fab-action v-if="state.delete" color="red" text-color="white" icon="delete"
                            @click="confirmDelete(id = role.id)">
                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                              transition-hide="scale">Delete</q-tooltip>
                          </q-fab-action>
                        </q-fab>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </q-tab-panel>
            <q-tab-panel name="permDirect">
              <div class="table-container shadowBoder">
                <!-- <q-span class="head-2">Website Pages </q-span> -->
                <table id="dtBasicExample" class="table table-bordered table-sm" cellspacing="0" width="100%">
                  <thead class="bg-grey-4">
                    <tr>
                      <th class="text-left" scope="col">Name</th>
                      <th scope="col" class="text-left">Email</th>
                      <th scope="col" class="text-left">Total Permission</th>
                      <th scope="col" class="text-left">Permission Groups</th>
                      <th scope="col" class="text-left">Direct Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <q-item dense class="text-primary" clickable to="manage-direct-permission">
                          ABC
                        </q-item>
                      </td>
                      <td class="text-center">ABC</td>
                      <td>ABC</td>
                      <td>ABC</td>
                      <td class="text-center">ABC</td>
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
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LocalStorage, Notify } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const fullHeight = ref(false)
const groupName = ref('')
const message = ref('')
const route = useRoute();
const router = useRouter();
const tab = ref('permGroup')
const confirm = ref(false)

const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
})
const data = reactive({
  roles: [],
  id: null,
});

const deleteRole = () => {
    api.post('delete-role', {
      id: data.id,
    }).then((response) => {
      confirm.value = false
      Loading.show({
        spinner: QSpinnerPie,
        spinnerColor: 'primary',
        messageColor: 'black',
        backgroundColor: 'white',
        message: 'Loading Page Data. Please Wait!'
      })

      api.get("roles").then(response => {
        data.roles = response.data.roles;
        Loading.hide()
      });

      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'red',
        message: response.data.msg,
      })
    }).catch((error) => {
      console.log(error)
    })
  }

const createRole = () => {
  api.post('create-role', {
    name: groupName.value,
    message: message.value,
  }).then((response) => {
    router.push('assigned-permissions/' + response.data.id)
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: 'Role Created Successfully...'
    })
  }).catch((error) => {
    console.log(error)
  })
}

const clearFields = () => {
  groupName.value = '',
    message.value = ''
};

const confirmDelete = (id) =>{
  data.id = id
  confirm.value = true
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("roles").then(response => {
    data.roles = response.data.roles;
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
</style>
