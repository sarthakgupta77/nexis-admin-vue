<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import NavBar from "src/components/NavBar.vue";
import { LocalStorage } from "quasar";

// const array = ['dashboard.create','dashboard.status','dashboard.update','dashboard.edit','news.create','news.status','news.update','news.edit','dt-talks.create','dt-talks.status','dt-talks.update','dt-talks.edit','story.create','seo','certificates', 'certificates.edit' ,'reports','reports.edit','roles.delete']

//  LocalStorage.set('access_key',array)
 
</script>

<style>
body {
  background-color: #fafafa;
}


</style>
