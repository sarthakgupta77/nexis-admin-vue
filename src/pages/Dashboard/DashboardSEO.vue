<template>
  <q-page class="q-pa-md page-color">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="q-mb-sm">
            <h5 class="q-my-sm w600">Dashboard</h5>
            <span>Dashboard &gt; <span style="color: #0288d1">SEO</span></span>
          </div>
          <div class="row">
            <div class="col-12 col">
              <div class="row">
                <div class="col-4 q-pr-lg">
                  <q-card class="q-pa-md btn-seo">
                    <div class="row" style="justify-content: space-between">
                      <div class="row">
                        <span class="material-symbols-outlined q-pa-md card1-icon-seo">layers</span>
                        <div class="q-pl-md">
                          <span class="card-heading-seo">Total Pages</span><br />
                          <span class="w600 card-number-seo ">
                            {{ data.pageRecords }}</span>
                        </div>
                      </div>
                      <div>
                        <span class="material-symbols-outlined card1-side-icon-seo">monitoring</span>
                      </div>
                    </div>
                    <div class="row card-common-css-seo">
                      <q-btn class="q-mt-md card1-btn-seo" to="/upcoming-batches" flat>
                        View All
                        <span class="material-symbols-outlined view-arrow-seo">
                          arrow_forward
                        </span>
                      </q-btn>
                      <div>
                        <span class="q-pr-sm lastMonth-common-seo w600">{{
                          data.pagesLastmonth
                        }}</span>
                        <br />
                        <span class="last-month-seo">LastMonth</span>
                      </div>
                    </div>
                  </q-card>
                </div>
                <div class="col-4 q-pr-lg">
                  <q-card class="q-pa-md btn1-seo">
                    <div class="row" style="justify-content: space-between">
                      <div class="row">
                        <span class="material-symbols-outlined q-pa-md card2-icon-seo">book</span>
                        <div class="q-pl-md">
                          <span class="card-heading-seo">Course</span><br />
                          <span class="w600 card-number-seo ">{{
                            data.courseRecords
                          }}</span>
                        </div>
                      </div>
                      <div>
                        <span class="material-symbols-outlined card2-side-icon-seo">monitoring</span>
                      </div>
                    </div>
                    <div class="row card-common-css-seo">
                      <q-btn class="q-mt-md card2-btn-seo" flat>
                        View All
                        <span class="material-symbols-outlined view-arrow-seo">
                          arrow_forward
                        </span>
                      </q-btn>
                      <div>
                        <span class="q-pr-sm lastMonth-common-seo w600">{{
                          data.courseLastmonth
                        }}</span>
                        <br />
                        <span class="last-month-seo">LastMonth</span>
                      </div>
                    </div>
                  </q-card>
                </div>
                <div class="col-4">
                  <q-card class="q-pa-md btn2-seo">
                    <div class="row" style="justify-content: space-between">
                      <div class="row">
                        <span class="material-symbols-outlined q-pa-md card3-icon-seo">library_books</span>
                        <div class="q-pl-md">
                          <span class="card-heading-seo">Course Secondary</span><br />
                          <span class="w600 card-number-seo ">{{
                            data.courseSecondaryRecords
                          }}</span>
                        </div>
                      </div>
                      <div>
                        <span class="material-symbols-outlined card3-side-icon-seo">monitoring</span>
                      </div>
                    </div>
                    <div class="row card-common-css-seo">
                      <q-btn class="q-mt-md card3-btn-seo" to="/all-articles" flat>
                        View All
                        <span class="material-symbols-outlined view-arrow-seo">
                          arrow_forward
                        </span>
                      </q-btn>
                      <div>
                        <span class="q-pr-sm lastMonth-common-seo w600">{{
                          data.courseSecondarylastMonth
                        }}</span>
                        <br />
                        <span class="last-month-seo">LastMonth</span>
                      </div>
                    </div>
                  </q-card>
                </div>
              </div>
            </div>
          </div>

          <div class="q-mt-lg">
            <div class="row">
              <div class="col-6 q-pr-lg">
                <q-card>
                  <div>
                    <q-toolbar class="shadow-2">
                      <h6 class="q-ma-none w600">Courses</h6>

                      <q-space />
                      <q-tabs v-model="tab" :breakpoint="0" shrink stretch align="justify" style="color: rgb(41 183 229)">
                        <q-tab name="tab1" label="Courses" />
                        <q-tab name="tab2" label="Secondary Courses" />
                      </q-tabs>
                    </q-toolbar>
                    <q-separator />
                  </div>
                  <q-tab-panels v-model="tab" animated swipeable>
                    <q-tab-panel name="tab1" style="padding: 0">
                      <q-markup-table class="table-height-seo">
                        <thead class="head-color-seo">
                          <tr>

                            <th class="text-left w500">
                              Course
                              <q-icon name="book" style="font-size: 20px; padding-left: 7px"></q-icon>
                            </th>
                            <th class="text-left w500">
                              Name
                              <q-icon name="person" style="font-size: 20px; padding-left: 7px"></q-icon>
                            </th>
                            <th class="text-left w500">
                              Date
                              <q-icon name="article" style="font-size: 20px; padding-left: 7px"></q-icon>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="course in data.courses">

                            <td>
                              <div class="wrap-title">
                                {{ course.title }}
                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                  transition-show="scale" transition-hide="scale">
                                  {{ course.title }}
                                </q-tooltip>
                              </div>
                            </td>
                            <td>John Doe</td>
                            <td>
                              <q-badge outline class="course-date-seo">{{ course.updated_at }}
                              </q-badge>
                            </td>
                          </tr>
                        </tbody>
                      </q-markup-table>
                    </q-tab-panel>


                    <q-tab-panel name="tab2" style="padding: 0">
                      <q-markup-table class="table-height-seo">
                        <thead class="head-color-seo">
                          <tr>

                            <th class="text-left w500">
                              Course
                              <q-icon name="book" style="font-size: 20px; padding-left: 7px"></q-icon>
                            </th>
                            <th class="text-left w500">
                              Name
                              <q-icon name="person" style="font-size: 20px; padding-left: 7px"></q-icon>
                            </th>
                            <th class="text-left w500">
                              Date
                              <q-icon name="article" style="font-size: 20px; padding-left: 7px"></q-icon>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="course in data.courseSecondary">

                            <td>
                              <div class="wrap-title">
                                {{ course.title }}
                                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                  transition-show="scale" transition-hide="scale">
                                  {{ course.title }}
                                </q-tooltip>
                              </div>
                            </td>
                            <td>John Doe</td>
                            <td>
                              <q-badge outline class="course-date-seo">{{ course.updated_at }}
                              </q-badge>
                            </td>
                          </tr>
                        </tbody>
                      </q-markup-table>
                    </q-tab-panel>
                  </q-tab-panels>
                </q-card>
              </div>
              <div class="col-6">
                <q-card>
                  <h6 class="q-ma-none w600 q-pa-sm">
                    Recently Added Pages
                    <span class="material-symbols-outlined page-icon">
                      post_add
                    </span>
                  </h6>

                  <q-separator color="deep-purple-6" />
                  <q-markup-table>
                    <thead>
                      <tr>
                        <td class="text-left text-bold text-h7 table-head-data">
                          Page Name
                        </td>
                        <td class="text-left text-bold text-h7 table-head-data">
                          Edited By
                        </td>
                        <td class="text-left text-bold text-h7 table-head-data">
                          Edited Time
                        </td>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="page in data.pages">
                        <td class="text-left">{{ page.page_name }}</td>
                        <td class="text-left">Edited By</td>
                        <td>
                          <q-badge class="table-time-seo
                          ">
                            {{ page.updated_at }}
                          </q-badge>
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, onBeforeMount, reactive, ref } from "vue";
import { api2, api } from "../../boot/axios";
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from "quasar";
import { Loading, QSpinnerPie } from "quasar";

