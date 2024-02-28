<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12" style="width:100%">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Dt Gyan</h5>
            <q-btn v-if="state.create && tab == 'videos'" style="border-radius: 6px;" class="create-btn"
              label="create new video" @click="openCreateModal" />
            <q-btn v-if="state.create && tab == 'series'" style="border-radius: 6px;" class="create-btn"
              label="create new series" @click="openCreateModal" />
          </div>

          <q-dialog v-model="confirm" persistent>
            <q-card style="width: 500px">
              <q-form v-if="tab == 'videos'" @submit="updateVideo">
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
                  <q-btn label="Cancel" outline @click="vCount = 1" v-close-popup />
                  <q-btn label="Update" color="secondary" type="submit" />
                </q-card-actions>
              </q-form>
              <q-form v-if="tab == 'series'" @submit="updateSeries">
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
                  <q-btn label="Cancel" outline @click="sCount = 1" v-close-popup />
                  <q-btn label="Update" color="secondary" type="submit" />
                </q-card-actions>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="createNewModal" full-height position="right">
            <q-card v-if="tab == 'videos'">
              <q-form class="createNew" @submit="addVideo" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Add New Video</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Title
                      </label>
                      <q-input dense outlined v-model="video.title" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Title']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Select Series
                      </label>
                      <q-select outlined dense class="col-9" v-model="video.series" :options="data.seriesName" lazy-rules
                        :rules="[val => val != null || 'Please Select Series']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Publish Date
                      </label>
                      <q-input type="date" class="col-9" dense outlined v-model="video.publish_date" mask="date"
                        :rules="[val => val && val.length > 0 || 'Please Enter Publish Date']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Select Related Course
                      </label>
                      <q-select outlined multiple dense class="col-9" v-model="video.related_course"
                        :options="data.courses" option-label="title" option-value="id" emit-value map-options lazy-rules
                        :popup-content-style="{ width: '385px' }"
                        :rules="[val => val != null || 'Please Select Related Course']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Thumbnail
                      </label>
                      <q-file dense outlined v-model="video.thumbnail" label="Choose File" class="col-9" lazy-rules
                        :rules="[val => val != null || 'Please Add Thumbnail']" hint=" Image Size: [640px x 360px]" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Feature Banner
                      </label>
                      <q-file dense outlined v-model="video.large_banner" label="Choose File" class="col-9" lazy-rules
                        :rules="[val => val != null || 'Please Add Feature Banner']"
                        hint=" Image Size: [1200px x 500px]" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Mobile Feature Banner
                      </label>
                      <q-file dense outlined v-model="video.small_banner" label="Choose File"
                        hint="ImageSize: [600px x 900px]" class="col-9" lazy-rules
                        :rules="[val => val != null || 'Please Add Mobile Feature Banner']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Youtube Video Id
                      </label>
                      <q-input dense v-model="video.yt_id" outlined color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Youtube URL']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Feature on Banner
                      </label>
                      <q-select outlined dense class="col-9" v-model="video.feature_on_banner" :options="options1"
                        emit-value map-options lazy-rules :rules="[val => val != null || 'Please Select an Option']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Publish
                      </label>
                      <q-select outlined dense class="col-9" v-model="video.publish" :options="options1" emit-value
                        map-options lazy-rules :rules="[val => val != null || 'Please Select an Option']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Title
                      </label>
                      <q-input dense outlined v-model="video.meta_title" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Title']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Description
                      </label>
                      <q-input dense v-model="video.meta_description" outlined color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Description']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Keywords
                      </label>
                      <q-input dense outlined v-model="video.meta_keywords" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Keywords']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Tags
                      </label>
                      <q-input dense outlined v-model="video.meta_tags" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Tags']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Description
                      </label>
                      <q-editor v-model="video.description" class="col-9" :dense="$q.screen.lt.md" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: space-between;">
                    <q-btn outline label="Clear" type="reset" />
                    <q-btn color="primary" label="Create" type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
            <q-card v-else-if="tab == 'series'">
              <q-form class="createNew" @submit="addSeries" @reset="onReset">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Add New Series</span>
                    <q-btn icon="close" dense flat @click="onReset" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Title
                      </label>
                      <q-input dense outlined v-model="Series.title" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Title']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Title
                      </label>
                      <q-input dense outlined v-model="Series.meta_title" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Title']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Keywords
                      </label>
                      <q-input dense outlined v-model="Series.meta_keywords" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Keywords']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Description
                      </label>
                      <q-input dense type="textarea" v-model="Series.meta_description" outlined color="secondary"
                        class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Description']" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: space-between;">
                    <q-btn outline label="Clear" type="reset" />
                    <q-btn color="primary" label="Create" type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <q-dialog maximized style="padding: 0;" persistent v-model="editModal" full-height position="right">
            <q-card v-if="tab == 'videos'">
              <q-form class="createNew" @submit="confirm = true; editModal = false; vCount = 1">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Update Video Details</span>
                    <q-btn icon="close" dense flat @click="vCount = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Title
                      </label>
                      <q-input dense outlined v-model="data.video.title" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Title']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Select Series
                      </label>
                      <q-select outlined dense class="col-9" v-model="data.video.category" :options="data.seriesName"
                        lazy-rules :rules="[val => val != null || 'Please Select Series']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Publish Date
                      </label>
                      <q-input type="date" class="col-9" dense outlined v-model="data.video.published" mask="date"
                        :rules="[val => val && val.length > 0 || 'Please Enter Publish Date']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: flex-start;">
                      <label class="w600 col-3">
                        Select Related Course
                      </label>
                      <q-select outlined label="Only if you want any update" label-color="primary" multiple dense
                        class="col-9" v-model="video.related_course" :options="data.courses" option-label="title"
                        option-value="id" emit-value map-options lazy-rules use-chips
                        :popup-content-style="{ width: '385px' }"
                        :rules="[val => val != null || 'Please Select Related Course']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Thumbnail
                      </label>
                      <q-file dense outlined v-model="data.video.thumbnailImage" label="Choose File" class="col-9"
                        lazy-rules :rules="[val => val != null || 'Please Add Thumbnail']"
                        hint=" Image Size: [640px x 360px]" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Feature Banner
                      </label>
                      <q-file dense outlined v-model="data.video.largeBanner" label="Choose File" class="col-9" lazy-rules
                        :rules="[val => val != null || 'Please Add Feature Banner']"
                        hint=" Image Size: [1200px x 500px]" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: flex-start;">
                      <label class="w600 col-3">
                        Mobile Feature Banner
                      </label>
                      <q-file dense outlined v-model="data.video.smallBanner" label="Choose File"
                        hint="ImageSize: [600px x 900px]" class="col-9" lazy-rules
                        :rules="[val => val != null || 'Please Add Mobile Feature Banner']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Youtube Video Id
                      </label>
                      <q-input dense v-model="data.video.youtubeUrl" outlined color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Youtube URL']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Feature on Banner
                      </label>
                      <q-select outlined dense class="col-9" v-model="data.video.isFeatured" :options="options1"
                        emit-value map-options lazy-rules :rules="[val => val != null || 'Please Select an Option']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Publish
                      </label>
                      <q-select outlined dense class="col-9" v-model="data.video.unpublished" :options="options1"
                        emit-value map-options lazy-rules :rules="[val => val != null || 'Please Select an Option']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Title
                      </label>
                      <q-input dense outlined v-model="data.video.meta_title" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Title']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Description
                      </label>
                      <q-input dense v-model="data.video.meta_description" outlined color="secondary" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Meta Description']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Keywords
                      </label>
                      <q-input dense outlined v-model="data.video.meta_keywords" color="secondary" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Meta Keywords']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Tags
                      </label>
                      <q-input dense outlined v-model="data.video.meta_tags" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Tags']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Description
                      </label>
                      <q-editor v-model="data.video.description" class="col-9" :dense="$q.screen.lt.md" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: flex-end;">
                    <q-btn color="primary" label="Update" type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
            <q-card v-else-if="tab == 'series'">
              <q-form class="createNew" @submit="confirm = true; editModal = false; sCount = 1">
                <q-card-section class="q-pa-none">
                  <div class="row create-header q-pa-md" style="justify-content:space-between">
                    <span class="text-h6 w600">Update Series Details</span>
                    <q-btn icon="close" dense flat @click="sCount = 1" v-close-popup />
                  </div>
                  <div>
                    <q-separator color="primary" />
                  </div>
                  <div class="row q-pa-md">
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Title
                      </label>
                      <q-input dense outlined v-model="data.Series.name" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Title']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Title
                      </label>
                      <q-input dense outlined v-model="data.Series.meta_title" color="secondary" class="col-9" lazy-rules
                        :rules="[val => val && val.length > 0 || 'Please Enter Meta Title']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Description
                      </label>
                      <q-input dense v-model="data.Series.meta_description" outlined color="secondary" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Meta Description']" />
                    </div>
                    <div class="col-12 row q-mt-sm" style="align-items: baseline;">
                      <label class="w600 col-3">
                        Meta Keywords
                      </label>
                      <q-input dense outlined v-model="data.Series.meta_keywords" color="secondary" class="col-9"
                        lazy-rules :rules="[val => val && val.length > 0 || 'Please Enter Meta Keywords']" />
                    </div>
                  </div>
                </q-card-section>
                <q-card-section class="q-pa-none">
                  <div>
                    <q-separator />
                  </div>
                  <div class="row q-pa-md" style="justify-content: flex-end;">
                    <q-btn color="primary" label="Update" type="submit" />
                  </div>
                </q-card-section>
              </q-form>
            </q-card>
          </q-dialog>

          <div class="table-container shadowBoder">
            <q-tabs v-model="tab" class="text-secondary row" align="justify">
              <q-tab name="videos" :label="'Videos (' + data.total + ')'" />
              <q-tab name="series" :label="'Series (' + data.series.length + ')'" @click="series" />
            </q-tabs>
            <q-separator class="q-mb-sm" />

            <q-tab-panels v-model="tab" animated swipeable>
              <q-tab-panel name="videos" class="q-pa-none">
                <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0"
                  width="100%">
                  <thead class="bg-grey-4">
                    <tr>
                      <th class="text-center" scope="col">#</th>
                      <th class="text-left" scope="col">Thumbnail</th>
                      <th class="text-left" scope="col">Title
                        <q-btn flat v-if="upArrow"
                          @click="sortTable(type = 'video', field = 'title', direction = 'asc')"><span
                            id="arrow-icon">&uarr;&darr;</span></q-btn>
                        <q-btn flat v-else @click="sortTable(type = 'video', field = 'title', direction = 'dsc')"><span
                            id="arrow-icon">&darr;&uarr;</span></q-btn>
                      </th>
                      <th class="text-left" scope="col">Category
                        <q-btn flat v-if="upArrow"
                          @click="sortTable(type = 'video', field = 'category', direction = 'asc')"><span
                            id="arrow-icon">&uarr;&darr;</span></q-btn>
                        <q-btn flat v-else @click="sortTable(type = 'video', field = 'category', direction = 'dsc')"><span
                            id="arrow-icon">&darr;&uarr;</span></q-btn>
                      </th>
                      <th class="text-center" scope="col">Status</th>
                      <th class="text-left" v-if="state.edit || state.status" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="video in  data.videos" :key="video.id">
                      <td class="text-center">{{ vCount++ }}</td>
                      <td class="text-center" style="width: 15%;">
                        <q-img :src="video.thumbnailImage" spinner-color="white" style="height: 70px; width: 100%" />
                      </td>
                      <td>
                        {{ video.title }}
                      </td>
                      <td>
                        {{ video.category }}
                      </td>
                      <td class="text-center" v-if="video.unpublished == 1">
                        <q-badge rounded color="green" class="status">
                          Active
                        </q-badge>
                      </td>
                      <td class="text-center" v-if="video.unpublished == 0">
                        <q-badge rounded color="red" class="status">
                          InActive
                        </q-badge>
                      </td>
                      <td v-if="state.edit || state.status" style="width: 20px" class="text-center">
                        <div>
                          <q-fab flat color="grey-9" icon="settings" direction="left" padding="sm">
                            <q-fab-action v-if="state.edit" color="primary" text-color="white" icon="edit"
                              @click="openEditModal(id = video.id, type = 'video')">
                              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="scale" transition-hide="scale">
                                Edit
                              </q-tooltip>
                            </q-fab-action>
                            <q-fab-action v-if="video.unpublished == 0 && state.status"
                              @click="ChangeStatus(id = video.id, status = 1)" color="green" text-color="white"
                              icon="change_circle">
                              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="scale" transition-hide="scale">
                                Change To Active
                              </q-tooltip>
                            </q-fab-action>
                            <q-fab-action v-if="video.unpublished == 1 && state.status" color="red" text-color="white"
                              icon="change_circle" @click="ChangeStatus(id = video.id, status = 0)">
                              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="scale" transition-hide="scale">
                                Change To InActive
                              </q-tooltip>
                            </q-fab-action>
                          </q-fab>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="shadowBoder col-md-12 ">
                  <div>
                    <p class="w600 q-ma-none flex flex-center float-left"> Showing data between {{ Number(data.from) }} to
                      {{
                        Number(data.to) }} out of {{ Number(data.total) }}</p>
                    <q-pagination class="flex float-right" v-model="current" @click="paginate(current)"
                      :max="Number(data.last_page)" :max-pages="2" :boundary-numbers="true" direction-links />
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="series" class="q-pa-none">
                <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0"
                  width="100%">
                  <thead class="bg-grey-4">
                    <tr>
                      <th class="text-center" scope="col">#</th>
                      <th class="text-left" scope="col">Title
                        <q-btn flat v-if="upArrow"
                          @click="sortTable(type = 'series', field = 'name', direction = 'asc')"><span
                            id="arrow-icon">&uarr;&darr;</span></q-btn>
                        <q-btn flat v-else @click="sortTable(type = 'series', field = 'name', direction = 'dsc')"><span
                            id="arrow-icon">&darr;&uarr;</span></q-btn>
                      </th>
                      <th class="text-left" v-if="state.edit || state.status" scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="series in data.series" :key="series.id">
                      <td class="text-center">{{ sCount++ }}</td>
                      <td>
                        {{ series.name }}
                      </td>
                      <td class="text-center" v-if="state.edit || state.status" style="width: 5%">
                        <div>
                          <q-btn v-if="state.edit" round dense color="primary" text-color="white"
                            @click="openEditModal(id = series.id, type = 'series')" icon="edit">
                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                              transition-hide="scale">Edit</q-tooltip>
                          </q-btn>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from 'quasar'
