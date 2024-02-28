<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5>Hiring Partners</h5>
            <q-btn label="Add Hiring Partner" @click="createNewModal = true; count = 1" style="width: 13%"
              class="create-btn"></q-btn>
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card style="width: 500px">
              <q-form @submit="editHiringPartner">
                <q-card-section class="row">
                  <div class="col-12 row" style="align-items: baseline;">
                    <label class="w600 q-pa-xs col-12">
                      Note
                    </label>
                    <q-input dense outlined color="secondary" v-model="editNote" class="col-12" type="textarea" lazy-rules
                      :rules="[val => val && val.length > 0 || 'Please Mention Reason for Editing']" />
                  </div>
                </q-card-section>
                <q-card-actions class="q-px-md" align="right">
                  <q-btn label="Cancel" outline @click="count = 1; pocDetails = false" v-close-popup />
                  <q-btn label="Update" color="secondary" type="submit" />
                </q-card-actions>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized v-model="createNewModal" persistent style="padding: 0;" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="addHiringPartner">
                <q-card-section class="q-pa-none">
                  <div class="row q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Add Hiring Partner</span>
                    <q-btn icon="close" dense flat @click="count = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div v-if="!pocDetails" class="q-pa-md row">
                    <div class="col-12 row">
                      <div class="col-6 q-pr-sm">
                        <label class="w600 q-pa-xs">
                          Job Title
                        </label>
                        <q-input dense outlined color="secondary" v-model="job.title" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Job Title']" />
                      </div>
                      <div class="col-6">
                        <label class="w600 q-pa-xs">
                          Job Status
                        </label>
                        <q-select dense outlined color="secondary" v-model="job.status" :options="options" emit-value
                          map-options lazy-rules :rules="[val => val !== null || 'Please Select Event Status']" />
                      </div>
                    </div>
                    <div class="col-12 row q-mt-sm">
                      <div class="col-6 q-pr-sm">
                        <label class="q-pa-xs w600">
                          Job Profile
                        </label>
                        <q-input dense outlined color="secondary" v-model="job.profile" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Job Category']" />
                      </div>
                      <div class="col-6">
                        <label class="q-pa-xs w600">
                          Job Perks
                        </label>
                        <q-input dense outlined color="secondary" v-model="more.perks" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter the Job Perks']" />
                      </div>
                    </div>
                    <div class="col-12 row q-mt-sm">
                      <div class="col-4">
                        <label class="q-pa-xs w600">
                          Job Location
                        </label>
                        <q-input dense outlined color="secondary" v-model="job.location" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter the Job Location']" />
                      </div>
                      <div class="col-4 q-px-sm">
                        <label class="q-pa-xs w600">
                          Required Experience
                        </label>
                        <q-select dense outlined color="secondary" v-model="more.experience" :options="expOptions"
                          lazy-rules :rules="[val => val !== null || 'Please Enter Required Work Experience for Job']" />
                      </div>
                      <div class="col-4">
                        <label class="q-pa-xs w600">
                          Job Category
                        </label>
                        <q-input dense outlined color="secondary" v-model="job.category" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Job Category']" />
                      </div>
                    </div>
                    <div class="col-12 row q-mt-sm">
                      <div class="col-6 q-pr-sm">
                        <label class="q-pa-xs w600">
                          JD File
                        </label>
                        <q-file dense outlined color="secondary" v-model="job.jd_file" label="Choose File" lazy-rules
                          :rules="[val => val !== null || 'Please Attach JD File']" />
                      </div>
                      <div class="col-6">
                        <label class="q-pa-xs w600">
                          Company Logo
                        </label>
                        <q-file dense outlined color="secondary" v-model="job.logo" label="Choose File" lazy-rules
                          :rules="[val => val !== null || 'Please Attach Company Logo Image']" />
                      </div>
                    </div>
                    <div class="col-12 q-mt-sm">
                      <label class="q-pa-xs w600">
                        Job Introduction
                      </label>
                      <q-field ref="fieldRef" style="margin-top: -20px" v-model="job.intro" label-slot borderless
                        :rules="[val => (!!val && val !== '<br>') || 'Please Enter Job Introduction']">
                        <template #control>
                          <q-editor class="col-12" v-model="job.intro" :toolbar="[
                            [
                              {
                                label: $q.lang.editor.align,
                                icon: $q.iconSet.editor.align,
                                fixedLabel: true,
                                list: 'only-icons',
                                options: ['left', 'center', 'right', 'justify']
                              },
                            ],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                            ['unordered', 'ordered', 'outdent', 'indent'],
                            ['undo', 'redo'],
                          ]" />
                        </template>
                      </q-field>
                    </div>
                    <div class="col-12 q-mt-sm">
                      <label class="q-pa-xs w600">
                        Job Description
                      </label>
                      <q-field ref="fieldRef" style="margin-top: -20px" v-model="job.jd" label-slot borderless
                        :rules="[val => (!!val && val !== '<br>') || 'Please Enter Job Description']">
                        <template #control>
                          <q-editor class="col-12" v-model="job.jd" :toolbar="[
                            [
                              {
                                label: $q.lang.editor.align,
                                icon: $q.iconSet.editor.align,
                                fixedLabel: true,
                                list: 'only-icons',
                                options: ['left', 'center', 'right', 'justify']
                              },
                            ],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                            ['unordered', 'ordered', 'outdent', 'indent'],
                            ['undo', 'redo'],
                          ]" />
                        </template>
                      </q-field>
                    </div>
                    <div class="col-12 q-mt-sm">
                      <label class="q-pa-xs w600">
                        Responsibilities
                      </label>
                      <q-field ref="fieldRef" style="margin-top: -20px" v-model="more.responsibilities" label-slot
                        borderless :rules="[val => (!!val && val !== '<br>') || 'Please Enter moreJob Responsibilities']">
                        <template #control>
                          <q-editor class="col-12" v-model="more.responsibilities" :toolbar="[
                            [
                              {
                                label: $q.lang.editor.align,
                                icon: $q.iconSet.editor.align,
                                fixedLabel: true,
                                list: 'only-icons',
                                options: ['left', 'center', 'right', 'justify']
                              },
                            ],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                            ['unordered', 'ordered', 'outdent', 'indent'],
                            ['undo', 'redo'],
                          ]" />
                        </template>
                      </q-field>
                    </div>
                    <div class="col-12 q-mt-sm">
                      <label class="q-pa-xs w600">
                        Required Qualification
                      </label>
                      <q-field ref="fieldRef" style="margin-top: -20px" v-model="more.qualification" label-slot borderless
                        :rules="[val => (!!val && val !== '<br>') || 'Please Enter Required Qualification for the Job']">
                        <template #control>
                          <q-editor class="col-12" v-model="more.qualification" :toolbar="[
                            [
                              {
                                label: $q.lang.editor.align,
                                icon: $q.iconSet.editor.align,
                                fixedLabel: true,
                                list: 'only-icons',
                                options: ['left', 'center', 'right', 'justify']
                              },
                            ],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                            ['unordered', 'ordered', 'outdent', 'indent'],
                            ['undo', 'redo'],
                          ]" />
                        </template>
                      </q-field>
                    </div>
                  </div>
                  <div v-else class="q-pa-md row">
                    <span class="text-subtitle1 col-12 w600">Enter Person Of Contact Details</span>
                    <div class="col-12 row q-mt-md" style="align-items: baseline;">
                      <label class="col-3 w600">
                        Name
                      </label>
                      <q-input dense outlined color="secondary" class="col-9" v-model="poc.name" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Person Of Contact Name']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="col-3 w600">
                        Email
                      </label>
                      <q-input dense outlined color="secondary" class="col-9" v-model="poc.email" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Person Of Contact Email']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="col-3 w600">
                        Contact
                      </label>
                      <q-input dense outlined color="secondary" class="col-9" v-model="poc.contact" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Person Of Contact Contact Details']" />
                    </div>
                    <div class="col-12 row q-mt-md" style="align-items: baseline;">
                      <label class="col-3 w600">
                        LinkedIn Profile
                      </label>
                      <q-input dense outlined color="secondary" class="col-9" v-model="poc.linkedin" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Person Of Contact Name']" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div class="q-py-sm">
                    <q-separator />
                  </div>
                  <div v-if="!pocDetails" class="row q-pa-md bg-white" style="justify-content: space-between;">
                    <q-btn outline label="Clear" type="reset" />
                    <q-btn color="primary" @click="pocDetails = true" label="Next" />
                  </div>
                  <div v-else class="row q-pa-md bg-white" style="justify-content: space-between;">
                    <div>
                      <q-btn flat class="q-mr-md" label="Back" @click="pocDetails = false" />
                      <q-btn outline label="Clear" type="reset" />
                    </div>
                    <q-btn color="primary" type="submit" label="Create" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized v-model="editModal" persistent style="padding: 0;" full-height position="right">
            <q-card>
              <q-form class="createNew" @submit="confirm = true; editModal = false; count = 1">
                <q-card-section class="q-pa-none">
                  <div class="row q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Edit Hiring Partner</span>
                    <q-btn icon="close" dense flat @click="count = 1; pocDetails = false" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div v-if="!pocDetails" class="q-pa-md row">
                    <div class="col-12 row">
                      <div class="col-6 q-pr-sm">
                        <label class="w600 q-pa-xs">
                          Company Name
                        </label>
                        <q-input dense outlined color="secondary" v-model="data.partner.title" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Job Title']" />
                      </div>
                      <div class="col-6">
                        <label class="w600 q-pa-xs">
                          Job Status
                        </label>
                        <q-select dense outlined color="secondary" v-model="data.partner.status" :options="options"
                          emit-value map-options lazy-rules
                          :rules="[val => val !== null || 'Please Select Event Status']" />
                      </div>
                    </div>
                    <div class="col-12 row q-mt-sm">
                      <div class="col-6 q-pr-sm">
                        <label class="q-pa-xs w600">
                          Job Profile
                        </label>
                        <q-input dense outlined color="secondary" v-model="data.partner.profile" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Job Category']" />
                      </div>
                      <div class="col-6">
                        <label class="q-pa-xs w600">
                          Job Perks
                        </label>
                        <q-input dense outlined color="secondary" v-model="data.more.perks" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter the Job Perks']" />
                      </div>
                    </div>
                    <div class="col-12 row q-mt-sm">
                      <div class="col-4">
                        <label class="q-pa-xs w600">
                          Job Location
                        </label>
                        <q-input dense outlined color="secondary" v-model="data.partner.location" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter the Job Location']" />
                      </div>
                      <div class="col-4 q-px-sm">
                        <label class="q-pa-xs w600">
                          Required Experience
                        </label>
                        <q-select dense outlined color="secondary" v-model="data.more.experience" :options="expOptions"
                          lazy-rules :rules="[val => val !== null || 'Please Enter Required Work Experience for Job']" />
                      </div>
                      <div class="col-4">
                        <label class="q-pa-xs w600">
                          Job Category
                        </label>
                        <q-input dense outlined color="secondary" v-model="data.partner.category" lazy-rules
                          :rules="[val => val && val.length > 0 || 'Please Enter Job Category']" />
                      </div>
                    </div>
                    <div class="col-12 row q-mt-sm">
                      <div class="col-6 q-pr-sm">
                        <label class="q-pa-xs w600">
                          JD File
                        </label>
                        <q-file dense outlined color="secondary" v-model="data.partner.jd_file"
                          label="Choose File (Only if you want to change)" lazy-rules
                          :rules="[val => val !== null || 'Please Attach JD File']" />
                      </div>
                      <div class="col-6">
                        <label class="q-pa-xs w600">
                          Company Logo
                        </label>
                        <q-file dense outlined color="secondary" v-model="data.partner.logo"
                          label="Choose File (Only if you want to change)" lazy-rules
                          :rules="[val => val !== null || 'Please Attach Company Logo Image']" />
                      </div>
                    </div>
                    <div class="col-12 q-mt-sm">
                      <label class="q-pa-xs w600">
                        Job Introduction
                      </label>
                      <q-field ref="fieldRef" style="margin-top: -20px" v-model="data.partner.intro" label-slot borderless
                        :rules="[val => (!!val && val !== '<br>') || 'Please Enter Job Introduction']">
                        <template #control>
                          <q-editor class="col-12" v-model="data.partner.intro" :toolbar="[
                            [
                              {
                                label: $q.lang.editor.align,
                                icon: $q.iconSet.editor.align,
                                fixedLabel: true,
                                list: 'only-icons',
                                options: ['left', 'center', 'right', 'justify']
                              },
                            ],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                            ['unordered', 'ordered', 'outdent', 'indent'],
                            ['undo', 'redo'],
                          ]" />
                        </template>
                      </q-field>
                    </div>
                    <div class="col-12 q-mt-sm">
                      <label class="q-pa-xs w600">
                        Job Description
                      </label>
                      <q-field ref="fieldRef" style="margin-top: -20px" v-model="data.partner.job_description" label-slot
                        borderless :rules="[val => (!!val && val !== '<br>') || 'Please Enter Job Description']">
                        <template #control>
                          <q-editor class="col-12" v-model="data.partner.job_description" :toolbar="[
                            [
                              {
                                label: $q.lang.editor.align,
                                icon: $q.iconSet.editor.align,
                                fixedLabel: true,
                                list: 'only-icons',
                                options: ['left', 'center', 'right', 'justify']
                              },
                            ],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                            ['unordered', 'ordered', 'outdent', 'indent'],
                            ['undo', 'redo'],
                          ]" />
                        </template>
                      </q-field>
                    </div>
                    <div class="col-12 q-mt-sm">
                      <label class="q-pa-xs w600">
                        Responsibilities
                      </label>
                      <q-field ref="fieldRef" style="margin-top: -20px" v-model="data.more.responsibilities" label-slot
                        borderless :rules="[val => (!!val && val !== '<br>') || 'Please Enter moreJob Responsibilities']">
                        <template #control>
                          <q-editor class="col-12" v-model="data.more.responsibilities" :toolbar="[
                            [
                              {
                                label: $q.lang.editor.align,
                                icon: $q.iconSet.editor.align,
                                fixedLabel: true,
                                list: 'only-icons',
                                options: ['left', 'center', 'right', 'justify']
                              },
                            ],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                            ['unordered', 'ordered', 'outdent', 'indent'],
                            ['undo', 'redo'],
                          ]" />
                        </template>
                      </q-field>
                    </div>
                    <div class="col-12 q-mt-sm">
                      <label class="q-pa-xs w600">
                        Required Qualification
                      </label>
                      <q-field ref="fieldRef" style="margin-top: -20px" v-model="data.more.qualification" label-slot
                        borderless
                        :rules="[val => (!!val && val !== '<br>') || 'Please Enter Required Qualification for the Job']">
                        <template #control>
                          <q-editor class="col-12" v-model="data.more.qualification" :toolbar="[
                            [
                              {
                                label: $q.lang.editor.align,
                                icon: $q.iconSet.editor.align,
                                fixedLabel: true,
                                list: 'only-icons',
                                options: ['left', 'center', 'right', 'justify']
                              },
                            ],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                            ['unordered', 'ordered', 'outdent', 'indent'],
                            ['undo', 'redo'],
                          ]" />
                        </template>
                      </q-field>
                    </div>
                  </div>
                  <div v-else class="q-pa-md row">
                    <span class="text-subtitle1 col-12 w600">Enter Person Of Contact Details</span>
                    <div class="col-12 row q-mt-md" style="align-items: baseline;">
                      <label class="col-3 w600">
                        Name
                      </label>
                      <q-input dense outlined color="secondary" class="col-9" v-model="data.poc.name" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Person Of Contact Name']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="col-3 w600">
                        Email
                      </label>
                      <q-input dense outlined color="secondary" class="col-9" v-model="data.poc.email" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Person Of Contact Email']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="col-3 w600">
                        Contact
                      </label>
                      <q-input dense outlined color="secondary" class="col-9" v-model="data.poc.contact" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Person Of Contact Contact Details']" />
                    </div>
                    <div class="col-12 row q-mt-md" style="align-items: baseline;">
                      <label class="col-3 w600">
                        LinkedIn Profile
                      </label>
                      <q-input dense outlined color="secondary" class="col-9" v-model="data.poc.linkedin" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Person Of Contact Name']" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div class="q-py-sm">
                    <q-separator />
                  </div>
                  <div v-if="!pocDetails" class="row q-pa-md bg-white" style="justify-content: space-between;">
                    <q-btn outline label="Clear" type="reset" />
                    <q-btn color="primary" @click="pocDetails = true" label="Next" />
                  </div>
                  <div v-else class="row q-pa-md bg-white" style="justify-content: space-between;">
                    <div>
                      <q-btn flat class="q-mr-md" label="Back" @click="pocDetails = false" />
                      <q-btn outline label="Clear" type="reset" />
                    </div>
                    <q-btn color="primary" type="submit" label="Update" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized v-model="viewModal" persistent style="padding: 0;" full-height position="right">
            <q-card class="createNew">
              <q-card-section class="q-pa-none">
                <div class="row q-pa-md" style="justify-content:space-between">
                  <div>
                    <span class="q-pr-md text-h6 w600"> {{ data.partner.title }} Details </span>
                    <q-badge v-if="data.partner.status == 1" rounded color="green" class="status">
                      Active
                    </q-badge>
                    <q-badge v-else rounded color="red" class="status">
                      InActive
                    </q-badge>
                  </div>
                  <q-btn icon="close" dense flat @click="count = 1" v-close-popup />
                </div>
                <div>
                  <q-separator color="primary" />
                </div>
                <div class="q-pa-md row" style="font-size: 16px">
                  <div class="col-12 row" style="justify-content:space-between">
                    <div class="col-9">
                      <label class="w600 q-pa-xs">
                        Company Name
                      </label>
                      <q-input dense outlined readonly color="secondary" v-model="data.partner.title" />
                    </div>
                    <div class="col-2">
                      <img :src="data.partner.logo" height="75">
                    </div>
                  </div>
                  <div class="col-12 row">
                    <div class="col-6 q-pr-sm">
                      <label class="w600 q-pa-xs">
                        Job Profile
                      </label>
                      <q-input dense outlined readonly color="secondary" v-model="data.partner.profile" />
                    </div>
                    <div class="col-6">
                      <label class="w600 q-pa-xs">
                        Job Perks Offered
                      </label>
                      <q-input dense outlined readonly color="secondary" v-model="data.more.perks" />
                    </div>
                  </div>
                  <div class="col-12 row q-mt-md">
                    <div class="col-4">
                      <label class="w600 q-pa-xs">
                        Job Category
                      </label>
                      <q-input dense outlined readonly color="secondary" v-model="data.partner.category" />
                    </div>
                    <div class="col-4 q-px-sm">
                      <label class="w600 q-pa-xs">
                        Job Location
                      </label>
                      <q-input dense outlined readonly color="secondary" v-model="data.partner.location" />
                    </div>
                    <div class="col-4">
                      <label class="w600 q-pa-xs">
                        Experience Required
                      </label>
                      <q-input dense outlined readonly color="secondary" v-model="data.more.experience" />
                    </div>
                  </div>
                  <div class="col-12 row q-mt-md">
                    <label class="w600 col-12 q-pa-xs">
                      Job Introduction
                    </label>
                    <span color="secondary" class="col-12 editor-card" v-html="data.partner.intro"></span>
                  </div>
                  <div class="col-12 row q-mt-md">
                    <label class="w600 col-12 q-pa-xs">
                      Job Description
                    </label>
                    <span color="secondary" class="col-12 editor-card" v-html="data.partner.job_description"></span>
                  </div>
                  <div class="col-12 row q-mt-md">
                    <label class="w600 col-12 q-pa-xs">
                      Responsibilities
                    </label>
                    <span color="secondary" class="col-12 editor-card" v-html="data.more.responsibilities"></span>
                  </div>
                  <div class="col-12 row q-mt-md">
                    <label class="w600 col-12 q-pa-xs">
                      Qualification Required
                    </label>
                    <span color="secondary" class="col-12 editor-card" v-html="data.more.qualification"></span>
                  </div>
                </div>
                <div class="q-mt-md">
                  <q-separator color="primary" />
                </div>
                <div class="q-pa-md row" style="font-size: 16px">
                  <span class="w600 text-h6"> Person Of Contact Details </span>
                  <div class="col-12 row q-py-md">
                    <div class="col-12 row">
                      <div class="col-6 q-pr-sm">
                        <label class="w600 q-pa-xs">
                          Name
                        </label>
                        <q-input dense outlined readonly color="secondary" v-model="data.poc.name" />
                      </div>
                      <div class="col-6">
                        <label class="w600 q-pa-xs">
                          Email
                        </label>
                        <q-input dense outlined readonly color="secondary" v-model="data.poc.email" />
                      </div>
                    </div>
                    <div class="col-12 row q-mt-md">
                      <div class="col-6 q-pr-sm">
                        <label class="w600 q-pa-xs">
                          Contact
                        </label>
                        <q-input dense outlined readonly color="secondary" v-model="data.poc.contact" />
                      </div>
                      <div class="col-6">
                        <label class="w600 q-pa-xs">
                          Linkedin
                        </label>
                        <q-input dense outlined readonly color="secondary" v-model="data.poc.linkedin" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
              <thead class="bg-grey-4">
                <tr class="text-left">
                  <th class="text-center" scope="col">#</th>
                  <!-- <th scope="col">Company Logo</th> -->
                  <th scope="col">Company</th>
                  <th scope="col">Profile</th>
                  <th scope="col">Category</th>
                  <th scope="col">Location</th>
                  <th class="text-center" style="width: 8%" scope="col">Status</th>
                  <th class="text-center" scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="partner in data.partners" :key="partner.id">
                  <td class="text-center">{{ count++ }}</td>
                  <!-- <td>
                    <q-img :src="partner.logo" spinner-color="white" style="height: 70px; width: 100%" />
                  </td> -->
                  <td>
                    <q-item clickable @click="openViewModal(id = partner.id)" class="text-primary"> {{ partner.title }}
                    </q-item>
                  </td>
                  <td> {{ partner.category }} </td>
                  <td> {{ partner.profile }} </td>
                  <td> {{ partner.location }} </td>
                  <td class="text-center" v-if="partner.status == 1">
                    <q-badge rounded color="green" class="status">
                      Active
                    </q-badge>
                  </td>
                  <td class="text-center" v-if="partner.status == 0">
                    <q-badge rounded color="red" class="status">
                      InActive
                    </q-badge>
                  </td>
                  <td class="text-center">
                    <q-fab flat color="grey-9" icon="settings" direction="left" padding="sm">
                      <q-fab-action color="primary" @click="openEditModal(id = partner.id)" text-color="white"
                        icon="edit">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Edit</q-tooltip>
                      </q-fab-action>
                      <q-fab-action v-if="partner.status == 1" color="red" text-color="white" icon="change_circle">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Change to InActive</q-tooltip>
                      </q-fab-action>
                      <q-fab-action v-if="partner.status == 0" color="green" text-color="white" icon="change_circle">
                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                          transition-hide="scale">Change to Active</q-tooltip>
                      </q-fab-action>
                    </q-fab>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Loading, QSpinnerPie, Notify, LocalStorage } from 'quasar'
