<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box row shadowBoder">
            <h5 id="head-1">Pending Forms</h5>
            <div class="col-8 row" style="justify-content: flex-end">
              <q-select outlined dense label="Search By" class="q-pr-sm col-2" @update:model-value="count = 1" v-model="filterBy"
                :options="filterOptions" />
              <q-input v-if="filterBy == 'Date'" class="col-3 q-pr-sm" dense outlined v-model="dateInput">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="date" range minimal @update:model-value="dateInput = `${date.from}-${date.to}`; count = 1">
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

          <q-dialog maximized style="padding: 0;" persistent v-model="approveModal" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="approveForm">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Approve Customer Form</span>
                    <q-btn icon="close" dense flat @click="count = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="q-pa-md">
                    <q-card class="shadowBoder">
                      <div>
                        <div class="row">
                          <div class="col-7 q-pr-sm" style="align-items: baseline;">
                            <label class="w600 q-pa-xs">
                              Course Name
                            </label>
                            <q-select dense outlined label="Select an option" v-model="data.form.course" use-input
                              clearable emit-value map-options option-label="title" option-value="id" input-debounce="0"
                              :options="data.filterOptions" @filter="filterFn" color="secondary"
                              :popup-content-style="{ width: '385px' }" />
                          </div>
                          <div class="col-5" style="align-items: baseline;">
                            <label class="w600 q-pa-xs">
                              If Any Other Course
                            </label>
                            <q-input dense outlined v-model="data.form.other_course" color="secondary" />
                          </div>
                        </div>
                        <div class="q-mt-md row">
                          <div class="col-5">
                            <label class="w600 q-pa-xs">
                              LMS Registration ID
                            </label>
                            <q-input dense outlined v-model="data.form.lms_id" color="secondary" lazy-rules
                              :rules="[val => val && val.length > 0 || 'Please Enter LMS Registration ID']" />
                          </div>
                          <div class="col-4 q-px-sm">
                            <label class="w600 q-pa-xs">
                              Campaign Source
                            </label>
                            <q-input dense outlined v-model="data.form.campaign_source" color="secondary" />
                          </div>
                          <div class="col-3">
                            <label class="w600 q-pa-xs">
                              Sale Type
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.sale_type" />
                          </div>
                        </div>
                      </div>
                    </q-card>
                    <q-card class="q-mt-sm shadowBoder">
                      <div>
                        <div class="row">
                          <div class="col-6 q-pr-sm" style="align-items: baseline;">
                            <label class="w600 q-pa-xs">
                              Customer Name
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.customer_name" />
                          </div>
                          <div class="col-6" style="align-items: baseline;">
                            <label class="w600 q-pa-xs">
                              Customer Email
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.customer_email" />
                          </div>
                        </div>
                        <div class="row q-mt-md">
                          <div class="col-3">
                            <label class="w600 q-pa-xs">
                              Customer Phone
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.customer_phone" />
                          </div>
                          <div class="col-3 q-px-sm">
                            <label class="w600 q-pa-xs">
                              Customer Gender
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.customer_gender" />
                          </div>
                          <div class="col-3 q-pr-sm">
                            <label class="w600 q-pa-xs">
                              Customer Age
                            </label>
                            <q-input dense type="number" outlined color="secondary" v-model="data.form.customer_age" />
                          </div>
                          <div class="col-3">
                            <label class="w600 q-pa-xs">
                              Customer City
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.customer_city" />
                          </div>
                        </div>
                        <div class="row q-mt-md">
                          <div class="col-4">
                            <label class="w600 q-pa-xs">
                              Customer Current CTC
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.customer_current_ctc" />
                          </div>
                          <div class="col-3 q-px-sm">
                            <label class="w600 q-pa-xs">
                              Currency
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.currency" />
                          </div>
                          <div class="col-5">
                            <label class="w600 q-pa-xs">
                              Joining Batch
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.joining_batch" />
                          </div>
                        </div>
                      </div>
                    </q-card>
                    <q-card class="q-mt-sm shadowBoder">
                      <div>
                        <div class="row">
                          <div class="col-4">
                            <label class="w600 q-pa-xs">
                              Total Program Fee including GST
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.total_fee_gst" />
                          </div>
                          <div class="col-5 q-px-sm">
                            <label class="w600 q-pa-xs">
                              Total Fee after Discount including GST
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.total_fee_discount_gst" />
                          </div>
                          <div class="col-3">
                            <label class="w600 q-pa-xs">
                              Lead Registration Month
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.lead_registration_month" />
                          </div>

                        </div>
                        <div class="row q-mt-md">
                          <div class="col-3">
                            <label class="w600 q-pa-xs">
                              Booking Amount
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.booking_amount" />
                          </div>
                          <div class="col-4 q-px-sm">
                            <label class="w600 q-pa-xs">
                              Mode Of Payment
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.mode_of_payment" />
                          </div>
                          <div class="col-3 q-pr-sm">
                            <label class="w600 q-pa-xs">
                              Payment Plan
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.payment_plan" />
                          </div>
                          <div class="col-2">
                            <label class="w600 q-pa-xs">
                              No. Of EMIs
                            </label>
                            <q-input dense outlined color="secondary" v-model="data.form.no_of_emis" />
                          </div>
                        </div>
                        <div class="row q-mt-md">
                          <div class="col-6 q-pr-sm">
                            <label class="w600 q-pa-xs">
                              Call Recording
                            </label>
                            <q-file dense outlined color="secondary" label="Choose File"
                              v-model="data.form.call_recording" />
                          </div>
                          <div class="col-6">
                            <label class="w600 q-pa-xs">
                              Video
                            </label>
                            <q-file dense outlined color="secondary" label="Choose File" v-model="videoPath" />
                          </div>
                        </div>
                      </div>
                    </q-card>
                    <q-card class="q-mt-sm shadowBoder">
                      <div>
                        <div class="row">
                          <div class="col-6 row">
                            <q-checkbox class="col-12" val="1" v-model="validation" label="Student Detail's Matched" />
                            <q-checkbox class="col-12" val="2" v-model="validation"
                              label="Student Detail's Confirmed with Students" />
                            <q-checkbox class="col-12" val="3" v-model="validation" label="LOE Sent" />
                            <q-checkbox class="col-12" val="4" v-model="validation" label="LMS Created" />
                          </div>
                          <div class="col-6 row">
                            <q-checkbox class="col-12" val="5" v-model="validation"
                              label="Batch Alloted / Set to Future Admission" />
                            <q-checkbox class="col-12" val="6" v-model="validation" label="Onboarding Call Done" />
                            <q-checkbox class="col-12" val="7" v-model="validation" label="NPE" />
                            <q-checkbox class="col-12" val="8" v-model="validation" label="NPF Notes Added" />
                          </div>
                        </div>
                        <div class="q-mt-md">
                          <label class="w600 q-pa-xs">
                            Notes
                          </label>
                          <q-input type="textarea" dense outlined color="secondary" v-model="data.form.note" />
                        </div>
                      </div>
                    </q-card>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none sticky-footer">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: flex-end;">
                    <q-btn color="primary" label="Approve" type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th scope="col" class="text-center">#</th>
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
                  <th scope="col">Submission</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="data in data.forms">
                  <td class="text-center"> {{ count++ }} </td>
                  <td>
                    <q-icon name="person" size="xs" color="primary" class="q-mr-xs" title="Customer Name" /> {{
                      data.customer_name }} <br>
                    <q-icon name="mail" size="xs" color="primary" class="q-mr-xs" title="Customer Email" /> {{
                      data.customer_email }} <br>
                    <q-icon name="confirmation_number" size="xs" color="primary" class="q-mr-xs" title="Ticket ID" /> {{
                      data.ticket_id }}
                  </td>
                  <td>
                    <b>Amount : &nbsp;</b> {{ data.booking_amount }} <br>
                    <b>Type : &nbsp;</b> {{ data.sale_type }} <br>
                    <b>Paid via : &nbsp;</b> {{ data.mode_of_payment }}
                  </td>
                  <td>
                    <b>Fee with GST : &nbsp;</b> {{ data.total_fee_discount_gst }} <b>[ {{ data.currency }} ]</b> <br>
                    <b>Payment Plan : &nbsp;</b> {{ data.payment_plan }} <br>
                    <b>No of EMIs : &nbsp;</b> {{ data.no_of_emis }} <br>
                  </td>
                  <td>
                    <b>Sold By : &nbsp;</b>{{ data.sold_by }} <br>
                    <b>Agent : &nbsp;</b> {{ data.after_sales_agent }} <br>
                    <b>Date : &nbsp;</b> {{ data.created_at }}
                  </td>
                  <!-- <td> {{ data.course }} </td> -->
                  <td class="text-center">
                    <q-btn outline label="Copy ASAF Link" icon-right="content_copy" class="q-mb-xs" size="sm"
                      @click="copyLink(course = data.course, type = data.payment_plan, ticket_id = data.ticket_id, sale_type = data.sale_type)"
                      color="secondary" />
                    <br>
                    <q-btn outline color="green" icon-right="outgoing_mail" label="Send ASAF Mail" size="sm"
                      @click="resendMail(id = data.id)" />
                  </td>
                  <td class="text-center">
                    <div v-if="data.after_sales_done == 0">
                      <q-btn push label="Pending" class="q-mb-xs" size="md" icon-right="pending_actions" disable
                        color="red" />
                      <br>
                    </div>
                    <q-btn v-else push color="green" icon-right="how_to_reg" @click="openApproveModal(id = data.id)"
                      label="Approve" size="md" />
                  </td>
                </tr>
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
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
let upArrow = ref(true);
const u_id = LocalStorage.getItem('u_id')
const u_email = LocalStorage.getItem('email')
const access = LocalStorage.getItem('access_key')
const filterOptions = ['Email', 'Date']
const state = reactive({
  create: ref(false),
})
const current = ref(1)
const text = ref('')
const filterBy = ref('Email')
const date = ref({from: '2024/01/23', to: '2024/01/30'})
const dateInput = ref(`${date.value.from}-${date.value.to}`)
const showElement = ref(true)
let count = 1
const videoPath = ref(null)
const validation = ref([])
const approveModal = ref(false)
const data = reactive({
  forms: [],
  form: [],
  courses: [],
  filterOptions: [],
  from: '',
  to: '',
  total: '',
  last_page: '',
  FormData: null
});