const tab = ref("tab1");
const route = useRoute();
const router = useRouter();
let count = 1;
const data = reactive({
  courseRecords: null,
  courseSecondaryRecords: null,
  pageRecords: null,
  activeCourse: null,
  courses: [],
  courseSecondary: [],
  pages: [],
  courseData: [],
  pagesLastmonth: null,
  courseLastmonth: null,
  courseSecondarylastMonth: null,
});

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: "primary",
    messageColor: "black",
    backgroundColor: "white",
    message: "Loading Page Data. Please Wait!",
  });

  api2.post("seo-data").then((response) => {
    data.pages = response.data.recentlyUpdatedData.pages;
    data.courseSecondary = response.data.recentlyUpdatedData.course_secondary;
    data.courses = response.data.recentlyUpdatedData.course;
    data.pagesLastmonth =
      response.data.recentlyUpdatedData.last_month_updated_website_count;
    data.courseLastmonth =
      response.data.recentlyUpdatedData.last_month_updated_course_count;
    data.courseSecondarylastMonth =
      response.data.recentlyUpdatedData.last_month_updated_course_Sec_count;
    Loading.hide();
  });

  api.get("seo-pages").then((response) => {
    data.seo = response.data;
    data.website = response.data.website;
    data.pageRecords = data.seo.website.length;
    data.courseRecords = data.seo.course.length;
    data.courseSecondaryRecords = data.seo.secondary.length;
  });
});
</script>

<style>
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
  width: 100%;
}

th {
  padding: 10px;
  font-size: 12px !important;
  font-family: "poppins", sans-serif;
}

td {
  padding: 10px;
  font-size: 12px !important;
  font-family: "poppins", sans-serif;
}



.card-number-seo {
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
}

.shadowBoder {
  background-color: white !important;
}

.table-num {
  color: #673ab7;
}

.page-icon {
  color: #673ab7;
  font-size: 34px;
}

