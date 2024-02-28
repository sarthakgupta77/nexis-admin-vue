<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="heading">
        <div class="head-btn-box shadowBoder">
          <q-btn flat round color="white" text-color="positive" icon="arrow_back" id="back-btn" to="/all-dttalks">
            <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
              transition-hide="scale">
              Back to DT Talks
            </q-tooltip>
          </q-btn>
          <h5 class="q-ma-none" id="head-1">Add DT-Talk</h5>
        </div>
      </div>
      <div class="table-container shadowBoder">
        <div class="q-pa-md" style="width: auto">
          <q-form class="q-gutter-md" @submit="addDtEvent" @reset="onReset">
            <div class="row">
              <div class="col-4">
                <label class="q-pa-xs" style="font-weight: 600">
                  Title
                </label>
                <q-input dense v-model="event.title" outlined color="secondary" class="q-pr-md" lazy-rules
                  :rules="[val => val && val.length > 0 || 'Please Enter Title Name']" />
              </div>
              <div class="col-4">
                <label class="q-pa-xs" style="font-weight: 600">Webinar's Image</label>
                <q-file dense label="Choose File" v-model="event.image" outlined color="secondary" class="q-pr-md" hint="Image Size: 1200px × 628px " />
              </div>
              <div class="col-4">
                <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                  Status
                </label>

                <q-select :options="options" dense outlined v-model="event.status" color="secondary"
                  class="col-md-6 q-pr-sm" emit-value map-options>
                </q-select>
              </div>
            </div>

            <div class="row">
              <div class="col-4">
                <label class="col-md-12" style="font-weight: 600">
                  Youtube Video Link
                </label>
                <q-input dense outlined v-model="event.youtube_link" color="secondary" class="col-md-4 q-pr-md" />
              </div>
              <div class="col-4">
                <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                  Date
                </label>
                <q-input dense v-model="event.date" type="date" outlined color="secondary" class="col-md-4 q-pr-md"
                lazy-rules :rules="[val => val && val.length > 0 || 'Please Fill Date']" />
              </div>
              <div class="col-4">
                <label class="col-md-12" style="font-weight: 600">
                  Time
                </label>
                <q-input dense outlined type="text" placeholder="Like 10:30am - 11:30am" v-model="event.time"
                  class="col-md-4 q-pr-sm" />
              </div>
            </div>

            <div class="row">
              <label class="col-md-12" style="font-weight: 600">
                Description
              </label>
              <!-- <q-input dense outlined type="textaria" color="secondary" class="col-md-12 q-pr-sm" v-model="event.description" /> -->
              <q-editor v-model="event.description" :dense="$q.screen.lt.md" class="col-12" :toolbar="[
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


            <!-- <div class="sub-btn">
              <q-btn class="submit-btn" label="Submit" type="button" @click="addDtEvent" to="/all-events" />
            </div> -->

            <div class="create-event-btn ">
              <q-btn outline label="Reset" type="reset" color="primary" class="q-mr-md" />

              <q-btn class="submit-btn" label="Create Dt Talk" type="submit" />
            </div>
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

import { Notify } from 'quasar';

const route = useRoute();
const router = useRouter();
const dialog = ref(false);
const options = [
  {
    label: 'Active',
    value: 1,
  },
  {
    label: 'Inactive',
    value: 0
  }
];

const event = reactive({
  title: null,
  image: null,
  date: null,
  youtube_link: null,
  time: null,
  description: ("<pre>&nbsp;</pre>"),
  FormData: null,
  status: 1
});
const addDtEvent = () => {
  event.FormData = new FormData();
  event.FormData.append("title", event.title),
    event.FormData.append("date", event.date),
    event.FormData.append("file", event.image),
    event.FormData.append("link", event.youtube_link),
    event.FormData.append("time", event.time),
    event.FormData.append("discussion", event.description),
    event.FormData.append("status", event.status),
    api.post('add-talk', event.FormData, {
      header: {
        "content-type": "multipart/form-data",
      },
    }).then(function (response) {
      router.push('/all-dttalks')
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'green',
        message: 'Event Added Successfully'
      })
    })
      .catch(function (error) {
        console.log(error);
      });
}

const onReset = () => {
  event.title = null,
    event.image = null,
    event.date = null,
    event.youtube_link = null,
    event.time = null,
    event.description = null
}
</script>

<style scoped>
.head-btn-box {
  width: auto;
  background-color: #fff;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
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

#back-btn:hover {
  color: #7b94e6 !important;
}

.sub-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
