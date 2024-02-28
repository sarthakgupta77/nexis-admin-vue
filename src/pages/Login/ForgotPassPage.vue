<template>
  <div class="grid-container">
    <div class="img-section"></div>

    <div class="login-section">
      <div class="q-pa-md q-gutter-md">
        <q-card class="login-box-1" v-if="show">
          <q-card-section>
            <img alt="dataTrained logo" src="https://datatrained.com/images/NewFinalLogoE.png" class="login-box-logo" />
            <!-- <q-icon name="info" class="forget-box-logo" size="50px" /> -->
            <h4 class="head-txt">Forgot Password</h4>
          </q-card-section>

          <q-card-section>
            <q-form>
              <q-input class="input-box" v-model="email" aria-required placeholder="Please enter your email id"
                type="text" @keyup="validateEmail">
                <template v-slot:append>
                  <q-icon name="email" />
                </template>
              </q-input>
              <p>{{ msg }}</p>
              <!-- <a href="/forgotpass?"> Forgot Password? </a> -->

              <div class="btn-box">
                <q-btn @click="(show1 = !show1) && (show = !show)" rounded color="secondary" label="Send OTP"
                  class="q-pa-md btn-box" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>

        <q-card v-if="show1" class="login-box-2">
          <q-card-section>
            <img alt="dataTrained logo" src="https://datatrained.com/images/NewFinalLogoE.png" class="login-box-logo" />
            <!-- <q-icon name="info" class="forget-box-logo" size="50px" /> -->
            <h4 class="head-txt">Reset Password</h4>
          </q-card-section>

          <q-card-section>
            <q-form>

              <q-input class="input-box" v-model="otp" placeholder="Enter OTP" mask="######" unmasked-value
                @keyup="validateOTP" />

              <q-input class="input-box" v-model="data.newPassword" placeholder="Password" type="text"
                @keyup="isStrongPassword">
                <template v-slot:append>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <p>{{ msg1 }}</p>

              <q-input class="input-box" v-model="data.confirmPassword" placeholder="Confirm Password" type="text"
                @keyup="confirmPassword">
                <template v-slot:append>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <p>{{ msg2 }}</p>
              <!-- <a href="/forgotpass?"> Forgot Password? </a> -->

              <div class="btn-box">
                <q-btn rounded color="secondary" label="Submit" class="q-pa-md btn-box" @click="" to="/login" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from "src/boot/axios.js";
import { reactive, ref, computed } from "vue";
import { LocalStorage } from "quasar";

// const form = reactive(
//     [{email: ""}]
//   )

//   const addRow = () => {
//     if(form.length < 2){
//         form.push({email: "Enter otp",})
//     }
//   }


const data = reactive({
  newPassword: "",
  confirmPassword: "",
});

const passChanged = () => {
  alert("Your password has been changed! Please log in with the new password.");
};

const show = ref(true);
const show1 = ref(false);
// const login = () => {
//   api
//     .post("admin-login", {
//       email: email.value,
//       password: password.value,
//     })
//     .then((res) => {});
//   LocalStorage.set("email", email.value);
// };
// const forgotPassword = () => {};



const msg = ref("");
const email = ref("");
const otp = ref("");
const msg1 = ref('');
const msg2 = ref('');
const disabledOtp = ref('');
const disabledEmail = ref('');


const validateEmail = () => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    return msg.value = "";
  }
  else {
    msg.value = "Please enter a valid email address";
  }
}



const validateOTP = () => {
  if (otp.value.length == 6) {
    disabledOtp.value = false;
    return true;
  } else if (otp.value.length > 6 || otp.value.length < 6) {
    disabledOtp.value = true;
    return true;
  }
};


const isStrongPassword = computed(() => {
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(data.newPassword)) {
    return msg1.value = "";
  } else {
    msg1.value = "add strong password";
  }

})

const confirmPassword = computed(() => {
  if (data.newPassword == data.confirmPassword) {
    return msg2.value = "";
  }
  else {
    return msg2.value = "Password does not match";
  }
})

</script>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  // grid-gap: 20px;
}

.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.img-section {
  background-image: url(https://img.freepik.com/vecteurs-libre/support-client-illustration-design-plat_23-2148887720.jpg?w=2000);
  background-size: cover;
}

.head-txt {
  padding: 0px 10px;
  margin-top: 55px;
  text-align: left;
  font-family: "Bitter", sans-serif;
  font-weight: 500;
}

* {
  margin: 3px;
  padding: 2px;
}

.login-box-1 {
  width: 650px;
  height: 250px;
  top: -15px;
  box-shadow: none;
  padding: 0px 30px;
}

.login-box-2 {
  width: 650px;
  height: 350px;
  top: -15px;
  box-shadow: none;
  padding: 0px 30px;
}

.login-box-logo {
  height: 70px !important;
  position: absolute;
  left: 10px;
  top: -35px;
  width: 219px;
  height: 50px;
  // color: #1976d2;
}

.text-h5 {
  font-weight: 600;
}

.btn-box {
  width: 100%;
  height: 50px;
  margin-top: 10px !important;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.input-box {
  margin: 15px 0;
  padding: 0px 20px;
  border: 1px solid gray;
  border-radius: 30px;
  display: flex;
  max-height: 60px;
  transition: max-height 0.5s;
  overflow: hidden;

  .q-input {
    width: 500px;
  }
}

.input-box:hover {
  border-color: #1976d2;
  text-decoration: none;
}

.input-box i {
  color: #4f4a4a;
  font-size: 22px;
}

.btn-box {
  margin: 4px 0;
}

a {
  display: flex;
  justify-content: center;
  text-decoration: none;
  margin-top: 25px;
  color: #1976d2;
}
</style>
