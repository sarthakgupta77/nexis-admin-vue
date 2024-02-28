<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Course Collaterals</h5>
            <q-btn v-if="state.create" label="create new" class="create-btn" @click="createNewModal = true" />
          </div>

          <q-dialog maximized style="padding: 0;" persistent v-model="createNewModal" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="collateralAdd" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Add Course Collateral</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator class="q-pa-none" color="primary" />
                  </div>
                  <div class="q-pa-md">
                    <div class="row">
                      <div class="col-12 row" style="align-items: baseline">
                        <label class="col-2 w600">Course</label>
                        <q-select dense outlined color="secondary" :options="data.filteredCourses" option-label="title"
                          option-value="id" :popup-content-style="{ width: '420px', height: '70%' }"
                          v-model="addCollaterals.course" lazy-rules
                          :rules="[val => val !== null || 'Please Select Course']" use-input @filter="filterFn"
                          class="col-10" emit-value map-options />
                      </div>
                      <div class="col-12 row" style="align-items: baseline">
                        <label class="col-2 w600">Type</label>
                        <q-select dense outlined color="secondary" :options="typeOption" v-model="addCollaterals.type"
                          lazy-rules :rules="[val => val !== null || 'Please Select Course Type']" class="col-10" />
                      </div>
                      <div class="col-12 row" style="align-items: baseline">
                        <label class="col-2 w600">Country</label>
                        <q-select dense outlined color="secondary" :options="countryOption"
                          v-model="addCollaterals.country" lazy-rules
                          :rules="[val => val !== null || 'Please Select Country']" class="col-10" />
                      </div>
                      <div class="col-12 row">
                        <label class="col-2 w600">Upload File</label>
                        <q-file dense square outlined class="col-10" lazy-rules
                          :rules="[val => val !== null || 'Please Attach a File']" label="Choose File"
                          v-model="addCollaterals.file" />
                      </div>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: space-between;">
                    <q-btn outline type="reset" label="Clear" />
                    <q-btn color="primary" type="submit" label="Create" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <div v-if="data.collaterals.length > 0" class="q-pa-sm w600"> Total Records : {{ data.collaterals.length }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th class="text-center" scope="col">#</th>
                  <th scope="col">Course
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Type
                  </th>
                  <th scope="col">Country</th>
                  <th class="text-center" scope="col">Link</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="collateral in data.collaterals">
                  <td class="text-center">{{ count++ }}</td>
                  <td>{{ collateral.title }}</td>
                  <td>
                    <div v-if="collateral.type == 1">
                      Brochure
                      <br />
                    </div>
                    <div v-else-if="collateral.type == 3">
                      Career Transition Report
                      <br />
                    </div>
                    <div v-else-if="collateral.type == 4">
                      Competitor Comparison
                      <br />
                    </div>
                    <div v-else-if="collateral.type == 2">
                      Career Track
                      <br />
                    </div>
                  </td>
                  <td>
                    {{ collateral.country }}
                  </td>
                  <td class="text-center link">
                    <a :href="collateral.url" target="_blank" class="link-btn">
                      View
                      <q-icon name="open_in_new" class="view-icon" color="primary" />
                    </a>
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
import { Notify, LocalStorage } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../boot/axios";

const createNewModal = ref(false)

const route = useRoute();
const router = useRouter();
let upArrow = ref(true);
const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
})

const countryOption = [
  {
    label: 'India',
    value: 'IN'
  },
  {
    label: 'United States',
    value: 'US'
  },
  {
    label: 'United Kingdom',
    value: 'UK'
  },
  {
    label: 'Singapore',
    value: 'SG'
  },
  {
    label: 'Australia',
    value: 'AU'
  },
  {
    label: 'United Arab Emirates',
    value: 'AE'
  },
  {
    label: 'Canada',
    value: 'CA'
  },
]

const typeOption = [
  {
    label: 'Brochure',
    value: 1,
  },
  {
    label: ' Career Track',
    value: 2,
  },
  {
    label: '  Career Transition Report',
    value: 3,
  },
  {
    label: 'Competitor Comparison',
    value: 4,
  },
]

const addCollaterals = reactive({
  course: null,
  type: null,
  country: null,
  file: null,
})

const fab = ref(false);
let count = 1;
const data = reactive({
  collaterals: [],
  courses: [],
  FormData: null,
  filteredCourses: [],
});

const filterFn = (val, update) => {
  update(() => {
    if (val === '') {
      data.filteredCourses = data.courses
    }
    else {
      const needle = val.toLowerCase()
      data.filteredCourses = data.courses.filter(
        v => v.title.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

const convertCountryCode = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].country == 'IN') {
      array[i].country = "India";
    } else if (array[i].country == 'US') {
      array[i].country = "United States";
    } else if (array[i].country == 'UK') {
      array[i].country = "United Kingdom";
    } else if (array[i].country == 'SG') {
      array[i].country = "Singapore";
    } else if (array[i].country == 'CA') {
      array[i].country = "Canada";
    } else if (array[i].country == 'AE') {
      array[i].country = "United Arab Emirates";
    }
  }
}

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

window.onresize = function () {
  count = 1;
}

const onReset = () => {
  addCollaterals.course = ''
  addCollaterals.type = ''
  addCollaterals.country = ''
  addCollaterals.file = ''
  count = 1
}

const collateralAdd = (() => {
  data.FormData = new FormData();
  data.FormData.append("course", addCollaterals.course.value),
    data.FormData.append("type", addCollaterals.type.value),
    data.FormData.append("country", addCollaterals.country.value),
    data.FormData.append("file", addCollaterals.file),

    api.post("add-collateral", data.FormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      Notify.create({
        timeout: 3000,
        position: 'top-right',
        color: 'green',
        message: response.data.msg
      })
      count = 1
      createNewModal.value = false;
      api.get("all-collaterals").then((response) => {
        data.collaterals = response.data.collaterals;
        convertCountryCode(data.collaterals);
      })
    }).catch((error) => {
      console.log("Error", error);
    });
})

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("all-collaterals").then(response => {
    data.collaterals = response.data.collaterals;
    convertCountryCode(data.collaterals);
    Loading.hide()
  })

  api.get('course').then((response) => {
    data.courses = response.data.course
    data.filteredCourses = data.courses;
  })

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('course-collateral')) {
      state[key] = true
    }
  });

  function checkEvent(keys) {
    return keys.includes('course-collateral');
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
  font-size: 14px;
  color: #4f4f4f;
}

.createNew {
  width: 600px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height: 100%;
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
