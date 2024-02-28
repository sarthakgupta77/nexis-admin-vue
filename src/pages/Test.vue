<template>
  <!-- <h1>Zoom Meeting SDK Vue.js Sample</h1> -->

  <!-- For Component View -->
  <!-- <div id='meetingSDKElement'> -->
    <!-- Zoom Meeting SDK Component View Rendered Here -->
  <!-- </div> -->

  <q-btn @click='getSignature' label="Meeting" />
</template>
<script setup>
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.18.2/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

var authEndpoint = 'http://localhost:8080/'
var sdkKey = ''
var meetingNumber = '123456789'
var passWord = ''
var role = 1
var userName = 'Vue.js'
var userEmail = ''
var registrantToken = ''
var zakToken = '090340'
var leaveUrl = 'http://localhost:8080/'

function getSignature() {
  fetch(authEndpoint, {
    method: 'POST',
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    startMeeting(data.signature)
  }).catch((error) => {
    console.log(error)
  })
}

function startMeeting(signature) {
  document.getElementById('zmmtg-root').style.display = 'block';

  ZoomMtg.init({
    leaveUrl: leaveUrl,
    success: (success) => {
      console.log(success);
      ZoomMtg.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        passWord: passWord,
        userName: userName,
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken,
        success: (success) => {
          console.log(success);
        },
        error: (error) => {
          console.log(error);
        }
      });
    },
    error: (error) => {
      console.log(error);
    }
  });
}
// import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

// var client = ZoomMtgEmbedded.createClient()
// var authEndpoint = ''
// var sdkKey = ''
// var meetingNumber = '123456789'
// var passWord = ''
// var role = 1
// var userName = 'Vue.js'
// var userEmail = ''
// var registrantToken = ''
// var zakToken = '090340'

// function getSignature() {
//   fetch(authEndpoint, {
//     method: 'POST',
//     body: JSON.stringify({
//       meetingNumber: meetingNumber,
//       role: role
//     })
//   }).then((response) => {
//     return response.json()
//   }).then((data) => {
//     console.log(data)
//     startMeeting(data.signature)
//   }).catch((error) => {
//     console.log(error)
//   })
// }

// function startMeeting(signature) {
//   let meetingSDKElement = document.getElementById('meetingSDKElement');

//   client.init({zoomAppRoot: meetingSDKElement, language: 'en-US'}).then(() => {
//     client.join({
//       signature: signature,
//       sdkKey: sdkKey,
//       meetingNumber: meetingNumber,
//       password: passWord,
//       userName: userName,
//       userEmail: userEmail,
//       tk: registrantToken,
//       zak: zakToken
//     }).then(() => {
//       console.log('joined succesfully')
//     }).catch((error) => {
//       console.log(error)
//     })
//   }).catch((error) => {
//     console.log(error)
//   })
// }
</script>

<style scoped>

</style>