import { Loading, QSpinnerPie } from 'quasar'
import { api } from "../../../../boot/axios";

const route = useRoute();
const router = useRouter();
const tab = ref('videos')
const access = LocalStorage.getItem('access_key')
const u_id = LocalStorage.getItem('u_id')
const current = ref(1);
let upArrow = ref(true);
let vCount = 1
let sCount = 1
const createNewModal = ref(false)
const editModal = ref(false)
const confirm = ref(false)
const editNote = ref('')
const options1 = [
  {
    label: 'Yes',
    value: 1,
  },
  {
    label: 'No',
    value: 0
  }
];

const video = reactive({
  title: null,
  description: null,
  publish_date: null,
  yt_id: null,
  series: null,
  related_course: [],
  thumbnail: null,
  large_banner: null,
  small_banner: null,
  feature_on_banner: 0,
  publish: 1,
  meta_title: null,
  meta_description: null,
  meta_keywords: null,
  meta_tags: null,
  FormData: null,
});
const Series = reactive({
  title: null,
  meta_title: null,
  meta_keywords: null,
  meta_description: null,
});
window.onresize = function () {
  vCount = 1
  sCount = 1
}

const state = reactive({
  create: ref(false),
  edit: ref(false),
  delete: ref(false),
  status: ref(false),
  update: ref(false),
})

