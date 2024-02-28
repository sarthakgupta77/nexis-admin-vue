<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">LMS Support</h5>
            <div class="row">
              <div class="search-button">
                <q-input outlined dense type="search" class="q-mr-sm text-search" v-model.trim="text"
                  label="Search By Email" @keyup="filterByEmail">
                  <template v-slot:append>
                    <q-btn flat dense icon="search" />
                  </template>
                </q-input>
              </div>
            </div>
          </div>

          <div class="table-container shadowBoder">
            <!-- <div v-if="data.total > 0" class="q-pa-sm w600"> Total Records : {{ data.total }} </div> -->
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr>
                  <th class="text-center text-size" scope="col">#</th>
                  <th class="text-left text-size " scope="col">Student Details
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'student_name', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'student_name', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th class="text-left" scope="col">Course
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'course_name', direction = 'asc')"
                      id="arrow-icon">&uarr;&darr;</q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'course_name', direction = 'dsc')"
                      id="arrow-icon">&darr;&uarr;</q-btn>
                  </th>
                  <th class="text-left" scope="col">Batch
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'enrolment_id', direction = 'asc')"
                      id="arrow-icon">&uarr;&darr;</q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'enrolment_id', direction = 'dsc')"
                      id="arrow-icon">&darr;&uarr;</q-btn>
                  </th>
                  <th class="text-left" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center"></td>
                  <td>
                  </td>
                  <td>
                  </td>
                  <td class="text-center">
                  </td>

                  <td class="text-center">
                    <!-- <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                      <q-fab-action v-if="state.edit" @click="openEditModal(id = cert.id)" color="primary"
                        text-color="white" icon="edit">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Edit</q-tooltip>
                      </q-fab-action>
                      <q-fab-action color="amber-10" v-if="state.reset" @click="resetCertificate(cert.id)"
                        icon="lock_reset">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Reset</q-tooltip>
                      </q-fab-action>

                      <q-fab-action v-if="state.delete" @click="confirmDelete(id = cert.id)" color="red"
                        text-color="white" icon="delete">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Delete</q-tooltip>
                      </q-fab-action>
                    </q-fab> -->
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- <div class="shadowBoder col-md-12 ">
              <div>
                <p class="w600 q-ma-none flex flex-center float-left"> Showing data between {{ Number(data.from) }} to {{
                  Number(data.to) }} out of {{ Number(data.total) }}</p>
                <div v-if="showElement">
                  <q-pagination id="hide-pagination" class="flex float-right" v-model="current" @click="paginate(current)"
                    :max="Number(data.last_page)" :max-pages="10" :boundary-numbers="true" direction-links />
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from 'quasar'
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();

// const access = LocalStorage.getItem('access_key')
// const state = reactive({
//   create: ref(false),
//   edit: ref(false),
//   delete: ref(false),
//   status: ref(false),
//   update: ref(false),
//   reset: ref(false)
// })

// const sortTable = (field, direction) => {

//   if (direction == 'asc') {
//     upArrow = false;
//     count = 1;
//     switch (field) {
//       case field:
//         data.certs.sort((a, b) => {
//           let fa = a[field].toLowerCase();
//           let fb = b[field].toLowerCase();

//           if (fa < fb) {
//             return -1;
//           }
//           if (fa > fb) {
//             return 1;
//           }
//           return 0;
//         })
//         break;
//     }
//   }
//   else if (direction == 'dsc') {
//     upArrow = true;
//     count = 1;
//     switch (field) {
//       case field:
//         data.certs.sort((a, b) => {
//           let fa = a[field].toLowerCase();
//           let fb = b[field].toLowerCase();

//           if (fa > fb) {
//             return -1;
//           }
//           if (fa < fb) {
//             return 1;
//           }
//           return 0;
//         })
//     }
//   }
// }

window.onresize = function () {
  count = 1;
}

// const paginate = async (current) => {
//   Loading.show({
//     spinner: QSpinnerPie,
//     spinnerColor: 'primary',
//     messageColor: 'black',
//     backgroundColor: 'white',
//     message: 'Loading Page Data. Please Wait!'
//   })

//   await api.get("https://genesis.datatrained.com/api/admin/certificates?page=" + current).then((response) => {
//     data.certs = response.data.certs.data
//     data.from = response.data.certs.from;
//     data.to = response.data.certs.to;
//     data.total = response.data.certs.total;
//     count = 1
//     Loading.hide();
//   }).finally(() => {
//     count = 1
//   })
// }

// onBeforeMount(() => {
//   Loading.show({
//     spinner: QSpinnerPie,
//     spinnerColor: 'primary',
//     messageColor: 'black',
//     backgroundColor: 'white',
//     message: 'Loading Page Data. Please Wait!'
//   })

//   api.get("certificates").then((response) => {
//     data.certs = response.data.certs.data;
//     data.last_page = response.data.certs.last_page;
//     data.from = response.data.certs.from;
//     data.to = response.data.certs.to;
//     data.total = response.data.certs.total;
//     Loading.hide()
//     count = 1;
//   })

//   const rights = access.filter(checkEvent);
//   rights.forEach(function (el) {
//     let key = el.split('.')[1]
//     if (el.includes('certificate')) {
//       state[key] = true
//     }
//   });

//   function checkEvent(keys) {
//     return keys.includes('certificate');
//   }
// });
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
  font-size: 15px;
  white-space: nowrap;
}

td {
  color: #4f4f4f;
}
</style>
