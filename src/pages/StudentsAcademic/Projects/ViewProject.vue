<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <q-btn flat round color="white" text-color="positive" class="q-mr-sm" icon="arrow_back" id="back-btn"
              to="/projects">
              <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
                transition-hide="scale">
                Back to Projects
              </q-tooltip>
            </q-btn>
            <h5 class="q-ma-none" id="head-1">Project Details</h5>
          </div>
          <div class="col-12 ProjectDetails d-flex">
            <div class="projectBox shadowBoder q-mr-sm">
              <div class="row" style="align-items:center">
                <div class="col-10">
                  <h6 class="q-py-lg q-ma-none"> {{ data.project.title }} - Details</h6>
                </div>
                <div class="col-2">
                  <div v-if="data.project.type == 1">
                    <q-chip color="green-5" text-color="white">
                      Evaluation
                    </q-chip>
                    <br />
                  </div>
                  <div v-else-if="data.project.type == 0">
                    <q-chip color="blue-5" text-color="white">
                      Practice
                    </q-chip>

                    <br />
                  </div>
                  <div v-else-if="data.project.type == 2">
                    <q-chip color="grey-5" text-color="white"> Extra </q-chip>
                    <br />
                  </div>
                </div>
              </div>
              <div class="q-py-md text-subtitle1">
                <b>Course: </b> {{ data.project.course }}
              </div>

              <div class="col-12">
                <p v-html="data.project.description"></p>
              </div>

            </div>
            <div class="paramsBox  q-ml-sm">
              <div class="shadowBoder">
                <h6 class="q-ma-sm"> Project Scoring Parameters</h6>
                <span v-if="data.params == ''" class="text-primary q-pa-sm">
                  No Parameters Defined For The Project
                </span>


                <div class="row" v-for="param in data.params" :key="param.id">
                  <div class="col-10 q-mb-sm scoring">

                    <q-input disable dense square filled v-model="param.name" class="category-name"></q-input>
                  </div>
                  <div class="col-2 q-pl-sm scoring">

                    <q-input disable dense square filled v-model="param.max_marks" class="category-name"></q-input>
                  </div>
                </div>


              </div>
              <div class="shadowBoder">
                <h6 class="q-ma-sm"> Project Files</h6>
                <span v-if="data.files == ''" class="text-primary q-pa-sm">
                  No Files Attached For The Project
                </span>
                <div class="row" v-for="file in data.files" :key="file.id">


                  <div class="col-10 q-mb-ss scoring ">

                    <q-input dense disable square filled v-model="file.file_name" class="category-name"></q-input>

                  </div>
                  <div class="col-2 q-pl-sm  ">
                    <a :href="url + file.path" target="_blank">
                      <q-btn class=" view-btn" square color="primary" label="view"></q-btn>
                    </a>
                  </div>

                </div>


              </div>
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

const url = "https://genesis.datatrained.com/";

const data = reactive({
  files: [],
  params: [],
  project: []
});

const convertCourseCode = (array) => {
  if (array.course == 0) {
    array.course = "PG Program in Data Science, Machine Learning and Neural Networks";
  } else if (array.course == 1) {
    array.course = "PG Program in Investment Banking and Financial Modeling";
  } else if (array.course == 2) {
    array.course = "PG Program In Human Resource Management";
  } else if (array.course == 3) {
    array.course = "PG Program in E-Commerce and Business Analytics";
  } else if (array.course == 4) {
    array.course = "PG Program in Full Stack Development Engineering";
  }
}


onBeforeMount(() => {
  api.get("edit-project", {
    params: { project_id: route.params.id,is_project:1 }
  }).then((response) => {
    data.files = response.data.files
    data.params = response.data.params
    data.project = response.data.data
    convertCourseCode(data.project)
  });
});

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

.ProjectDetails {
  display: flex;
  justify-content: flex-start;
}

.projectBox {
  width: 55%;
  overflow-y: scroll;
  height: 100vh;
}

.paramsBox {
  width: 44%;

}

.scoring {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 45px;

}

.view-btn {
  width: 100%;
  height: 40px;
}
</style>
