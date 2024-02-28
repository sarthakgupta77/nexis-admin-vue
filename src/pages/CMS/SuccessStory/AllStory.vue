<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12" style="width:100%">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Success Stories</h5>
            <q-btn v-if="state.create" label="create new" @click="createNewModal = true; count = 1"
              class="create-btn" />
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card style="width: 500px">
              <q-form @submit="updateStory">
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
                  <q-btn label="Cancel" outline @click="count = 1" v-close-popup />
                  <q-btn label="Update" color="secondary" type="submit" />
                </q-card-actions>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="createNewModal" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="addStory" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Add New Story</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Name
                      </label>
                      <q-input dense outlined v-model="story.name" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Student Name']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Job Profile
                      </label>
                      <q-input dense outlined v-model="story.jobProfile" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Job Profile']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Status
                      </label>
                      <q-select :options="options" dense outlined v-model="story.status" color="secondary" class="col-9"
                        emit-value map-options lazy-rules
                        :rules="[val => val !== null || 'Please Select Event Status']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Course
                      </label>
                      <q-input dense outlined v-model="story.course" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val !== null || 'Please Enter Course Name']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: flex-start;">
                      <label class="w600 col-3">
                        Image
                      </label>
                      <q-file dense label="Choose File" outlined v-model="story.imageFile" color="secondary" class="col-9"
                        hint="Image Size: [400px × 400px]" lazy-rules
                        :rules="[val => val !== null || 'Please Attach Student Image']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Company Name
                      </label>
                      <q-input dense outlined color="secondary" v-model="story.companyName" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Company Name']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Hike Percentage
                      </label>
                      <q-input dense outlined color="secondary" v-model="story.hikePercentage" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Hike Percentage']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: flex-start;">
                      <label class="w600 col-3">
                        Company Logo Image
                      </label>
                      <q-file dense outlined color="secondary" v-model="story.logoFile" class="col-9" label="Choose File"
                        lazy-rules :rules="[val => val !== null || 'Please Attach Company Logo Image']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        LinkedIn Link
                      </label>
                      <q-input dense outlined color="secondary" autogrow v-model="story.linkedinLink" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter LinkedIn Profile Link']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Youtube Link
                      </label>
                      <q-input dense outlined color="secondary" autogrow v-model="story.youtubeLink" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Youtube Link']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Blog Link
                      </label>
                      <q-input dense outlined color="secondary" autogrow v-model="story.blogLink" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Blog Link']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Comment
                      </label>
                      <q-input dense outlined color="secondary" v-model="story.comment" class="col-9" type="textarea"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Some Comment']" />
                    </div>
                  </div>
                </q-card-section>

                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: space-between;">
                    <q-btn outline label="Clear" type="reset" />
                    <q-btn color="primary" label="Create" type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="editModal" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="confirm = true, editModal = false; count = 1">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Update Success Stories</span>
                    <q-btn icon="close" dense flat @click="count = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Name
                      </label>
                      <q-input dense v-model="data.story.name" outlined color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Student Name']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Job Profile
                      </label>
                      <q-input dense outlined v-model="data.story.job_profile" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Student Job Profile']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: flex-start;">
                      <label class="w600 col-3">
                        Image
                      </label>
                      <q-file dense label="Choose file only if want to
                      update" v-model="data.story.image" outlined color="secondary" class="col-9"
                        hint="Image Size: 1200px × 628px" />
                    </div>

                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        LinkedIn Link
                      </label>
                      <q-input dense outlined color="secondary" autogrow v-model="data.story.linkedin_link" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter LinkedIn Profile Link']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Blog Link
                      </label>
                      <q-input dense outlined color="secondary" autogrow v-model="data.story.blog_link" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Blog Link']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Comment
                      </label>
                      <q-input dense outlined color="secondary" class="col-9" v-model="data.story.comment" type="textarea"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Some Comment']" />
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
            <div v-if="data.stories.length > 0" class="q-pa-sm w600"> Total Records : {{ data.stories.length }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr>
                  <th scope="col">#</th>
                  <th class="text-left" scope="col">Name
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'name', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'name', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th class="text-left" scope="col">Job Profile
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'job_profile', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'job_profile', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Status</th>
                  <th v-if="state.edit || state.status" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="story in data.stories" :key="story.id">
                  <td class="text-center">{{ count++ }}</td>
                  <td>{{ story.name }}</td>
                  <td>{{ story.job_profile }}</td>

                  <td style="width: 60px;" class="text-center" v-if="story.status == 1">

                    <q-badge rounded color="green" class="status">
                      Active
                    </q-badge>
                  </td>
                  <td class="text-center" v-if="story.status == 0">
                    <q-badge rounded color="red" class="status">
                      InActive
                    </q-badge>
                  </td>
                  <td v-if="state.edit || state.status" style="width: 20px" class="text-center">
                    <div>
                      <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                        <q-fab-action v-if="state.edit" @click="openEditModal(id = story.id)" color="primary"
                          text-color="white" icon="edit">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Edit</q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="story.status == 0 && state.status"
                          @click="ChangeStatus(id = story.id, status = 1)" color="green" text-color="white"
                          icon="change_circle">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Change To Active
                          </q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="story.status == 1 && state.status" color="red" text-color="white"
                          icon="change_circle" @click="ChangeStatus(id = story.id, status = 0)">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Change To InActive
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
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

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

const createNewModal = ref(false)
const editModal = ref(false)
const confirm = ref(false)
const editNote = ref('')
let count = 1;
const options = [
  {
    label: 'Active',
    value: 1,
  },
  {
    label: 'Inactive',
    value: 0
  }
];

const story = reactive({
  name: null,
  jobProfile: null,
  imageFile: null,
  companyName: null,
  hikePercentage: null,
  logoFile: null,
  linkedinLink: null,
  youtubeLink: null,
  blogLink: null,
  comment: null,
  course: null,
  FormData: null,
  status: 1
});

const data = reactive({
  stories: [],
  story: []
});

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.stories.sort((a, b) => {
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
        data.stories.sort((a, b) => {
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

const openEditModal = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get("edit-story/" + id).then(response => {
    data.story = response.data.story;
    editModal.value = true
    count = 1
    Loading.hide()
  });
}
const ChangeStatus = (id, status) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api
    .post("story-action", {
      action: 1,
      id: id,
      status: status
    }).then((response) => {
      api.get("success-stories").then((response) => {
        data.stories = response.data.stories;
        Notify.create({
          timeout: 2000,
          position: 'top-right',
          color: 'amber-7',
          message: 'Status Changed Successfully'
        })
        count = 1
        Loading.hide()
      });
    }).catch((error) => {
      console.log("Error", error);
    });
};

const updateStory = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("update-story", {
    id: data.story.id,
    name: data.story.name,
    image: data.story.image,
    job_profile: data.story.job_profile,
    comment: data.story.comment,
    linkedin_link: data.story.linkedin_link,
    blog_link: data.story.blog_link,
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
    editNote.value = ''
    api.get("success-stories").then(response => {
      data.stories = response.data.stories;
      Loading.hide()
      count = 1;
    })
  }).catch((error) => {
    console.log("Error", error);
  })
}

const addStory = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  story.FormData = new FormData();
  story.FormData.append("name", story.name),
    story.FormData.append("job_profile", story.jobProfile),
    story.FormData.append("image", story.imageFile),
    story.FormData.append("company_name", story.companyName),
    story.FormData.append("hike", story.hikePercentage),
    story.FormData.append("logo", story.logoFile),
    story.FormData.append("linkedin_link", story.linkedinLink),
    story.FormData.append("youtube_link", story.youtubeLink),
    story.FormData.append("blog_link", story.blogLink),
    story.FormData.append("comment", story.comment),
    story.FormData.append("course", story.course),
    story.FormData.append("status", story.status),
    story.FormData.append('added_by', u_id)
    api.post('add-story', story.FormData, {
      header: {
        "content-type": "multipart/form-data",
      },
    }).then(function (response) {
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'green',
        message: response.data.msg
      })
      createNewModal.value = false
      api.get("success-stories").then(response => {
        data.stories = response.data.stories;
        Loading.hide()
        count = 1;
      })
    }).catch(function (error) {
      console.log(error);
    });
}

const onReset = () => {
  story.name = null,
    story.jobProfile = null,
    story.imageFile = null,
    story.companyName = null,
    story.hikePercentage = null,
    story.logoFile = null,
    story.linkedinLink = null
  story.youtubeLink = null
  story.blogLink = null
  story.comment = null
  story.course = null
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("success-stories").then(response => {
    data.stories = response.data.stories;
    Loading.hide()
    count = 1;
  })

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('story')) {
      state[key] = true
    }
  });

  function checkEvent(keys) {
    return keys.includes('story');
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

.createNew {
  width: 750px;
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

@media only screen and (min-device-width: 768px) and (max-device-width: 1023px) and (orientation : portrait) {

  td {
    font-size: 9px;
    padding: 6px 4px;
  }

  th {
    font-size: 12px;
    white-space: nowrap;
    padding: 5px 5px;
  }

  .status {
    width: 40px;
    font-size: 9px;
    padding: 3px;
  }

  h5 {
    font-size: 15px;
  }

  .create-btn {
    width: 120px !important;
    font-size: 10px;

  }

  .head-btn-box {
    height: 4vh;
  }

  .table-container {
    padding: 0 !important;
  }

}</style>