const dialog = ref(false);

const fab = ref(false);
const data = reactive({
  videos: [],
  video: [],
  series: [],
  Series: [],
  courses: [],
  seriesName: [],
  last_page: '',
  from: '',
  to: '',
  total: null,
  FormData: null
});

const sortTable = (type, field, direction) => {
  if (direction == 'asc') {
    upArrow.value = false;
    if (type == 'video') {
      vCount = 1;
      switch (field) {
        case field:
          data.videos.sort((a, b) => {
            let fa = a[field].toLowerCase();
            let fb = b[field].toLowerCase();

            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          })
          break;
      }
    } else if (type == 'series') {
      sCount = 1;
      switch (field) {
        case field:
          data.series.sort((a, b) => {
            let fa = a[field].toLowerCase();
            let fb = b[field].toLowerCase();

            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          })
          break;
      }
    }
  }
  else if (direction == 'dsc') {
    upArrow.value = true;
    if (type == 'video') {
      vCount = 1;
      switch (field) {
        case field:
          s.sort((a, b) => {
            let fa = a[field].toLowerCase();
            let fb = b[field].toLowerCase();

            if (fa > fb) {
              return -1;
            }
            if (fa < fb) {
              return 1;
            }
            return 0;
          })
      }
    }
    else if (type == 'series') {
      sCount = 1;
      switch (field) {
        case field:
          data.series.sort((a, b) => {
            let fa = a[field].toLowerCase();
            let fb = b[field].toLowerCase();

            if (fa > fb) {
              return -1;
            }
            if (fa < fb) {
              return 1;
            }
            return 0;
          })
      }
    }
  }
}

