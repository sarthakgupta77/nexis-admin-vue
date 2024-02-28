<template>
    <q-page class="q-pa-md">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="head-btn-box shadowBoder">
                        <h5 id="head-1">Dashboard</h5>

                        <!-- <q-btn label="create new" to="/add-new-article" class="create-btn"></q-btn> -->
                    </div>
                    <div>
                        <div class="q-pb-md row ">
                            <div class="col-md-5 q-pr-md">
                                <q-card>
                                    <q-card-section>
                                        <div>
                                            <Line :data="lineChartData" :options="lineChartOptions" />
                                        </div>
                                    </q-card-section>
                                </q-card>
                                <div class="row q-pt-md">
                                    <q-card class="col-md-6 q-pr-md">
                                        <q-card-section>
                                            <div>
                                                <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData"
                                                    style="position:relative" />
                                            </div>
                                        </q-card-section>
                                    </q-card>
                                    <q-card class="col-md-6 q-pl-md">
                                        <q-card-section>
                                            <div>
                                                <Doughnut id="my-chart-id" :options="chartOptions2" :data="chartData2"
                                                    style="position:relative" />
                                            </div>
                                        </q-card-section>
                                    </q-card>
                                </div>
                            </div>
                            <q-card class="col-md-7">
                                <div class="q-pa-md">
                                    <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
                                        <!-- <q-btn flat label="Homepage" /> -->
                                        <h5 class=" q-ma-none w600">Accomplished Sales </h5>

                                        <q-space />


                                        <q-tabs v-model="tab" shrink stretch>
                                            <q-tab name="tab1" label="Monthly" />
                                            <q-tab name="tab2" label="Yearly" />
                                            <!-- <q-tab name="tab3" label="Tab 3" /> -->
                                        </q-tabs>
                                    </q-toolbar>
                                </div>
                                <q-tab-panels v-model="tab" animated swipeable>
                                    <q-tab-panel name="tab1">
                                        <q-card-section>
                                            <p class="q-mb-xs">January 01, 2022 - January 31, 2022</p>
                                            <div>
                                                <Bar id="my-chart-id" label="data" :options="barChartOptions"
                                                    :data="barChart1Data" style="position:relative" />
                                            </div>
                                        </q-card-section>
                                    </q-tab-panel>
                                    <q-tab-panel name="tab2">
                                        <q-card-section>
                                            <p class="q-mb-xs">January 01, 2022 - December 31, 2022</p>
                                            <div>
                                                <Bar id="my-chart-id" label="data" :options="barChartOptions"
                                                    :data="barChart1Data" style="position:relative" />
                                            </div>
                                        </q-card-section>
                                    </q-tab-panel>
                                </q-tab-panels>
                            </q-card>

                        </div>
                        <!-- <div class="q-pb-md row items-start ">
                            <q-card class="col-md-7 ">
                                <q-card-section class="q-pl-sm">
                                    <div>
                                        <Bubble :data="bubbleChartData" :options="bubbleChartOptions" />

                                    </div>
                                </q-card-section>
                            </q-card>
                            <q-card class="col-md-5">
                                <q-card-section>
                                    <div>
                                        <Line :data="lineChartData" :options="lineChartOptions" />
                                    </div>
                                </q-card-section>
                            </q-card>
                        </div> -->
                    </div>
                    <div class=" row">
                        <div class="table-container " style="width:70%">
                            <q-markup-table flat bordered>
                                <thead class="bg-teal col-md-6">
                                    <tr>
                                        <th colspan="5">
                                            <div class="row no-wrap items-center">
                                                <!-- <q-img style="width: 70px" :ratio="1" class="rounded-borders"
                                                src="https://cdn.quasar.dev/img/donuts.png" /> -->

                                                <div class="text-h5 q-ma-sm w600 text-white">Top Selling Employee List</div>
                                            </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th class="text-left w500 "><q-icon name="people"
                                                style="font-size: 20px; padding-left: 7px;"></q-icon></th>
                                        <th class="text-left w500">User Name</th>
                                        <th class="text-left w500">Achieved Sales</th>
                                        <th class="text-left w500">Revenue $$</th>
                                        <th class="text-left w500">Protein (g)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-left"> <img
                                                src="https://www.rotarybangkok.org/wp-content/uploads/2017/11/user-placeholder.d2a3ff8.png"
                                                alt="" style="width: 38px; height: 38px; border-radius: 30px" /></td>
                                        <td class="text-left">Yiorgos Avraamu</td>
                                        <td class="text-left">20</td>
                                        <td class="text-left">25 Lakhs</td>
                                        <td class="text-left">4</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left"> <img
                                                src="https://www.rotarybangkok.org/wp-content/uploads/2017/11/user-placeholder.d2a3ff8.png"
                                                alt="" style="width: 38px; height: 38px; border-radius: 30px" /></td>
                                        <td class="text-left">Avram Tarasios</td>
                                        <td class="text-left">18</td>
                                        <td class="text-left">22 Lakhs</td>
                                        <td class="text-left">4.3</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left"> <img
                                                src="https://www.rotarybangkok.org/wp-content/uploads/2017/11/user-placeholder.d2a3ff8.png"
                                                alt="" style="width: 38px; height: 38px; border-radius: 30px" /></td>
                                        <td class="text-left">Quintin Ed</td>
                                        <td class="text-left">16</td>
                                        <td class="text-left">20 Lakhs</td>
                                        <td class="text-left">6</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left"> <img
                                                src="https://www.rotarybangkok.org/wp-content/uploads/2017/11/user-placeholder.d2a3ff8.png"
                                                alt="" style="width: 38px; height: 38px; border-radius: 30px" /></td>
                                        <td class="text-left">Agapetus Tadeáš</td>
                                        <td class="text-left">13</td>
                                        <td class="text-left">15 Lakhs</td>
                                        <td class="text-left">4.3</td>
                                    </tr>
                                    <tr>
                                        <td class="text-left"> <img
                                                src="https://www.rotarybangkok.org/wp-content/uploads/2017/11/user-placeholder.d2a3ff8.png"
                                                alt="" style="width: 38px; height: 38px; border-radius: 30px" /></td>
                                        <td class="text-left">Friderik Dávid</td>
                                        <td class="text-left">11</td>
                                        <td class="text-left">13 Lakhs</td>
                                        <td class="text-left">3.9</td>
                                    </tr>
                                </tbody>
                            </q-markup-table>
                        </div>
                        <div class="q-pl-md" style="width:30%">
                            <q-card>
                                <q-card-section>
                                    <div>
                                        <!-- <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData"
                                            style="position:relative" /> -->
                                        <Radar :data="radarChartData" :options="radarChartOptions" style="position:relative" />

                                    </div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>
  
