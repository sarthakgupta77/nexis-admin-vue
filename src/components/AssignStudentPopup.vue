<template>
  <q-dialog class="login-page">
    <div class="q-pa-md q-gutter-md login-box">
      <q-card>
        <q-card-section>
          <q-form>
            <div class="input-box">
              <q-input
                v-model="email"
                placeholder="Email"
                required
                style="margin-right: 10px; width: 100%"
              >
                <q-icon name="email" style="top: 20px" />
              </q-input>
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
const email = "";
const resetPassword = () => {
  alert("This assignment has been assigned to the student");
};
</script>
<style scoped>
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
