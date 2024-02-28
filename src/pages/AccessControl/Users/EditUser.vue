<template>
    <q-page class="q-pa-md">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="head-btn-box shadowBoder">
                        <q-btn flat round color="white" text-color="positive" class="q-mr-sm" icon="arrow_back"
                            id="back-btn" to="/manage-users">
                            <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
                                transition-hide="scale">
                                Back to Manage Users
                            </q-tooltip>
                        </q-btn>
                        <h5>Update User Details</h5>
                    </div>
                    <div class="table-container shadowBoder">
                        <div class="q-pa-md" style="width: auto">
                            <q-form class="q-gutter-md">
                                <div class="row">
                                    <div class="col-6">
                                        <label class="q-pa-xs" style="font-weight: 600">Name</label>
                                        <q-input dense outlined color="secondary" v-model="name" class="q-pr-md" />
                                    </div>
                                    <div class="col-6">
                                        <label class="q-pa-xs" style="font-weight: 600">Email Id</label>
                                        <q-input dense outlined color="secondary" v-model="email" class="col-md-12 q-pr-sm" />
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <label class="col-md-12 q-pa-xs" style="font-weight: 600">Account Type</label>
                                        <q-select dense outlined color="secondary" :options="options" v-model="position" class="col-md-6 q-pr-sm" />
                                    </div>
                                    <div class="col-6">
                                        <label class="col-md-12 q-pa-xs" style="font-weight: 600">Status</label>
                                        <q-select dense outlined color="secondary" :options="options1" v-model="status" class="col-md-6 q-pr-sm" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-6">
                                        <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                                            Password
                                        </label>
                                        <q-input dense outlined v-model="password" color="secondary" class="col-md-12 q-pr-md" dropdown-icon="none" />
                                    </div>
                                    <div class="col-6">
                                        <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                                            Confirm Password
                                        </label>
                                        <q-input dense outlined v-model="confirmPassword" color="secondary" class="col-md-12 q-pr-md" dropdown-icon="none" />
                                    </div>
                                </div>
                                <div class="sub-btn">
                                    <q-btn class="submit-btn" label="Update" @click="updateArticle" type="submit" />
                                </div>
                            </q-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { api } from "../../../boot/axios";
import { useRoute, useRouter } from "vue-router";
import { Loading, QSpinnerGears } from 'quasar'
import { Notify } from 'quasar'


const route = useRoute();
const router = useRouter();
const article_id = route.params.id;
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const position = ref(null);
const options = ['KAM', 'Sr. KAM', 'Subject Matter Expert', 'Deputy Team Lead', 'Team Lead', 'Assistant Manager', 'Manager', 'Senior Manager', 'Unit Head', 'Cluster Head', 'Regional Head', 'AVP Sales', 'VP Sales'];
const status = ref(null)
const options1 = ['Active','Inactive']

const fab = ref(false);
let count = 1;
// const data = reactive({
//     article: []
// });
</script>

<style lang="scss" scoped>
.head-btn-box {
    background-color: #fff;
    display: flex;
    align-items: center;
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



.sub-btn {
    display: flex;
    justify-content: flex-end;
}
</style>
