<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5>All Users</h5>

            <q-btn
              color="secondary"
              to="/adduser"
              label="Add User"
              outline
              id="create-btn"
            ></q-btn>
          </div>

          
          <div>
            <q-dialog v-model="dialog" persistent>
              <q-card style="max-width: 720px;">
                <q-card-section class="row items-center">
                  <!-- <q-avatar icon="edit" class="q-pa-none" color="white" text-color="primary" /> -->
                  <h6 class="q-ma-none" >Edit User Password</h6>
                  
                </q-card-section>
                <!-- <q-separator /> -->

                <q-card-section class="">

                  <h6 class="q-mb-sm q-mt-none" >New Password</h6>
                  <q-input outlined style="width: 650px" color="secondary"  />
                  
                  <h6 class="q-mb-sm q-mt-sm" >Confirm Password</h6>
                  <q-input outlined style="width: 650px" color="secondary"  />
                  

                  <!-- <q-select standout="bg-blue text-white" style="width: 500px;" v-model="model" :options="options" label="Select Role" /> -->
                </q-card-section>

                <!-- Notice v-close-popup -->
                <q-card-actions class="q-pa-md" align="right">
                  <q-btn outline label="Cancel" color="primary" v-close-popup />
                  <q-btn  label="Update" color="primary" @click="rolesAlertMesg" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>



          <div class="table-container shadowBoder">
            <table
              id="dtBasicExample"
              class="table table-striped table-bordered table-sm"
              cellspacing="0"
              width="100%"
            >
              <thead>
                <tr class="text-center">
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in data.users" :key="user.id">
                  <td class="text-center">{{ user.id }}</td>
                  <td>{{ user.title }}</td>
                  <td>{{ user.body }}</td>
                  <td class="text-center">{{ user.id }}</td>
                  <td>
                    <div>
                      <q-fab
                        flat
                        color="grey-9"
                        icon="settings"
                        direction="left"
                        padding="sm"
                      >
                        <q-fab-action
                          color="green"
                          text-color="white"
                        
                          icon="edit"
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            Edit
                          </q-tooltip>
                        </q-fab-action>
                        <q-fab-action
                          color="primary"
                          text-color="white"
                        
                          icon="change_circle"
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            Chnage Active Status
                          </q-tooltip>
                        </q-fab-action>
                        <q-fab-action
                          color="amber"
                          text-color="white"
                          @click="dialog = true"
                          icon="lock"
                        >
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            Chnage Password
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
import axios from "axios";

const fab = ref(false);
const data = reactive({
  users: [],
});
const dialog = ref(false);

onBeforeMount(() => {
  axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
    data.users = response.data;
  });
});
</script>

<style lang="scss" scoped>
.head-btn-box {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 16px;
  h5 {
    margin: 0;
    font-size: 25px;
    font-weight: 500;
  }
}

.container {
  width: auto;
  margin-top: 5px;
  height: 100%;
  padding-bottom: 5px;
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
  font-size: 20px;
  font-weight: 500;
}
.edit-btn:hover {
  color: red !important;
}
.change-btn:hover {
  color: rgb(23, 165, 49) !important;
}
.pass-btn:hover {
  color: rgb(14, 94, 144) !important;
}
.btn-drop-box:hover {
  color: #cc1db9;
}

table {
  padding-top: 8px;
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
</style>