const sortTable = (field, direction) => {
  if (direction == 'asc') {
    upArrow = false;
    count = 1;
    switch (field) {
      case field:
        data.forms.sort((a, b) => {
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
        data.forms.sort((a, b) => {
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

const approveForm = () => {
  if (validation.value.length == 8) {
    data.FormData = new FormData;
    data.FormData.append('course', data.form.course)
    data.FormData.append('other_course', data.form.other_course)
    data.FormData.append('campaign_source', data.form.campaign_source)
    data.FormData.append('sale_type', data.form.sale_type)
    data.FormData.append('customer_name', data.form.customer_name)
    data.FormData.append('customer_email', data.form.customer_email)
    data.FormData.append('customer_phone', data.form.customer_phone)
    data.FormData.append('customer_gender', data.form.customer_gender)
    data.FormData.append('customer_current_ctc', data.form.customer_current_ctc)
    data.FormData.append('customer_age', data.form.customer_age)
    data.FormData.append('customer_city', data.form.customer_city)
    data.FormData.append('currency', data.form.currency)
    data.FormData.append('total_fee_gst', data.form.total_fee_gst)
    data.FormData.append('total_fee_discount_gst', data.form.total_fee_discount_gst)
    data.FormData.append('lead_registration_month', data.form.lead_registration_month)
    data.FormData.append('booking_amount', data.form.booking_amount)
    data.FormData.append('mode_of_payment', data.form.mode_of_payment)
    data.FormData.append('joining_batch', data.form.joining_batch)
    data.FormData.append('payment_plan', data.form.payment_plan)
    data.FormData.append('no_of_emis', data.form.no_of_emis)
    data.FormData.append('approved', 1)
    data.FormData.append('call_recording', data.form.call_recording)
    data.FormData.append('video', videoPath.value)
    data.FormData.append('onboarding', 1)
    data.FormData.append('lms_id', data.form.lms_id)
    data.FormData.append('note', data.form.note)
    data.FormData.append('approved_by', u_email)

    api.post('approve-asaf-form', data.FormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'green',
        message: res.data.msg
      });
      approveModal.value = false
      api.post("approved-pending-forms", { user_id: u_id, approval: 0 }).then(response => {
        data.forms = response.data.data.data;
        count = 1
        Loading.hide()
      })
    }).catch((err) => {
      console.log('Error', err)
    })
  } else {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: 'All Checkboxes must be checked before Approval'
    });
  }
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

const copyLink = (course, type, ticket_id, sale_type) => {
  if (course == 51) {
    course = 'ib'
  } else {
    course = 'ds'
  }
  if (type == 'Loan') {
    type = 'loan'
  } else {
    type = 'dt-emi'
  }
  let url = `https://forms.datatrained.com/onboarding/students/${course}/${type}/10k?tid=${ticket_id}&type=${sale_type}`
  navigator.clipboard.writeText(url).then(() => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
      message: "Form Link Successfully Copied To The Clipboard !"
    })
  })
}

