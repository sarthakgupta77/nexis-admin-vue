<template>
  <q-dialog class="login-page">
    <div class="q-pa-md q-gutter-md login-box">
      <q-card>
        <q-card-section>
          <q-form>
            <div class="input-box">
              <q-select
                v-model="model"
                :options="options"
                label="Select Batch"
                style="margin-right: -8px; width: 100%"
              >
                <q-icon class="selector-icon" style="margin-right: -8px;" name="group_add" />
              </q-select>
            </div>

            <div class="btn-box">
              <q-btn
                v-close-popup
                color="primary"
                label="Submit"
                class="q-mt-md btn-box"
                @click="resetPassword"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
const model = ref(null);
const resetPassword = () => {
  alert("This assignment has been assigned to the batch");
};
const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
</script>
<style scoped>
.selector-icon {
  top: -7px;
}
.login-box {
  width: 400px;
  height: 400px;
}
.text-h5 {
  font-weight: 600;
  margin-bottom: -30px;
}

.btn-box {
  width: 100%;
}

.input-box {
  margin: 15px 0;
  padding-left: 9px;
  height: 40px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  max-height: 60px;
  transition: max-height 0.5s;
  overflow: hidden;
  border: 1px solid rgb(193, 188, 188);
}

.input-box:hover {
  border-color: #1976d2;
  text-decoration: none;
}

.input-box i {
  color: #4f4a4a;
  font-size: 22px;
  margin-left: 9px;
}
.btn-box {
  margin: 4px 0;
}
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}
.btn-forgot {
  width: 300px;
  height: 50px;
  color: #1976d2;
}
.reset-txt {
  text-align: center;
  flex-wrap: wrap;
  font-size: 11px;
  color: grey;
}
</style>
