<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <div class="row">
              <q-btn flat round color="white" text-color="positive" class="q-mr-sm" icon="arrow_back" id="back-btn"
                to="/assignments">
                <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
                  transition-hide="scale">
                  Back to Assignments
                </q-tooltip>
              </q-btn>
              <h5 class="q-ma-none q-pt-xs" id="head-1">Add Assignment</h5>
            </div>
            <div>
              <q-btn style="width: 100%;" class=" create-btn" @click="createAssignment" label="Add Assignment"></q-btn>
            </div>
          </div>
          <div class="col-12 ProjectDetails d-flex">
            <div class="projectBox  q-mr-sm">
              <div class="row  q-pa-md">
                <div class="col-md-12 q-pr-sm">
                  <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                    Assignment Title
                  </label>
                  <q-input dense outlined color="secondary" v-model="title" class="col-md-12 " lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please Enter Title']" />
                </div>
                <div class="col-6 q-pr-sm">
                  <label class="q-pa-xs" style="font-weight: 600">
                    Course
                  </label>
                  <q-select dense outlined :options="courseOptions" emit-value map-options color="secondary"
                    v-model="course" class="col-md-12 " />
                </div>
                <div class="col-6 q-pr-sm">
                  <label class="q-pa-xs" style="font-weight: 600">
                    Assignment Type
                  </label>
                  <q-select dense outlined :options="typeOptions" emit-value map-options color="secondary" v-model="type"
                    class="col-md-12 " />
                </div>
                <div class="col-12">
                  <div class="row ">
                    <label class=" q-pt-md col-md-12" style="font-weight: 600">
                      Description :
                    </label>
                    <q-editor v-model="qeditor" :dense="$q.screen.lt.md" class="col-12" :toolbar="[
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
              </div>
            </div>
            <div class="paramsBox  q-ml-sm">
              <div class="shadowBoder">
                <h6 class="q-ma-sm"> Assignment Scoring Parameters</h6>
                <div class="row" v-for="item in form.marks">
                  <div class="col-8 q-mb-sm scoring">
                    <q-input dense square filled type="text" lazy-rules v-model="item.name" />
                  </div>
                  <div class="col-2 q-pl-sm scoring">
                    <q-input dense filled color="secondary" type="number" lazy-rules v-model="item.max_marks" />
                  </div>
                  <div class="col-md-1 q-pl-sm ">
                    <q-btn icon="add" color="primary" square class="view-btn q-mr-lg" @click="addRow(id = item.id)"></q-btn>
                  </div>
                  <div class="col-md-1 q-pl-sm ">
                    <q-btn icon="remove" color="primary" square class="view-btn" @click="removeRow(id = item.id)"></q-btn>
                  </div>
                </div>
              </div>
              <div class="shadowBoder">
                <h6 class="q-ma-sm"> Assignment Files</h6>
                <div class="row" v-for="item in file.files" :key="item.id">
                  <div class="col-10 q-mb-sm scoring ">
                    <q-file dense square filled v-model="item.file" class="category-name"></q-file>
                  </div>
                  <div class="col-md-1 q-pl-sm ">
                    <q-btn icon="add" color="primary" square class="view-btn q-mr-lg"
                      @click="addFile(id = item.id)"></q-btn>
                  </div>
                  <div class="col-md-1 q-pl-sm ">
                    <q-btn icon="remove" color="primary" square class="view-btn" @click="removeFile(id = item.id)"></q-btn>
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
const article_id = route.params.id;
const check = ref(false);
const pickFile = ref(null);
const qeditor = ref("<pre>Text Here...</pre>")
const title = ref('')
const course = ref(null)
const type = ref(null)

const fab = ref(false);
let count = 1;
const assignment = reactive({
  file: [],
  FormData: null
});

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

const typeOptions = [
  {
    label: 'Practice',
    value: 0,
  },
  {
    label: 'Evaluation',
    value: 1,
  },
  {
    label: 'Extra',
    value: 2,
  },
]

const form = reactive({
  marks: [
    {
      id: 1,
      row: "",
      name: "",
      max_marks: "",

    }
  ]
}
)

const addRow = (id) => {
  if (form.marks.length < 10) {
    form.marks.push({
      id: id + 1,
      name: "",
      max_marks: ""
    })
  }
}

const removeRow = (id) => {
  if (form.marks.length > 1) {
    form.marks.splice(--id, 1)
    while (id <= form.marks.length - 1) {
      form.marks[id].id = ++id;
    }
  }
}


const file = reactive({
  files: [
    {
      id: 1,
      file: '',
    }
  ]
})

const addFile = (id) => {
  file.files.push({
    id: id + 1,
    file: '',
  })
}

const removeFile = (id) => {
  if (file.files.length > 1) {
    file.files.splice(--id, 1)
    while (id <= file.files.length - 1) {
      file.files[id].id = ++id;
    }
  }
}

const createAssignment = () => {
  let params = []
  assignment.FormData = new FormData();
  assignment.FormData.append("title", title.value)
  assignment.FormData.append("type", type.value)
  assignment.FormData.append("course", course.value)
  assignment.FormData.append("description", qeditor.value)
  assignment.FormData.append("is_project", 0)
  form.marks.forEach(file => params.push({ name: file.name, max_marks: file.max_marks }))
  // params.forEach(file => assignment.FormData.append('params[]', JSON.stringify(file)))
  assignment.FormData.append('params', JSON.stringify(form.marks))

  file.files.forEach(file => assignment.FormData.append('files[]', file.file))
  // project.FormData.append("params[]",params)
  api.post('create-project', assignment.FormData, {
    header: {
      "content-type": "multipart/form-data",
    },
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    router.push('/assignments')
  }).catch((error) => {
    console.log(error)
  })
}
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
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1);
}

.paramsBox {
  width: 44%;

}

.scoring {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.view-btn {
  width: 100%;
  height: 40px;
}
</style>
