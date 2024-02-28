<template>
  <q-page class="q-pa-md main-background">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="q-mb-sm">
            <h5 class="q-my-sm w600">Dashboard</h5>
            <span>Dashboard &gt; <span style="color: #0288d1">CMS</span></span>
          </div>

          <div class="row ">
            <div class="col-4" style="height: 340px">
              <q-card rounded style="height: 100%">
                <q-card-section>
                  <div class="row" style="justify-content: space-between">
                    <h6 class="q-ma-none">Upcoming Batches</h6>
                    <q-btn outline class="table1-btn" to="/upcoming-batches">
                      View All
                    </q-btn>

                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section class="q-pa-md">
                  <div class="row q-pa-sm table-card" v-for="batch in data.upcomingBatches">
                    <div class="row" style="align-items: center">
                      <span class="material-symbols-outlined q-pa-sm q-mr-sm table-card1-icon">
                        event_upcoming
                      </span>
                      <div>
                        <span class="q-pl-md">{{ batch.batch_name }}</span><br />
                        <span class="q-pl-md">5 Days</span>
                      </div>
                    </div>
                    <div>
                      <span class="table-card1-date">{{ batch.created_at }}</span>
                    </div>
                  </div>




                </q-card-section>
              </q-card>
            </div>
            <div class="col-8 col q-pl-sm">
              <div class="row">
                <div class="col-6 q-pl-md q-pb-md">
                  <q-card class="q-pa-lg btn1-cms">
                    <div class="row" style="justify-content: space-between;">
                      <div class="row">
                        <span class="material-symbols-outlined q-pa-md card1-icon">event_upcoming</span>
                        <div class="q-pl-md">
                          <span class="card-heading">Upcoming Batches</span><br>
                          <span class="w600" style="font-size: 22px;"> {{ data.upcomingBatchesRecords }}</span>
                        </div>
                      </div>
                      <div>
                        <span class="material-symbols-outlined card1-side-icon">monitoring</span>
                      </div>

                    </div>
                    <div class="row card-common-css">
                      <q-btn class="q-mt-md card1-btn" to="/upcoming-batches" flat>
                        View All
                        <q-icon class="q-pl-sm" style="font-size: 16px;" name="arrow_forward " />
                      </q-btn>
                      <div>
                        <span class="q-pr-sm lastMonth-common w600">{{ data.lastMonthBatchRecords }}</span> <br>
                        <span>LastMonth</span>
                      </div>
                    </div>
                  </q-card>
                </div>
                <div class="col-6 q-pl-lg q-pb-md">
                  <q-card class="q-pa-lg btn2-cms">
                    <div class="row" style="justify-content: space-between;">
                      <div class="row">


                        <span class="material-symbols-outlined q-pa-md card2-icon">event</span>
                        <div class="q-pl-md">
                          <span class="card-heading">Upcoming Events</span><br>
                          <span class="w600" style="font-size: 22px;">{{ data.upcomingEventsRecords }}</span>
                        </div>
                      </div>
                      <div>
                        <span class="material-symbols-outlined card2-side-icon">monitoring</span>
                      </div>
                    </div>
                    <div class="row card-common-css">
                      <q-btn class="q-mt-md card2-btn" flat>
                        View All
                        <q-icon class="q-pl-sm" style="font-size: 16px;" name="arrow_forward " />

                      </q-btn>
                      <div>
                        <span class="q-pr-sm  lastMonth-common w600">{{ data.lastMonthEventRecords }}</span> <br>
                        <span>LastMonth</span>
                      </div>
                    </div>
                  </q-card>
                </div>
              </div>
              <div class="row">
                <div class="col-6 q-pl-md ">
                  <q-card class="q-pa-lg btn3-cms">
                    <div class="row" style="justify-content: space-between;">
                      <div class="row">


                        <span class="material-symbols-outlined q-pa-md card3-icon">newspaper</span>
                        <div class="q-pl-md">
                          <span class="card-heading">News</span><br>
                          <span class="w600" style="font-size: 22px;"> {{ data.newsRecords }}</span>
                        </div>
                      </div>
                      <div>
                        <span class="material-symbols-outlined card3-side-icon">monitoring</span>
                      </div>
                    </div>
                    <div class="row card-common-css">
                      <q-btn class="q-mt-md card3-btn" to="/all-articles" flat>
                        View All
                        <q-icon class="q-pl-sm" style="font-size: 16px;" name="arrow_forward " />

                      </q-btn>
                      <div>
                        <span class="q-pr-sm  lastMonth-common w600">{{ data.lastMonthNewsRecords }}</span> <br>
                        <span>LastMonth</span>
                      </div>
                    </div>
                  </q-card>
                </div>
                <div class="col-6 q-pl-lg">
                  <q-card class="q-pa-lg btn4-cms">
                    <div class="row" style="justify-content: space-between;">
                      <div class="row">
                        <span class="material-symbols-outlined q-pa-md card4-icon">trophy</span>
                        <div class="q-pl-md">
                          <span class="card-heading">Success Stories</span><br>
                          <span class="w600" style="font-size: 22px;">{{ data.storiesRecords }} </span>
                        </div>
                      </div>
                      <div>
                        <span class="material-symbols-outlined card4-side-icon">monitoring</span>
                      </div>
                    </div>
                    <div class="row card-common-css">
                      <q-btn class="q-mt-md card4-btn" to="/all-stories" flat>
                        View All
                        <q-icon class="q-pl-sm" style="font-size: 16px;" name="arrow_forward " />
                      </q-btn>
                      <div>
                        <span class="q-pr-sm  lastMonth-common w600">{{ data.lastMonthStoriesRecords }}</span> <br>
                        <span>LastMonth</span>
                      </div>
                    </div>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
          <div class="row  q-my-lg">
            <div class="col-4">
              <q-card rounded>
                <q-card-section>
                  <div class="row" style="justify-content: space-between">
                    <h6 class="q-ma-none">Upcoming Events</h6>
                    <q-btn outline class="table2-btn">
                      View All
                    </q-btn>
                  </div>
                </q-card-section>
                <q-separator />
                <div class="table-wrapper-news">
                  <q-card-section class="q-pa-sm">
                    <div class="q-pa-lg">
                      <span v-if="data.upcomingEvents == ''" style="font-size: 16px;" class="text-primary">
                        Currently there is no Upcoming Events
                      </span>
                    </div>
                    <div class="row q-pa-sm table-card" v-for="event in  data.upcomingEvents">
                      <div class="row" style="align-items: center">
                        <span class="material-symbols-outlined q-pa-sm table-card2-icon">
                          event
                        </span>
                        <div>
                          <span class="q-pl-md">{{ event.name }}</span><br />
                          <span class="q-pl-md">5 Days</span>
                        </div>
                      </div>
                      <div>
                        <span class="q-pa-xs table-card2-date">{{ event.start_time }}</span>
                      </div>
                    </div>
                  </q-card-section>
                </div>

              </q-card>
            </div>
            <div class="col-4 q-pl-md">
              <q-card rounded>
                <q-card-section>
                  <div class="row" style="justify-content: space-between">
                    <h6 class="q-ma-none">Recently Added News</h6>
                    <q-btn outline class="table3-btn" to="/all-articles">
                      View All
                    </q-btn>
                  </div>
                </q-card-section>
                <q-separator />
                <div class="table-wrapper-news">
                  <q-card-section class="q-pa-sm">
                    <div class="row q-pa-sm table-card" v-for="news in data.recentNews">
                      <div class="row" style="align-items: center">
                        <span class="material-symbols-outlined q-pa-sm table-card3-icon">
                          newspaper
                        </span>
                        <div class="q-pl-md">
                          <a :href="news.link" style="text-decoration: none; color: black" target="_blank">
                            <div class="wrap-title">
                              {{ news.title }}
                              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="scale" transition-hide="scale">
                                {{ news.title }}
                              </q-tooltip>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div>
                        <span class="q-pa-xs table-card3-date">{{ news.updated }}</span>
                      </div>
                    </div>





                  </q-card-section>
                </div>
              </q-card>
            </div>

            <div class="col-4 q-pl-md">
              <q-card rounded>
                <q-card-section>
                  <div class="row" style="justify-content: space-between">
                    <h6 class="q-ma-none">Success Stories</h6>
                    <q-btn outline class="table4-btn" to="/all-stories">
                      View All
                    </q-btn>
                  </div>
                </q-card-section>
                <q-separator />
                <div class="table-wrapper-cms">
                  <q-card-section class="q-pa-sm">
                    <div class="row q-pa-sm table-card" v-for="story in data.stories">
                      <div class="row" style="align-items: center">
                        <span class="material-symbols-outlined q-pa-sm table-card4-icon">
                          trophy
                        </span>

                        <span class="q-pl-md wrap-title">{{ story.job_profile }}
                          <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]" transition-show="scale"
                            transition-hide="scale">
                            {{ story.job_profile }}
                          </q-tooltip>
                        </span>

                      </div>
                      <div>
                        <div class="text-center" v-if="story.status == 1">
                          <q-badge rounded color="green" class="status">
                            Active
                          </q-badge>
                        </div>
                        <div class="text-center" v-if="story.status == 0">
                          <q-badge rounded color="red" class="status">
                            InActive
                          </q-badge>
                        </div>
                      </div>
                    </div>





                  </q-card-section>
                </div>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { onMounted, onBeforeMount, reactive, ref } from "vue";
