<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5>MY ASAF Forms</h5>
            <q-btn label="Fill New Form" @click="fullHeight = true" class="create-btn"></q-btn>
          </div>

          <q-dialog maximized v-model="fullHeight" persistent style="padding: 0;" full-height position="right">
            <q-card class="createNew" style="background-color: #fafafa">
                <q-form class="q-gutter-xs" @submit="addASAFForm" @reset="onReset">
              <q-card-section class="q-pa-none">
                <div class="row q-pa-md" style="justify-content:space-between">
                  <span class="text-h6 w600">Fill New ASAF Form</span>
                  <q-btn icon="close" dense flat v-close-popup />
                </div>
                <div>
                  <q-separator color="primary" />
                </div>
                <div class="q-pa-md">
                  <q-card class="shadowBoder">
                    <div>
                      <div class="row">
                        <div class="col-md-4">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Customer Name
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.customerName" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>
                        <div class="col-md-4">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Customer Email
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.customerEmail" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>
                        <div class="col-md-4">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Customer Phone
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.customerPhone" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>

                      </div>
                      <div class="row">
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Customer Gender
                          </label>
                          <q-select :options="genderOption" dense outlined v-model="fillForm.gender" color="secondary"
                            class="col-md-6 q-pr-md" emit-value map-options>
                          </q-select>
                        </div>
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Customer Age
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.customerAge" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Customer City
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.customerCity" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>

                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Customer Current CTC
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.customerCurrentCTC" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>
                      </div>
                    </div>
                  </q-card>
                  <q-card class="q-mt-sm shadowBoder">
                    <div>
                      <div class="row">
                        <div class="col-md-6 q-pb-md">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Course
                          </label>
                          <q-select dense outlined color="secondary" clearable :options="data.filteredCourses"
                            option-label="title" option-value="id" v-model="fillForm.course" lazy-rules
                            :popup-content-style="{ width: '400px', height: '70%' }"
                            :rules="[val => val !== null || 'Please Enter Batch Course']" use-input @filter="filterFn"
                            class="col-md-6 q-pr-md" emit-value map-options />
                        </div>
                        <div class="col-md-6">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            If Any Other Course
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.otherCourse" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Fill News Title']" />
                        </div>


                      </div>
                      <div class="row">
                        <div class="col-md-4">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Campaign Source
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.campaignSource" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>
                        <div class="col-md-4">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Course Format
                          </label>
                          <q-select :options="courseFormatOption" dense outlined v-model="fillForm.courseFormat"
                            color="secondary" class="col-md-6 q-pr-md" emit-value map-options>
                          </q-select>
                        </div>
                        <div class="col-md-4">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Joining Batch
                          </label>
                          <q-select :options="options" dense outlined v-model="fillForm.status" color="secondary"
                            class="col-md-6 q-pr-md" emit-value map-options>
                          </q-select>
                        </div>

                      </div>
                    </div>
                  </q-card>
                  <q-card class="q-mt-sm shadowBoder">
                    <div>
                      <div class="row">
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Sale Type
                          </label>
                          <q-select :options="saleTypeOption" dense outlined v-model="fillForm.saleType" color="secondary"
                            class="col-md-6 q-pr-md" emit-value map-options>
                          </q-select>
                        </div>
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Lead Registration Month
                          </label>
                          <q-input dense outlined color="secondary" type="month" class="col-md-6 q-pr-md"
                            v-model="fillForm.leadRegistrationMonth" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Booking Amount
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.bookingAmount" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Mode of Payment
                          </label>
                          <q-select :options="modeOfPaymentOption" dense outlined v-model="fillForm.modeOfPayment"
                            color="secondary" class="col-md-6 q-pr-md" emit-value map-options>
                          </q-select>
                        </div>
                      </div>
                      <div class="row q-pb-md">
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Currency
                          </label>
                          <q-select :options="currencyOption" dense outlined v-model="fillForm.currency" color="secondary"
                            class="col-md-6 q-pr-md" emit-value map-options>
                          </q-select>
                        </div>
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Total Program Fee + GST
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.programFeeWithGST" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Total Fee with Discount + GST
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.discountedProgramFeeWithGST" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Payment Plan
                          </label>
                          <q-select :options="paymentPlanOption" dense outlined v-model="fillForm.paymentPlan"
                            color="secondary" class="col-md-6 q-pr-md" emit-value map-options>
                          </q-select>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            No of EMIs/Installments
                          </label>
                          <q-select :options="numberOFEmiOption" :popup-content-style="{ height: '50%' }" dense outlined
                            v-model="fillForm.noOfEmi" color="secondary" class="col-md-6 q-pr-md" emit-value map-options>
                          </q-select>
                        </div>
                        <div class="col-md-3">
                          <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                            Payment Email ID
                          </label>
                          <q-input dense outlined color="secondary" class="col-md-6 q-pr-md"
                            v-model="fillForm.paymentEmailID" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                        </div>
                        <div class="col-6">
                          <label class="col-md-12 head-color q-pa-xs" style="font-weight: 600">
                            Payment Screenshot Image
                          </label>
                          <div class="col-md-6">
                            <div class="row">
                              <q-file dense square outlined ref="fileInput" class=" col-md-9"
                                label="Choose File: Image Size : [400px x 400px]" v-model="fillForm.file" lazy-rules />
                              <q-btn class="col-md-3  browes-btn" label="browse" @click="$refs.fileInput.$el.click();" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-card>
                </div>
              </q-card-section>

              <q-card-section class="q-pa-none">
                <div class="q-py-sm">
                  <q-separator />
                </div>
                <div class="row q-pa-md bg-white" style="justify-content: space-between;">
                  <q-btn outline label="Clear" type="reset" />
                  <q-btn color="primary" type="submit" label="Submit Form" />
                </div>
              </q-card-section>
            </q-form>
            </q-card>

          </q-dialog>

          <div class="table-container shadowBoder">
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th scope="col">#</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Email</th>
                  <th scope="col">Pending NRV</th>
                  <th scope="col">Pending GMV</th>
                  <th scope="col">Student Submission</th>
                  <th scope="col">After Sales Approved</th>

                  <th scope="col">Ticket ID</th>
                  <!-- <th v-if="state.edit || state.status" scope="col">Action</th> -->
                </tr>
              </thead>
              <!-- <tbody>
                  <tr v-for="series in data.series" :key="series.id">
                    <td>{{ count++ }}</td>
                    <td>
                      {{ series.name }}
                    </td>
                    <td v-if="state.edit || state.status" style="width: 20px">
                      <div>
                        <q-fab flat color="grey-9" icon="settings" direction="left" padding="sm">
                          <q-fab-action v-if="state.edit" @click="EditSeries(series.id)" color="primary" text-color="white" icon="edit">
                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                              transition-hide="scale">Edit</q-tooltip>
                          </q-fab-action>

                        </q-fab>
                      </div>
                    </td>
                  </tr>
                </tbody> -->
            </table>
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
const fullHeight = ref(false);
const router = useRouter();

