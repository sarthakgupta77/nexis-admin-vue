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
          <h5 class="q-ma-none" id="head-1">Edit Assessment</h5>
        </div>
      </div>
      <div class="table-container shadowBoder" style="background-color: white;">
        <div class="q-pa-md q-pr-xs" style="width: auto">
          <q-form>
            <q-card bordered v-if="!questionsArea">
              <q-card-section class="q-pa-sm row">
                <div class="row col-12">
                  <div class="col-md-4 row q-px-sm">
                    <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                      Assessment Title
                    </label>
                    <q-input dense outlined color="secondary" v-model="data.assessmentDetails.title" class="col-md-12 " lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Enter Title']" />
                  </div>
                  <div class="col-md-4 row q-px-sm">
                    <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                      Course Name
                    </label>
                    <q-select dense outlined color="secondary" v-model="data.assessmentDetails.course" :options="courseOptions"
                      emit-value map-options class="col-md-12 " lazy-rules
                      :rules="[val => val !== null || 'Please Select a Course']" />
                  </div>
                  <div class="col-md-4 row q-px-sm">
                    <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                      Type
                    </label>
                    <q-select dense outlined color="secondary" v-model="data.assessmentDetails.type" :options="types"
                      class="col-md-12 " lazy-rules emit-value map-options
                      :rules="[val => val !== null || 'Please Select an Assessment Type']" />
                  </div>
                </div>
                <div class="col-12 row">
                  <div class="col-md-3 row q-px-sm">
                    <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                      Attempts
                    </label>
                    <q-input dense outlined color="secondary" type="number" v-model="data.assessmentDetails.attempt"
                      class="col-md-12 " lazy-rules
                      :rules="[val => val !== null || 'Please Enter Number of Attempts allowed for Assessment']" />
                  </div>
                  <div class="col-md-3 row q-px-sm">
                    <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                      Certificate
                    </label>
                    <q-select dense outlined color="secondary" v-model="data.assessmentDetails.certificate"
                      :options="certificateOptions" class="col-md-12 " lazy-rules emit-value map-options
                      :rules="[val => val !== null || 'Please Select if the Assessment issues a Certificate']" />
                  </div>
                  <div class="col-md-3 row q-px-sm">
                    <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                      Duration
                    </label>
                    <q-input dense outlined type="number" color="secondary" v-model="data.assessmentDetails.duration"
                      class="col-md-12 " lazy-rules
                      :rules="[val => val !== '' || 'Please Enter Duration of Assessment']" />
                  </div>
                  <div class="col-md-3 row q-px-sm">
                    <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                      Max Marks
                    </label>
                    <q-input dense type="number" outlined color="secondary" v-model="data.assessmentDetails.criteria"
                      class="col-md-12 " lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Specify Max Marks for the Assessment']" />
                  </div>
                </div>
                <div class="col-12 q-pa-sm">
                  <div class="row ">
                    <label class=" q-pa-sm col-md-12" style="font-weight: 600">
                      Description :
                    </label>
                    <q-editor v-model="data.assessmentDetails.instructions" :dense="$q.screen.lt.md" class="col-12" :toolbar="[
                      [
                        {
                          label: $q.lang.editor.align,
                          icon: $q.iconSet.editor.align,
                          fixedLabel: true,
                          options: ['left', 'center', 'right', 'justify']
                        }
                      ],
                      ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                      ['token', 'hr', 'link', 'custom_btn'],
                      [
                        {
                          label: $q.lang.editor.fontSize,
                          icon: $q.iconSet.editor.fontSize,
                          fixedLabel: true,
                          fixedIcon: true,
                          list: 'no-icons',
                          options: [
                            'size-1',
                            'size-2',
                            'size-3',
                            'size-4',
                            'size-5',
                            'size-6',
                            'size-7'
                          ]
                        },
                        {
                          label: $q.lang.editor.defaultFont,
                          icon: $q.iconSet.editor.font,
                          fixedIcon: true,
                          list: 'no-icons',
                          options: [
                            'default_font',
                            'arial',
                            'arial_black',
                            'comic_sans',
                            'courier_new',
                            'impact',
                            'lucida_grande',
                            'times_new_roman',
                            'verdana'
                          ]
                        },
                        'removeFormat'
                      ],
                      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                      ['viewsource'],
                      ['fullscreen'],

                    ]" :fonts="{
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
}" />
                  </div>
                </div>
              </q-card-section>
              <div class="create-event-btn q-pa-md">
                <q-btn outline label="Clear" type="reset" color="primary" class="q-mr-md" />

                <q-btn class="submit-btn" label="Next" @click="questionsArea = true" />
              </div>
            </q-card>
            <template v-if="questionsArea">
              <q-card bordered v-for="questions in Assessment.assessment" class="q-my-md">
                <q-card-section class="q-mt-md row">
                  <q-card bordered flat class="col-12 q-my-sm">
                    <q-card-section>
                      <div class="col-12 row" style="align-items: center;">
                        <label class="w700 q-mx-sm" style="font-size: 17px;">Q{{ questions.id }}.</label>
                        <q-editor dense v-model="questions.question" class="col-10 bg-grey-3 text-black"
                          min-height="3rem" />
                        <q-input dense class="q-ml-md col-1" type="number" v-model="questions.max_marks" suffix="marks" />
                        <q-btn v-if="Assessment.assessment.length == 1" icon="add" size="md" round flat
                          @click="addQuestion(id = questions.id)" class="q-ml-sm bg-primary text-white" />
                        <q-fab v-else color="primary" text-color="white" icon="more_vert" direction="left" class="q-ml-sm"
                          padding="sm">
                          <q-fab-action color="green" text-color="white" icon="add"
                            @click="addQuestion(id = questions.id)" />
                          <q-fab-action color="red" text-color="white" icon="delete"
                            @click="removeQuestion(id = questions.id)" />
                        </q-fab>
                      </div>
                    </q-card-section>
                  </q-card>
                  <q-card flat bordered class="col-12 q-my-sm">
                    <q-card-section>
                      <template v-if="questions.type == 'objective'">
                        <div class="col-12 q-py-md row" v-for="options in questions.mcqAnswers" :key="options.id">
                          <div class="col-12 row" style="justify-content: center;">
                            <q-checkbox class="q-mx-sm" v-model="options.option" false-value="0" true-value="1" />
                            <q-input dense borderless v-model="options.value"
                              class="col-11 q-px-md bg-grey-3 text-black" />
                          </div>
                        </div>
                      </template>
                      <template v-if="questions.type == 'boolean'">
                        <div class="col-12 q-py-md row" v-for="options in questions.trueFalseAnswers" :key="options.id">
                          <div class="col-12 row" style="justify-content: center;">
                            <q-checkbox class="q-mx-sm" v-model="options.option" false-value="0" true-value="1" />
                            <q-input dense borderless v-model="options.value"
                              class="col-11 q-px-md bg-grey-3 text-black" />
                          </div>
                        </div>
                      </template>
                      <template v-if="questions.type == 'subjective'">
                        <div class="col-12 q-py-md row">
                          <q-input v-model="questions.subjectiveAnswers" class="col-12 q-pa-md" outlined dense
                            type="textarea" />
                        </div>
                      </template>
                      <div class="col-12 q-py-md row" style="justify-content: flex-end;">
                        <q-select dense outlined class="col-2 q-px-md" v-model="questions.type" :options="questionType"
                          emit-value map-options />
                      </div>
                    </q-card-section>
                  </q-card>
                </q-card-section>
              </q-card>
              <div class="create-event-btn q-pa-lg">
                <q-btn flat label="Back" color="primary" @click="questionsArea = false" class="q-mr-md" />
                <q-btn outline label="Reset" type="reset" color="primary" class="q-mr-md" />
                <q-btn class="submit-btn" label="Edit Assessment" @click="updateAssessment" />
              </div>
            </template>
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
const types = [
  {
    label: 'Practice',
    value: 0
  },
  {
    label: 'Evaluation',
    value: 1
  },
  {
    label: 'Extra',
    value: 2
  },
]
const categories = [
  {
    label: 'Objective',
    value: 1
  },
  {
    label: 'Subjective',
    value: 0
  }
]
const certificateOptions = [
  {
    label: 'Yes',
    value: 1
  },
  {
    label: 'No',
    value: 0
  },
]

