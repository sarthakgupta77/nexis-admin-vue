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
                  Back to Assingments
                </q-tooltip>
              </q-btn>
              <h5 class="q-ma-none q-pt-xs" id="head-1">Edit Assingment</h5>
            </div>
            <div>
              <q-btn style="width: auto;" class="create-btn" @click="updateAssignment" label="Update Assignment"></q-btn>
            </div>
          </div>
          <div class="col-12 ProjectDetails d-flex">
            <div class="projectBox  q-mr-sm">

              <div class="row  q-pa-md">
                <div class="col-md-12 q-pr-sm">
                  <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                    Assignment Title
                  </label>
                  <q-input dense outlined color="secondary" v-model="data.assignment.title" class="col-md-12 " lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please Enter Title']" />
                </div>
                <div class="col-9 q-pr-sm">
                  <label class="q-pa-xs" style="font-weight: 600">
                    Course
                  </label>
                  <q-select dense outlined :options="courseOptions" emit-value map-options color="secondary"
                    v-model="data.assignment.course" class="col-md-12 " />

                </div>

                <div class="col-3 q-pr-sm">
                  <label class="q-pa-xs" style="font-weight: 600">
                    Assignment Type
                  </label>
                  <q-select dense outlined :options="typeOptions" emit-value map-options color="secondary"
                    v-model="data.assignment.type" class="col-md-12 " />
                </div>
              </div>
              <div>
                <div class="col-12">
                  <div class="row q-pl-xs">
                    <label class="q-pl-xs q-pb-md col-md-12" style="font-weight: 600">
                      Description :
                    </label>
                    <q-editor v-model="data.assignment.description" :dense="$q.screen.lt.md" class="col-12 descriptionScroll " :toolbar="[
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
                <h6 class="q-ma-sm"> Project Scoring Parameters</h6>
                <span v-if="data.params == ''" class="text-primary q-pa-sm">
                  No Parameters Defined For The Assignment
                </span>
                <div class="row" v-for="param in data.params" :key="param.id">
                  <div class="col-10 q-mb-sm scoring">

                    <q-input dense square filled v-model="param.name" class="category-name"></q-input>
                  </div>
                  <div class="col-2 q-pl-sm scoring">

                    <q-input dense square filled v-model="param.max_marks" class="category-name"></q-input>
                  </div>
                </div>
              </div>
              <div class="shadowBoder">
                <h6 class="q-ma-sm"> Project Files</h6>
                <span v-if="data.files == ''" class="text-primary q-pa-sm">
                  No Files Attached For The Assignment
                </span>
                <div class="row" v-for="file in data.files" :key="file.id">

                  <div class="col-1  q-pr-sm  ">
                    <q-checkbox style="font-size: 20px;" v-model="file.check" />
                  </div>

                  <div class="col-9 q-mb-sm scoring ">

                    <q-input dense square filled v-model="file.file_name" class="category-name"></q-input>

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
const article_id = route.params.id;
const check = ref(false);



const fab = ref(false);
let count = 1;
const data = reactive({
  files: [],
  params: [],
  assignment: [],
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

const updateAssignment = () => {
  data.FormData = new FormData();

  data.FormData.append("project_id", data.assignment.id),
  data.FormData.append("is_project", 0),
  data.FormData.append("title", data.assignment.title)
  data.FormData.append("type", data.assignment.type)
  data.FormData.append("course", data.assignment.course)
  data.FormData.append("description", data.assignment.description)
  // project.FormData.append("is_project", 1)
  // data.FormData.forEach(params => data.FormData.append( ("name", params.name), ("max_marks", params.max_marks) ))
  data.FormData.append('params',JSON.stringify(data.params))
  data.files.forEach(file => data.FormData.append('files[]', file))


  api.post("update-project", data.FormData, {
    header: {
      "content-type": "multipart/form-data",
    },
  })
    .then((response) => {
      router.push("/assignments");

      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'primary',
        message: response.data.msg
      })
      Loading.hide()

    })
    .catch((error) => {
      console.log("Error", error);
    });
};


onBeforeMount(() => {
  api.get("edit-project", {
    params: { project_id: route.params.id,
    is_project:0 }
  }).then((response) => {
    data.files = response.data.files
    data.params = response.data.params
    data.assignment = response.data.data
  });
});
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
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1);
}

.descriptionScroll{
  height: 100vh;
  overflow-y: scroll;
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