import { api } from "../../../boot/axios";

const route = useRoute();
const router = useRouter();
const createNewModal = ref(false);
const viewModal = ref(false)
const editModal = ref(false)
const confirm = ref(false)
const editNote = ref('')
let count = 1
const pocDetails = ref(false)
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
const expOptions = ['0 year', '1 year', '2 years', '3 years', '3+ years']

const access = LocalStorage.getItem('access_key')
const u_id = LocalStorage.getItem('u_id')
const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
})

const job = reactive({
  title: '',
  intro: '',
  jd: '',
  jd_file: null,
  location: '',
  category: '',
  profile: '',
  logo: null,
  more: '',
  status: null
})

const more = reactive({
  perks: '',
  experience: '',
  responsibilities: '',
  qualification: '',
})

const poc = reactive({
  name: '',
  email: '',
  contact: '',
  linkedin: ''
})

const data = reactive({
  partners: [],
  partner: [],
  more: null,
  poc: null,
  FormData: null,
});

window.onresize = function () {
  count = 1
}

const editHiringPartner = () => {
  data.FormData = new FormData;
  data.FormData.append('id', data.partner.id)
  data.FormData.append('title', data.partner.title)
  data.FormData.append('profile', data.partner.profile)
  data.FormData.append('job_description', data.partner.job_description)
  data.FormData.append('jd_file', data.partner.jd_file)
  data.FormData.append('location', data.partner.location)
  data.FormData.append('logo', data.partner.logo)
  data.FormData.append('category', data.partner.category)
  data.FormData.append('more', JSON.stringify(data.more))
  data.FormData.append('status', data.partner.status)
  data.FormData.append('poc', JSON.stringify(data.poc))
  data.FormData.append('intro', data.partner.intro)
  data.FormData.append('updated_by', u_id)
  data.FormData.append('updated_why', editNote.value)
  api.post('update-placement-partner', data.FormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: res.data.msg
    });
    confirm.value = false
    api.get('placement-partners').then((response) => {
      data.partners = response.data.companies.data
      count = 1
      Loading.hide()
    })
  }).catch((err) => {
    console.log('Error: ', err)
  })
}