window.onresize = function () {
  vCount = 1;
  sCount = 1;
}

const openEditModal = (id, type) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  if (type == 'video') {
    api.get("edit-dtg-video/" + id).then((response) => {
      data.video = response.data.video;
      editModal.value = true
      vCount = 1
      Loading.hide()
    });
  }
  else if (type == 'series') {
    api.get("edit-dtg-series/" + id).then((response) => {
      data.Series = response.data.series;
      editModal.value = true
      sCount = 1
      Loading.hide()
    });
  }
}

const updateSeries = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post("update-dtg-series", {
    id: data.Series.id,
    name: data.Series.name,
    meta_title: data.Series.meta_title,
    meta_keywords: data.Series.meta_keywords,
    meta_description: data.Series.meta_description,
    updated_by: u_id,
    updated_why: editNote.value
  }).then((response) => {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'primary',
      message: response.data.msg
    })
    confirm.value = false
    editNote.value = ''
    api.get("dtg-series").then((response) => {
      data.series = response.data.series;
      Loading.hide()
      sCount = 1
    });
  }).catch((error) => {
    console.log("Error", error);
  });
};

const updateVideo = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  data.FormData = new FormData();
  data.FormData.append("id", data.video.id),
    data.FormData.append("thumbnail", data.video.thumbnailImage),
    data.FormData.append("largeBanner", data.video.largeBanner),
    data.FormData.append("smallBanner", data.video.smallBanner),
    data.FormData.append("title", data.video.title),
    data.FormData.append("discription", data.video.discription),
    data.FormData.append("tags", video.related_course),
    data.FormData.append("category", data.video.category),
    data.FormData.append("youtubeUrl", data.video.youtubeUrl),
    data.FormData.append("unpublished", data.video.unpublished),
    data.FormData.append("isFeatured", data.video.isFeatured),
    data.FormData.append("published", data.video.published),
    data.FormData.append("meta_title", data.video.meta_title),
    data.FormData.append("meta_description", data.video.meta_description),
    data.FormData.append("meta_keywords", data.video.meta_keywords),
    data.FormData.append("meta_tags", data.video.meta_tags),
    data.FormData.append('updated_by', u_id)
  data.FormData.append('updated_why', editNote.value)

  api.post('update-dtg-video', data.FormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(function (response) {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    });
    confirm.value = false
    editNote.value = ''
    api.get("dtg-video").then((response) => {
      data.videos = response.data.video.data;
      Loading.hide()
      vCount = 1;
    })
  }).catch(function (error) {
    console.log(error);
  });
};

