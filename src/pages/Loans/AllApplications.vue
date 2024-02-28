<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">All Applications</h5>
            <q-btn label="create new" to="/all-applications/add" class="create-btn"></q-btn>
          </div>
          <div class="row q-py-md">
            <div class="col-6"></div>
            <div class="col-6 row" style="justify-content:flex-end">
                <q-select rounded dense outlined v-model="model1" :options="options">
                  <template v-slot:prepend>
                    <q-icon name="calendar_month" />
                  </template>
                </q-select>
                <q-select rounded dense outlined class="col-3 q-px-sm" v-model="model" :options="options" />
                <q-btn rounded color="secondary" label="Submit" />
            </div>
          </div>
          <div class="table-container shadowBoder">
            <div class="row q-pb-md">
              <div class="col-6"></div>
              <div class="col-6 row q-pr-xs" style="justify-content: flex-end">
                <q-input dense outlined class="col-4" v-model="text" label="Search" />
              </div>
            </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Loan Ammount</th>
                  <th scope="col">No. of EMIs</th>
                  <th scope="col">EMI Start Month</th>
                  <th scope="col">Disbursed Date & Time</th>
                  <th scope="col">Batch Start Month</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
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
// import { useRoute, useRouter } from "vue-router";
// import { Notify, LocalStorage } from 'quasar'
// import { Loading, QSpinnerPie, QSpinnerGears } from 'quasar'
// import { api } from "../../boot/axios";

const model = ref('Google')
const model1 = ref(null)
const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
// const route = useRoute();
// const router = useRouter();

// const access = LocalStorage.getItem('access_key')

// const state = reactive({
//   create: ref(false),
//   edit: ref(false),
//   delete: ref(false),
//   status: ref(false),
//   update: ref(false),
// })


// let count = 1;
// const data = reactive({
//   events: [],
// });

// const EditEvent = (id) => {
//   router.push("/edit-events/" + id);
// };

// const ChangeStatus = (id, status) => {
//   api
//     .post("event-action", {
//       action: 1,
//       id: id,
//       status: status
//     }).then((response) => {
//       api.get("events").then((response) => {
//         data.events = response.data.events;
//         Notify.create({
//           timeout: 2000,
//           position: 'top-right',
//           color: 'amber-7',
//           message: 'Status Changed Successfully...'
//         })
//         count = 1;
//       });
//     }).catch((error) => {
//       console.log("Error", error);
//     });
// };

// onBeforeMount(() => {
//   Loading.show({
//     spinner: QSpinnerPie,
//     spinnerColor: 'primary',
//     messageColor: 'black',
//     backgroundColor: 'white',
//     message: 'Loading Page Data. Please Wait!'
//   })

//   api.get("events").then((response) => {
//     data.events = response.data.events;
//     Loading.hide()
//   }).finally(() => {
//     count = 1;
//   });;

//   const rights = access.filter(checkEvent);
//   rights.forEach(function (el) {
//     let key = el.split('.')[1]
//     if (el.includes('event')) {
//       state[key] = true
//     }

//   });

//   function checkEvent(keys) {
//     return keys.includes('event');
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
  font-weight: bold;
  font-size: 15px;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}
</style>
