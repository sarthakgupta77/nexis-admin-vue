<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5>Roles</h5>


            <div>
              <q-btn label="Add Roles" outline color="secondary" @click="dialog = true" />

              <q-dialog v-model="dialog" persistent>
                <q-card>
                  <q-card-section class="row items-center">
                    <q-avatar icon="people" flat color="white" text-color="primary" />
    
                    <h6 class="q-ma-none" > Create New Role</h6>
                  </q-card-section>

                  <q-card-section class="">
                    <h6 class="q-mb-sm q-mt-none" >Roles</h6>
                    <q-input outlined style="width: 500px;" color="secondary" placeholder=" Add Role here.." />

                    <!-- <q-select standout="bg-blue text-white" style="width: 500px;" v-model="model" :options="options" label="Select Role" /> -->

                  </q-card-section>


                  <!-- Notice v-close-popup -->
                  <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="ADD" color="primary" @click="rolesAlertMesg" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>


          </div>

          <div class="table-container shadowBoder">
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead>
                <tr class="text-center">
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in data.users" :key="user.id">
                  <td class="text-center">{{ user.id }}</td>
                  <td>{{ user.title }}</td>
                  <td>{{ user.body }}</td>
                  <td>
                    <div>
                      <q-fab flat color="grey-9" icon="settings" direction="left" padding="sm">
                        <q-fab-action color="green" text-color="white" icon="edit">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Edit
                          </q-tooltip>
                        </q-fab-action>
                        <q-fab-action color="primary" text-color="white" icon="change_circle">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Chnage Active Status
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

const dialog = ref(false);

const rolesAlertMesg = () => {
  alert("New Role Added");
};

const options = ["admin",
  "sales",
  "hr",
  "trainer",
  "evalautor",];


const fab = ref(false);
const data = reactive({
  users: [],
});



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
