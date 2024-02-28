<template>
    <q-page class="q-pa-md">
        <div class="container">
            <div class="heading">
                <div class="head-btn-box shadowBoder">
                    <q-btn flat round color="white" text-color="positive" icon="arrow_back" id="back-btn"
                        to="/manage-users">
                        <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
                            transition-hide="scale">
                            Back to Users
                        </q-tooltip>
                    </q-btn>
                    <h5 class="q-ma-none" id="head-1">Add New User</h5>
                </div>
            </div>
            <div class="table-container shadowBoder" style="background-color: white;">
                <div class="q-pa-md" style="width: auto">
                    <q-form class="q-gutter-xs">
                        <div class="row">
                            <div class="col-6">
                                <label class="q-pa-xs" style="font-weight: 600">
                                    Name *
                                </label>
                                <q-input dense outlined v-model="name" color="secondary" class="q-pr-md" lazy-rules
                                    :rules="[val => val && val.length > 0 || 'Please Enter Event Name']" />
                            </div>
                            <!-- <div class="col-4">
                  <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                    Location *
                  </label>
                  <q-input dense outlined color="secondary" class="col-md-6 q-pr-md" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please Enter Event Mode']" />
                </div> -->
                            <div class="col-6">
                                <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                                    Position *
                                </label>

                                <q-select :options="options" v-model="position" dense outlined color="secondary"
                                    class="col-md-6 q-pr-md" emit-value map-options>
                                </q-select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <label class="q-pa-xs col-md-12" style="font-weight: 600">
                                    Email *
                                </label>
                                <q-input dense outlined v-model="email" color="secondary col-md-12" class="q-pr-md" lazy-rules
                                    :rules="[val => val && val.length > 0 || 'Please Enter Event Name']" />
                            </div>
                            <div class="col-6">
                                <label class="col-md-12 q-pa-xs" style="font-weight: 600">Status</label>
                                <q-select dense outlined color="secondary" :options="options1" v-model="status"
                                    class="col-md-12 q-pr-sm" />
                            </div>
                        </div>
                        <!-- <div class="row">
                <div class="col-4">
                  <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                    Date *
                  </label>
                  <q-input dense outlined type="date" color="secondary" class="col-md-4 q-pr-md"
                    lazy-rules :rules="[val => val && val.length > 0 || 'Please Fill Date']" />
                </div>
                <div class="col-4">
                  <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                    Start Time *
                  </label>
                  <q-input dense outlined type="time" color="secondary" class="col-md-4 q-pr-md"
                    lazy-rules :rules="[val => val && val.length > 0 || 'Please Fill Time']" />
                </div>
                <div class="col-4">
                  <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                    Duration *
                  </label>
                  <q-input dense outlined type="time" class="col-md-4 q-pr-md" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please Fill Duration']" />
                </div>
              </div> -->

                        <div class="row">
                            <div class="col-6">
                                <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                                    Password
                                </label>
                                <q-input dense outlined v-model="password" color="secondary" class="col-md-12 q-pr-md"
                                    dropdown-icon="none" />
                            </div>
                            <div class="col-6">
                                <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                                    Confirm Password
                                </label>
                                <q-input dense outlined v-model="confirmPassword" color="secondary"
                                    class="col-md-12 q-pr-md" dropdown-icon="none" />
                            </div>
                        </div>

                        <!-- <div class="row">
                <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                  Description *
                </label>
                <q-input dense outlined color="secondary" class="col-md-12 q-pr-md"
                  type="textarea" lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Description']" />
              </div> -->

                        <div class="create-event-btn q-pa-md">
                            <q-btn outline label="Reset" type="reset" color="primary" class="q-mr-md" />

                            <q-btn class="submit-btn" label="Create User" type="submit" />
                        </div>
                    </q-form>
                </div>
            </div>
        </div>
    </q-page>
</template>
<script setup>
//   import { useRoute, useRouter } from "vue-router";
import { ref, onBeforeMount, reactive, render } from "vue";
//   import { api } from "../../boot/axios";
//   import { Notify } from 'quasar'

//   const route = useRoute();
//   const router = useRouter();
//   const dialog = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');
const confrimPassword = ref('');
const position = ref(null);
const options = ['KAM', 'Sr. KAM', 'Subject Matter Expert', 'Deputy Team Lead', 'Team Lead', 'Assistant Manager', 'Manager', 'Senior Manager', 'Unit Head', 'Cluster Head', 'Regional Head', 'AVP Sales', 'VP Sales'];
const status = ref(null)
const options1 = ['Active', 'Inactive']
//   const event = reactive({
//     name: null,
//     location: null,
//     date: null,
//     start_time: null,
//     start_time: null,
//     link: null,
//     description: null,
//     status: 1
//   });
//   const addEvent = () => {
//     api.post('add-event', {
//       name: event.name,
//       date: event.date,
//       duration: event.duration,
//       location: event.location,
//       start_time: event.start_time,
//       description: event.description,
//       link: event.link,
//       status: event.status
//     }).then(function (response) {
//       router.push('/all-events')
//       Notify.create({
//         timeout: 2000,
//         position: 'top-right',
//         color: 'green',
//         message: 'Event Added Successfully...'
//       })
//     })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
//   const onReset = () => {
//     event.name = null,
//       event.location = null,
//       event.date = null,
//       event.start_time = null,
//       event.start_time = null,
//       event.link = null,
//       event.description = null
//   }
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
}</style>
  