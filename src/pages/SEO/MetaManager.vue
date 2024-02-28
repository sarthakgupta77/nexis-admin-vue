<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 class="q-ma-none" id="head-1">Meta Manager</h5>
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card style="width: 500px">
              <q-form v-if="tab == 'Website'" @submit="updateWebsite">
                <q-card-section class="row">
                  <div class="col-12 row" style="align-items: baseline;">
                    <label class="w600 q-pa-xs col-12">
                      Note
                    </label>
                    <q-input dense outlined color="secondary" v-model="editNote" class="col-12" type="textarea" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Mention Reason for Editing']" />
                  </div>
                </q-card-section>
                <q-card-actions class="q-px-md" align="right">
                  <q-btn label="Cancel" outline @click="wCount = 1" v-close-popup />
                  <q-btn label="Update" color="secondary" type="submit" />
                </q-card-actions>
              </q-form>
              <q-form v-else-if="tab == 'Courses'" @submit="updateCourse">
                <q-card-section class="row">
                  <div class="col-12 row" style="align-items: baseline;">
                    <label class="w600 q-pa-xs col-12">
                      Note
                    </label>
                    <q-input dense outlined color="secondary" v-model="editNote" class="col-12" type="textarea" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Mention Reason for Editing']" />
                  </div>
                </q-card-section>
                <q-card-actions class="q-px-md" align="right">
                  <q-btn label="Cancel" outline @click="cCount = 1" v-close-popup />
                  <q-btn label="Update" color="secondary" type="submit" />
                </q-card-actions>
              </q-form>
              <q-form v-else-if="tab == 'Courses Secondary'" @submit="updateSecondaryCourse">
                <q-card-section class="row">
                  <div class="col-12 row" style="align-items: baseline;">
                    <label class="w600 q-pa-xs col-12">
                      Note
                    </label>
                    <q-input dense outlined color="secondary" v-model="editNote" class="col-12" type="textarea" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Mention Reason for Editing']" />
                  </div>
                </q-card-section>
                <q-card-actions class="q-px-md" align="right">
                  <q-btn label="Cancel" outline @click="sCount = 1" v-close-popup />
                  <q-btn label="Update" color="secondary" type="submit" />
                </q-card-actions>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="editModal" full-height position="right">
            <q-card v-if="tab == 'Website'">
              <q-form class="createNew" @submit="confirm = true, editModal = false, wCount = 1">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Update Website</span>
                    <q-btn icon="close" dense flat @click="wCount = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-2">
                        Meta Tags
                      </label>
                      <q-input outlined color="secondary" class="col-10" v-model="data.meta.metatags" type="textarea"
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Tags']" input-style="height: 75vh" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: flex-end;">
                    <q-btn color="primary" label="Update" type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
            <q-card v-else-if="tab == 'Courses'">
              <q-form class="createNew" @submit="confirm = true, editModal = false, cCount = 1">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Update Course Meta Tags</span>
                    <q-btn icon="close" dense flat @click="cCount = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Tags
                      </label>
                      <q-input outlined color="secondary" class="col-9" v-model="data.meta.tags" type="textarea"
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Tags']" input-style="height: 75vh" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: flex-end;">
                    <q-btn color="primary" label="Update" type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
            <q-card v-else-if="tab == 'Courses Secondary'">
              <q-form class="createNew" @submit="confirm = true, editModal = false, sCount = 1">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Update Course Secondary Page Meata-Tags</span>
                    <q-btn icon="close" dense flat @click="sCount = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Tags
                      </label>
                      <q-input outlined color="secondary" class="col-9" v-model="data.meta.tags" type="textarea"
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Tags']" input-style="height: 75vh" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: flex-end;">
                    <q-btn color="primary" label="Update" type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <q-tabs v-model="tab" class="text-secondary" align="justify" :breakpoint="0">
              <q-tab name="Website" :label="'Website (' + data.websiteRecords + ')'" />
              <q-tab name="Courses" :label="'Courses (' + data.courseRecords + ')'" @click="courses" />
              <q-tab name="Courses Secondary" :label="'Courses Secondary (' + data.secondaryRecords + ')'"
                @click="courseSecondary" />
            </q-tabs>

            <q-separator />
            <q-tab-panels v-model="tab" animated swipeable>
              <q-tab-panel name="Website" class="q-px-none">
                <table id="dtBasicExample" class="table-layout" cellspacing="0" width="100%">
                  <thead class="bg-grey-4">
                    <tr>
                      <th class="text-center" scope="col">#</th>
                      <th class="text-left" scope="col">Page
                        <q-btn flat v-if="upArrow" @click="sortTable(field = 'page_name', direction = 'asc')"><span
                            id="arrow-icon">&uarr;&darr;</span></q-btn>
                        <q-btn flat v-else @click="sortTable(field = 'page_name', direction = 'dsc')"><span
                            id="arrow-icon">&darr;&uarr;</span></q-btn>
                      </th>
                      <th class="text-left" scope="col">URL</th>
                      <th class="text-left" v-if="state.edit || state.status" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="website in data.website" :key="website.id">
                      <td class="text-center">{{ wCount++ }}</td>
                      <td>{{ website.page_name }}</td>
                      <td> <a :href="'https://www.datatrained.com/' + website.url">{{ website.url }}</a></td>
                      <td v-if="state.edit || state.status" style="width: 5%" class="text-center">
                        <div>
                          <q-btn v-if="state.edit" dense round @click="openEditModal(id = website.id)" color="primary"
                            text-color="white" icon="edit">
                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                              transition-hide="scale">Edit</q-tooltip>
                          </q-btn>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </q-tab-panel>

              <q-tab-panel name="Courses" class="q-px-none">
                <table id="dtBasicExample" class="table-layout" cellspacing="0" width="100%">
                  <thead class="bg-grey-4">
                    <tr>
                      <th class="text-center" scope="col">#</th>
                      <th class="text-left" scope="col">Page
                        <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                            id="arrow-icon">&uarr;&darr;</span></q-btn>
                        <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span
                            id="arrow-icon">&darr;&uarr;</span></q-btn>
                      </th>
                      <th class="text-left" scope="col">URL</th>
                      <th class="text-left" v-if="state.edit || state.status" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="course in data.course" :key="course.id">
                      <td class="text-center">{{ cCount++ }}</td>
                      <td>{{ course.title }}</td>
                      <td> <a :href="'https://www.datatrained.com/' + course.url">{{ course.url }}</a></td>
                      <td v-if="state.edit || state.status" style="width: 5%" class="text-center">
                        <div>
                          <q-btn v-if="state.edit" dense round @click="openEditModal(id = course.id)" color="primary"
                            text-color="white" icon="edit">
                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                              transition-hide="scale">Edit</q-tooltip>
                          </q-btn>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </q-tab-panel>

              <q-tab-panel name="Courses Secondary" class="q-px-none">
                <table id="dtBasicExample" class="table-layout" cellspacing="0" width="100%">
                  <thead class="bg-grey-4">
                    <tr>
                      <th class="text-center" scope="col">#</th>
                      <th class="text-left" scope="col">Page
                        <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                            id="arrow-icon">&uarr;&darr;</span></q-btn>
                        <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span
                            id="arrow-icon">&darr;&uarr;</span></q-btn>
                      </th>
                      <th class="text-left" scope="col">URL</th>
                      <th class="text-left" v-if="state.edit || state.status" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="course in data.secondary" :key="course.id">
                      <td class="text-center">{{ sCount++ }}</td>
                      <td>{{ course.title }}</td>
                      <td> <a :href="'https://www.datatrained.com/' + course.url">{{ course.url }}</a></td>
                      <td v-if="state.edit || state.status" style="width: 5%" class="text-center">
                        <div>
                          <q-btn v-if="state.edit" dense round @click="openEditModal(id = course.id)" color="primary"
                            text-color="white" icon="edit">
                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                              transition-hide="scale">Edit</q-tooltip>
                          </q-btn>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </q-tab-panel>
            </q-tab-panels>
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