const filterFn = (val, update) => {
  update(() => {
    if (val === '') {
      data.filterOptions = data.courses
    }
    else {
      const needle = val.toLowerCase()
      data.filterOptions = data.courses.filter(
        v => v.toLowerCase().indexOf(needle) > -1
      )
    }
  })
}

const openApproveModal = (id) => {
  api.get('course').then((res) => {
    data.courses = res.data.course
    data.filterOptions = data.courses
  })
  api.get('edit-asaf-form', { params: { id: id } }).then((res) => {
    data.form = res.data.data
    data.form.course = Number(data.form.course)
    approveModal.value = true
    count = 1
  })
}

const filterByEmail = () => {
  if (text.value.length >= 3) {
    api.post('approved-pending-forms', { user_id: u_id, approval: 0, email: text.value }).then((res) => {
      data.forms = res.data.data.data
      count = 1
    })
    showElement.value = false;
  }
  else {
    api.post('approved-pending-forms', { user_id: u_id, approval: 0 }).then((res) => {
      data.forms = res.data.data.data
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

  await api.post("https://genesis.datatrained.com/api/admin/approved-pending-forms?page=" + current, { user_id: u_id, approval: 0 }).then((response) => {
    data.forms = response.data.data.data;
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

  api.post("approved-pending-forms", { user_id: u_id, approval: 0 }).then(response => {
    data.forms = response.data.data.data;
    data.from = response.data.data.from;
    data.last_page = response.data.data.last_page;
    data.to = response.data.data.to;
    data.total = response.data.data.total
    Loading.hide()
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
.sticky-footer{
  position: sticky;
  bottom: 0px;
  background: white;
}
.createNew {
  width: 1100px;
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