const openCreateModal = () => {
  createNewModal.value = true
  sCount = 1;
  vCount = 1
}

const addVideo = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  video.FormData = new FormData();
  video.FormData.append("thumbnail", video.thumbnail),
    video.FormData.append("largeBanner", video.large_banner),
    video.FormData.append("smallBanner", video.small_banner),
    video.FormData.append("title", video.title),
    video.FormData.append("description", video.description),
    video.FormData.append("tags", video.related_course),
    video.FormData.append("category", video.series),
    video.FormData.append("youtubeUrl", video.yt_id),
    video.FormData.append("unpublished", video.publish),
    video.FormData.append("isFeatured", video.feature_on_banner),
    video.FormData.append("published", video.publish_date),
    video.FormData.append("meta_title", video.meta_title),
    video.FormData.append("meta_description", video.meta_description),
    video.FormData.append("meta_keywords", video.meta_keywords),
    video.FormData.append("meta_tags", video.meta_tags),
    video.FormData.append('added_by', u_id)

  api.post('add-dtg-video', video.FormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(function (response) {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    });
    createNewModal.value = false
    api.get("dtg-video").then((response) => {
      data.videos = response.data.video.data;
      Loading.hide()
      vCount = 1;
    })
  }).catch(function (error) {
    console.log(error);
  });
}

