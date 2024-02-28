<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="heading">
        <div class="head-btn-box shadowBoder">
          <q-btn
            flat
            round
            color="white"
            text-color="positive"
            icon="arrow_back"
            id="back-btn"
            to="/allusers"
          >
            <q-tooltip
              anchor="top start"
              self="center left"
              :offset="[10, 15]"
              transition-show="scale"
              transition-hide="scale"
            >
              Back to All Users
            </q-tooltip>
          </q-btn>
          <h5 class="q-ma-none" id="head-1">Add User</h5>
        </div>
      </div>
      <div class="table-container shadowBoder">
        <div class="q-pa-md" style="width: auto">
          <q-form class="q-gutter-md">
            <q-input dense outlined color="secondary" label="Enter Name" />

            <q-select
              dense
              outlined
              color="secondary"
              label="Account Type"
              v-model="model"
              :options="options"
              dropdown-icon="none"
            />

            <q-input
              dense
              outlined
              color="secondary"
              dropdown-icon="none"
              label="Email"
            />

            <q-input
              dense
              outlined
              color="secondary"
              type="password"
              label="Enter Password"
              lazy-rules
            />

            <q-input
              dense
              outlined
              color="secondary"
              type="password"
              label="Confirm Password"
              lazy-rules
            />

            <div>
              <q-btn
                class="sub-btn"
                label="Submit"
                type="submit"
                color="secondary"
                to="/allusers"
              />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import CkEditor from "src/components/CkEditor.vue";

// Vue.use(CKEditor);

// const data = reactive({
//   editorData: null,
//   editorConfig: {
//     //
//   },
// });

const model = ref(null);
const options = [
  "admin",
  "sales",
  "seo",
  "mentor",
  "hacketon",
  "auditor",
  "operations",
  "hr",
  "loan-after-sales",
  "trainer",
  "evalautor",
  "dummy",
];
</script>

<style scoped>
.head-btn-box {
  width: auto;
  background-color: #fff;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.head-btn-box #head-1 {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  margin-left: 15px;
  width: auto;
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
</style>