const route = useRoute();
const router = useRouter();
let upArrow = ref(true);
const access = LocalStorage.getItem('access_key')
const u_id = LocalStorage.getItem('u_id')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
})

const editModal = ref(false)
const confirm = ref(false)
const editNote = ref('')

const tab = ref("Website");
const fab = ref(false);
let wCount = 1
let cCount = 1
let sCount = 1
const data = reactive({
  seo: [],
  website: [],
  course: [],
  secondary: [],
  meta: [],
  websiteRecords: null,
  courseRecords: null,
  secondaryRecords: null,
});

const sortTable = (field, direction) => {
  if (tab.value == 'Website') {
    if (direction == 'asc') {
      upArrow = false;
      wCount = 1;
      switch (field) {
        case field:
          data.website.sort((a, b) => {
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
      wCount = 1;
      switch (field) {
        case field:
          data.website.sort((a, b) => {
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
  else if (tab.value == 'Courses') {
    if (direction == 'asc') {
      upArrow = false;
      cCount = 1;
      switch (field) {
        case field:
          data.course.sort((a, b) => {
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
      cCount = 1;
      switch (field) {
        case field:
          data.course.sort((a, b) => {
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
  else {
    if (direction == 'asc') {
      upArrow = false;
      sCount = 1;
      switch (field) {
        case field:
          data.secondary.sort((a, b) => {
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
      sCount = 1;
      switch (field) {
        case field:
          data.secondary.sort((a, b) => {
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
}

window.onresize = function () {
  wCount = 1;
  cCount = 1;
  sCount = 1;
}

const openEditModal = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  if (tab.value == 'Website') {
    api.get("edit-website-meta/" + id).then((response) => {
      data.meta = response.data.meta;
      editModal.value = true
      wCount = 1
      Loading.hide()
    });
  }
  else if (tab.value == 'Courses') {
    api.get("edit-course-meta/" + id).then((response) => {
      data.meta = response.data.meta;
      editModal.value = true
      cCount = 1
      Loading.hide()
    });
  }
  else if (tab.value == 'Courses Secondary') {
    api.get("edit-course-secondary-meta/" + id).then((response) => {
      data.meta = response.data.meta;
      editModal.value = true
      sCount = 1
      Loading.hide()
    });
  }
}

const updateWebsite = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("update-website-meta", {
    id: data.meta.id,
    tags: data.meta.metatags,
    updated_by: u_id,
    updated_why: editNote.value
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
      message: response.data.msg
    })
    confirm.value = false
    api.get("seo-pages").then((response) => {
      data.seo = response.data
      data.website = response.data.website
      Loading.hide()
      wCount = 1;
    })
  }).catch((error) => {
    console.log("Error", error);
  });
};

const updateCourse = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("update-course-meta", {
    id: data.meta.id,
    tags: data.meta.tags,
    updated_by: u_id,
    updated_why: editNote.value
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
      message: response.data.msg
    })
    confirm.value = false
    api.get("seo-pages").then((response) => {
      data.seo = response.data
      data.course = response.data.course
      Loading.hide()
      cCount = 1;
    })
  }).catch((error) => {
    console.log("Error", error);
  });
};

const updateSecondaryCourse = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("update-course-secondary-meta", {
    id: data.meta.id,
    tags: data.meta.tags,
    updated_by: u_id,
    updated_why: editNote.value
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
      message: response.data.msg
    })
    confirm.value = false
    api.get("seo-pages").then((response) => {
      data.seo = response.data
      data.secondary = response.data.secondary
      Loading.hide()
      sCount = 1;
    })
  }).catch((error) => {
    console.log("Error", error);
  });
};

const courses = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.course = data.seo.course
  Loading.hide()
  wCount = 1
  cCount = 1
  sCount = 1
};
const courseSecondary = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.secondary = data.seo.secondary
  Loading.hide()
  wCount = 1
  cCount = 1
  sCount = 1
};

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get("seo-pages").then((response) => {
    data.seo = response.data
    data.website = response.data.website
    data.websiteRecords = data.seo.website.length
    data.courseRecords = data.seo.course.length
    data.secondaryRecords = data.seo.secondary.length
    Loading.hide()
    wCount = 1;
  })
  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('seo')) {
      state[key] = true
    }
  });
  function checkEvent(keys) {
    return keys.includes('seo');
  }
});
</script>

<style scoped>
.head-btn-box {
  width: auto;
  margin-bottom: 16px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.createNew {
  width: 600px;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.head-btn-box {
  font-weight: 600;
  width: auto;
}

.head-btn-box #create-btn {
  float: right;
  border-radius: 5px;
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

.fab-btn {
  padding: 0px;
}

.view-btn {
  width: 100%;
}

.edit-btn:hover {
  color: rgb(23, 165, 49) !important;
}

.view-btn:hover {
  color: rgb(42, 162, 222) !important;
}

.btn-drop-box:hover {
  color: #cc1db9;
}

table,
td,
th {
  border: 1px solid #e6e6e6;
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

.edit-btn:hover {
  color: #7b94e6 !important;
}
</style>