const addSeries = () => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api.post('add-dtg-series', {
    name: Series.title,
    meta_title: Series.meta_title,
    meta_keywords: Series.meta_keywords,
    meta_description: Series.meta_description,
    added_by: u_id
  }).then(function (response) {
    Notify.create({
      timeout: 2000,
      position: 'top-right',
      color: 'green',
      message: response.data.msg
    })
    createNewModal.value = false
    api.get("dtg-series").then((response) => {
      data.series = response.data.series;
      Loading.hide()
      sCount = 1
    });
  }).catch(function (error) {
    console.log(error);
  })
}

const paginate = async (current) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  await api.get("https://genesis.datatrained.com/api/admin/dtg-video?page=" + current).then((response) => {
    data.videos = response.data.video.data
    data.from = response.data.video.from;
    data.to = response.data.video.to;
    Loading.hide()
    vCount = 1
    sCount = 1
  })
}

const ChangeStatus = (id, status) => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })
  api
    .post("dtg-video-action", {
      action: 1,
      id: id,
      status: status
    }).then((response) => {
      Notify.create({
        timeout: 2000,
        position: 'top-right',
        color: 'amber-7',
        message: response.data.msg
      })
      api.get("dtg-video").then((response) => {
        data.videos = response.data.video;
        vCount = 1
        Loading.hide()
      });
    }).catch((error) => {
      console.log("Error", error);
    });
};

const series = () => {
  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('dt-gyan-series')) {
      state[key] = true
    }
  });

  function checkEvent(keys) {
    return keys.includes('dt-gyan-series');
  }
  vCount = 1
  sCount = 1
}

const onReset = () => {
  video.title = null,
    video.series = null,
    video.publish_date = null,
    video.related_course = null,
    video.thumbnail = null,
    video.large_banner = null,
    video.small_banner = null,
    video.yt_id = null,
    video.meta_title,
    video.meta_description = null,
    video.meta_keywords = null,
    video.meta_tags = null,
    video.description = null,
    vCount = 1,
    Series.title = null,
    Series.meta_title = null,
    Series.meta_keywords = null,
    Series.meta_description = null,
    sCount = 1
}

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: 'primary',
    messageColor: 'black',
    backgroundColor: 'white',
    message: 'Loading Page Data. Please Wait!'
  })

  api.get("course").then((response) => {
    data.courses = response.data.course
    vCount = 1
  });

  api.get("dtg-series").then((response) => {
    data.series = response.data.series;
    data.series.forEach((obj) => data.seriesName.push(obj.name))
    vCount = 1
  });

  api.get("dtg-video").then((response) => {
    data.videos = response.data.video.data;
    data.last_page = response.data.video.last_page;
    data.from = response.data.video.from;
    data.to = response.data.video.to;
    data.total = response.data.video.total
    Loading.hide()
    vCount = 1;
  })

  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('dt-gyan-video')) {
      state[key] = true
    }

  });

  function checkEvent(keys) {
    return keys.includes('dt-gyan-video');
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

.createNew {
  width: 750px;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
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


td,
th {
  border: 1px solid #e6e6e6;
  padding: 5px 10px;
}

th {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
}

td {
  font-size: 13px;
  color: #4f4f4f;
}

.create-btn {
  width: 13%;
  font-size: 14px;
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1023px) and (orientation : portrait) {

  td {
    font-size: 9px;
    padding: 6px 4px;
  }

  th {
    font-size: 12px;
    white-space: nowrap;
    padding: 5px 5px;
  }

  .status {
    width: 50px;
    font-size: 9px;
    padding: 3px;
  }

  h5 {
    font-size: 15px;
  }

  .head-btn-box {
    height: 4vh;
  }

  .table-container {
    padding: 0 !important;
  }

  .create-btn {
    width: 111px !important;
    font-size: 8px;

  }

}
</style>
