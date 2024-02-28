<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <q-btn flat round color="white" text-color="positive" class="q-mr-sm" icon="arrow_back" id="back-btn"
              to="/projects/my-assigned">
              <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
                transition-hide="scale">
                Back to My Assigned Projects
              </q-tooltip>
            </q-btn>
            <h5 class="q-ma-none" id="head-1">Assigned Project Details</h5>
          </div>
          <div class="row">
            <div class="col-6 q-pr-sm">
              <div class="shadowBoder" style="height: 100vh; overflow-y:scroll">
                <div class="row q-py-md">
                  <span class="col-12 q-py-sm text-h6 w600">Student Details</span>
                  <div class="col-12 row q-py-sm">
                    <span class="text-subtitle1 col-6">
                      <b>Name :</b> {{ data.project.name }}
                    </span>
                    <span class="text-subtitle1 col-6">
                      <b>Email :</b> {{ data.project.email }}
                    </span>
                  </div>
                  <div class="col-12 q-py-sm">
                    <q-separator />
                  </div>
                  <div class="col-12 row q-py-sm" style="align-items:center">
                    <span class="text-subtitle1 col-10">
                      <b>Title :</b> {{ data.project.title }}
                    </span>
                    <div class="col-2" v-if="data.project.type == 1">
                      <q-chip color="green-5" text-color="white">
                        Evaluation
                      </q-chip>
                    </div>
                    <div class="col-2" v-if="data.project.type == 0">
                      <q-chip color="blue-5" text-color="white">
                        Practice
                      </q-chip>
                    </div>
                    <div class="col-2" v-if="data.project.type == 2">
                      <q-chip color="grey-5" text-color="white">
                        Extra
                      </q-chip>
                    </div>
                    <span class="text-subtitle1 q-pt-md col-12">
                      <b>Course :</b> {{ data.project.course }}
                    </span>
                  </div>
                  <div class="col-12 row q-py-sm" style="align-items:center">
                    <span class="text-subtitle1 col-6">
                      <b>Assigned On :</b> {{ data.project.assigned_on }}
                    </span>
                    <span class="text-subtitle1 col-6">
                      <b>Due Date :</b> {{ data.project.due_date }}
                    </span>
                  </div>
                  <div class="col-12 row q-py-sm" style="align-items:center">
                    <span class="text-subtitle1 col-10">
                      <b>
                        Submission Date & Time :</b> {{ data.project.submission_date }}
                    </span>
                    <div v-if="data.project.submission === 1" class="col-2">
                      <q-chip color="indigo" class="text-center" text-color="white">
                        Submitted
                      </q-chip>
                    </div>
                    <div v-else class="col-2">
                      <q-chip color="red-5" class="text-center" text-color="white">
                        Not Submitted
                      </q-chip>
                    </div>
                  </div>
                  <div class="col-12 row q-py-sm">
                    <span class="text-subtitle1 col-6">
                      <b>
                        Link :</b> <a :href="data.project.link"> Link Here </a>
                    </span>
                  </div>
                  <div class="col-12 row q-py-sm">
                    <label class="q-py-sm col-md-12 text-subtitle1" style="font-weight: 700">
                      Description :
                    </label>
                    <div v-html="data.project.description" class="col-12" style="word-wrap: break-word;"></div>

                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 q-pl-sm">
              <div class="shadowBoder">
                <q-tabs v-model="message_tab" style=" background-color: #fff;" dense active-color="primary">
                  <q-tab name="msg1" label="Connect to Student" class="col-md-6 q-pa-sm " />
                  <q-tab name="msg2" label=" Scoring Parameters" class="col-md-6" />
                </q-tabs>
                <q-separator />
                <q-tab-panels v-model="message_tab">
                  <q-tab-panel name="msg1" class="q-pa-none">
                    <div>
                      <div class="row q-pa-md" style="align-items: center">
                        <div class="col-1 q-px-sm">
                          <img src="https://www.rotarybangkok.org/wp-content/uploads/2017/11/user-placeholder.d2a3ff8.png"
                            alt="" style="width: 38px; height: 38px; border-radius: 30px" />
                        </div>
                        <div class="row col-8" style="align-items: baseline;">
                          <label style="font-size: 18px;" class="w500 q-px-xs">
                            {{ data.project.name }}
                          </label>
                          <span style="font-size: 16px;" class="w400 q-px-xs">(Student)</span>
                        </div>
                      </div>
                      <q-separator />

                      <div class="col-12 scroll" id="chatBox">

                        <div class="q-pa-md row justify-center">
                          <span v-if="data.chat == ''" class="text-primary q-pa-sm">
                            No Chats Attached For This Student
                          </span>
                          <div v-else class="chat-box">
                            <span v-for="chats in data.chat" :key="chats.id">
                              <template v-if="chats.student_msg">
                                <q-chat-message v-if="chats.isStuMsgFile" text-html :text="[chats.student_msg]"
                                  text-color="white" bg-color="primary" />
                                <q-chat-message v-else :text="[chats.student_msg]" text-color="white"
                                  bg-color="primary" />
                              </template>
                            </span>
                            <span v-for="chats in data.chat" :key="chats.id">
                              <template v-if="chats.evaluator_msg">
                                <q-chat-message v-if="chats.isEvalMsgFile" text-html :text="[chats.evaluator_msg]"
                                  text-color="white" bg-color="primary" sent />
                                <q-chat-message v-else :text="[chats.evaluator_msg]" text-color="white" bg-color="primary"
                                  sent />
                              </template>
                            </span>
                          </div>
                        </div>

                      </div>
                      <div class="col-12 q-py-md">
                        <q-separator />
                      </div>

                      <div class="row input-section" style="align-items: center">
                        <div class="col-4" v-if="sendFile">
                          <label class="custom-file-upload row">
                            <q-icon style="font-size: 26px" name="link" class="col-2" />
                            <q-file dense borderless use-chips v-model="sendFile" class="col-10" />
                          </label>
                        </div>
                        <div class="col-1" v-else>
                          <label class="custom-file-upload">
                            <q-icon style="font-size: 26px" name="link" />
                            <q-file v-model="sendFile" style="display: none" />
                          </label>
                        </div>
                        <q-separator v-if="sendFile" vertical inset />
                        <div v-if="sendFile" class="col-7 q-pl-sm">
                          <q-input borderless type="textarea" v-model="data.sendMsg" rows="1"
                            placeholder="Write message..." class="category-name">
                          </q-input>
                        </div>
                        <div v-else class="col-10 q-pl-sm">
                          <q-input borderless type="textarea" v-model="data.sendMsg" rows="1"
                            placeholder="Write message..." class="category-name">
                          </q-input>
                        </div>
                        <div>
                          <q-btn class="q-pa-xs" color="primary" @click="sendMessage" flat icon="send" />
                        </div>
                      </div>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="msg2">
                    <h6 class="q-ma-none q-pa-sm"> Project Scoring Parameters</h6>
                    <div class="q-pa-md">
                      <span v-if="data.params == ''" class="text-primary">
                        No Parameters Defined For The Project
                      </span>
                    </div>

                    <div class="row" v-for="param in data.params" :key="param.id">
                      <div class="col-4 q-mb-sm scoring">
                        <q-input disable v-model="param.name" dense square filled class="category-name"></q-input>
                      </div>
                      <div class="col-4 q-mb-sm q-pl-sm scoring">
                        <q-input disable v-model="param.max_marks" dense square filled class="category-name"></q-input>
                      </div>
                      <div class="col-4 q-mb-sm q-pl-sm scoring">
                        <q-input v-model="param.obtained_marks" dense label="Marks" square filled
                          class="category-name"></q-input>
                      </div>
                    </div>

                    <div class=" col-12">
                      <q-btn outline color="green" style="width: 100%;" @click="submitScores" label="Submit Score" />
                    </div>


                    <div class="row q-py-md">
                      <div class="row col-8  q-pr-sm  ">
                        <q-checkbox v-model="confirm" label="Publish Scores Now" />
                      </div>
                      <div class="col-4 ">
                        <q-btn color="yellow-10" style="width: 100%;" @click="publishScores" label="Publish Score" />
                      </div>
                    </div>


                  </q-tab-panel>
                </q-tab-panels>
                <div class="shadowBoder q-my-md">
                  <div class="col-12">
                    <h6 class="q-py-sm q-ma-none"> Student Submission Files</h6>
                    <span v-if="data.files == ''" class="text-primary q-pa-sm">
                      No Files Attached For The Project
                    </span>
                    <div v-else class="row col-5">
                      <label style="font-size: 18px; font-weight: 500" class="q-py-sm">
                        Submitted Files List
                      </label>
                    </div>
                    <div class="row" v-for="file in data.files">
                      <div class="col-10 q-mb-ss scoring ">
                        <q-input dense disable square filled class="category-name" v-model="file.file_name"></q-input>
                      </div>
                      <div class="col-2 q-pl-sm  ">
                        <a :href="file.path" target="_blank">
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
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, reactive, render } from "vue";
import { api } from "../../../boot/axios";
import { useRoute, useRouter } from "vue-router";
import { Loading, LocalStorage, QSpinnerGears, Notify } from 'quasar'

