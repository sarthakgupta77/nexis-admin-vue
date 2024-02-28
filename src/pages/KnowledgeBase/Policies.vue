<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Policies</h5>
          </div>

          <div class="table-container shadowBoder" style="height: 80vh">


            <q-splitter  v-model="splitterModel" style="height: 100%;">
              <template v-slot:before>
                <q-tabs style="height: auto;" v-model="tab" class="text-secondary bg-white tab-style"  align="left"  :breakpoint="0"
                  v-for="policy in data.policies" vertical>
                  <q-tab :name="policy.id" :label="policy.title" style="justify-content: flex-start;" />

                </q-tabs>
              </template>
              <template v-slot:after>
                <q-tab-panels v-model="tab" v-for="policy in data.policies">
                  <q-tab-panel :name="policy.id" class="q-pb-none">
                    <div class="row">
                      <div class="col-12 row">
                        <label class="text-subtitle1 q-pa-xs col-12 w600">
                          Title
                        </label>
                        <q-input dense outlined v-model="policy.title" color="secondary" class="col-12" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Reference Name']" />
                      </div>
                      <div class="col-12 row">
                        <label class="text-subtitle1 q-pa-xs col-12 w600">
                          Content
                        </label>
                        <q-editor max-height="450px" v-model="policy.content" class="col-12" :dense="$q.screen.lt.md"
                          :toolbar="[
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
                    </div>
                    <div class="create-event-btn q-pt-md">
                      <q-btn v-if="state.update" class="submit-btn" label="Update"
                        @click="updatePolicies(id = policy.id, title = policy.title, content = policy.content)" />
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </template>
            </q-splitter>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from "quasar";
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../boot/axios";

const tab = ref(1)
const policyContent = ref('')
const policyTitle = ref('')
const termsContent = ref('')
const termsTitle = ref('')
const dsRefundContent = ref('')
const dsRefundTitle = ref('')
const hrRefundContent = ref('')
const hrRefundTitle = ref('')

const access = LocalStorage.getItem('access_key')
const state = reactive({
  update: ref(false),
})

const data = reactive({
  policies: [],
  policy: [],
});

const updatePolicies = (id, title, content) => {
  api.post("update-policy", {
    id: id,
    title: title,
    content: content
  }).then((response) => {
    api.get("policies").then(response => {
      data.policies = response.data.policies;
    });
    Notify.create({
      timeout: 3000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
  }).catch((error) => {
    console.log("Error", error);
  });
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("policies").then(response => {
    data.policies = response.data.policies;
    Loading.hide()
  });

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('policy')) {
      state[key] = true
    }

  });

  function checkEvent(keys) {
    return keys.includes('policy');
  }
});
</script>

<style lang="scss" scoped>
.head-btn-box {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.head-2 {
  margin-left: 5px;
  font-size: 20px;
  font-weight: 500;
}

table {
  padding: 5px;

  td,
  th {
    border: 1px solid #e6e6e6;
  }
}

td,
th {
  padding: 5px 10px;
}

th {
  font-weight: 600;
  font-size: 14px;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}

.createNew {
  width: 600px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}
.tab-style{
  border-radius: 5px;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1);
}
</style>