const openViewModal = (id) => {
  api.get('edit-placement-partner', { params: { id: id } }).then((res) => {
    data.partner = res.data.meta
    data.more = JSON.parse(data.partner.more)
    data.poc = JSON.parse(data.partner.poc)
    viewModal.value = true
    count = 1
  })
}
const openEditModal = (id) => {
  api.get('edit-placement-partner', { params: { id: id } }).then((res) => {
    data.partner = res.data.meta
    data.more = JSON.parse(data.partner.more)
    data.poc = JSON.parse(data.partner.poc)
    editModal.value = true
    count = 1
  })
}

const addHiringPartner = () => {
  data.FormData = new FormData;
  data.FormData.append('title', job.title)
  data.FormData.append('intro', job.intro)
  data.FormData.append('job_description', job.jd)
  data.FormData.append('jd_file', job.jd_file)
  data.FormData.append('location', job.location)
  data.FormData.append('logo', job.logo)
  data.FormData.append('category', job.category)
  data.FormData.append('more', JSON.stringify(more))
  data.FormData.append('status', job.status)
  data.FormData.append('added_by', u_id)
  data.FormData.append('poc', JSON.stringify(poc))
  data.FormData.append('profile', job.profile)
  api.post('placement-partner', data.FormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: res.data.msg
    });
    createNewModal.value = false
    api.get('placement-partners').then((response) => {
      data.partners = response.data.companies.data
      count = 1
      Loading.hide()
    })
  }).catch((err) => {
    console.log('Error: ', err)
  })
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get('placement-partners').then((response) => {
    data.partners = response.data.companies.data
    Loading.hide()
  })

  // const rights = access.filter(checkEvent);
  // rights.forEach(function (el) {
  //   let key = el.split('.')[1]
  //   if (el.includes('assessment')) {
  //     state[key] = true
  //   }
  // });

  // function checkEvent(keys) {
  //   return keys.includes('assessment');
  // }
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
    font-weight: 600;
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

.browes-btn {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  background-color: #3b49e7;
  color: #fff;

}

.editor-card {
  border: 1px solid #bfbfbf;
  border-style: dashed;
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
}

.createNew {
  width: 750px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
