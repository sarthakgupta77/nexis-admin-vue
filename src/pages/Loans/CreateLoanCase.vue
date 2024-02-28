<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="heading">
        <div class="head-btn-box shadowBoder">
          <q-btn flat round color="white" text-color="positive" icon="arrow_back" id="back-btn" to="/all-applications">
            <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
              transition-hide="scale">
              Back to All Applications
            </q-tooltip>
          </q-btn>
          <h5 class="q-ma-none" id="head-1">Create Loan Case</h5>
        </div>
      </div>
      <div class="table-container shadowBoder" style="background-color: white;">
        <div class="q-pa-md" style="width: auto">
          <q-form class="q-gutter-xs">
            <div class="row q-py-sm">
              <div class="col-4 row q-px-sm">
                <label class="col-12 q-px-sm w600">Full Name*</label>
                <q-input dense outlined class="col-12" v-model="fullName" />
              </div>
              <div class="col-4 q-px-sm row">
                <label class="col-12 q-px-sm w600">Sales Agent*</label>
                <q-select dense outlined class="col-12" :options="agents" v-model="salesAgent" />
              </div>
              <div class="col-4 q-px-sm row">
                <label class="col-12 q-px-sm w600">Email*</label>
                <q-input dense outlined class="col-12" v-model="email" />
              </div>
            </div>
            <div class="row q-py-sm">
              <div class="col-4 row q-px-sm">
                <label class="col-12 q-px-sm w600">Phone*</label>
                <q-input dense outlined class="col-12" v-model="phoneNumber" />
              </div>
              <div class="col-4 q-px-sm row">
                <label class="col-12 q-px-sm w600">PAN Number*</label>
                <q-input dense outlined class="col-12" v-model="panNumber" />
              </div>
              <div class="col-4 q-px-sm row">
                <label class="col-12 q-px-sm w600">Date Of Birth*</label>
                <q-input outlined class="col-12" dense v-model="date">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row q-py-sm">
              <div class="col-4 row q-px-sm">
                <label class="col-12 q-px-sm w600">Loan Amount*</label>
                <q-input dense outlined class="col-12" v-model="loanAmount" />
              </div>
              <div class="col-4 q-px-sm row">
                <label class="col-12 q-px-sm w600">Number of EMIs*</label>
                <q-input v-model.number="numOfEMIs" class="col-12" type="number" outlined dense />
              </div>
              <div class="col-2 q-px-sm row">
                <label class="col-12 q-px-sm w600">Batch Start Month*</label>
                <q-select dense outlined class="col-12" :options="months" v-model="batchStartMonth" />
              </div>
              <div class="col-2 q-px-sm row">
                <label class="col-12 q-px-sm w600">Batch Start Year*</label>
                <q-select dense outlined class="col-12" :options="years" v-model="batchStartYear" />
              </div>
            </div>
            <div class="row q-py-sm">
              <div class="col-6 row q-px-sm">
                <label class="col-12 q-px-sm w600">Current Monthly Salary*</label>
                <q-input dense outlined class="col-12" v-model="currMonthlySalary" />
              </div>
              <div class="col-6 row q-px-sm">
                <label class="col-12 q-px-sm w600">EMI Start Month*</label>
                <q-select dense outlined class="col-12" :options="monthsYears" v-model="emiStartMonth" />
              </div>
            </div>
            <div class="row q-py-sm">
              <div class="col-6 row q-px-sm">
                <label class="col-12 q-px-sm w600">Permanent Address*</label>
                <q-input dense outlined class="col-12" v-model="permAddress" />
              </div>
              <div class="col-6 row q-px-sm">
                <label class="col-12 q-px-sm w600">Correspondence Address*</label>
                <q-input dense outlined class="col-12" v-model="currAddress" />
              </div>
            </div>
            <div class="row q-py-sm">
              <div class="col-4 row q-px-sm">
                <label class="col-12 q-px-sm w600">Adhaar Card(Front)*</label>
                <q-file class="col-12" dense outlined v-model="adhaarFront" label="Choose File" />
              </div>
              <div class="col-4 row q-px-sm">
                <label class="col-12 q-px-sm w600">Adhaar Card(Back)*</label>
                <q-file class="col-12" dense outlined v-model="adhaarBack" label="Choose File" />
              </div>
              <div class="col-4 row q-px-sm">
                <label class="col-12 q-px-sm w600">PAN*</label>
                <q-file class="col-12" dense outlined v-model="panCard" label="Choose File" />
              </div>
            </div>
            <div class="row q-py-sm">
              <div class="col-4 row q-px-sm">
                <label class="col-12 q-px-sm w600">Salary Slip*</label>
                <q-file class="col-12" dense outlined v-model="salarySlip" label="Choose File" />
              </div>
              <div class="col-4 row q-px-sm">
                <label class="col-12 q-px-sm w600">Bank Statement*</label>
                <q-file class="col-12" dense outlined v-model="bankStatement" label="Choose File" />
              </div>
              <div class="col-4 row q-px-sm">
                <label class="col-12 q-px-sm w600">Invoice*</label>
                <q-file class="col-12" dense outlined v-model="invoice" label="Choose File" />
              </div>
            </div>
            <div class="row q-py-sm">
              <div class="col-12 row q-px-sm">
                <label class="col-12 q-px-sm w600">Notes*</label>
                <q-input class="col-12" v-model="notes" outlined dense type="textarea" />
              </div>
            </div>
            <div class="create-event-btn q-pa-sm">
              <q-btn outline label="Reset" type="reset" color="primary" class="q-mr-md" />

              <q-btn class="submit-btn" label="Create Event" type="submit" />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
