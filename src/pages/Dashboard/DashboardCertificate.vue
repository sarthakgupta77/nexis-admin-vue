<template>
    <q-page class="q-pa-md">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="q-mb-sm">
                        <h5 class="q-my-sm w600">Dashboard</h5>
                        <span>Dashboard &gt;
                            <span style="color: #0288d1">Certificates</span></span>
                    </div>

                    <div class=" q-my-md" >
                        <h6 class="q-my-sm w500">Certificates</h6>
                        <div class="row q-pb-sm q-pt-sm">
                            <div class="col-3 q-pr-md transform" @click="showAllCertificates">
                                <q-card class="q-px-md q-pt-md q-pb-sm card1-cert card-common-cert">
                                    <div class="row" style="justify-content: space-between">
                                        <div class="row">
                                            <span class="material-symbols-outlined q-pa-md card1-icon-cert">text_snippet</span>
                                            <div class="q-pl-md">
                                                <span class="card-heading-cert">Certificates</span><br />
                                                <span class="w600 card-data-cert" style="font-size: 22px">
                                                    {{ data.allCertificateRecords }}</span>
                                            </div>
                                            <div></div>
                                        </div>
                                        <div></div>
                                    </div>
                                    <div class="row card-common-css-cert">
                                        <div class="card-month-data-cert">
                                            <span class="card-month-data-percent-cert">
                                                +{{ data.certificateLastMonthPercent }} %</span><br />
                                            <span class="card-below-data-cert"> Last Month</span>
                                        </div>
                                        <div>
                                            <span
                                                class="material-symbols-outlined card-side-icon-cert card1-side-icon-cert">equalizer</span>
                                        </div>
                                    </div>
                                </q-card>
                            </div>

                            <div class="col-3 q-pr-md transform">
                                <q-card class="q-px-md q-pt-md q-pb-sm card2-cert card-common-cert">
                                    <div class="row" style="justify-content: space-between">
                                        <div class="row">
                                            <span
                                                class="material-symbols-outlined q-pa-md card2-icon-cert">note_stack</span>
                                            <div class="q-pl-md">
                                                <span class="card-heading-cert">PG Program</span><br />
                                                <span class="w600 card-data-cert" style="font-size: 22px">{{
                                                    data.pgData
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row card-common-css-cert">
                                        <div class="card-month-data-cert">
                                            <span class="card-month-data-percent-cert">
                                                +{{ data.pgDataLastMonthPercent }} % </span><br />
                                            <span class="card-below-data-cert"> Last Month</span>
                                        </div>
                                        <div>
                                            <span
                                                class="material-symbols-outlined card-side-icon-cert card2-side-icon-cert">equalizer</span>
                                        </div>
                                    </div>
                                </q-card>
                            </div>

                            <div class="col-3 q-pr-md transform">
                                <q-card class="q-px-md q-pt-md q-pb-sm card3-cert card-common-cert">
                                    <div class="row" style="justify-content: space-between">
                                        <div class="row">
                                            <span class="material-symbols-outlined q-pa-md card3-icon-cert">podium</span>
                                            <div class="q-pl-md">
                                                <span class="card-heading-cert">Webinar</span><br />

                                                <span class="w600 card-data-cert" style="font-size: 22px">
                                                    {{ data.webinarData }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row card-common-css-cert">
                                        <div class="card-month-data-cert">
                                            <span class="card-month-data-percent-cert">
                                                +{{ data.webinarDataLastMonthPercent }} %</span><br />
                                            <span class="card-below-data-cert"> Last Month</span>
                                        </div>
                                        <div>
                                            <span
                                                class="material-symbols-outlined card-side-icon-cert card3-side-icon-cert">equalizer</span>
                                        </div>
                                    </div>
                                </q-card>
                            </div>

                            <div class="col-3 transform">
                                <q-card class="q-px-md q-pt-md q-pb-sm card4-cert card-common-cert">
                                    <div class="row" style="justify-content: space-between">
                                        <div class="row">
                                            <span class="material-symbols-outlined q-pa-md card4-icon-cert">post_add</span>
                                            <div class="q-pl-md">
                                                <span class="card-heading-cert">Assessment</span><br />
                                                <span class="w600 card-data-cert" style="font-size: 22px">
                                                    {{ data.assessmentData }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row card-common-css-cert">
                                        <div class="card-month-data-cert">
                                            <span class="card-month-data-percent-cert">
                                                +{{ data.assessmentDataLastMonthPercent }} %</span><br />
                                            <span class="card-below-data-cert"> Last Month</span>
                                        </div>
                                        <div>
                                            <span
                                                class="material-symbols-outlined card-side-icon-cert card4-side-icon-cert">equalizer</span>
                                        </div>
                                    </div>
                                </q-card>
                            </div>
                        </div>

                        <h6 class="q-my-sm w500">Reports</h6>
                        <div class="row q-pb-sm q-pt-sm">
                            <div class="col-3 q-pr-md transform" @click="showAllReports">
                                <q-card class="q-px-md q-pt-md q-pb-sm card5-cert card-common-cert">
                                    <div class="row" style="justify-content: space-between">
                                        <div class="row">
                                            <span
                                                class="material-symbols-outlined q-pa-md card5-icon-cert">lab_profile</span>
                                            <div class="q-pl-md">
                                                <span class="card-heading-cert">Report</span><br />
                                                <span class="w600 card-data-cert" style="font-size: 22px">
                                                    {{ data.allReportsRecords }}</span>
                                            </div>
                                            <div></div>
                                        </div>
                                        <div></div>
                                    </div>
                                    <div class="row card-common-css-cert">
                                        <div class="card-month-data-cert">
                                            <span class="card-month-data-percent-cert">
                                                + {{ data.reportLastMonthPercent }} %</span><br />
                                            <span class="card-below-data-cert"> Last Month</span>
                                        </div>
                                        <div>
                                            <span
                                                class="material-symbols-outlined card-side-icon-cert card5-side-icon-cert">equalizer</span>
                                        </div>
                                    </div>
                                </q-card>
                            </div>

                            <div class="col-3 q-pr-md transform">
                                <q-card class="q-px-md q-pt-md q-pb-sm card6-cert card-common-cert">
                                    <div class="row" style="justify-content: space-between">
                                        <div class="row">
                                            <span
                                                class="material-symbols-outlined q-pa-md card6-icon-cert">psychology</span>
                                            <div class="q-pl-md">
                                                <span class="card-heading-cert">Data Science</span><br />
                                                <span class="w600 card-data-cert" style="font-size: 22px">{{
                                                    data.dsData
                                                }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row card-common-css-cert">
                                        <div class="card-month-data-cert">
                                            <span class="card-month-data-percent-cert">
                                                + {{ data.dsDataLastMonthPercent }} %</span><br />
                                            <span class="card-below-data-cert"> Last Month</span>
                                        </div>
                                        <div>
                                            <span
                                                class="material-symbols-outlined card-side-icon-cert card6-side-icon-cert">equalizer</span>
                                        </div>
                                    </div>
                                </q-card>
                            </div>

                            <div class="col-3 q-pr-md transform">
                                <q-card class="q-px-md q-pt-md q-pb-sm card7-cert card-common-cert">
                                    <div class="row" style="justify-content: space-between">
                                        <div class="row">
                                            <span class="material-symbols-outlined q-pa-md card7-icon-cert">savings</span>
                                            <div class="q-pl-md">
                                                <span class="card-heading-cert">IB Reports</span><br />
                                                <span class="w600 card-data-cert" style="font-size: 22px">
                                                    {{ data.ibData }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row card-common-css-cert">
                                        <div class="card-month-data-cert">
                                            <span v-if="data.ibDataLastMonthPercent == 'NaN'"
                                                class="card-month-data-percent-cert"> 0 %</span>
                                            <span v-else class="card-month-data-percent-cert"> +{{
                                                data.ibDataLastMonthPercent }}%</span><br>
                                            <span class="card-below-data-cert"> Last Month</span>
                                        </div>
                                        <div>
                                            <span
                                                class="material-symbols-outlined card-side-icon-cert card7-side-icon-cert">equalizer</span>
                                        </div>
                                    </div>
                                </q-card>
                            </div>

                            <div class="col-3 transform">
                                <q-card class="q-px-md q-pt-md q-pb-sm card8-cert card-common-cert">
                                    <div class="row" style="justify-content: space-between">
                                        <div class="row">
                                            <span class="material-symbols-outlined q-pa-md card8-icon-cert">summarize</span>
                                            <div class="q-pl-md">
                                                <span class="card-heading-cert">Others Reports</span><br />
                                                <span class="w600 card-data-cert" style="font-size: 22px">{{ data.otherData
                                                }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row card-common-css-cert">
                                        <div class="card-month-data-cert">
                                            <span v-if="data.otherDataLastMonthPercent == 'NaN'"
                                                class="card-month-data-percent-cert"> 0 %</span>

                                            <span v-else class="card-month-data-percent-cert"> +{{
                                                data.otherDataLastMonthPercent }}%</span><br />

                                            <span class="card-below-data-cert"> Last Month</span>
                                        </div>
                                        <div>
                                            <span
                                                class="material-symbols-outlined card-side-icon-cert card8-side-icon-cert">equalizer</span>
                                        </div>
                                    </div>
                                </q-card>
                            </div>
                        </div>
                    </div>

                    <div >
                        <div class="q-py-sm row">
                            <div class="col-6 q-pr-md">
                                <q-card class="border">
                                    <q-item class="text-h6 w600 table1">
                                        <q-item-section v-if="certificates == 'all'" class="q-ml-md">Certificates ({{
                                            data.allCertificateRecords }})</q-item-section>
                                        <q-item-section v-if="certificates == 'lastMonth'" class="q-ml-md">Certificates ({{
                                            data.lastMonthCertificatesRecords }})</q-item-section>
                                        <q-tabs v-model="certificates">
                                            <q-tab name="all" label="All" />
                                            <q-tab name="lastMonth" label="Last Month" />
                                        </q-tabs>

                                    </q-item>
                                    <q-tab-panels v-model="certificates" animated swipeable>
                                        <q-tab-panel class="q-pa-none" name="all">
                                            <q-markup-table class="table-wrapper ">
                                                <thead class="head-color">
                                                    <tr>
                                                        <th class="text-left w500">
                                                            Name
                                                            <q-icon name="person"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-left w500">
                                                            Course
                                                            <q-icon name="book"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-left w500">
                                                            Date
                                                            <q-icon name="article"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-center w500">
                                                            View
                                                            <q-icon name="open_in_new"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="cert in data.certificate">
                                                        <td>
                                                            <div class="wrap-title">
                                                                {{ cert.student_name }}
                                                            <q-tooltip anchor="top middle" self="bottom middle"
                                                                    :offset="[10, 10]" transition-show="scale"
                                                                    transition-hide="scale">
                                                                    {{ cert.student_name }}
                                                                </q-tooltip>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="wrap-title">
                                                                {{ cert.course_name }}
                                                                <q-tooltip anchor="top middle" self="bottom middle"
                                                                    :offset="[10, 10]" transition-show="scale"
                                                                    transition-hide="scale">
                                                                    {{ cert.course_name }}
                                                                </q-tooltip>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <q-badge outline style="color: #0842a0">{{ cert.issued_on }}
                                                            </q-badge>
                                                        </td>
                                                        <td class="text-center" style="padding: 0">
                                                            <q-btn flat rounded color="primary" class="view" label="View"
                                                                :href="certificate_url +
                                                                    cert.certificate_id +
                                                                    '/' +
                                                                    cert.email
                                                                    " target="_blank" icon-right="open_in_new" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                     <th colspan="4">
                                                        <q-btn flat rounded to="/Certificates" text-color="primary" style="width: 60%; font-size: 16px;">View All</q-btn>
                                                     </th>
                                                    </tr>
                                                </tbody>
                                            </q-markup-table>
                                        </q-tab-panel>
                                        <q-tab-panel class="q-pa-none" name="lastMonth">
                                            <q-markup-table class="table-wrapper">
                                                <thead class="head-color">
                                                    <tr>
                                                        <th class="text-left w500">
                                                            Name
                                                            <q-icon name="person"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-left w500">
                                                            Course
                                                            <q-icon name="book"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-left w500">
                                                            Date
                                                            <q-icon name="article"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-center w500">
                                                            View
                                                            <q-icon name="open_in_new"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                    </tr>
                                                    
                                                </thead>
                                                <tbody>
                                                    <tr v-for="cert in data.lastMonthCertificates">
                                                        <td >
                                                            <div class="wrap-title">
                                                                {{ cert.student_name }}
                                                            <q-tooltip anchor="top middle" self="bottom middle"
                                                                    :offset="[10, 10]" transition-show="scale"
                                                                    transition-hide="scale">
                                                                    {{ cert.student_name }}
                                                                </q-tooltip>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="wrap-title">
                                                                {{ cert.course_name }}
                                                                <q-tooltip anchor="top middle" self="bottom middle"
                                                                    :offset="[10, 10]" transition-show="scale"
                                                                    transition-hide="scale">
                                                                    {{ cert.course_name }}
                                                                </q-tooltip>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <q-badge outline style="color: #0842a0">{{ cert.issued_on }}
                                                            </q-badge>
                                                        </td>
                                                        <td class="text-center" style="padding: 0">
                                                            <q-btn flat rounded color="primary" class="view" label="View"
                                                                :href="certificate_url +
                                                                    cert.certificate_id +
                                                                    '/' +
                                                                    cert.email
                                                                    " target="_blank" icon-right="open_in_new" />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </q-markup-table>
                                        </q-tab-panel>

                                    </q-tab-panels>

                                </q-card>
                            </div>

                            <div class="col-6">
                                <q-card class="border">
                                    <q-item class="text-h6 w600 table2">
                                        <q-item-section v-if="reports == 'allReport'" class="q-ml-md">Reports ({{
                                            data.allReportsRecords }})</q-item-section>
                                        <q-item-section v-if="reports == 'lastMonthReport'" class="q-ml-md">Reports ({{
                                            data.lastMonthReportsRecords }})</q-item-section>
                                        <q-tabs v-model="reports">
                                            <q-tab name="allReport" label="All" />
                                            <q-tab name="lastMonthReport" label="Last Month" />
                                        </q-tabs>
                                    </q-item>
                                    <q-tab-panels v-model="reports" animated swipeable>
                                        <q-tab-panel class="q-pa-none" name="allReport">
                                            <q-markup-table class="table-wrapper">
                                                <thead class="head-color">
                                                    <tr>
                                                        <th class="text-left w500">
                                                            Name
                                                            <q-icon name="person"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-left w500">
                                                            Course
                                                            <q-icon name="book"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-left w500">
                                                            Date
                                                            <q-icon name="article"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-left w500">
                                                            View
                                                            <q-icon name="open_in_new"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="reports in data.report">
                                                        <td>
                                                            <div class="wrap-title">
                                                                {{ reports.email }}
                                                                <q-tooltip anchor="top middle" self="bottom middle"
                                                                    :offset="[10, 10]" transition-show="scale"
                                                                    transition-hide="scale">
                                                                    {{ reports.email }}
                                                                </q-tooltip>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="wrap-title">
                                                                {{ reports.course }}
                                                                <q-tooltip anchor="top middle" self="bottom middle"
                                                                    :offset="[10, 10]" transition-show="scale"
                                                                    transition-hide="scale">
                                                                    {{ reports.course }}
                                                                </q-tooltip>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <q-badge outline style="color: #0842a0">{{ reports.created_at }}
                                                            </q-badge>
                                                        </td>
                                                        <td class="text-left" style="padding: 0">
                                                            <q-btn flat rounded color="primary" class="view" label="View"
                                                                :href="card_url + reports.enrolment_id" target="_blank"
                                                                icon-right="open_in_new" />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                     <th colspan="4">
                                                        <q-btn flat rounded to="/reports" text-color="primary" style="width: 60%; font-size: 16px;">View All</q-btn>
                                                     </th>
                                                    </tr>
                                                </tbody>
                                            </q-markup-table>
                                        </q-tab-panel>
                                        <q-tab-panel class="q-pa-none" name="lastMonthReport">
                                            <q-markup-table class="table-wrapper">
                                                <thead class="head-color">
                                                    <tr>
                                                        <th class="text-left w500">
                                                            Name
                                                            <q-icon name="person"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-left w500">
                                                            Course
                                                            <q-icon name="book"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-left w500">
                                                            Date
                                                            <q-icon name="article"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                        <th class="text-center w500">
                                                            View
                                                            <q-icon name="open_in_new"
                                                                style="font-size: 20px; padding-left: 7px"></q-icon>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="report in data.lastMonthReports" class="text-left">
                                                        <td>
                                                            <div class="wrap-title">
                                                                {{ report.email }}
                                                                <q-tooltip anchor="top middle" self="bottom middle"
                                                                    :offset="[10, 10]" transition-show="scale"
                                                                    transition-hide="scale">
                                                                    {{ report.email }}
                                                                </q-tooltip>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="wrap-title">
                                                                {{ report.course }}
                                                                <q-tooltip anchor="top middle" self="bottom middle"
                                                                    :offset="[10, 10]" transition-show="scale"
                                                                    transition-hide="scale">
                                                                    {{ report.course }}
                                                                </q-tooltip>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <q-badge outline style="color: #0842a0">{{ report.created_at }}
                                                            </q-badge>
                                                        </td>
                                                        <td class="text-center" style="padding: 0">
                                                            <div class="viewtext">
                                                                <q-btn flat rounded color="primary" class="view"
                                                                    label="View" :href="card_url + report.enrolment_id"
                                                                    target="_blank" icon-right="open_in_new" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </q-markup-table>
                                        </q-tab-panel>

                                    </q-tab-panels>

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

const certificates = ref("all");
const reports = ref("allReport");

const showAllCertificates = () => {
    router.push("/Certificates");
};
const showAllReports = () => {
    router.push("/reports");
};

const route = useRoute();
const router = useRouter();
const certificate_url = "https://datatrained.com/api/view-certificate/";
const card_url = "https://datatrained.com/api/view-report-card/";

const data = reactive({
    allCertificateRecords: null,
    lastMonthCertificatesRecords: null,
    allReportsRecords: null,
    lastMonthReportsRecords: null,
    certificate: [],
    report: [],
    lastMonthCertificates: [],
    lastMonthReports: [],
    pgData: null,
    webinarData: null,
    assessmentData: null,
    dsData: null,
    ibData: null,
    otherData: null,
    dsDataLastMonthPercent: null,
    reportLastMonthPercent: null,
    ibDataLastMonthPercent: null,
    otherDataLastMonthPercent: null,
    certificateLastMonthPercent: null,
    pgDataLastMonthPercent: null,
    webinarDataLastMonthPercent: null,
    assessmentDataLastMonthPercent: null,
});

onBeforeMount(() => {
    Loading.show({
        spinner: QSpinnerPie,
        spinnerColor: "primary",
        messageColor: "black",
        backgroundColor: "white",
        message: "Loading Page Data. Please Wait!",
    });

    api2.post("certificates").then((response) => {
        data.certificate = response.data.totalCertificate.total_certificates_data;
        data.allCertificateRecords = response.data.totalCertificate.total_certificates_count;
        data.lastMonthCertificates = response.data.lastMonthData.last_month_certificates;
        data.lastMonthCertificatesRecords = response.data.lastMonthData.last_month_certificate_count;
        data.certificateLastMonthPercent = ((data.lastMonthCertificatesRecords * 100) / data.allCertificateRecords).toFixed(2);
        data.pgData = response.data.PgData.total_pg_cert_count;
        data.pgDataLastMonthPercent = ((response.data.PgData.last_month_pg_cert_count * 100) / data.pgData).toFixed(2);
        data.webinarData = response.data.webinarData.total_web_cert_count;
        data.webinarDataLastMonthPercent = ((response.data.webinarData.last_month_web_cert_count * 100) / data.webinarData).toFixed(2);
        data.assessmentData = response.data.assessmentData.total_Asses_cert_count;
        data.assessmentDataLastMonthPercent = ((response.data.assessmentData.last_month_Asses_cert_count * 100) / data.assessmentData).toFixed(2);
    });

    api2.post("report").then((response) => {
        data.lastMonthReports = response.data.lastMonth.last_month_reports_data;
        data.report = response.data.total_reports.total_report_data;
        data.allReportsRecords = response.data.total_reports.total_report_count;
        data.lastMonthReportsRecords = response.data.lastMonth.last_month_reports_count;
        data.reportLastMonthPercent = ((data.lastMonthReportsRecords * 100) / data.allReportsRecords).toFixed(2);
        data.dsData = response.data.dsData.total_ds_report_count;
        data.dsDataLastMonthPercent = ((response.data.dsData.last_month_ds_report_count * 100) / data.dsData).toFixed(2);
        data.ibData = response.data.ibData.total_ib_report_count;
        data.ibDataLastMonthPercent = ((response.data.ibData.last_month_ib_report_count * 100) / data.ibData).toFixed(2);
        data.otherData = response.data.otherData.total_other_report_count;
        data.otherDataLastMonthPercent = ((response.data.otherData.last_month_other_report_count * 100) / data.otherData).toFixed(2);
        Loading.hide();
    });


    //   const rights = access.filter(checkEvent);
    //   rights.forEach(function (el) {
    //     let key = el.split('.')[1]
    //     if (el.includes('story')) {
    //       state[key] = true
    //     }

    //   });

    //   function checkEvent(keys) {
    //     return keys.includes('story');
    //   }
});
</script>
  
<style>
.container {
    width: auto;
    height: 100%;
}

.head-color {
    background-color: #f9f9fd;
    z-index: 10;
    position: sticky;
    top: 0;
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

.wrap-title {
    white-space: nowrap;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
}


.table-four {
    background-color: #d0d5f3;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    justify-content: space-between;
}

.table1 {
    background-color: rgb(232 243 193);
    padding: 0px !important;
    height: 55px;
}

.table2 {
    background-color: rgb(169 215 204);
    padding: 0px !important;
    height: 55px;
}

.table3 {
    background-color: rgb(225 206 241);
}

.table1-icon {
    font-size: 35px !important;
    color: rgb(75 95 22);
}

.table2-icon {
    font-size: 35px !important;
    color: #56857a;
}

.table3-icon {
    font-size: 35px !important;
    color: rgb(170 75 255);
}

.table4-icon {
    font-size: 35px !important;
    color: rgb(68 99 255);
}

.border {
    border-bottom: 1px solid black;
}

.table-height {
    height: 300px;

    position: relative;
    border-collapse: collapse;
}

.table-wrapper {
    max-height: 289px;
    overflow-y: scroll;
    position: relative;
}

.table-wrapper::-webkit-scrollbar {
    width: 10px;
    height: 6px;
}

.table-wrapper::-webkit-scrollbar-thumb {
    background: rgba(147, 139, 146, 0.5);
}

.view {
    font-size: 11px;
}

/* card css */

.card1-icon-cert {
    color: white;
    background-color: #845adf;
    font-size: 28px !important;
    border-radius: 10px !important;
}

.card1-side-icon-cert {
    color: #845adf;
    font-size: 50px;
}

.card1-cert:hover {
    background-position: 100% 100%;
}

.card1-cert {
    background: linear-gradient(#fff, #fff 50%, #cfbdf6 50%, #cfbdf6);
    background-size: 100% 200%;
    transition: 0.8s;
}

.card2-icon-cert {
    color: #fff;
    background-color: #23b7e5;
    font-size: 28px;
    border-radius: 10px;
}

.card2-side-icon-cert {
    color: #23b7e5;
    font-size: 50px;
}

.card2-cert:hover {
    background-position: 100% 100%;
}

.card2-cert {
    background: linear-gradient(#fff, #fff 50%, #c3edfa 50%, #c3edfa);
    background-size: 100% 200%;
    transition: 0.8s;
}

.card3-icon-cert {
    color: #fff;
    background-color: #26bf94;
    font-size: 28px;
    border-radius: 10px;
}

.card3-side-icon-cert {
    color: #26bf94;
    font-size: 50px;
}

.card3-cert:hover {
    background-position: 100% 100%;
}

.card3-cert {
    background: linear-gradient(#fff, #fff 50%, #b3ffea 50%, #b3ffea);
    background-size: 100% 200%;
    transition: 0.8s;
}

.card4-icon-cert {
    color: #fff;
    background-color: #f5b849;
    font-size: 28px;
    border-radius: 10px;
}

.card4-side-icon-cert {
    color: #f5b849;
    font-size: 50px;
}

.card4-cert:hover {
    background-position: 100% 100%;
}

.card4-cert {
    background: linear-gradient(#fff, #fff 50%, #ffe7bc 50%, #ffe7bc);
    background-size: 100% 200%;
    transition: 0.8s;
}

.card5-icon-cert {
    color: #fff;
    background-color: #f58b49;
    font-size: 28px;
    border-radius: 10px;
}

.card5-side-icon-cert {
    color: #f58b49;
    font-size: 50px;
}

.card5-cert {
    background: linear-gradient(#fff, #fff 50%, #ffe4d4 50%, #ffe4d4);
    background-size: 100% 200%;
    transition: 0.8s;
}

.card5-cert:hover {
    background-position: 100% 100%;
}

.card6-icon-cert {
    color: #fff;
    background-color: #adf34b;
    font-size: 28px;
    border-radius: 10px;
}

.card6-side-icon-cert {
    color: #adf34b;
    font-size: 50px;
}

.card6-cert {
    background: linear-gradient(#fff, #fff 50%, #dbefbe 50%, #dbefbe);
    background-size: 100% 200%;
    transition: 0.8s;
}

.card6-cert:hover {
    background-position: 100% 100%;
}

.card7-icon-cert {
    color: #fff;
    background-color: #496bf5;
    font-size: 28px;
    border-radius: 10px;
}

.card7-side-icon-cert {
    color: #496bf5;
    font-size: 50px;
}

.card7-cert {
    background: linear-gradient(#fff, #fff 50%, #c7d1f7 50%, #c7d1f7);
    background-size: 100% 200%;
    transition: 0.8s;
}

.card7-cert:hover {
    background-position: 100% 100%;
}

.card8-icon-cert {
    color: #fff;
    background-color: #e749f5;
    font-size: 28px;
    border-radius: 10px;
}

.card8-side-icon-cert {
    color: #e749f5;
    font-size: 50px;
}

.card8-cert {
    background: linear-gradient(#fff, #fff 50%, #ecbef0 50%, #ecbef0);
    background-size: 100% 200%;
    transition: 0.8s;
}

.card8-cert:hover {
    background-position: 100% 100%;
}

/* common css */

.card-common-css-cert {
    justify-content: space-between;
    align-items: center;
}

.card-heading-cert {
    font-size: 16px;
    color: grey;
}

.transform {
    position: relative;
    transition: transform 0.2s;
    perspective: 1000px;
    cursor: pointer;
}

.transform:hover {
    transform: translateY(-10px);
}

.card-month-data-cert {
    margin-left: 78px;
}

.card-month-data-percent-cert {
    color: rgb(36, 209, 36);
    font-weight: 600;
}

.card-common-cert:hover {

    .card-side-icon {
        font-size: 50px;
        transition: 0.8s;
    }

    .card-heading-cert {
        transition: 0.8s;
    }

    .card-data-cert {
        transition: 0.8s;
    }

    .card-below-data-cert {
        transition: 0.8s;
    }

    .card-month-data-percent-cert {
        color: black;
        transition: 0.8s;
    }

}
</style>