import { api2, api } from "../../boot/axios";
import { useRoute, useRouter } from "vue-router";
import { Notify, LocalStorage } from "quasar";
import { Loading, QSpinnerPie } from "quasar";

const data = reactive({
  storiesRecords: null,
  upcomingBatchesRecords: null,
  upcomingEventsRecords: null,
  newsRecords: null,
  lastMonthStoriesRecords: null,
  lastMonthBatchRecords: null,
  lastMonthEventRecords: null,
  lastMonthNewsRecords: null,
  recentNews: [],
  upcomingEvents: [],
  upcomingBatches: [],
  stories: [],
});

const tab = ref("tab1");

onBeforeMount(() => {
  Loading.show({
    spinner: QSpinnerPie,
    spinnerColor: "primary",
    messageColor: "black",
    backgroundColor: "white",
    message: "Loading Page Data. Please Wait!",
  });

  api2.post("recently-updated-news").then((response) => {
    data.recentNews = response.data.recently_updated_news;
    data.newsRecords = response.data.recently_updated_news.length;
    data.lastMonthNewsRecords = response.data.last_month_news_count;
  });

  api2.post("upcoming-batches").then((response) => {
    data.upcomingBatches = response.data.upcoming_batches;
    data.upcomingBatchesRecords = response.data.upcoming_batches.length;
    data.lastMonthBatchRecords = response.data.last_month_batches_count;
  });

  api2.post("upcoming-events").then((response) => {
    data.upcomingEvents = response.data.upcoming_events_count;
    data.upcomingEventsRecords = response.data.upcoming_events_count.length;
    data.lastMonthEventRecords = response.data.last_month_events_count;
  });

  api2.post("total-success-stories").then((response) => {
    data.stories = response.data.total_success_stories;
    data.storiesRecords = response.data.total_success_stories.length;
    data.lastMonthStoriesRecords = response.data.last_month_stories_count;
    Loading.hide();
  });
});
</script>

