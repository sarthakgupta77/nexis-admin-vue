<template>
    <q-page class="q-pa-md">
      <div class="container">
        <div class="row">
          <div class="col-md-12" style="width:100%">
            <div class="head-btn-box shadowBoder">
              <h5 id="head-1">All Applications</h5>
              <!-- <q-btn label="create new" to="/add-new-story" class="create-btn"></q-btn> -->
            </div>

            <div class="table-container shadowBoder">
              <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                <thead class="bg-grey-4">
                  <tr>
                    <th scope="col">#</th>
                    <th class="text-left" scope="col">Application Title
                      <q-btn flat v-if="upArrow" @click="sortTable(field = 'name', direction = 'asc')"><span
                          style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                      <q-btn flat v-else @click="sortTable(field = 'name', direction = 'dsc')"><span
                          style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                    </th>
                    <th class="text-left" scope="col">Application Description
                      <q-btn flat v-if="upArrow" @click="sortTable(field = 'job_profile', direction = 'asc')"><span
                          style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                      <q-btn flat v-else @click="sortTable(field = 'job_profile', direction = 'dsc')"><span
                          style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                    </th>
                    <th scope="col">Status</th>
                    <th  scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr v-for="story in data.stories" :key="story.id">
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
                          <q-fab-action v-if="state.edit" @click="EditStory(story.id)" color="primary" text-color="white"
                            icon="edit">
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
                  </tr> -->
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
    edit: ref(false),
    delete: ref(false),
    status: ref(false),
    update: ref(false),
  })

  const fab = ref(false);
  let count = 1;
  const data = reactive({
    stories: []
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

//   const EditStory = id => {
//     router.push("/edit-story/" + id);
//   };

//   const ChangeStatus = (id, status) => {
//     api
//       .post("story-action", {
//         action: 1,
//         id: id,
//         status: status
//       }).then((response) => {
//         api.get("success-stories").then((response) => {
//           data.stories = response.data.stories;
//           Notify.create({
//             timeout: 2000,
//             position: 'top-right',
//             color: 'amber-7',
//             message: 'Status Changed Successfully'
//           })
//           count = 1
//         });
//       }).catch((error) => {
//         console.log("Error", error);
//       });
//   };


//   onBeforeMount(() => {
//     Loading.show({
//       spinner: QSpinnerPie,
//       spinnerColor: 'primary',
//       messageColor: 'black',
//       backgroundColor: 'white',
//       message: 'Loading Page Data. Please Wait!'
//     })

//     api.get("success-stories").then(response => {
//       data.stories = response.data.stories;
//       Loading.hide()
//     }).finally(() => {
//       count = 1;
//     });;

//     const rights = access.filter(checkEvent);
//     rights.forEach(function (el) {
//       let key = el.split('.')[1]
//       if (el.includes('story')) {
//         state[key] = true
//       }

//     });

//     function checkEvent(keys) {
//       return keys.includes('story');
//     }
//   });
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

  @media only screen and (min-device-width: 768px) and (max-device-width: 1023px) and (orientation : portrait){

    td{
      font-size: 9px;
      padding: 6px 4px;
    }
    th{
      font-size: 12px;
      white-space: nowrap;
      padding: 5px 5px;
    }
    .status{
      width: 40px;
      font-size: 9px;
      padding: 3px;
    }

    h5{
      font-size: 15px;
    }
    .create-btn{
      width: 120px !important;
      font-size: 10px;

    }
    .head-btn-box{
      height: 4vh;
    }
    .table-container{
      padding: 0 !important;
    }

  }
  </style>
