<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box row shadowBoder">
            <h5 id="head-1">Approved Forms</h5>
            <div class="col-8 row" style="justify-content: flex-end">
              <q-select outlined dense label="Search By" class="q-pr-sm col-2" @update:model-value="count = 1"
                v-model="filterBy" :options="filterOptions" />
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
                  <th scope="col">Approved By</th>
                  <!-- <th scope="col">Course Name</th> -->
                  <th scope="col">Action</th>
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
                    <b>Paid via : &nbsp;</b> {{ data.mode_of_payment }} <br>
                    <b>Type : &nbsp;</b> {{ data.sale_type }}
                  </td>
                  <td>
                    <b>Fee with GST : &nbsp;</b> {{ data.total_fee_discount_gst }} <b>[ {{ data.currency }} ]</b> <br>
                    <b>Payment Plan : &nbsp;</b> {{ data.payment_plan }} <br>
                    <b>No of EMIs : &nbsp;</b> {{ data.no_of_emis }} <br>
                    <!-- <b>Currency : &nbsp;</b> {{ data.currency }} -->
                  </td>
                  <td>
                    <b>Seller : &nbsp;</b>{{ data.sold_by }} <br>
                    <b>Agent : &nbsp;</b> {{ data.after_sales_agent }} <br>
                    <b>Date : &nbsp;</b>{{ data.created_at }}
                  </td>
                  <td> {{ data.approved_by }} </td>
                  <!-- <td> {{ data.course }} </td> -->
                  <td class="text-center">
                    <a :href="data.call_recording" download="Call Recording">
                      <q-btn outline dense round type="button" color="primary" icon="download">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Download Call Recording</q-tooltip>
                      </q-btn>
                    </a>
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
const text = ref('')
const u_id = LocalStorage.getItem('u_id')
const access = LocalStorage.getItem('access_key')
const filterOptions = ['Email', 'Date']
const state = reactive({
  create: ref(false),
})
const filterBy = ref('Email')
const date = ref({from: '2024/01/23', to: '2024/01/30'})
const dateInput = ref(`${date.value.from}-${date.value.to}`)
const showElement = ref(true)
const current = ref(1)
let count = 1
const data = reactive({
  forms: [],
  from: '',
  to: '',
  total: '',
  last_page: ''
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

const filterByEmail = () => {
  if (text.value.length >= 3) {
    api.post('approved-pending-forms', { user_id: u_id, approval: 1, email: text.value }).then((res) => {
      data.forms = res.data.data.data
      count = 1
    })
    showElement.value = false;
  }
  else {
    api.post('approved-pending-forms', { user_id: u_id, approval: 1, email: text.value }).then((res) => {
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

  await api.post("https://genesis.datatrained.com/api/admin/approved-pending-forms?page=" + current, { user_id: u_id, approval: 1 }).then((response) => {
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

  api.post("approved-pending-forms", { user_id: u_id, approval: 1 }).then(response => {
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

.createNew {
  width: 600px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
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