<style>
/* Common CSS */

.table-card {
  justify-content: space-between;
  align-items: center;
}

.lastMonth-common {
  float: right;
  font-size: 22px;
}

.card-common-css {
  justify-content: space-between;
  align-items: center;
}

.card-heading {
  font-size: 16px;
  color: grey;
}

/* Table CSS */

.table-card1-icon {
  color: #845adf;
  font-size: 25px;
  background-color: #edf2f1;
  border-radius: 50px;
}

.table-card1-date {
  border-radius: 5px;
  color: #845adf;
  background-color: #edf2f1;
  display: flex;
  align-items: center;
  width: 160px;
  justify-content: center;
}

.table1-btn {
  color: #845bdf;
  border-radius: 20px;
}

.table-card2-icon {
  background-color: #edf2f1;
  color: #23b7e5;
  font-size: 25px;
  border-radius: 50px;
}

.table-card2-date {
  background-color: #edf2f1;
  color: #23b7e5;
  border-radius: 5px;
}

.table2-btn {
  color: #29b7e5;
  border-radius: 20px;

}

.table-card3-icon {
  color: #26bf94;
  background-color: #edf2f1;
  font-size: 25px;
  border-radius: 50px;
}

.table-card3-date {
  background-color: #edf2f1;
  border-radius: 5px;
  color: #26bf94;
  display: flex;
  align-items: center;
  width: 160px;
  justify-content: center;
}