const courseOptions = [
  {
    label: 'Program in Data Science, Machine Learning and Neural Networks',
    value: 0,
  },
  {
    label: 'PG Program in Investment Banking and Financial Modeling',
    value: 1,
  },
  {
    label: 'PG Program In Human Resource Management',
    value: 2,
  },
  {
    label: 'PG Program in E-Commerce and Business Analytics',
    value: 3,
  },
  {
    label: 'PG Program in Full Stack Development Engineering',
    value: 4,
  },
]

const data = reactive({
  assessmentDetails: [],
  questions: []
})

const Assessment = reactive({
  assessment: [
    {
      id: 1,
      max_marks: null,
      type: 'objective',
      question: '',
      mcqAnswers: [
        { id: 1, option: '0', value: '' },
        { id: 2, option: '0', value: '' },
        { id: 3, option: '0', value: '' },
        { id: 4, option: '0', value: '' },
      ],
      trueFalseAnswers: [
        { id: 1, option: '0', value: 'True' },
        { id: 2, option: '0', value: 'False' },
      ],
      subjectiveAnswers: 'Type Your Answer here...'
    }
  ]
}
)
const questionType = [
  {
    label: 'Multiple Choice',
    value: 'objective'
  },
  {
    label: 'True/False',
    value: 'boolean'
  },
  {
    label: 'Subjective',
    value: 'subjective'
  },
]

