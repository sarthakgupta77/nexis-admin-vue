<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="heading">
        <div class="head-btn-box shadowBoder">
          <q-btn flat round color="white" text-color="positive" icon="arrow_back" id="back-btn"
            to="/assessments/my-assigned">
            <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
              transition-hide="scale">
              Back to My Assigned Assessments
            </q-tooltip>
          </q-btn>
          <h5 class="q-ma-none" id="head-1">View Assigned Assessment</h5>
        </div>
      </div>
      <div class="table-container shadowBoder" style="background-color: white;">
        <div class="q-pr-xs" style="width: auto">
          <q-form>
            <q-card bordered>
              <q-card-section class="q-pa-md">
                <div class="row" style="align-items: baseline;">
                  <div class="row col-6">
                    <div class="col-md-5">
                      <b class="text-subtitle1 w600">Assessment Title :</b><span class="q-px-md"> {{
                        data.assessmentDetails.title }} </span>
                    </div>
                    <div class="col-md-5">
                      <b class="text-subtitle1 w600">Course Name :</b><span class="q-px-md"> {{
                        data.assessmentDetails.course }} </span>
                    </div>
                    <div class="col-2">
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
                  <div class="col-6 row" style="align-items: center">
                    <div class="col-md-3">
                      <b class="text-subtitle1 w600">Attempts :</b><span class="q-px-md"> {{ data.assessmentDetails.attempt
                      }} </span>
                    </div>
                    <div class="col-3" v-if="data.assessmentDetails.certificate">
                      <b>Certificate: </b> &nbsp; Yes
                    </div>
                    <div class="col-3" v-else>
                      <b>Certificate: </b> &nbsp; No
                    </div>
                    <div class="col-md-3">
                      <b class="text-subtitle1 w600">Duration :</b><span class="q-px-md"> {{ data.assessmentDetails.duration
                      }} Min </span>
                    </div>
                    <div class="col-md-3">
                      <b class="text-subtitle1 w600">Max Marks :</b><span class="q-px-md"> {{
                        data.assessmentDetails.max_marks }} </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <b class="text-subtitle1 w600">Description :</b>
                    <span class="q-px-md"> {{ data.assessmentDetails.instructions }} </span>
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <q-list class="q-mt-md" bordered>
              <q-expansion-item v-model="objective">
                <template v-slot:header>
                  <q-item-section>
                    Objective
                  </q-item-section>
                  <q-item-section side>
                    Marks ( {{ objectiveObtMarks }} / {{ objectiveTotal }} )
                  </q-item-section>
                </template>
                <q-card bordered v-for="questions in data.objective" class="q-my-md">
                  <q-card-section class="q-mt-md row">
                    <q-card bordered flat class="col-12 q-my-sm">
                      <q-card-section>
                        <div class="col-12 row" style="align-items: center;">
                          <div class="col-10 row">
                            <b>Q{{ questions.id }}.</b>
                            <pre v-html="questions.question" class="q-px-md q-ma-none col-11 text-bold"></pre>
                          </div>
                          <div class="col-2 row">
                            <b> Max Marks: &nbsp;
                              <span>{{ questions.max_marks }}</span>
                            </b>
                            <div class="col-12 row q-py-sm" style="align-items: baseline;">
                              <b class="col-7">Obtained Marks :</b>
                              <q-input outlined dense type="number" class="col-5" v-model="questions.obt_marks" />
                            </div>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                    <q-card flat bordered class="col-12 q-my-sm">
                      <q-card-section>
                        <template v-if="questions.type == 'objective'">
                          <div class="col-12 q-py-md row" v-for="options in questions.mcqAnswers">
                            <div v-if="questions.marked_answer == options.id" class="col-12 row"
                              style="align-items: center; background-color: #75c204">
                              <q-checkbox disable class="q-mx-sm" v-model="options.option" false-value="0"
                                true-value="1" />
                              <pre class="q-ma-none col-11 q-px-md">{{ options.value }}</pre>
                            </div>
                            <div v-else class="col-12 row" style="align-items: center;">
                              <q-checkbox disable class="q-mx-sm" v-model="options.option" false-value="0"
                                true-value="1" />
                              <pre class="q-ma-none col-11 q-px-md">{{ options.value }}</pre>
                            </div>
                          </div>
                        </template>
                        <template v-if="questions.type == 'boolean'">
                          <div class="col-12 q-py-md row" v-for="options in questions.trueFalseAnswers">
                            <div v-if="questions.marked_answer == options.id" class="col-12 row"
                              style="align-items: center; background-color: #75c204">
                              <q-checkbox disable class="q-mx-sm" v-model="options.option" false-value="0"
                                true-value="1" />
                              <pre class="q-ma-none col-11 q-px-md">{{ options.value }}</pre>
                            </div>
                            <div v-else class="col-12 row" style="align-items: center;">
                              <q-checkbox disable class="q-mx-sm" v-model="options.option" false-value="0"
                                true-value="1" />
                              <pre class="q-ma-none col-11 q-px-md">{{ options.value }}</pre>
                            </div>
                          </div>
                        </template>
                      </q-card-section>
                    </q-card>
                  </q-card-section>
                </q-card>
                <q-card>
                  <div class="q-pa-md row" style="justify-content:flex-end;">
                    <q-btn class="submit-btn" label="Submit Changes" @click="changeMarks(id = 1)" />
                  </div>
                </q-card>
              </q-expansion-item>
            </q-list>
            <q-list class="q-mt-md" bordered>
              <q-expansion-item v-model="subjective">
                <template v-slot:header>
                  <q-item-section>
                    Subjective
                  </q-item-section>
                  <q-item-section side>
                    Marks ( {{ subjectiveObtMarks }} / {{ subjectiveTotal }} )
                  </q-item-section>
                </template>
                <q-card bordered v-for="questions in data.subjective" class="q-my-md">
                  <q-card-section class="q-mt-md row">
                    <q-card bordered flat class="col-12 q-my-sm">
                      <q-card-section>
                        <div class="col-12 row" style="align-items: center;">
                          <div class="col-10 row">
                            <b>Q{{ questions.id }}.</b>
                            <pre v-html="questions.question" class="q-px-md q-ma-none col-11 text-bold"></pre>
                          </div>
                          <div class="col-2 row">
                            <b> Max Marks: &nbsp;
                              <span>{{ questions.max_marks }}</span>
                            </b>
                            <div class="col-12 row q-py-sm" style="align-items: baseline;">
                              <b class="col-7">Obtained Marks :</b>
                              <q-input outlined dense type="number" class="col-5" v-model="questions.obt_marks" />
                            </div>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                    <q-card flat bordered class="col-12 q-my-sm">
                      <q-card-section>
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
                <q-card>
                  <div class="q-pa-md row" style="justify-content:flex-end;">
                    <q-btn class="submit-btn" label="Submit Changes" @click="changeMarks(id = 0)" />
                  </div>
                </q-card>
              </q-expansion-item>
            </q-list>
          </q-form>

        </div>
      </div>
      <div class="shadowBoder">
        <b class="text-h6">Total Marks : &nbsp;<span> {{ data.assessmentDetails.obt_marks }} / {{ data.assessmentDetails.max_marks }} </span></b>
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
const objective = ref(false);
const subjective = ref(true)
const objectiveObtMarks = ref(0)
const subjectiveObtMarks = ref(0)
const objectiveTotal = ref(0)
const subjectiveTotal = ref(0)

