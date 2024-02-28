<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Certificates</h5>
            <div class="row">
              <div class="search-button">
                <q-input outlined dense type="search" class="q-mr-sm text-search" v-model.trim="text"
                  label="Search By Email" @keyup="filterByEmail">
                  <template v-slot:append>
                    <q-btn flat dense icon="search" />
                  </template>
                </q-input>
              </div>
              <q-btn v-if="state.create" label="create new" @click="createNewModal = true; count = 1"
                class="create-btn"></q-btn>
            </div>
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-icon name="error" size="4rem" class="col-12" color="red" />
                <span class="text-h5 w600 col-12 text-center q-py-sm">Are You Sure?</span>
                <span class="text-subtitle1 w600 col-12 text-center text-grey">You won't be able to revert this!</span>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn label="Yes, Delete !" color="red" @click="deleteCertificate" />
                <q-btn label="Cancel" color="primary" @click="count = 1" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-dialog v-model="updateModal" persistent>
            <q-card style="width: 500px">
              <q-form @submit="updateCerts">
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
              <q-form class="createNew" @submit="addCertificate" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Add New Certificate</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Student Name
                      </label>
                      <q-input dense outlined v-model="certificate.name" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Student Name']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Email
                      </label>
                      <q-input dense outlined v-model="certificate.email" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Email']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Course Name
                      </label>
                      <q-select dense outlined v-model="certificate.course" label="Select an option" use-input use-chips
                        input-debounce="0" @new-value="createValue" :options="filterOptions" @filter="filterFn"
                        color="secondary" class="col-9" lazy-rules :popup-content-style="{ width: '385px' }"
                        :rules="[val => val != null || 'Please Select Course']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Enrollment ID
                      </label>
                      <q-input dense outlined color="secondary" v-model="certificate.enrolment_id" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Enrollment Id']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Template ID
                      </label>
                      <q-input dense outlined color="secondary" v-model="certificate.template_id" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Template Id']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Issued On
                      </label>
                      <q-input dense outlined type="date" color="secondary" v-model="certificate.issued_on" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Issued On Date']" />
                    </div>
                  </div>
                  <div class="row q-pa-sm">
                    <label style="font-weight: 600">[Fill Details below only if adding certificate for Webinar]</label>
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        College name
                      </label>
                      <q-input dense outlined v-model="certificate.college" color="secondary" class="col-9" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Logo Image Link
                      </label>
                      <q-input dense outlined v-model="certificate.logo" color="secondary" class="col-9" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Sign Image Link
                      </label>
                      <q-input dense outlined v-model="certificate.sign" color="secondary" class="col-9" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        CC email
                      </label>
                      <q-input dense label="CC@example.com" outlined v-model="certificate.cc" color="secondary"
                        class="col-9" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        BCC email
                      </label>
                      <q-input dense label="BCC@example.com" outlined v-model="certificate.bcc" color="secondary"
                        class="col-9" />
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
              <q-form class="createNew" @submit="updateModal = true; editModal = false; count = 1">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Update Certificate</span>
                    <q-btn icon="close" dense flat @click="count = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Student Name
                      </label>
                      <q-input dense outlined v-model="data.certificate.student_name" color="secondary" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Student Name']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Email
                      </label>
                      <q-input dense outlined v-model="data.certificate.email" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Email']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Course Name
                      </label>
                      <q-input dense outlined v-model="data.certificate.course_name" color="secondary" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Course']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Enrollment ID
                      </label>
                      <q-input dense outlined color="secondary" v-model="data.certificate.enrolment_id" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Enrollment Id']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Certificate ID
                      </label>
                      <q-input dense outlined color="secondary" v-model="data.certificate.certificate_id" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Certificate Id']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Template ID
                      </label>
                      <q-input dense outlined color="secondary" v-model="data.certificate.template_id" class="col-9"
                        lazy-rules :rules="[val => val && val > 0 || 'Please Enter Template Id']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Issued On
                      </label>
                      <q-input dense outlined color="secondary" v-model="data.certificate.issued_on" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Issued On Date']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Certifiate PDF
                      </label>
                      <q-input dense outlined color="secondary" v-model="data.certificate.certificate_pdf_url"
                        class="col-9" />
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
            <div v-if="data.total > 0" class="q-pa-sm w600"> Total Records : {{ data.total }} </div>
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr>
                  <th class="text-center text-size" scope="col">#</th>
                  <th class="text-left text-size " scope="col">Assigned To
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
                  <th class="text-left" scope="col">Enrolment ID
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'enrolment_id', direction = 'asc')"
                      id="arrow-icon">&uarr;&darr;</q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'enrolment_id', direction = 'dsc')"
                      id="arrow-icon">&darr;&uarr;</q-btn>
                  </th>
                  <th class="text-left" scope="col">Certificate ID
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'certificate_id', direction = 'asc')"
                      id="arrow-icon">&uarr;&darr;</q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'certificate_id', direction = 'dsc')"
                      id="arrow-icon">&darr;&uarr;</q-btn>
                  </th>
                  <th class="text-center" style="width: 9%" scope="col">View</th>
                  <th class="text-left" v-if="state.edit || state.status" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cert in data.certs" :key="cert.id">
                  <td class="text-center">{{ count++ }}</td>
                  <td>
                    <div class="name" style="overflow-wrap: break-word;">
                      <q-icon name="person" size="xs" color="primary" class="q-mr-xs" /> {{ cert.student_name }} <br>
                      <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" /> {{ cert.email }}
                    </div>
                  </td>
                  <td>
                    <div class="course" style="overflow-wrap: break-word;">
                      {{ cert.course_name }}
                    </div>
                  </td>
                  <td class="enrolment">
                    <div class="text" style="overflow-wrap: break-word;">
                      {{ cert.enrolment_id }}
                    </div>
                  </td>
                  <td class="certificate">
                    <div class="text" style="overflow-wrap: break-word;">
                      {{ cert.certificate_id }}
                    </div>
                  </td>
                  <td class="text-center">
                    <q-btn flat rounded color="primary" class="view" label="View"
                      :href="certificate_url + cert.certificate_id + '/' + cert.email" target="_blank"
                      icon-right="open_in_new" />
                  </td>
                  <td v-if="state.edit || state.delete || state.reset" style="width: 20px" class="text-center">
                    <div>
                      <q-fab flat class="action-btn" icon="settings" direction="left" padding="sm">
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
                      </q-fab>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="shadowBoder col-md-12 ">
              <div>
                <p class="w600 q-ma-none flex flex-center float-left"> Showing data between {{ Number(data.from) }} to {{
                  Number(data.to) }} out of {{ Number(data.total) }}</p>
                <div v-if="showElement">
                  <q-pagination id="hide-pagination" class="flex float-right" v-model="current" @click="paginate(current)"
                    :max="Number(data.last_page)" :max-pages="10" :boundary-numbers="true" direction-links />
                </div>
              </div>
            </div>
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