const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
})

let count = 1;

const courseFormatOption = ['Self Placed', 'VILT (Virtual Instructor Led Training)']
const saleTypeOption = ['Domestic', 'International']
const genderOption = ['Male', 'Female', 'other']
const currencyOption = ['Indian Rupee', 'United Sates Dollars', 'Euro']
const modeOfPaymentOption = ['Paid online via RazorPay', ' Google Pay', 'Phone Pay', ' PayTm'];
const joiningBatch = []
const numberOFEmiOption = [3, 6, 9, 12, 18, 20, 24, 31, 36];
const paymentPlanOption = ['Data Trained EMI', 'Loan', 'International Loan', 'Jodo', 'One Shot Payment'];

const fillForm = reactive({
  course: null,
  otherCourse: null,
  courseFormat: null,
  campaignSource: null,
  saleType: null,
  paymentEmailID: null,
  customerName: null,
  customerEmail: null,
  customerPhone: null,
  gender: null,
  customerCurrentCTC: null,
  customerAge: null,
  customerCity: null,
  currency: null,
  programFeeWithGST: null,
  discountedProgramFeeWithGST: null,
  leadRegistrationMonth: null,
  bookingAmount: null,
  modeOfPayment: null,
  noOfEmi: null,
  paymentPlan: null,
  file: null,
  FormData: null,
});

const onReset = () => {
  fillForm.course = '';
  fillForm.otherCourse = '';
  fillForm.courseFormat = '';
  fillForm.campaignSource = '';
  fillForm.saleType = '';
  fillForm.paymentEmailID = '';
  fillForm.customerName = '';
  fillForm.customerEmail = '';
  fillForm.customerPhone = '';
  fillForm.customerCurrentCTC = '';
  fillForm.customerAge = '';
  fillForm.gender = '';
  fillForm.customerCity = '';
  fillForm.currency = '';
  fillForm.programFeeWithGST = '';
  fillForm.discountedProgramFeeWithGST = '';
  fillForm.leadRegistrationMonth = '';
  fillForm.bookingAmount = '';
  fillForm.modeOfPayment = '';
  fillForm.noOfEmi = '';
  fillForm.paymentPlan = '';
  fillForm.file = '';
  count = 1;
}

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

const data = reactive({

  courses: [],
  filteredCourses: [],
  id: null,
  FormData: null,
});



onBeforeMount(() => {
  // Loading.show({
  //     spinner: QSpinnerPie,
  //     spinnerColor: 'primary',
  //     messageColor: 'black',
  //     backgroundColor: 'white',
  //     message: 'Loading Page Data. Please Wait!'
  // })

  api.get('course').then((response) => {
    data.courses = response.data.course
    data.filteredCourses = data.courses
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

.browes-btn {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  background-color: #3b49e7;
  color: #fff;

}

.createNew {
  width: 1300px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}
</style>