const data = reactive({
  assessmentDetails: [],
  questions: [],
  objective: [],
  subjective: []
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

const checkAnswers = (array) => {
  array.forEach((ele) => {
    if (ele.type == 'objective') {
      let obj = ele.mcqAnswers.find(({ id }) => id == ele.marked_answer)
      if (obj.option == 1) {
        ele.obt_marks = Number(ele.max_marks)
      } else {
        ele.obt_marks = 0
      }
    } else if (ele.type == 'boolean') {
      let obj = ele.trueFalseAnswers.find(({ id }) => id == ele.marked_answer)
      if (obj.option == 1) {
        ele.obt_marks = Number(ele.max_marks)
      } else {
        ele.obt_marks = 0
      }
    } else {
      ele.obt_marks = null
    }
  })
}

const changeMarks = (id) => {
  data.assessmentDetails.obt_marks = 0
  if(id == 1){
    objectiveObtMarks.value = 0
    data.objective.forEach((question) => {
      if (question.obt_marks <= question.max_marks) {
        objectiveObtMarks.value += Number(question.obt_marks)
      }
    })
    objective.value = false
  }else{
    subjectiveObtMarks.value = 0
    data.subjective.forEach((question)=>{
      if (question.obt_marks <= question.max_marks) {
        subjectiveObtMarks.value += Number(question.obt_marks)
      }
    })
    subjective.value = false
  }
  data.assessmentDetails.obt_marks = objectiveObtMarks.value + subjectiveObtMarks.value
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.get('assessment-details', { params: { assessment_key: route.params.id, student_id: route.params.student_id } }).then((response) => {
    data.assessmentDetails = response.data.assessment
    data.assessmentDetails.course = Number(data.assessmentDetails.course)
    data.questions = JSON.parse(data.assessmentDetails.content_ans)
    checkAnswers(data.questions)
    convertCourseCode(data.assessmentDetails)
    data.questions.forEach((question)=>{
      if(question.type == 'objective' || question.type == 'boolean'){
        data.objective.push(question)
      }else{
        data.subjective.push(question)
      }
    })
    data.objective.forEach((question)=>{
      objectiveObtMarks.value += Number(question.obt_marks)
      objectiveTotal.value += Number(question.max_marks)
    })
    data.subjective.forEach((question)=>{
      subjectiveObtMarks.value += Number(question.obt_marks)
      subjectiveTotal.value += Number(question.max_marks)
    })
    // console.log(objectiveTotal.value)
    Loading.hide()
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
}</style>