const addQuestion = (id) => {
  if (Assessment.assessment.length < 2) {
    Assessment.assessment.push({
      id: id + 1,
      max_marks: null,
      type: Assessment.assessment[id - 1].type,
      question: '',
      mcqAnswers: [
        { id: 1, option: '0', value: '' },
        { id: 2, option: '0', value: '' },
        { id: 3, option: '0', value: '' },
        { id: 4, option: '0', value: '' },
      ],
      trueFalseAnswers: [
        { id: 1, option: '0', value: 'True' },
        { id: 2, option: '0', value: 'False' },
      ],
      subjectiveAnswers: 'Type Your Answer here...'
    })
  }
  else {
    Assessment.assessment.splice(id, 0, {
      id: id + 1,
      max_marks: null,
      type: Assessment.assessment[id - 1].type,
      question: '',
      mcqAnswers: [
        { id: 1, option: '0', value: '' },
        { id: 2, option: '0', value: '' },
        { id: 3, option: '0', value: '' },
        { id: 4, option: '0', value: '' },
      ],
      trueFalseAnswers: [
        { id: 1, option: '0', value: 'True' },
        { id: 2, option: '0', value: 'False' },
      ],
      subjectiveAnswers: 'Type Your Answer here...'
    })
    while (id < Assessment.assessment.length - 1) {
      Assessment.assessment[++id].id = id + 1
    }
  }
}

const removeQuestion = (id) => {
  Assessment.assessment.splice(--id, 1)
  while (id <= Assessment.assessment.length - 1) {
    Assessment.assessment[id].id = ++id
  }
}

const updateAssessment = () => {
  Assessment.assessment.forEach((assessment) => {
    switch (assessment.type) {
      case 'objective':
        assessment.subjectiveAnswers = null
        assessment.trueFalseAnswers = null
        break;
      case 'subjective':
        assessment.mcqAnswers = null
        assessment.trueFalseAnswers = null
        break;
      case 'boolean':
        assessment.mcqAnswers = null
        assessment.subjectiveAnswers = null
    }
  })
  api.post('update-assessment', {
    assessment_id: route.params.id,
    title: data.assessmentDetails.title,
    content: JSON.stringify(Assessment.assessment),
    course: data.assessmentDetails.course,
    type: data.assessmentDetails.type,
    instructions: data.assessmentDetails.instructions,
    duration: data.assessmentDetails.duration,
    criteria: data.assessmentDetails.criteria,
    attempt: data.assessmentDetails.attempt,
    certificate: data.assessmentDetails.certificate
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'blue',
      message: response.data.msg
    })
    router.push('/assessments')
  }).catch((err) => {
    console.log('Error', err)
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
  api.get('edit-assessment', { params: { assessment_id: route.params.id } }).then((response) => {
    data.assessmentDetails = response.data.assessments
    data.assessmentDetails.course = Number(data.assessmentDetails.course)
    data.questions = JSON.parse(data.assessmentDetails.content_ques)
    data.questions.forEach((question) => {
      switch (question.type) {
        case 'objective':
          question.trueFalseAnswers = Assessment.assessment[0].trueFalseAnswers
          question.subjectiveAnswers = Assessment.assessment[0].subjectiveAnswers
          break;
        case 'subjective':
          question.trueFalseAnswers = Assessment.assessment[0].trueFalseAnswers
          question.mcqAnswers = Assessment.assessment[0].mcqAnswers
          break;
        case 'boolean':
          question.mcqAnswers = Assessment.assessment[0].mcqAnswers
          question.subjectiveAnswers = Assessment.assessment[0].subjectiveAnswers
          break;
      }
    })
    Loading.hide()
  }).finally(()=>{
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
  justify-content: flex-start;

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