.table3-btn {
  color: #26bf94;

  border-radius: 20px;

}

.table-card4-icon {
  color: #f5b849;
  background-color: #edf2f1;
  font-size: 25px;
  border-radius: 50px;
}

.table-card4-date {
  color: #f5b849;
  background-color: #f2f1ed;
  border-radius: 5px;
}

.table4-btn {
  color: #f5b849;
  border-radius: 20px;
}


/* Card CSS */

.card1-icon {
  color: white;
  background-color: #845adf;
  font-size: 28px;
  border-radius: 50px;
}

.card1-side-icon {
  color: #845adf;
  font-size: 50px;
}


.card1-btn {
  color: #845adf;
  margin-left: 60px;
  border-radius: 20px;
}

.card2-icon {
  color: #fff;
  background-color: #23b7e5;
  font-size: 28px;
  border-radius: 50px;
}

.card2-side-icon {
  color: #23b7e5;
  font-size: 50px;
}

.card2-btn {
  color: #23b7e5;
  margin-left: 60px;
  border-radius: 20px;
}


.card3-icon {

  color: #fff;
  background-color: #26bf94;
  font-size: 28px;
  border-radius: 50px;

}

.card3-side-icon {

  color: #26bf94;
  font-size: 50px;

}

.card3-btn {
  color: #26bf94;
  margin-left: 60px;
  border-radius: 20px;
}

.card4-icon {

  color: #fff;
  background-color: #f5b849;
  font-size: 28px;
  border-radius: 50px;

}

.card4-side-icon {

  color: #f5b849;
  font-size: 50px;


}

.card4-btn {
  color: #f5b849;
  margin-left: 60px;
  border-radius: 20px;
}

.wrap-title {
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table-wrapper-cms {
  height: 300px;
  overflow-y: scroll;
}

.table-wrapper-news {
  height: 300px;
  overflow-y: scroll;
}

.table-wrapper-news::-webkit-scrollbar {
  display: none;
}

.table-wrapper-cms::-webkit-scrollbar {
  width: 10px;
  height: 6px;
}

.table-wrapper-cms::-webkit-scrollbar-thumb {
  background: rgba(147, 139, 146, 0.5);
}

.main-background {
  background-color: #fafdff;
}

.btn1-cms,
.btn2-cms,
.btn3-cms,
.btn4-cms {
  position: relative;
  z-index: 1;
}

.btn1-cms:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(0);
  transform-origin: bottom center;
  background: #f3effc;
  z-index: -1;
  transition: transform 0.8s;
  color: pink;
}

.btn2-cms:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(0);
  transform-origin: bottom center;
  background: #e4f5fa;
  z-index: -1;
  transition: transform 0.8s;
}

.btn1-cms:hover {
  color: #673ab7;
}

.btn2-cms:hover {
  color: #23b7e5;
}

.btn3-cms:hover {
  color: #26bf94;
}

.btn4-cms:hover {
  color: #f5b849;
}

.btn3-cms:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(0);
  transform-origin: bottom center;
  background: #f1fdf0;
  z-index: -1;
  transition: transform 0.8s;
}

.btn4-cms:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scaleY(0);
  transform-origin: bottom center;
  background: #fffaf2;
  z-index: -1;
  transition: transform 0.8s;
}

.btn1-cms:hover::after {
  transform: scaleY(1);
}

.btn2-cms:hover::after {
  transform: scaleY(1);
}

.btn3-cms:hover::after {
  transform: scaleY(1);
}

.btn4-cms:hover::after {
  transform: scaleY(1);
}</style>