// import { useRoute, useRouter } from "vue-router";
import { ref, onBeforeMount, reactive} from "vue";
// import { api } from "../../boot/axios";
// import { Notify } from 'quasar'

const fullName = ref('')
const salesAgent = ref(null)
const agents = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
const email = ref('')
const phoneNumber = ref('')
const panNumber = ref('')
const date = ref('2023/10/19')
const loanAmount = ref('')
const numOfEMIs = ref()
const batchStartMonth = ref(null)
const batchStartYear = ref(null)
const months = agents
const years = agents
const currMonthlySalary = ref('')
const emiStartMonth = ref(null)
const monthsYears = agents
const permAddress = ref('')
const currAddress = ref('')
const adhaarFront = ref(null)
const adhaarBack = ref(null)
const panCard = ref(null)
const salarySlip = ref(null)
const bankStatement = ref(null)
const invoice = ref(null)
const notes = ref('')
// const route = useRoute();
// const router = useRouter();
// const dialog = ref(false);
// const options = [
//   {
//     label: 'Active',
//     value: 1,
//   },
//   {
//     label: 'Inactive',
//     value: 0
//   }
// ];

// const event = reactive({
//   name: null,
//   location: null,
//   date: null,
//   start_time: null,
//   start_time: null,
//   link: null,
//   description: null,
//   status: 1
// });
// const addEvent = () => {
//   api.post('add-event', {
//     name: event.name,
//     date: event.date,
//     duration: event.duration,
//     location: event.location,
//     start_time: event.start_time,
//     description: event.description,
//     link: event.link,
//     status: event.status
//   }).then(function (response) {
//     router.push('/all-events')
//     Notify.create({
//       timeout: 2000,
//       position: 'top-right',
//       color: 'green',
//       message: 'Event Added Successfully...'
//     })
//   })
//     .catch(function (error) {
//       console.log(error);
//     });
// }
// const onReset = () => {
//   event.name = null,
//     event.location = null,
//     event.date = null,
//     event.start_time = null,
//     event.start_time = null,
//     event.link = null,
//     event.description = null
// }
</script>

<style lang="scss" scoped>
.head-btn-box {
  width: auto;
  background-color: #fff;
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  #back-btn:hover {
    color: #7b94e6 !important;
  }

  .container {
    width: auto;
    height: 100%;
  }

  .table-container {
    background-color: #fff;
    width: auto;
  }
}
</style>
