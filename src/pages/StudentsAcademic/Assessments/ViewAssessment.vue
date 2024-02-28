<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="heading">
        <div class="head-btn-box shadowBoder">
          <q-btn flat round color="white" text-color="positive" icon="arrow_back" id="back-btn" to="/assessments">
            <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
              transition-hide="scale">
              Back to All Assessments
            </q-tooltip>
          </q-btn>
          <h5 class="q-ma-none" id="head-1">View Assessment</h5>
        </div>
      </div>
      <div class="table-container shadowBoder" style="background-color: white;">
        <div class="q-pa-md q-pr-xs" style="width: auto">
          <q-form>
            <q-card bordered>
              <q-card-section class="row text-subtitle1">
                <div class="col-12 row q-pa-sm" style="align-items: flex-end">
                  <div class="col-5">
                    <b>Assessment Title: </b> &nbsp; {{ data.assessmentDetails.title }}
                  </div>
                  <div class="col-6">
                    <b>Course Name: </b> &nbsp; {{ data.assessmentDetails.course }}
                  </div>
                  <div class="col-1">
                    <div v-if="data.assessmentDetails.type == 1">
                      <q-chip color="green-5" text-color="white">
                        Evaluation
                      </q-chip>
                      <br />
                    </div>
                    <div v-else-if="data.assessmentDetails.type == 0">
                      <q-chip color="blue-5" text-color="white">
                        Practice
                      </q-chip>
                      <br />
                    </div>
                    <div v-else-if="data.assessmentDetails.type == 2">
                      <q-chip color="grey-5" text-color="white"> Extra </q-chip>
                      <br />
                    </div>
                  </div>
                </div>
                <div class="col-12 row q-pa-sm">
                  <div class="col-3">
                    <b>Attempts: </b> &nbsp; {{ data.assessmentDetails.attempt }}
                  </div>
                  <div class="col-3" v-if="data.assessmentDetails.certificate">
                    <b>Certificate: </b> &nbsp; Yes
                  </div>
                  <div class="col-3" v-else>
                    <b>Certificate: </b> &nbsp; No
                  </div>
                  <div class="col-3">
                    <b>Duration: </b> &nbsp; {{ data.assessmentDetails.duration }} Min
                  </div>
                  <div class="col-3">
                    <b>Max Marks: </b> &nbsp; {{ data.assessmentDetails.criteria }}
                  </div>
                </div>

                <div class="col-12 row q-pa-sm">
                  <b class="col-12">Instructions:</b>
                  <p class="col-12 q-ma-none" v-html="data.assessmentDetails.instructions"></p>
                </div>
              </q-card-section>
            </q-card>
            <q-card bordered v-for="questions in Assessment.assessment" class="q-my-md">
              <q-card-section class="q-mt-md row">
                <q-card bordered flat class="col-12 q-my-sm">
                  <q-card-section>
                    <div class="col-12 row" style="align-items: center;">
                      <div class="col-11 row">
                        <b>Q{{ questions.id }}.</b>
                        <pre v-html="questions.question" class="q-px-md q-ma-none col-11 text-bold"></pre>
                      </div>
                      <span>{{ questions.max_marks }} Marks</span>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card flat bordered class="col-12 q-my-sm">
                  <q-card-section>
                    <template v-if="questions.type == 'objective'">
                      <div class="col-12 q-py-md row" v-for="options in questions.mcqAnswers">
                        <div class="col-12 row" style="align-items: center;">
                          <q-checkbox disable class="q-mx-sm" v-model="options.option" false-value="0" true-value="1" />
                          <pre class="q-ma-none col-11 q-px-md">{{ options.value }}</pre>
                        </div>
                      </div>
                    </template>
                    <template v-if="questions.type == 'boolean'">
                      <div class="col-12 q-py-md row" v-for="options in questions.trueFalseAnswers">
                        <div class="col-12 row" style="align-items: center;">
                          <q-checkbox disable class="q-mx-sm" v-model="options.option" false-value="0" true-value="1" />
                          <pre class="q-ma-none col-11 q-px-md">{{ options.value }}</pre>
                        </div>
                      </div>
                    </template>
                    <template v-if="questions.type == 'subjective'">
                      <div class="col-12 q-py-md row" style="align-items: center;">
                        <b>Ans.</b>
                        <pre class="q-ma-none col-11 q-px-md"> {{ questions.subjectiveAnswers }} </pre>
                      </div>
                    </template>
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onBeforeMount, reactive, render } from "vue";
import { api } from "../../../boot/axios";
import { Loading, QSpinnerPie, Notify } from 'quasar';

const route = useRoute();
const router = useRouter();
const questionsArea = ref(false)

const data = reactive({
  assessmentDetails: [],
  questions: []
})

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

const Assessment = reactive({
  assessment: [
    {
      id: 1,
      max_marks: null,
      type: 'objective',
      question: '',
      mcqAnswers: [
        { option: '0', value: '' },
        { option: '0', value: '' },
        { option: '0', value: '' },
        { option: '0', value: '' },
      ],
      trueFalseAnswers: [
        { option: '0', value: 'True' },
        { option: '0', value: 'False' },
      ],
      subjectiveAnswers: 'Type Your Answer here...'
    }
  ]
})

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get('edit-assessment', { params: { assessment_id: route.params.id } }).then((response) => {
    data.assessmentDetails = response.data.assessments
    convertCourseCode(data.assessmentDetails)
    data.questions = JSON.parse(data.assessmentDetails.content_ques)
    Loading.hide()
  }).finally(() => {
    Assessment.assessment = data.questions
  })
})
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
pre{
  font-family: "poppins", sans-serif;
  font-weight: 500;
}
</style>
