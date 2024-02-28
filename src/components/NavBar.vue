<template>
  <div>
    <!-- navbar  -->
    <q-header class="header-nav" style="box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1)"
      :class="$q.dark.isActive ? 'bg-secondary' : 'bg-white'">
      <q-toolbar style="min-height: 60px">
        <q-btn flat @click="miniState = !miniState" round dense icon="menu" class="icon-color drawer-icon" size="1rem" />

        <q-toolbar-title> </q-toolbar-title>
        <div class="row">
          <div class="col-6 row">
            <div class="col" style="max-width: 38px; padding-right: 7px;">
              <img src="../assets/imgAssets/avatar1.png" alt=""
                style="width: 38px; height: 38px; border-radius: 30px" />
            </div>
            <div class="col">
              <q-btn-dropdown flat class="logout-box" :label="user">
                <q-list separator>
                  <q-btn flat label="Reset Password" icon="lock" class="log-btn" to="/forgot-pass">
                  </q-btn>
                  <q-separator />
                  <q-btn flat label="Logout&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" icon="logout"
                    class="log-btn" @click="logout">
                  </q-btn>
                </q-list>
              </q-btn-dropdown>
            </div>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <!-- navbar  -->

    <!-- sidebar  -->
    <q-drawer v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick"
      v-on:mouseover="drawerClick" :breakpoint="300" :width="260" bordered class="sideBar-color sidebar-width">
      <template v-slot:mini>
        <q-scroll-area class="fit mini-slot cursor-pointer">
          <div class="column">
            <img class="d-icon" src="https://www.datatrained.com/images/favicon.png" />

            <!-- <q-item>
                <q-item-section></q-item-section>
              </q-item>
            <q-separator class="hr-1" /> -->
            <q-separator class="q-mt-sm" />
            <q-icon name="search" size="sm" class="mini-icons" />
            <q-separator />
            <div v-for="items in sidebarItems" :key="items.id">
              <div v-for="item in items.items" :key="item.id">
                <div v-if="checkElement(arr = item.code, flag = item.flag)">
                  <q-icon :name="item.icon" size="sm" class="mini-icons">
                  </q-icon>
                </div>
                <q-separator />
              </div>
            </div>

          </div>
        </q-scroll-area>
      </template>

      <div class="absolute-top" style="height: 120px">
        <q-item clickable color="secondary" class="dt-logo">
          <a href="/">

            <img src="https://dme2wmiz2suov.cloudfront.net/Institution(502)/Logo/1652751-NewFinalLogo_(1)asfsdg4g4.png"
              style="width: 160px; padding-top: 10px" />
          </a>

        </q-item>

        <div class="q-pa-sm">
          <!-- <q-icon name="search" color="primary" class="q-pt-xs icon-search"></q-icon> -->
          <q-input dense @keyup="searchFilter" v-model="search" outlined rounded type="search"
            placeholder="search here...">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div v-if="showDropdown" class="sidebarSearchDropdown sidebar-width">
          <template v-for="item in searchSidebar" :key="item.caption">
            <q-card v-if="(access.includes(item.permissionCode)) || (item.permissionCode)">
              <q-card-section class="q-pa-none text-indigo-10 card-sec">
                <q-item :icon="item.icon" clickable :to="item.link" color="text-white">
                  <q-item-section>
                    <q-item-label class="q-pl-lg"><i :class="item.icon" class="q-pr-sm"></i>
                      {{ item.caption }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </template>
        </div>
      </div>
      <q-scroll-area style="height: calc(100% - 120px); margin-top: 120px; " class="sidebar-width">
        <q-list>
          <!-- <template v-for="menu in items" :key="menu.title">
            <q-expansion-item v-if="((checkElement(menu.code)) || flag)" group="somegroup" :icon="menu.icon"
              :label="menu.title" class="overflow-hidden q-mb-none expansion-item inActive" style="border-radius: 7px"> -->

          <!-- </q-expansion-item>
          </template> -->
          <!-- <div class="q-pa-md">
            <q-item clickable to="/">
              <q-item-section avatar>
                <q-icon color="primary" name="dashboard" />
              </q-item-section>

              <q-item-section class="text-indigo-10">Dashboard</q-item-section>
            </q-item>
          </div> -->
          <NavBarElement v-for="item in sidebarItems" :key="item.items" v-bind="item" />

        </q-list>
      </q-scroll-area>

    </q-drawer>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBarElement from "src/components/NavBarElement.vue";
import { LocalStorage } from "quasar";
import { authApi, api, local } from 'boot/axios'
const router = useRouter();

const miniState = ref(false);
const drawer = ref(false);

const showDropdown = ref(false);
const search = ref("");
const user = LocalStorage.getItem('u_name')
const access = LocalStorage.getItem('access_key')

const logout = () => {
  api.get("auth/logout")
    .then((res) => {
      // LocalStorage.remove("dt_key");
      // LocalStorage.remove("access_key");
      // location.reload();
      // localStorage.clear()
      // router.push('/login')
    })
    .catch((err) => {
      console.log(err);
    });
  LocalStorage.remove("access_key");
  LocalStorage.remove("dt_key");
  location.reload();

  // router.push('/login')
}

let sidebarItems = [
  {
    section: "Dashboard",
    icon: "dashboard",
    secCode: ['seo', 'story', 'news', 'dt-gyan-video', 'dt-gyan-series', 'event', 'upcoming-batches', 'upload-to-npf', 'assessment', 'assignment', 'project', 'evaluator', 'certificate', 'report-card'],
    secFlag: false,
    items: [
      {
        title: "Dashboard",
        icon: "dashboard",
        code: ['seo', 'story', 'news', 'dt-gyan-video', 'dt-gyan-series', 'event', 'upcoming-batches', 'upload-to-npf', 'assessment', 'assignment', 'project', 'evaluator', 'certificate', 'report-card'],
        flag: false,
        subitems: [
          {
            caption: "Dashboard",
            icon: "fas fa-caret-right",
            link: "/dashboard",
            permissionCode: ['asa'],
            temp: false
          },
          {
            caption: "Dashboard SEO",
            icon: "fas fa-caret-right",
            link: "/dashboard/seo",
            permissionCode: ['seo'],
            temp: false
          },
          {
            caption: "Dashboard CMS",
            icon: "fas fa-caret-right",
            link: "/dashboard/cms",
            permissionCode: ['story', 'news', 'dt-gyan-video', 'dt-gyan-series', 'event', 'upcoming-batches', 'upload-to-npf'],
            temp: false
          },
          {
            caption: "Dashboard Academics",
            icon: "fas fa-caret-right",
            link: "/dashboard/academics",
            permissionCode: ['assessment', 'assignment', 'project', 'evaluator'],
            temp: false
          },
          {
            caption: "Dashboard Certificate",
            icon: "fas fa-caret-right",
            link: "/dashboard/certificate",
            permissionCode: ['certificate', 'report-card'],
          },
          // {
          //   caption: "Score Card",
          //   icon: "fas fa-caret-right",
          //   link: "/score-card",
          //   permissionCode: '',
          //   temp: false
          // }
        ],
      },
    ]
  },


  {
    section: "Content Manager",
    icon: "manage_accounts",
    secCode: ['seo', 'story', 'dt-talks', 'news', 'dt-gyan-video', 'dt-gyan-series', 'event', 'upcoming-batches', 'upload-to-npf'],
    secFlag: false,
    items: [
      {
        title: "SEO",
        icon: "analytics",
        code: ['seo'],
        flag: false,
        subitems: [
          {
            caption: "Meta Manager",
            icon: "fas fa-caret-right",
            link: "/meta-manager",
            permissionCode: ['seo'],
            temp: false
          },
        ],
      },

      {
        title: "CMS",
        icon: "manage_accounts",
        code: ['story', 'news', 'dt-gyan-video', 'dt-gyan-series', 'event', 'upcoming-batches', 'upload-to-npf'],
        flag: false,
        subitems: [
          {
            caption: "Events",
            icon: "fas fa-caret-right",
            link: "/all-events",
            permissionCode: ['event'],
            temp: false
          },
          {
            caption: "News",
            icon: "fas fa-caret-right",
            link: "/all-articles",
            permissionCode: ['news'],
            temp: false
          },
          {
            caption: "DTGyan",
            icon: "fas fa-caret-right",
            link: "/dt-gyan",
            permissionCode: ['dt-gyan-video'],
            temp: false
          },
          {
            caption: "Success Stories",
            icon: "fas fa-caret-right",
            link: "/all-stories",
            permissionCode: ['story'],
            temp: false
          },
          {
            caption: "Upcoming Batches",
            icon: "fas fa-caret-right",
            link: "/upcoming-batches",
            permissionCode: ['upcoming-batches'],
            temp: false
          },
          {
            caption: "Upload To NPF",
            icon: "fas fa-caret-right",
            link: "/upload-to-npf",
            permissionCode: ['upload-to-npf'],
            temp: false
          },
        ],
      },
    ],
  },
  {
    section: "Certificates",
    icon: "military_tech",
    secCode: ['certificate', 'report-card'],
    secFlag: false,
    items: [
      {
        title: "Certificates",
        icon: "military_tech",
        code: ['certificate', 'report-card'],
        flag: false,
        subitems: [
          {
            caption: "All Certificates",
            icon: "fas fa-caret-right",
            link: "/Certificates",
            permissionCode: ['certificate'],
            temp: false
          },
          {
            caption: "Report Cards",
            icon: "fas fa-caret-right",
            link: "/reports",
            permissionCode: ['report-card'],
            temp: false
          },
          {
            caption: "Bulk Upload",
            icon: "fas fa-caret-right",
            link: "/bulk-transfer",
            permissionCode: ['certificate'],
            temp: false
          },
        ],
      },
      {
        title: "Loan",
        icon: "payments",
        code: [],
        subitems: [
          {
            caption: "All Applications",
            icon: "fas fa-caret-right",
            link: "/all-applications",
            // permissionCode: [''],
            temp: false
          },
          {
            caption: "My Applications",
            icon: "fas fa-caret-right",
            link: "/my-applications",
            // permissionCode: [''],
            temp: false
          },
          {
            caption: "Client Applications",
            icon: "fas fa-caret-right",
            link: "/client-applications",
            // permissionCode: [''],
            temp: false
          },
        ],
      },
    ],
  },

  {
    section: "Academics",
    icon: "school",
    secCode: ['assessment', 'assignment', 'project', 'evaluator'],
    secFlag: false,
    items: [
      {
        title: "Assessments",
        icon: "menu_book",
        code: ['assessment'],
        flag: false,
        subitems: [
          {
            caption: "All Assessments",
            icon: "fas fa-caret-right",
            link: "/assessments",
            permissionCode: ['assessment'],
            temp: false
          },
          {
            caption: "My Assigned Assessments",
            icon: "fas fa-caret-right",
            link: "/assessments/my-assigned",
            permissionCode: ['assessment'],
            temp: false
          },
          {
            caption: "All Assessment Records",
            icon: "fas fa-caret-right",
            link: "/assessments/records",
            permissionCode: ['assessment'],
            temp: false
          },
        ],
      },
      {
        title: "Assignment",
        icon: "bookmarks",
        code: ['assignment'],
        flag: false,
        subitems: [
          {
            caption: "All Assignment",
            icon: "fas fa-caret-right",
            link: "/assignments",
            permissionCode: ['assignment'],
            temp: false
          },
          {
            caption: "My Assigned Assignment",
            icon: "fas fa-caret-right",
            link: "/assignment/my-assigned",
            permissionCode: ['assignment'],
            temp: false
          },
          {
            caption: "My Assignment Records",
            icon: "fas fa-caret-right",
            link: "/assignment/my-records",
            permissionCode: ['assignment'],
            temp: false
          },
          {
            caption: "All Pending Assignment",
            icon: "fas fa-caret-right",
            link: "/assignment/all-pending",
            permissionCode: ['assignment'],
            temp: false
          },
          {
            caption: "All Evaluated Assignment",
            icon: "fas fa-caret-right",
            link: "/assignment/all-evaluated",
            permissionCode: ['assignment'],
            temp: false
          },
        ],
      },
      {
        title: "Projects",
        icon: "school",
        code: ['project'],
        flag: false,
        subitems: [
          {
            caption: "All Projects",
            icon: "fas fa-caret-right",
            link: "/projects",
            permissionCode: ['project'],
            temp: false
          },
          {
            caption: "My Assigned Projects",
            icon: "fas fa-caret-right",
            link: "/projects/my-assigned",
            permissionCode: ['project'],
            temp: false
          },
          {
            caption: "My Project Records",
            icon: "fas fa-caret-right",
            link: "/projects/my-records",
            permissionCode: ['project'],
            temp: false
          },

          {
            caption: "All Pending Projects",
            icon: "fas fa-caret-right",
            link: "/projects/all-pending",
            permissionCode: ['project'],
            temp: false
          },
          {
            caption: "All Evaluated Projects",
            icon: "fas fa-caret-right",
            link: "/projects/all-evaluated",
            permissionCode: ['project'],
            temp: false
          },
        ],
      },
      {
        title: "Evaluators",
        icon: "account_circle",
        code: ['evaluator'],
        flag: false,
        subitems: [
          {
            caption: "All Evaluators",
            icon: "fas fa-caret-right",
            link: "/evaluators",
            permissionCode: ['evaluator'],
            temp: false
          },
        ],
      },
    ],
  },
  {
    section: "Placement",
    icon: "support",
    secCode: [],
    secFlag: true,
    items: [
      {
        title: "Pre Placement",
        icon: "support",
        // code: [],
        flag: false,
        subitems: [
          {
            caption: "Student Feedback",
            icon: "fas fa-caret-right",
            link: "/mock-interview-feedback",
            // permissionCode: [''],
            temp: false
          },
        ]
      },
      {
        title: "Placement",
        icon: "work",
        // code: [],
        flag: false,
        subitems: [
          {
            caption: "All Hiring Partners",
            icon: "fas fa-caret-right",
            link: "/all-jobs",
            // permissionCode: [''],
            temp: false
          },
          {
            caption: "All Applications",
            icon: "fas fa-caret-right",
            link: "/jobs/all-applications",
            // permissionCode: [''],
            temp: false
          },
        ]
      },
    ],
  },

  {
    section: "After Sales",
    icon: "support_agent",
    secCode: [],
    secFlag: true,
    items: [
      {
        title: "Agent Forms",
        icon: "bar_chart",
        // code: [],
        subitems: [
          {
            caption: "Pending Forms",
            icon: "fas fa-caret-right",
            link: "/asaf/pending-forms",
            // permissionCode: [''],
            temp: false
          },
          {
            caption: "Approved Forms",
            icon: "fas fa-caret-right",
            link: "/asaf/approved-forms",
            // permissionCode: [''],
            temp: false
          },
          // {
          //   caption: "Edit ASAF",
          //   icon: "fas fa-caret-right",
          //   link: "/update-after-sales-agent-form",
          //   permissionCode: [''],
          //   temp: false
          // },
        ]
      },
      {
        title: "Student Support",
        icon: "support_agent",
        flag: false,
        subitems: [
          {
            caption: "Academy Helpdesk",
            icon: "fas fa-caret-right",
            link: "/students-otp",
            // permissionCode: [''],
            temp: false
          },
          {
            caption: "LMS Support",
            icon: "fas fa-caret-right",
            link: "/lms-support",
            // permissionCode: [''],
            temp: false
          },
        ],
      },
    ],
  },

  {
    section: "Sales",
    icon: "groups",
    // secCode: [],
    secFlag: true,
    items: [
      {
        title: "After Sales Agent Form",
        icon: "groups",
        // code: [],
        subitems: [
          {
            caption: "My ASAF Forms",
            icon: "fas fa-caret-right",
            link: "/my-asaf-forms",
            // permissionCode: [''],
            temp: false
          },
          {
            caption: "Pending Submission",
            icon: "fas fa-caret-right",
            link: "/pending-submission",
            // permissionCode: [''],
            temp: false
          },
          {
            caption: "Completed Submission",
            icon: "fas fa-caret-right",
            link: "/completed-submission",
            // permissionCode: [''],
            temp: false
          },
        ]
      },
      {
        title: "Referral Tracking",
        icon: "manage_search",
        // code: [],
        subitems: [
          {
            caption: "My Referrals",
            icon: "fas fa-caret-right",
            link: "/my-referral-cases",
            // permissionCode: [''],
            temp: false
          },
          {
            caption: "Pending Referrals",
            icon: "fas fa-caret-right",
            link: "/pending-referral-cases",
            // permissionCode: [''],
            temp: false
          },
          {
            caption: "Disbursed Referrals",
            icon: "fas fa-caret-right",
            link: "/disbursed-referral-cases",
            // permissionCode: [''],
            temp: false
          }
        ]
      },
    ],
  },
  {
    section: "Guidance",
    icon: "local_library",
    secCode: ['policy', 'sales-pitch', 'course-collateral'],
    secFlag: false,
    items: [
      {
        title: "Knowledge Base",
        icon: "local_library",
        flag: false,
        code: ['policy', 'sales-pitch', 'course-collateral'],
        subitems: [
          {
            caption: "Policies",
            icon: "fas fa-caret-right",
            link: "/policies",
            permissionCode: ['policy'],
            temp: false
          },
          {
            caption: "Course Collateral",
            icon: "fas fa-caret-right",
            link: "/course-collaterals",
            permissionCode: ['course-collateral'],
            temp: false
          },
          {
            caption: "Sales Pitch",
            icon: "fas fa-caret-right",
            link: "/sales-pitch",
            permissionCode: ['sales-pitch'],
            temp: false
          },
        ],
      },
    ]
  },
  {
    section: "Settings",
    secCode: ['user', 'role'],
    secFlag: false,
    icon: "settings",
    items: [

      {
        title: "Sales ",
        icon: "manage_accounts",
        flag: false,
        subitems: [
          {
            caption: "Sales Teams",
            icon: "fas fa-caret-right",
            link: "/all-sales-teams",
            // permissionCode: [''],
            temp: false
          },
          {
            caption: "Sales Members",
            icon: "fas fa-caret-right",
            link: "/all-sales-team-members",
            // permissionCode: [''],
            temp: false
          },
          // {
          //   caption: "Settings",
          //   icon: "fas fa-caret-right",
          //   link: "/sales-settings",
          //   permissionCode: [''],
          //   temp: false
          // },
        ],
      },
      {
        title: "User Access Manager",
        icon: "lock",
        flag: false,
        code: ['user', 'role'],
        subitems: [
          {
            caption: "Manage Users",
            icon: "fas fa-caret-right",
            link: "/manage-users",
            permissionCode: ['user'],
            temp: false
          },
          {
            caption: "Manage Permissions",
            icon: "fas fa-caret-right",
            link: "/manage-permissions",
            permissionCode: ['role'],
            temp: false
          },
          // {
          //   caption: "Users Sessions",
          //   icon: "fas fa-caret-right",
          //   link: "",
          //   permissionCode: ''
          // },
          // {
          //   caption: "Users Activity",
          //   icon: "fas fa-caret-right",
          //   link: "",
          //   permissionCode: ''
          // },
          // {
          //   caption: "Download Request",
          //   icon: "fas fa-caret-right",
          //   link: "",
          //   permissionCode: ''
          // },
        ],
      },
    ],
  },
];

let searchSidebar = []
const searchFilter = () => {
  searchSidebar.length = 0
  const searchField = search.value.toLocaleLowerCase()

  sidebarItems.forEach((obj) => {
    obj.items.forEach((item) => {
      item.subitems.forEach((subItem) => {
        if (subItem.caption.toLocaleLowerCase().indexOf(searchField) != -1) {
          if (searchSidebar.includes(subItem)) {
            return false
          } else {
            if (searchField.length >= 1) {
              searchSidebar.push(subItem)
              showDropdown.value = true
            }
            else {
              searchSidebar.length = 0
              showDropdown.value = false
            }
          }
        }
      })
    })
  })
}

const permissions = []
access.forEach((item) => {
  let ele = item.split('.')[0]
  if (!permissions.includes(ele)) {
    permissions.push(ele)
  }
})

const checkElement = (arr, flag) => {
  if (arr == undefined) {
    flag = true
  } else {
    arr.forEach((item) => {
      if (permissions.includes(item)) {
        flag = true
      } else {
        flag = false
      }
    })
  }
  return flag
}

const drawerClick = (e) => {
  if (miniState.value) {
    miniState.value = false;
    e.stopPropagation();
  }
};
</script>

<style lang="scss">
.q-item__section--side>.q-icon {
  font-size: 20px;
  color: #2858f7;
}

.q-item__section--avatar {
  min-width: 40px;
}

.mini-icons {
  padding: 10px;
  margin-left: 5px;
  color: #2858f7;
}

.d-icon {
  padding: 10px;
  padding-right: 13px;
  background-color: #fff;
  width: fit-content;
}


.mainHead {
  // width: 250px;
  // height: 52px;
  font-size: 20px;
}

.hr-1 {
  margin-top: 2px;
  background: #8a8383;
}

.icon-color {
  color: #2858f7;
}

.drawer-icon {
  margin-left: -10px;
}

.sideBar-color {
  background-color: #fff;
}

.img-pos {
  padding-top: 7px;
  padding-right: 5px;
  padding: 7px;
  opacity: 1;
}

.dt-logo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  height: 60px;
  // position: sticky !important ;
}