.table-time-seo {
  background-color: #f3effc !important;
  color: #845bdf;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 145px;
}

.table-head-data {
  border-bottom: 1px solid #673ab7 !important;
}

.view-btn-seo {
  margin-top: 20px;
  font-size: 16px;
}

/* Common CSS */

.table-card {
  justify-content: space-between;
  align-items: center;
}

.lastMonth-common-seo {
  float: right;
  font-size: 20px;
}

.card-common-css-seo {
  justify-content: space-between;
  align-items: center;
}

.card-heading-seo {
  font-size: 16px;
  color: #8c9097;
  font-weight: 400 !important;
}

/* Table CSS */

.table-card1-icon {
  color: #845adf;
  font-size: 25px;
  background-color: #edf2f1;
  border-radius: 50px;
}

.table-card1-date {
  border-radius: 5px;
  color: #845adf;
  background-color: #edf2f1;
}

.table1-btn {
  color: #fff;
  background-color: #845adf;
}

.table-card2-icon {
  background-color: #edf2f1;
  color: #23b7e5;
  font-size: 25px;
  border-radius: 50px;
}

.table-card2-date {
  background-color: #edf2f1;
  color: #23b7e5;
  border-radius: 5px;
}

.table2-btn {
  color: #fff;
  background-color: #23b7e5;
}

.table-card3-icon {
  color: #26bf94;
  background-color: #edf2f1;
  font-size: 25px;
  border-radius: 50px;
}

.table-card3-date {
  background-color: #edf2f1;
  border-radius: 5px;
  color: #26bf94;
}

.table3-btn {
  color: #fff;
  background-color: #26bf94;
}

.table-card4-icon {
  color: #f5b849;
  background-color: #edf2f1;
  font-size: 25px;
  border-radius: 50px;
}

.table-card4-date {
  color: #f5b849;
  background-color: #f2f1ed;
  border-radius: 5px;
}

.table4-btn {
  color: #fff;
  background-color: #f5b849;
}

/* Card CSS */

.card1-icon-seo {
  color: white;
  background-color: #845adf;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 26px;
  border-radius: 50%;
}

.card1-side-icon-seo {
  background: -webkit-linear-gradient(#845adf, #765e5e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 60px;
}

.card1-btn-seo {
  color: #845adf;
  margin-left: 60px;
  border-radius: 20px;
}

.card2-icon-seo {
  color: #fff;
  background-color: #23b7e5;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 26px;
  border-radius: 50%;
}

.card2-side-icon-seo {
  background: -webkit-linear-gradient(#23b7e5, #765e5e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 60px;
}

.card2-btn-seo {
  color: #23b7e5;
  margin-left: 60px;
  border-radius: 20px;
}

.card3-icon-seo {
  color: #fff;
  background-color: #26bf94;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 26px;
  border-radius: 50%;
}

.card3-side-icon-seo {
  background: -webkit-linear-gradient(#26bf94, #765e5e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 60px;
}

.card3-btn-seo {
  color: #26bf94;
  margin-left: 60px;
  border-radius: 20px;
}

.last-month-seo {
  color: #9699a2;
}

.wrap-title {
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-wrapper {
  height: 300px;
  overflow-y: scroll;
}

.table-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 6px;
  display: none;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: rgba(147, 139, 146, 0.5);
}

.edited-name {
  padding-left: 30px;
}

/* .btn {

  transition: 0.3s;
}

.btn:hover {
  background-color:#f3effc;

} */
.btn-seo,
.btn1-seo,
.btn2-seo {
  position: relative;
  z-index: 1;
}

.btn-seo:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(0);
  transform-origin: bottom center;
  background: #f3effc;
  z-index: -1;
  transition: transform 0.3s;
  color: pink;
}

.btn1-seo:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(0);
  transform-origin: bottom center;
  background: #e4f5fa;
  z-index: -1;
  transition: transform 0.3s;
}

.btn-seo:hover {
  color: #673ab7;
}

.btn1-seo:hover {
  color: #23b7e5;
}

.btn2-seo:hover {
  color: #26bf94;
}

.btn2-seo:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(0);
  transform-origin: bottom center;
  background: #f1fdf0;
  z-index: -1;
  transition: transform 0.3s;
}

.btn-seo:hover::after {
  transform: scaleY(1);
}

.btn1-seo:hover::after {
  transform: scaleY(1);
}

.btn2-seo:hover::after {
  transform: scaleY(1);
}

.view-arrow-seo {
  font-size: 16px;
  margin-left: 5px;
}

.table-height-seo {
  height: 290px;
  position: relative;
  /* border-collapse: collapse; */
}

.head-color-seo {
  background-color: #f9f9fd;
  position: sticky;
  top: 0;
  z-index: 1;
}

.course-date-seo {
  display: flex !important;
  justify-content: center;
  align-items: center;
  width: 130px;
  color: #368da9;
}

.page-color {
  background-color: #fafdff;
}
</style>
