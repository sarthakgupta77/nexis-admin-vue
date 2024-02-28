<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box row shadowBoder">
            <h5>Pending Submissions</h5>
            <div class="col-8 row" style="justify-content: flex-end">
              <q-select outlined dense label="Search By" class="q-pr-sm col-2" @update:model-value="count = 1"
                v-model="filterBy" :options="filterOptions" />
              <q-input v-if="filterBy == 'Date'" class="col-3 q-pr-sm" dense outlined v-model="dateInput">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date" range minimal
                        @update:model-value="dateInput = `${date.from}-${date.to}`; count = 1">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input v-else outlined dense type="search" @update:model-value="count = 1" class="q-mr-sm text-search"
                v-model.trim="text" label="Search By Email" @keyup="filterByEmail">
                <template v-slot:append>
                  <q-btn flat dense icon="search" />
                </template>
              </q-input>
              <q-btn v-if="filterBy == 'Date'" class="create-btn" label="Search" />
            </div>
          </div>

          <div class="table-container shadowBoder">

            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th scope="col">#</th>
                  <th scope="col">Customer Details
                    <q-btn flat v-if="upArrow" @click="sortTable(field = 'customer_name', direction = 'asc')"><span
                        style="font-size: 17px;">&uarr;&darr;</span></q-btn>
                    <q-btn flat v-else @click="sortTable(field = 'customer_name', direction = 'dsc')"><span
                        style="font-size: 17px;">&darr;&uarr;</span></q-btn>
                  </th>
                  <th scope="col">Booking Details</th>
                  <th scope="col">Fee Details</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Customer Action</th>
                  <th scope="col" class="text-center">More Details</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="submission in data.submissions" :key="submission.id">
                  <tr>
                    <td>{{ count++ }}</td>
                    <td>
                      <q-icon name="person" size="xs" color="primary" class="q-mr-xs" title="Customer Name" /> {{
                        submission.customer_name }} <br>
                      <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" title="Customer Email" /> {{
                        submission.customer_email }} <br>
                      <q-icon name="confirmation_number" size="xs" color="primary" class="q-mr-xs" title="Ticket ID" /> {{
                        submission.ticket_id }} <br>
                    </td>
                    <td>
                      <b>Amount : &nbsp;</b> {{ submission.booking_amount }} <br>
                      <b>Type : &nbsp;</b> {{ submission.sale_type }} <br>
                      <b>Paid via : &nbsp;</b> {{ submission.mode_of_payment }}
                    </td>
                    <td>
                      <b>Fee with GST : &nbsp;</b> {{ submission.total_fee_gst }} <b>[ {{ submission.currency }} ]</b>
                      <br>
                      <b>Payment Plan : &nbsp;</b> {{ submission.payment_plan }} <br>
                      <b>No of EMIs : &nbsp;</b> {{ submission.no_of_emis }}
                    </td>
                    <td>
                      <b>Sold By : &nbsp;</b> {{ submission.sold_by }} <br>
                      <b>Agent : &nbsp;</b> {{ submission.after_sales_agent }} <br>
                      <b>Date : &nbsp;</b> {{ submission.created_at }}
                    </td>
                    <td class="text-center">
                      <q-btn outline color="green" icon-right="outgoing_mail" label="Resend ASAF Mail" size="sm"
                        @click="resendMail(id = data.id)" />
                    </td>
                    <td class="text-center">
                      <q-btn v-if="accordion.id == submission.id && accordion.flag" icon="remove" size="sm"
                        @click="accordionAction(ele_id = submission.id, action = 'close')" round color="red" />
                      <q-btn v-else icon="add" size="sm" @click="accordionAction(ele_id = submission.id, action = 'open')"
                        round color="primary" />
                    </td>
                  </tr>
                  <tr v-if="accordion.id == submission.id && accordion.flag">
                    <td colspan="12">
                      <q-card class="row shadowBoder">
                        <div class="col-6">
                          <span class="w600" style="font-size: 17px">Customer Details :</span> <br>
                          <span class="q-pt-sm"><b>Current CTC :</b> {{ submission.customer_current_ctc }} </span> <br>
                          <span><b>Current Age :</b> {{ submission.customer_age }} </span> <br>
                          <span><b>Current City :</b> {{ submission.customer_city }} </span> <br>
                          <span><b>Course Name :</b> {{ submission.course }} </span> <br>
                          <span><b>Course Format :</b> {{ submission.course_format }} </span> <br>
                          <span><b>Joining Batch :</b> {{ submission.joining_batch }} </span> <br>
                          <div>
                            <b>Student Submission :</b> &nbsp;
                            <span v-if="submission.after_sales_done == 1">Yes</span>
                            <span v-else>No</span>
                          </div>
                          <div>
                            <b>After Sales Approved :</b>&nbsp;
                            <span v-if="submission.approved == 1">Yes</span>
                            <span v-else>No</span>
                          </div>
                        </div>
                        <div class="col-6">
                          <span class="w600" style="font-size: 17px">Discount Details</span> <br>
                          <span class="q-pt-sm"><b>Discount Percentage :</b> {{ submission.discount_percent }} </span>
                          <br>
                          <span><b>Discount Amount :</b> {{ submission.discount }} </span> <br>
                          <span><b>Total Fee after Discount :</b> {{ submission.course_fee_discounted }} </span> <br>
                          <span><b>Total Fee after Discount Including GST :</b> {{ submission.total_fee_discount_gst }}
                          </span>
                        </div>
                      </q-card>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
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
  </q-page>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Loading, QSpinnerPie, LocalStorage } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
