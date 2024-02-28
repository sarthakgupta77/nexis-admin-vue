<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="heading">
        <div class="head-btn-box shadowBoder">
          <!-- <q-btn flat round color="white" text-color="positive" icon="arrow_back" id="back-btn" to="/all-articles">
              <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
                transition-hide="scale">
                Back to Articles
              </q-tooltip>
            </q-btn> -->
          <h5 class="q-ma-none" id="head-1">Students Feedback Form</h5>

        </div>

        <div class="table-container shadowBoder">
          <div class="q-pa-md" style="width: auto">
            <q-form class="q-gutter-xs" @submit="addArticle" @reset="onReset">
              <div class="row">
                <div class="col-md-6">
                  <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                    Student Email
                  </label>
                  <q-input dense outlined color="secondary" class="col-md-6 q-pr-md" v-model="feedback.email" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please Fill News Title']" />
                </div>
                <div class="col-md-6 ">
                  <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                    Result
                  </label>

                  <q-select :options="options" dense outlined v-model="feedback.result" color="secondary"
                    class="col-md-6 q-pr-md" emit-value map-options>
                  </q-select>
                </div>




                <div class="col-md-6">
                  <label class="col-md-12 q-pa-xs" style="font-weight: 600">

                    Subject
                  </label>
                  <q-select :options="subjectOptions" dense outlined v-model="feedback.subject" color="secondary"
                    class="col-md-6 q-pr-md" emit-value map-options>
                  </q-select>
                </div>

                <div class="col-md-6">
                  <label class="col-md-12 q-pa-xs" style="font-weight: 600">

                    Video Link
                  </label>
                  <q-input dense outlined color="secondary" class="col-md-6 q-pr-md" v-model="feedback.link" lazy-rules
                    :rules="[val => val && val.length > 0 || 'Please Provide Link']" />
                </div>

              </div>

              <div class="row">
                <label class="col-md-12" style="font-weight: 600">
                  Description
                </label>
                <!-- <q-input dense outlined type="textaria" color="secondary" class="col-md-12 q-pr-sm" v-model="event.description" /> -->
                <q-editor v-model="feedback.description" :dense="$q.screen.lt.md" class="col-12" :toolbar="[
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


              <div class="create-event-btn q-mt-lg">
                <q-btn outline label="Reset" type="reset" color="primary" class="q-mr-md" />

                <q-btn class="submit-btn" label="send" type="submit" />
              </div>


            </q-form>

          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onBeforeMount, reactive, render } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "../../../boot/axios";
import { Notify } from "quasar";

const route = useRoute();
const router = useRouter();
const options = [
  {
    label: 'Passed',
    value: 1,
  },
  {
    label: 'failed',
    value: 0
  }
];

const subjectOptions = [
  {
    label: "feedback of the Technical Mock Interview",
    value: 1,
  }
]


const feedback = reactive({
  email: null,
  link: null,
  subject: 1,
  description: ("<pre>Dear Student, <br>Greetings for the day! <br><br>As you have completed your mock interview, we're sharing with you the feedback of the Technical Mock Interview. <br><strong><u>Feedback</u> : </strong> <br><br>Please note that you can raise a ticket for any further clarification on this by clicking 'Ask Doubts' in the menu section and selecting query type 'Placements > Pre-Placement process and Mock Interviews'. <br><br><br>Regards<br>Placements Team<br>Data Trained Education  </pre>"),
  FormData: null,
  result: null,
});

// const uploadFile = () => {
//   article.disable = true;
//   article.FormData = new FormData();
//   article.FormData.append("file", article.file);
//   api2
//     .post("add-article", article.FormData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//     .then((res) => {
//       // console.log(res)
//       data.attachments += '<br><a href="https://genesis.datatrained.com/' + res.data.path +  '" target="_blank">File Attachment</a>';
//       data.file = null;
//       data.disable = false;
//     });
// };


const addArticle = () => {

  article.FormData = new FormData();
  article.FormData.append("image", article.file),
    article.FormData.append("title", article.title),
    article.FormData.append("link", article.link),
    article.FormData.append("status", article.status),

    api.post('add-article', article.FormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(function (response) {
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'green',
        message: 'Article Added Successfully'
      }),
        router.push('/all-articles');
    })
      .catch(function (error) {
        console.log(error);
      });
}
const onReset = () => {
  feedback.email = null;
  feedback.link = null;
  feedback.description = "<pre>Dear Student, <br>Greetings for the day! <br><br>As you have completed your mock interview, we're sharing with you the feedback of the Technical Mock Interview. <br><strong><u>Feedback</u> : </strong> <br><br>Please note that you can raise a ticket for any further clarification on this by clicking 'Ask Doubts' in the menu section and selecting query type 'Placements > Pre-Placement process and Mock Interviews'. <br><br><br>Regards<br>Placements Team<br>Data Trained Education  </pre>";
}

onBeforeMount(()=>{
  // const rights = access.filter(checkEvent);
  // rights.forEach(function (el) {
  //   let key = el.split('.')[1]
  //   if (el.includes('mock-interview')) {
  //     state[key] = true
  //   }

  // });

  // function checkEvent(keys) {
  //   return keys.includes('mock-interview');
  // }
})
</script>

<style scoped>
.head-btn-box {
  width: auto;
  background-color: #fff;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}


.container {
  width: auto;
  height: 100%;
}

.head-aling {
  display: flex;
  flex-direction: row;
}

.head-2 {
  font-size: 20px;
  font-weight: 500;
}

.table-container {
  background-color: #fff;
  width: auto;
}

.right-sift {
  float: right;
  width: 1px;
  height: 40px;
  border-bottom: 1px solid #acb5be;
  margin-right: -10px;
}

.sub-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
