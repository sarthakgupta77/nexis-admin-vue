<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">News</h5>
            <q-btn v-if="state.create" label="create new" @click="createNewModal = true; count = 1;"
              class="create-btn"></q-btn>
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card style="width: 500px">
              <q-form @submit="updateArticle">
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
              <q-form class="createNew" @submit="addArticle" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Add News</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Title
                      </label>
                      <q-input dense outlined color="secondary" class="col-9" v-model="article.title" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Fill News Title']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Status
                      </label>
                      <q-select :options="options" dense outlined v-model="article.status" color="secondary" class="col-9"
                        emit-value map-options lazy-rules :rules="[val => val !== null || 'Please Select News Status']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Link
                      </label>
                      <q-input dense outlined color="secondary" autogrow class="col-9" v-model="article.link" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Webinar Image
                      </label>
                      <q-file dense outlined v-model="article.file" class="col-9" hint="Image Size : [400px x 400px]"
                        lazy-rules :rules="[val => val !== null || 'Please Provide Webinar Image']" />
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
              <q-form class="createNew" @submit="confirm = true; editModal = false; count = 1">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Update News</span>
                    <q-btn icon="close" dense flat @click="count = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Title
                      </label>
                      <q-input dense outlined color="secondary" class="col-9" v-model="data.article.title" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Fill News Title']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Link
                      </label>
                      <q-input dense outlined color="secondary" autogrow class="col-9" v-model="data.article.link"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                    </div>
                    <!-- <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                    <label class="w600 col-3">
                      Webinar Image
                    </label>
                    <q-file dense outlined v-model="data.article.image" class="col-9" hint="Image Size : [400px x 400px]"
                      lazy-rules :rules="[val => val && val.length > 0 || 'Please Provide Webinar Image']" />
                  </div> -->
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
            <div v-if="data.articles.length > 0" class="q-pa-sm w600"> Total Records : {{ data.articles.length }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0">
              <thead class="bg-grey-4">
                <tr>
                  <th class="text-center" scope="col">#</th>
                  <th class="text-left" scope="col">Title
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'title', direction = 'asc')"><span
                        id="arrow-icon">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'title', direction = 'dsc')"><span
                        id="arrow-icon">&darr;&uarr;</span></q-btn>
                  </th>
                  <th class="text-center" scope="col">Status</th>
                  <th class="text-left" v-if="state.edit || state.status" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="article in data.articles" :key="article.id">
                  <td class="text-center">{{ count++ }}</td>
                  <td class="link">
                    <div class="link" style="overflow-wrap: break-word;">
                      <a :href="article.link" target="_blank">{{ article.title }}</a>
                    </div>
                  </td>
                  <td class="text-center" v-if="article.status == 1">
                    <q-badge rounded color="green" class="status">
                      Active
                    </q-badge>
                  </td>
                  <td class="text-center" v-if="article.status == 0">
                    <q-badge rounded color="red" class="status">
                      InActive
                    </q-badge>
                  </td>
                  <td v-if="state.edit || state.status" style="width: 20px" class="text-center">
                    <div>
                      <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
                        <q-fab-action v-if="state.edit" @click="openEditModal(id = article.id)" color="primary"
                          text-color="white" icon="edit">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">Edit</q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="article.status == 0 && state.status"
                          @click="ChangeStatus(id = article.id, status = 1)" color="green" text-color="white"
                          icon="change_circle">
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            Change To Active
                          </q-tooltip>
                        </q-fab-action>
                        <q-fab-action v-if="article.status == 1 && state.status" color="red" text-color="white"
                          icon="change_circle" @click="ChangeStatus(id = article.id, status = 0)">
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
import { Loading, QSpinnerPie, Notify, LocalStorage } from 'quasar'
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

const article = reactive({
  file: null,
  title: null,
  link: null,
  FormData: null,
  status: 1,
});

const data = reactive({
  articles: [],
  article: [],
  article_id: null
});

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.articles.sort((a, b) => {
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
        data.articles.sort((a, b) => {
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

const ChangeStatus = (id, status) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api
    .post("article-action", {
      action: 1,
      id: id,
      status: status
    }).then((response) => {
      api.get("articles").then((response) => {
        data.articles = response.data.articles;
        Notify.create({
          timeout: 2000,
          position: 'top-right',
          color: 'amber-7',
          message: 'Status Changed Successfully'
        })
        Loading.hide()

      });
    }).catch((error) => {
      console.log("Error", error);
    });
};

const openEditModal = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.article_id = id
  api.get("edit-article/" + id).then(response => {
    data.article = response.data.article;
    editModal.value = true
    count = 1
    Loading.hide()
  });
}

const updateArticle = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("update-article", {
    id: data.article_id,
    title: data.article.title,
    link: data.article.link,
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
    api.get("articles").then((response) => {
      data.articles = response.data.articles;
      Loading.hide()
      count = 1;
      editNote.value = ''
    })
  }).catch((error) => {
    console.log("Error", error);
  });
};

const addArticle = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  article.FormData = new FormData();
  article.FormData.append("image", article.file),
    article.FormData.append("title", article.title),
    article.FormData.append("link", article.link),
    article.FormData.append("status", article.status),
    article.FormData.append('added_by', u_id)
  api.post('add-article', article.FormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(function (response) {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    createNewModal.value = false
    api.get("articles").then((response) => {
      data.articles = response.data.articles;
      Loading.hide()
      count = 1;
    })
  }).catch(function (error) {
    console.log(error);
  });
}

const onReset = () => {
  article.file = null,
    article.title = null,
    article.link = null,
    count = 1
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("articles").then((response) => {
    data.articles = response.data.articles;
    Loading.hide()
    count = 1;
  })

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('news')) {
      state[key] = true
    }

  });

  function checkEvent(keys) {
    return keys.includes('news');
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
  width: auto;
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
  white-space: now-wrap;
  width: 100%;

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

@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
  .head-btn-box {
    height: 4vh;
  }

  h5 {
    font-size: 16px;
  }

  .create-btn {
    height: 2vh;
    width: 110px;
    font-size: 10px;
  }

  .link {
    width: 300px;
  }

  .status {
    width: 70px;
    font-size: 12px;
    padding: 4px;
  }

}

@media only screen and (min-device-width: 768px) and (max-device-width: 1023px) and (orientation : portrait) {
  .link {
    width: 150px;
  }

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

}
</style>