let marks = []
const route = useRoute();
const router = useRouter();
const confirm = ref(false);
const message_tab = ref('msg1');
const user_id = LocalStorage.getItem('u_id')
let store = ref('')
const sendFile = ref(null)


const data = reactive({
  files: [],
  params: [],
  project: [],
  chat: [],
  sendMsg: '',
  FormData: null
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

const sendMessage = () => {
  if (data.sendMsg == '' && !sendFile) {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'red',
      message: 'You cannot send an empty message'
    })
  } else {
    data.FormData = new FormData();
    data.FormData.append('student_id', route.params.student_id)
    data.FormData.append('project_id', route.params.id)
    data.FormData.append('msg', data.sendMsg)
    data.FormData.append('user_id', user_id)
    data.FormData.append('file', sendFile.value)
    api.post("save-chat-files", data.FormData, {
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
      data.sendMsg = ''
    }).finally(() => {
      api.get("project-chat-files", {
        params: { user_id: user_id, student_id: route.params.student_id, project_id: route.params.id }
      }).then((response) => {
        data.chat = response.data.chat;
        // data.chat.forEach((chat) => {
        //   chat.isEvalMsgFile = /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(chat.evaluator_msg);
        //   chat.isStuMsgFile = /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(chat.student_msg);
        // })
        setTimeout(() => {
          const element = document.getElementById("chatBox");
          element.scrollTop = element.scrollHeight;
        }, 100);
      })
    }).catch((err) => {
      console.log(err)
    })
  }
}

