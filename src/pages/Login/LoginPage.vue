<template>
  <div class="grid-container">
    <div class="img-section">
      <!-- <img  src="/Images/unnamed.jpg" alt="dd"> -->
    </div>

    <div class="login-section">
      <div class="q-pa-md q-gutter-md">
        <q-card class="login-box">
          <q-card-section>
            <img alt="dataTrained logo" src="https://datatrained.com/images/NewFinalLogoE.png" class="login-box-logo" />
            <h4 class="head-txt">Welcome! <br /></h4>
            <h5 class="sub-head-txt">Sign in to continue</h5>
          </q-card-section>

          <q-card-section>
            <q-form>
              <q-input class="input-box" v-model="email" placeholder="Enter your email" type="text"
                @keyup="validateEmail">
                <template v-slot:append>
                  <q-icon name="email" />
                </template>
              </q-input>
              <p>{{ msg }}</p>


              <q-input class="input-box" v-model="password" placeholder="Password" type="password" autocomplete="on">
                <template v-slot:append>
                  <q-icon name="lock" />
                </template>
              </q-input>

              <div class="btn-box">

                <q-btn rounded color="blue-10" label="Sign In" class="q-pa-md btn-box" @click="login" />

                <!-- <q-btn rounded color="secondary" label="Sign In" class="q-pa-md btn-box" @click="login" to="/" /> -->
              </div>
              <a href="/forgot-pass"> Forgot your Password? </a>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from "src/boot/axios.js";
import { reactive, ref, onBeforeMount } from "vue";
import { LocalStorage } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();



const email = ref("");
const password = ref("");
const msg = ref("");
const error = ref("");


const validateEmail = () => {
  if (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
      email.value
    )
  ) {
    msg.value = "";
  } else {
    msg.value = "Please enter a valid email address";
  }
};


const login = () => {
  if (email.value == "") {
    alert("Please enter a valid email address")
    return false;
  }
  api
    .post("admin-login", {
      email: email.value,
      password: password.value,
    })
    .then((res) => {
      if (res.data.token) {
        LocalStorage.set("email", email.value);
        LocalStorage.set("dt_key", res.data.token);
        LocalStorage.set("u_name", res.data.u_name);
        LocalStorage.set("u_id", res.data.u_id);
        // router.push("/dashboard");
        api.get("permissions", {
          params: { email: email.value }, headers: {
            'Authorization': 'Bearer ' + LocalStorage.getItem('dt_key'),
          }
        }).then(response => {
          LocalStorage.set('access_key', response.data.permissions)
          location.reload()
        });
      } else {
        alert("invalid Credentials")
      }
    })
    .catch((err) => {
      if (err.response.data.error == "Unauthorized") {
        // msg.value = "Invalid Credentials"
        alert("invalid_credentials")
      }
    });


};
const forgotPassword = () => { };


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
  height: 98vh;
}

.img-section {
  background-image: url(../../assets/imgAssets/5124556.jpg);
  background-size: cover;
}

.head-txt {
  padding: 0px 10px;
  margin-top: 55px;
  text-align: left;
  font-family: "Bitter", sans-serif;
  font-weight: 500;
}

.sub-head-txt {
  font-family: "poppins", sans-serif;
  font-weight: 300;
  padding: 0px 10px;
}

* {
  margin: 3px;
  padding: 2px;
}

.login-box {
  width: 650px;
  height: 350px;
  top: -15px;
  box-shadow: none;
  padding: 0px 30px;
}

.login-box-logo {
  width: 219px;
  height: 70px;
  position: absolute;
  left: 10px;
  top: -35px;
}

.text-h5 {
  font-weight: 600;
}

.btn-box {
  width: 100%;
  height: 56px;
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
  // align-items: center;
  max-height: 60px;
  transition: max-height 0.5s;
  overflow: hidden;

  // justify-content: space-between;

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

// .main-{

// }

a {
  display: flex;
  justify-content: center;
  text-decoration: none;
  margin-top: 25px;
  color: #1976d2;
}
</style>