#dt-text {
  font-size: 21px;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  padding-left: 5px;
  text-decoration: none;
  color: #d219b9;
}

.wel-head {
  margin-left: 10px;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
}

.log-btn {
  width: 100%;
  text-transform: capitalize;
  font-size: 11px;
  height: 40px;
  size: 12px;
  display: flex;
  align-items: flex-start;
}

.logout-box {
  padding-left: 5px;
  padding-right: 5px;
  text-transform: capitalize;
  color: #2858f7;
}

.logout-box:hover {
  // background-color: rgb(235, 235, 235);
}

.icon-pos {
  width: auto;
}

.q-icon {
  width: auto;
}

.q-item {
  min-height: 40px;
  padding: 10px 10px;
}

.icon-search {
  font-size: 2rem;
}

.sidebarSearchDropdown {
  position: absolute;
  z-index: 1;
  width: 100%;
}

@media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {

  .dt-logo {
    padding: 5px;
    height: 50px;
  }

  .header-nav {
    //  left: 231px !important;
  }

  .q-field__control {

    height: 35px;
    max-width: 90%;

  }

  .text-caption {
    font-size: 0.6rem;
  }

  .expansion-item[data-v-7f991a28] {
    font-size: 13px;
  }

  .card-sec[data-v-7f991a28] {

    font-size: 12px;
  }

  .q-item {
    min-height: 31px;
    // padding: 10px 8px;

  }

  .sidebar-width {
    //  width: 230px !important;
    padding-right: 0px;
  }

  .q-drawer--left {
    width: 260px !important;
  }

  // .q-page-container {
  //   padding-left: 235px !important;
  // }

  .q-drawer--mini {
    width: 55px !important;

    .sidebar-width {
      width: 50px !important;
    }

    .q-page-container {
      padding-left: 180px !important;
    }

    .q-pa-md {
      padding: 16px 5px;
    }
  }
}
</style>