const submitScores = () => {
  data.params.forEach(param => marks.push({ student_id: route.params.student_id, project_id: route.params.id, param_name: param.name, param_id: param.id, max_marks: param.max_marks, obt_marks: param.obtained_marks }))
  data.FormData = new FormData();
  data.FormData.append('params', JSON.stringify(marks))
  data.FormData.append('student_id', route.params.student_id)
  data.FormData.append('project_id', route.params.id)
  api.post("save-project-marks", data.FormData, {
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
  }).catch((err) => {
    console.log(err)
  })
}
const publishScores = () => {
  if(confirm.value == true){
    data.FormData = new FormData();
    data.FormData.append('publish', 1)
    data.FormData.append('student_id', route.params.student_id)
    data.FormData.append('project_id', route.params.id)
    api.post("publish-records",
      data.FormData, {
    }).then((response) => {
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'green',
        message: response.data.msg
      })
    }).catch((err) => {
      console.log(err)
    })
  }else{
    Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'red-5',
        message: 'Please Select the Publish Scores Checkbox'
      })
  }
}


onBeforeMount(() => {
  api.get("get-project", {
    params: { project_id: route.params.id, student_id: route.params.student_id, is_project: 1 }
  }).then((response) => {
    data.files = response.data.files
    data.params = response.data.params
    data.project = response.data.project
    convertCourseCode(data.project)
  });
  api.get("project-chat-files", {
    params: { user_id: user_id, student_id: route.params.student_id, project_id: route.params.id }
  }).then((response) => {
    data.chat = response.data.chat;
    // data.chat.forEach((chat) => {
    //   chat.isEvalMsgFile = /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(chat.evaluator_msg);
    //   chat.isStuMsgFile = /<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(chat.student_msg);
    // })
    setTimeout(() => {
      const element = document.getElementById("chatBox");
      element.scrollTop = element.scrollHeight;
    }, 100);
  })
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

.scoring {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 45px;

}

.chat-box {
  width: 100%;
  max-width: 550px;
  max-height: 40vh;
}

.scroll {
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.view-btn {
  width: 100%;
  height: 40px;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  padding: 6px 12px;
  cursor: pointer;
}

.custom-shadowBoder {
  border-radius: 5px;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1);
  padding: 0px 0px;
}

.input-section {
  border: 1px solid gray;
  border-radius: 15px;
}
</style>