const text = ref("")
const route = useRoute();
const router = useRouter();
const certificate_url = "https://datatrained.com/api/view-certificate/";
const current = ref(1);
let showElement = ref(true);
const confirm = ref(false)
const createNewModal = ref(false)
const editModal = ref(false)
const updateModal = ref(false)
const editNote = ref('')
let upArrow = ref(true);

const access = LocalStorage.getItem('access_key')
const u_id = LocalStorage.getItem('u_id')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
  reset: ref(false)
})

const certificate = reactive({
  name: null,
  email: null,
  course_name: null,
  enrolment_id: null,
  template_id: null,
  issued_on: null,
  FormData: null,
  college: '',
  logo: '',
  sign: '',
  cc: '',
  bcc: '',
});

const data = reactive({
  certs: [],
  certificate: [],
  certificate_id: null,
  last_page: '',
  from: '',
  to: '',
  total: ''
});

const options = [
  "PG Program in Data Science, Machine Learning and Neural",
  "Applied Machine Learning with Python",
  "Strategic Program in Digital Marketing",
  "Data Science Master Class",
  "PG Program in Full Stack Development Engineering",
  "PG Program in Investment Banking and Capital Market",
  "Data Science and Machine Learning Projects",
  "PG Program in Human Resource Management and People",
];

const filterOptions = ref(options);
const createValue = (val, done) => {
  if (val.length > 0) {
    if (!options.includes(val)) {
      options.push(val)
    }
    done(val, 'toggle')
  }
}

