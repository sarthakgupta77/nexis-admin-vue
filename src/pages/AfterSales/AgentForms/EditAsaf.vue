<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Filled ASAF Forms</h5>
          </div>
          <div class="table-container shadowBoder">
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th scope="col">After Sales Agent
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                      style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                  <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span
                      style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Customer Name
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Ticket ID
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                      style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                  <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span
                      style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Sales Type</th>
                  <th scope="col">Created At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
let upArrow = ref(true);
const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
})

const data = reactive({
  collaterals: [],
  courses: [],
  FormData: null,
  filteredCourses: [],
});

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.collaterals.sort((a, b) => {
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
        data.collaterals.sort((a, b) => {
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

// onBeforeMount(() => {
//   Loading.show({
//     spinner: QSpinnerPie,
//     spinnerColor: 'primary',
//     messageColor: 'black',
//     backgroundColor: 'white',
//     message: 'Loading Page Data. Please Wait!'
//   })

//   api.get("all-collaterals").then(response => {
//     data.collaterals = response.data.collaterals;
//     convertCountryCode(data.collaterals);
//     Loading.hide()
//   })

//   api.get('course').then((response) => {
//     data.courses = response.data.course
//     data.filteredCourses = data.courses;
//   })

//   const rights = access.filter(checkEvent);
//   rights.forEach(function (el) {
//     let key = el.split('.')[1]
//     if (el.includes('course-collateral')) {
//       state[key] = true
//     }

//   });

//   function checkEvent(keys) {
//     return keys.includes('course-collateral');
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
  font-weight: 600;
  font-size: 14px;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}

.createNew {
  width: 600px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.link-btn {
  color: #1976d2;
  text-decoration: none;
}

@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
  .table-container {
    padding: 10px;
  }

  table {
    padding: 0px;
  }

  td[data-v-df2eb266],
  th[data-v-df2eb266] {
    padding: 6px 8px;
    font-size: 13px;
    line-height: 1.2;
  }


  .link {
    width: 70px;
  }
}
</style>