<script setup>
import { Chart as ChartJS, ArcElement, Filler, Title, Tooltip, RadialLinearScale, Legend, BarElement, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
import { Doughnut, Bar, Line, Bubble, Radar } from 'vue-chartjs'
import { onMounted, reactive, ref } from 'vue';



const tab = ref('tab1')


ChartJS.register(ArcElement, Title, RadialLinearScale, Filler, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement,)
const chartData = reactive({
    labels: ['ReactJs', 'AngularJs'],

    datasets: [
        {
            backgroundColor: ['#1976D2', '#00e5ff'],
            data: [20, 60, 10, 10]
        }
    ]
})
const chartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    cutout: 50,
    aspectRatio: 1.5,
})
const chartData2 = reactive({
    labels: ['VueJs', 'EmberJs', 'ReactJs'],

    datasets: [
        {
            backgroundColor: ['#1976D2', '#00e5ff', 'red', 'yellow',],
            data: [20, 40, 30]
        }
    ]
})
const chartOptions2 = reactive({
    responsive: true,
    maintainAspectRatio: false,
    cutout: 50,
    aspectRatio: 1.5,
})

const barChart1Data = reactive({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'Sales Data',
        backgroundColor: '#00e5ff',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }],
})

const barChartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    cutout: 50,
    aspectRatio: 0.8,
})


const lineChartData = reactive({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales Analysis',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
        }
    ]
})

const lineChartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    cutout: 50,
    aspectRatio: 1.1,
})



const bubbleChartData = reactive({
    datasets: [
        {
            label: 'Sales Target',
            backgroundColor: '#f87979',
            data: [
                {
                    x: 20,
                    y: 25,
                    r: 5
                },
                {
                    x: 40,
                    y: 10,
                    r: 10
                },
                {
                    x: 30,
                    y: 22,
                    r: 30
                },
                {
                    x: 10,
                    y: 12,
                    r: 15
                },
                {
                    x: 16,
                    y: 27,
                    r: 35
                },
            ]
        },
        {
            label: 'Sales Achieved ',
            backgroundColor: '#7C8CF8',
            data: [
                {
                    x: 10,
                    y: 30,
                    r: 15
                },
                {
                    x: 20,
                    y: 20,
                    r: 10
                },
                {
                    x: 15,
                    y: 8,
                    r: 30
                },
                {
                    x: 25,
                    y: 25,
                    r: 28
                },
                {
                    x: 35,
                    y: 25,
                    r: 35
                },
            ]
        }
    ]
})

const bubbleChartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    cutout: 50,
    aspectRatio: 1.1,
})

const radarChartData = reactive({
    labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
    ],
    datasets: [
        {
            label: 'My Targeted Sales',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: 'My Achieved Sales',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
})

const radarChartOptions = reactive({
    responsive: true,
    maintainAspectRatio: false,
    cutout: 50,
    aspectRatio: 1.1,
})

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
</style>