const filterFn = (val, update) => {
  update(() => {
    if (val === '') {
      filterOptions.value = options
    }
    else {
      const needle = val.toLowerCase()
      filterOptions.value = options.filter(
        v => v.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.certs.sort((a, b) => {
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
        data.certs.sort((a, b) => {
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

let count = Number(data.from) + 1;

const addCertificate = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  certificate.FormData = new FormData();
  certificate.FormData.append("name", certificate.name),
    certificate.FormData.append("email", certificate.email),
    certificate.FormData.append("course_name", certificate.course),
    certificate.FormData.append("enrolment_id", certificate.enrolment_id),
    certificate.FormData.append("template_id", certificate.template_id),
    certificate.FormData.append("issued_on", certificate.issued_on),
    certificate.FormData.append("college", certificate.college),
    certificate.FormData.append("logo", certificate.logo),
    certificate.FormData.append("sign", certificate.sign),
    certificate.FormData.append("cc", certificate.cc),
    certificate.FormData.append("bcc", certificate.bcc),
    certificate.FormData.append('added_by', u_id)

    api.post('add-certificate', certificate.FormData, {
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
      api.get("certificates").then((response) => {
        data.certs = response.data.certs.data;
        data.last_page = response.data.certs.last_page;
        data.from = response.data.certs.from;
        data.to = response.data.certs.to;
        data.total = response.data.certs.total;
        Loading.hide()
        count = 1;
      })
    }).catch(function (error) {
      console.log(error);
    });
}

const onReset = () => {
  certificate.name = null,
    certificate.email = null,
    certificate.course = null,
    certificate.enrolment_id = null,
    certificate.certificate_id = null,
    certificate.issued_on = null,
    certificate.template_id = null,
    certificate.bcc = null,
    certificate.cc = null,
    certificate.college = null,
    certificate.logo = null,
    certificate.sign = null,
    count = 1
}

const openEditModal = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get("edit-certificate", {
    params: { id: id }
  }).then(response => {
    data.certificate = response.data.certs
    editModal.value = true
    count = 1
    Loading.hide()
  });
}

const updateCerts = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("update-certificate", {
    id: data.certificate.id,
    student_name: data.certificate.student_name,
    email: data.certificate.email,
    course_name: data.certificate.course_name,
    enrolment_id: data.certificate.enrolment_id,
    certificate_id: data.certificate.certificate_id,
    template_id: data.certificate.template_id,
    issued_on: data.certificate.issued_on,
    certificate_pdf_url: data.certificate.certificate_pdf_url,
    updated_by: u_id,
    updated_why: editNote.value
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
      message: response.data.msg
    })
    updateModal.value = false
    editNote.value = ''
    api.get("certificates").then((response) => {
      data.certs = response.data.certs.data;
      data.last_page = response.data.certs.last_page;
      data.from = response.data.certs.from;
      data.to = response.data.certs.to;
      data.total = response.data.certs.total;
      Loading.hide()
      count = 1;
    })
  }).catch((error) => {
    console.log("Error", error);
  });
};

const resetCertificate = (id) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get("reset-certificate/" + id).then(response => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'amber-7',
      message: 'Certificate Successfully Reset'
    })
    location.reload();
    count = 1
    Loading.hide()
  })
}

const deleteCertificate = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get("delete-certificate/" + data.certificate_id).then(response => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red-7',
      message: response.data.msg
    })
    location.reload();
    count = 1
    Loading.hide()
  }).catch((error) => {
    console.log("Error", error);
  });
}

const filterByEmail = () => {
  count = 1
  if (text.value.length >= 3) {
    count = 1;
    Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
    api.get("get-certificate", { params: { email: text.value } }).then((response) => {
      data.certs = response.data.certs;
      Loading.hide()
    }).finally(() => {
      count = 1
    });
    showElement.value = false;
  }
  else {
    count = 1
    Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
    api.get("certificates").then((response) => {
      data.certs = response.data.certs.data;
      Loading.hide()
    }).finally(() => {
      count = 1
    });
    showElement.value = true;
  }
}

const paginate = async (current) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  await api.get("https://genesis.datatrained.com/api/admin/certificates?page=" + current).then((response) => {
    data.certs = response.data.certs.data
    data.from = response.data.certs.from;
    data.to = response.data.certs.to;
    data.total = response.data.certs.total;
    count = 1
    Loading.hide();
  }).finally(() => {
    count = 1
  })
}

const confirmDelete = (id) => {
  confirm.value = true
  data.certificate_id = id
  count = 1;
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("certificates").then((response) => {
    data.certs = response.data.certs.data;
    data.last_page = response.data.certs.last_page;
    data.from = response.data.certs.from;
    data.to = response.data.certs.to;
    data.total = response.data.certs.total;
    Loading.hide()
    count = 1;
  })

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('certificate')) {
      state[key] = true
    }
  });

  function checkEvent(keys) {
    return keys.includes('certificate');
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
  padding: 5px 9px;
}

th {
  font-weight: 600;
  font-size: 15px;
  white-space: nowrap;

}

td {
  color: #4f4f4f;
}

// .link{
//   width: 60px;
//  }

@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
  #head-1 {
    font-size: 15px;
  }

  th {
    font-size: 12px;
  }

  td {
    font-size: 10px;
    text-align: center;
  }

  #arrow-icon {
    font-size: 12px;
  }

  .view {
    font-size: 11px;
  }

  .name {
    width: 80px;
    text-align: left;
  }

  .create-btn {
    width: 107px;
  }

  .search-button {
    width: 137px;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1023px) and (orientation : portrait) {
  #head-1 {
    font-size: 13px;
  }

  th {
    font-size: 10px;
    padding: 5px 1px;
  }

  td {
    font-size: 9px;
    text-align: center;
    padding: 5px 1px;
  }

  #arrow-icon {
    font-size: 12px;
  }

  .view {
    font-size: 9px;
  }

  .name {
    width: 80px;
    text-align: left;
    padding: 2px;
  }

  .create-btn {
    width: 90px;
    height: 30px;
    margin-top: 6px;
  }

  .search-button {
    width: 120px;
  }

  .head-btn-box {
    height: 5vh;
  }

  .table-container {
    padding: 1px;
  }

  .view-icon {
    font-size: 9px;
  }

  table {
    padding: 2px;
  }

  .course {
    width: 70px;
  }
}
</style>