let upArrow = ref(true);
const u_id = LocalStorage.getItem('u_id')
const access = LocalStorage.getItem('access_key')
const current = ref(1)
const showElement = ref(true)
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
})

const text = ref('')
const filterBy = ref('Email')
const date = ref({ from: '2024/01/23', to: '2024/01/30' })
const dateInput = ref(`${date.value.from}-${date.value.to}`)
const filterOptions = ['Email', 'Date']

let count = 1;
const data = reactive({
  submissions: [],
  courses: [],
  from: '',
  to: '',
  total: '',
  last_page: ''
});

const accordion = ref({ id: null, flag: false })
const accordionId = []

const accordionAction = (ele_id, action) => {
  if (action == 'open') {
    accordion.value = accordionId.find(({ id }) => id == ele_id)
    accordion.value.flag = true
    count = 1
  } else {
    accordion.value = accordionId.find(({ id }) => id == ele_id)
    accordion.value.flag = false
    count = 1
  }
}

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.submissions.sort((a, b) => {
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
        data.submissions.sort((a, b) => {
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

const convertCourseCode = (array) => {
  array.forEach((ele) => {
    if (ele.course != 0 && ele.course != 1) {
      let obj = data.courses.find(({ id }) => id == ele.course)
      ele.course = obj.title
    } else {
      if (ele.course == 0) {
        ele.course = "PG Program in Data Science, Machine Learning and Neural Networks"
      }
      else {
        ele.course = "PG Program in Data Science, Machine Learning and Neural Networks"
      }
    }
  })
}

const resendMail = (id) => {
  api.get('resend-asaf-mail', { params: { id: id } }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
  })
}

const filterByEmail = () => {
  if (text.value.length >= 3) {
    api.post('pending-completed-submissions', { user_id: u_id, approval: 0, email: text.value }).then((res) => {
      data.submissions = res.data.data.data
      count = 1
    })
    showElement.value = false;
  }
  else {
    api.post('pending-completed-submissions', { user_id: u_id, approval: 0 }).then((res) => {
      data.submissions = res.data.data.data
      count = 1
    })
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

  await api.post("https://genesis.datatrained.com/api/admin/pending-completed-submissions?page=" + current, { user_id: u_id, approval: 0 }).then((response) => {
    data.submissions = response.data.data.data;
    data.from = response.data.data.from;
    data.to = response.data.data.to;
    data.total = response.data.data.total
    count = 1
    Loading.hide();
  }).finally(() => {
    count = 1
  })
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get('course').then((res) => {
    data.courses = res.data.course
  }).finally(() => {
    api.post('pending-completed-submissions', { user_id: u_id, approval: 0 }).then((response) => {
      data.submissions = response.data.data.data;
      data.submissions.forEach((submission) => {
        accordionId.push({ id: submission.id, flag: false })
      })
      convertCourseCode(data.submissions)
      data.from = response.data.data.from;
      data.to = response.data.data.to;
      data.total = response.data.data.total;
      data.last_page = response.data.data.last_page;
      Loading.hide()
    });
  })

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('assessment')) {
      state[key] = true
    }
  });

  function checkEvent(keys) {
    return keys.includes('assessment');
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
    font-weight: 600;

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
</style>
