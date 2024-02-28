<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="heading">
        <div class="head-btn-box shadowBoder">
          <q-btn flat round color="white" text-color="positive" icon="arrow_back" id="back-btn" to="/all-dttalks">
            <q-tooltip anchor="top start" self="center left" :offset="[10, 15]" transition-show="scale"
              transition-hide="scale">
              Back to Events
            </q-tooltip>
          </q-btn>
          <h5 class="q-ma-none" id="head-1">Update Talk Details</h5>
        </div>
      </div>
      <div class="table-container shadowBoder">
        <div class="q-pa-md" style="width: auto">
          <q-form class="q-gutter-md">
            <div class="row">
              <div class="col-6">
                <label class="q-pa-xs" style="font-weight: 600">
                  Title
                </label>
                <q-input dense v-model="data.event.title" outlined color="secondary" class="q-pr-md" />
              </div>
              <div class="col-6">
                <label class="q-pa-xs" style="font-weight: 600">Webinar's Image (Choose file only if want to
                update)</label>
              <q-file dense label="Choose File" outlined color="secondary" class="q-pr-sm"  hint="Image Size: 1200px × 628px"/>
              </div>
            </div>

            <div class="row">
              <div class="col-4">
                <label class="col-md-12" style="font-weight: 600">
                  Youtube Video Link
                </label>
                <q-input dense outlined v-model="data.event.link" color="secondary" class="col-md-4 q-pr-md" />
              </div>
              <div class="col-4">
                <label class="col-md-12 q-pa-xs" style="font-weight: 600">
                  Date
                </label>
                <q-input dense v-model="data.event.date" type="date" outlined color="secondary" class="col-md-4 q-pr-md" />
              </div>
              <div class="col-4">
                <label class="col-md-12" style="font-weight: 600">
                  Time
                </label>
                <q-input dense outlined v-model="data.event.time" class="col-md-4 q-pr-sm" />
              </div>
            </div>

            <div class="row">
              <label class="col-md-12" style="font-weight: 600">
                Description
              </label>
              <q-input dense outlined color="secondary" class="col-md-12 q-pr-sm" v-model="data.event.discussion"
                type="textarea" />
            </div>

            <div class="sub-btn">
              <q-btn class="submit-btn" label="Update" type="button" @click="updateDtEvent"
                to="/all-dttalks" />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import CkEditor from "src/components/CkEditor.vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "../../../boot/axios";
import { Notify } from 'quasar'

const data = reactive({
  event: [],
});
const date = ref("0000/00/00");
const route = useRoute();
const router = useRouter();
const talk_id = route.params.id;
const model1 = ref(null);
const text = ref("");



const updateDtEvent = () => {
  api
    .post("update-talk", {
      id: talk_id,
      title: data.event.title,
      date: data.event.date,
      time: data.event.time,
      discussion: data.event.discussion,
      link: data.event.link,
    }).then((response) => {
    router.push("/all-dttalks");
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
      message: 'DT-Talks Updated Successfully'
    })
  })
    .catch((error) => {
      console.log("Error", error);
    });
};

onBeforeMount(() => {
  api.get("edit-talk/" + talk_id).then((response) => {
    data.event = response.data.talk;
  });
});
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
.sub-btn {
  display: flex;
  justify-content: flex-end;
}
</style>
