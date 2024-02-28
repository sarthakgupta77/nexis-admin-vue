const routes = [{
  path: "/",
  component: () =>
    import("layouts/MainLayout.vue"),
  children: [{
    path: "/",
    component: () =>
      import("../pages/IndexPage.vue"),
  },

  {
    path: "/meta-manager",
    component: () =>
      import("pages/SEO/MetaManager.vue"),
    meta: {
      code: 'seo',
      auth: true
    }
  },
  // Assignment
  {
    path: "/assignments",
    component: () =>
      import("../pages/StudentsAcademic/Assignments/AllAssignments.vue"),
    meta: { code: 'assignment', auth: true }
  },
  {
    path: "/addAssignments",
    component: () =>
      import("../pages/StudentsAcademic/Assignments/AddAssignment.vue"),
    meta: { code: 'assignment.create', auth: true }
  },
  {
    path: "/view-assignment/:id",
    component: () =>
      import("../pages/StudentsAcademic/Assignments/ViewAssingment.vue"),
    meta: { code: 'assignment.view', auth: true }
  },
  {
    path: "/assignments/edit/:id",
    component: () =>
      import("../pages/StudentsAcademic/Assignments/EditAssingment.vue"),
    meta: { code: 'assignment.edit', auth: true }
  },
  {
    path: "/assignment/my-assigned",
    component: () =>
      import("../pages/StudentsAcademic/Assignments/MyAssignedAssignment.vue"),
    meta: { code: 'assignment.myassigned', auth: true }
  },
  {
    path: "/assignment/my-records",
    component: () =>
      import("../pages/StudentsAcademic/Assignments/MyAssignmentRecords.vue"),
    meta: { code: 'assignment.myrecords', auth: true }
  },
  {
    path: "/assignment/all-evaluated",
    component: () =>
      import("../pages/StudentsAcademic/Assignments/AllEvaluatedAssignment.vue"),
    meta: { code: 'assignment.allevaluated', auth: true }
  },
  {
    path: "/assignment/all-pending",
    component: () =>
      import("../pages/StudentsAcademic/Assignments/AllPendingAssignment.vue"),
    meta: { code: 'assignment.allpending', auth: true }
  },
  {
    path: "/assignment/my-assigned/view/:id/:student_id",
    component: () =>
      import("../pages/StudentsAcademic/Assignments/ViewAssignedAssignments.vue"),
    meta: { code: 'assignment.myassigned_view', auth: true }
  },
  //Assessment
  {
    path: "/assessments",
    component: () =>
      import("../pages/StudentsAcademic/Assessments/AllAssessments.vue"),
    meta: { code: 'assessment', auth: true }
  },
  {
    path: "/assessments/add",
    component: () =>
      import("../pages/StudentsAcademic/Assessments/AddAssessments.vue"),
    meta: { code: 'assessment.create', auth: true }
  },
  {
    path: "/assessments/edit/:id",
    component: () =>
      import("../pages/StudentsAcademic/Assessments/EditAssessment.vue"),
    meta: { code: 'assessment.edit', auth: true }
  },
  {
    path: "/assessments/view/:id",
    component: () =>
      import("../pages/StudentsAcademic/Assessments/ViewAssessment.vue"),
    meta: { code: 'assessment.view', auth: true }
  },
  {
    path: "/assessments/records",
    component: () =>
      import("../pages/StudentsAcademic/Assessments/AssessmentsRecords.vue"),
    meta: { code: 'assessment.record_reschedule', auth: true }
  },
  {
    path: "/assessments/my-assigned",
    component: () =>
      import("../pages/StudentsAcademic/Assessments/MyAssignedAssessment.vue"),
    meta: { code: 'assessment.myassigned_view', auth: true }
  },
  {
    path: "/assessments/my-assigned/view/:id/:student_id",
    component: () =>
      import("../pages/StudentsAcademic/Assessments/ViewAssignedAssessment.vue"),
    meta: { code: 'assessment.myassigned_view', auth: true }
  },
  // projects
  {
    path: "/projects",
    component: () =>
      import("../pages/StudentsAcademic/Projects/AllProjects.vue"),
    meta: { code: 'project', auth: true }
  },
  {
    path: "/projects/add",
    component: () =>
      import("../pages/StudentsAcademic/Projects/AddProject.vue"),
    meta: { code: 'project.create', auth: true }
  },
  {
    path: "/projects/view/:id",
    component: () =>
      import("../pages/StudentsAcademic/Projects/ViewProject.vue"),
    meta: { code: 'project.view', auth: true }
  },
  {
    path: "/projects/edit/:id",
    component: () =>
      import("../pages/StudentsAcademic/Projects/EditProject.vue"),
    meta: { code: 'project.edit', auth: true }
  },
  {
    path: "/projects/my-assigned",
    component: () =>
      import("../pages/StudentsAcademic/Projects/MyAssignedProjects.vue"),
    meta: { code: 'project.myassigned', auth: true }
  },
  {
    path: "/projects/my-assigned/view/:id/:student_id",
    component: () =>
      import("../pages/StudentsAcademic/Projects/ViewAssignedProjects.vue"),
    meta: { code: 'project.myassigned_view', auth: true }
  },
  {
    path: "/projects/my-records",
    component: () =>
      import("../pages/StudentsAcademic/Projects/MyProjectRecords.vue"),
    meta: { code: 'project.myrecords', auth: true }
  },
  {
    path: "/projects/all-pending",
    component: () =>
      import("../pages/StudentsAcademic/Projects/AllPendingProjects.vue"),
    meta: { code: 'project.allpending', auth: true }
  },
  {
    path: "/projects/all-evaluated",
    component: () =>
      import("../pages/StudentsAcademic/Projects/AllEvaluatedProjects.vue"),
    meta: { code: 'project.allevaluated', auth: true }
  },
  // Evaluators
  {
    path: "/evaluators",
    component: () =>
      import("../pages/StudentsAcademic/Evaluators/AllEvaluators.vue"),
    meta: { code: 'evaluator', auth: true }
  },
  // CMS
  {
    path: "/all-stories",
    component: () =>
      import("../pages/CMS/SuccessStory/AllStory.vue"),
    meta: { code: 'story', auth: true }
  },
  {
    path: "/all-events",
    component: () =>
      import("../pages/CMS/Events/AllEvents.vue"),
    meta: { code: 'event', auth: true }
  },
  {
    path: "/dt-gyan",
    component: () =>
      import("../pages/CMS/DTGyan/video/AllVideos.vue"),
    meta: { code: 'dt-gyan-video', auth: true }
  },
  {
    path: "/all-dttalks",
    component: () =>
      import("../pages/CMS/DtTalks/AllDtTalks.vue"),
    meta: { code: 'dt-talks', auth: true }
  },
  {
    path: "/add-new-dttalk",
    component: () =>
      import("../pages/CMS/DtTalks/AddNewDtTalk.vue"),
    meta: { code: 'dt-talks.create', auth: true }
  },
  {
    path: "/edit-dttalk/:id",
    component: () =>
      import("../pages/CMS/DtTalks/EditDtTalk.vue"),
    meta: { code: 'dt-talks.edit', auth: true }
  },
  {
    path: "/all-articles",
    component: () =>
      import("../pages/CMS/News/AllArticles.vue"),
    meta: { code: 'news', auth: true }
  },
  {
    path: "/upcoming-batches",
    component: () =>
      import("../pages/CMS/UpcomingBatches/AllBatches.vue"),
    meta: { code: 'upcoming-batches', auth: true }
  },
  {
    path: "/upload-to-npf",
    component: () =>
      import("../pages/CMS/UploadToNPF/UploadLeadsFile"),
    meta: { code: 'upload-to-npf.access', auth: true }
  },
  // User Access Manager
  {
    path: "/manage-users",
    component: () =>
      import("../pages/AccessControl/Users/ManageUsers.vue"),
    meta: { code: 'user', auth: true }
  },
  {
    path: "/manage-users/add",
    component: () =>
      import("../pages/AccessControl/Users/AddUsers.vue"),
    meta: { code: 'user.create', auth: true }
  },
  {
    path: "/manage-users/edit/:id",
    component: () =>
      import("../pages/AccessControl/Users/EditUser.vue"),
    meta: { code: 'user.edit', auth: true }
  },
  {
    path: "/manage-permissions",
    component: () =>
      import("../pages/AccessControl/Permisions/ManagePermisions.vue"),
    meta: { code: 'role', auth: true }
  },
  {
    path: "assigned-permissions/:id",
    component: () =>
      import("../pages/AccessControl/Permisions/AssignedPermissions.vue"),
    meta: { code: 'role', auth: true }
  },
  {
    path: "manage-direct-permission",
    component: () =>
      import("../pages/AccessControl/Permisions/ManageDirectPermission.vue"),
    meta: { code: 'role', auth: true }
  },
  // Certificates and Report Card
  {
    path: "/certificates",
    component: () =>
      import("../pages/Certificates/Certificate/AllCertificates.vue"),
    meta: { code: 'certificate', auth: true }
  },
  {
    path: "/reports",
    component: () =>
      import("../pages/Certificates/Reports/AllReports.vue"),
    meta: { code: 'report-card', auth: true }
  },
  {
    path: "/bulk-transfer",
    component: () =>
      import("../pages/Certificates/BulkTransfer.vue"),
    meta: { code: 'certificate', auth: true }
  },
  //Referral Tracking
  {
    path: "/my-referral-cases",
    component: () =>
      import("../pages/Sales/ReferralTracking/MyReferrals.vue"),
    // meta: { code: 'certificate', auth: true }
  },
  {
    path: "/pending-referral-cases",
    component: () =>
      import("../pages/Sales/ReferralTracking/PendingReferrals.vue"),
    // meta: { code: 'certificate', auth: true }
  },
  {
    path: "/disbursed-referral-cases",
    component: () =>
      import("../pages/Sales/ReferralTracking/DisbursedReferrals.vue"),
    // meta: { code: 'certificate', auth: true }
  },
  // After Sales - Form fill routes
  {
    path: "/my-asaf-forms",
    component: () =>
      import("../pages/Sales/AfterSalesAgentForm/MyASAFForms.vue"),
  },
  {
    path: "/pending-submission",
    component: () =>
      import("../pages/Sales/AfterSalesAgentForm/PendingSubmission.vue"),
  },
  {
    path: "/completed-submission",
    component: () =>
      import("../pages/Sales/AfterSalesAgentForm/CompletedSubmission.vue"),
  },
  {
    path: "/score-card",
    component: () =>
      import("../pages/SalesAnalysis/ScoreCard.vue"),
  },
  // After Sales Agent Forms
  {
    path: "/update-after-sales-agent-form",
    component: () =>
      import("../pages/AfterSales/AgentForms/EditAsaf.vue"),
  },
  {
    path: "/asaf/pending-forms",
    component: () =>
      import("../pages/AfterSales/AgentForms/PendingForms.vue"),
  },
  {
    path: "/asaf/approved-forms",
    component: () =>
      import("../pages/AfterSales/AgentForms/ApprovedForms.vue"),
  },
  // Loans
  {
    path: "/all-applications",
    component: () =>
      import("../pages/Loans/AllApplications.vue"),
  },
  {
    path: "/my-applications",
    component: () =>
      import("../pages/Loans/MyApplications.vue"),
  },
  {
    path: "/client-applications",
    component: () =>
      import("../pages/Loans/ClientApplications.vue"),
  },
  {
    path: "/all-applications/add",
    component: () =>
      import("../pages/Loans/CreateLoanCase.vue"),
  },
  // Dashboard
  {
    path: "/dashboard",
    component: () =>
      import("../pages/Dashboard/Dashboard.vue"),
  },
  {
    path: "/dashboard/cms",
    component: () =>
      import("../pages/Dashboard/DashboardCMS.vue"),
  },
  {
    path: "/dashboard/seo",
    component: () =>
      import("../pages/Dashboard/DashboardSEO.vue"),
  },
  {
    path: "/dashboard/academics",
    component: () =>
      import("../pages/Dashboard/DashboardAcademics.vue"),
  },

  {
    path: "/dashboard/certificate",
    component: () =>
      import("../pages/Dashboard/DashboardCertificate.vue"),
  },



  // Knowledge Base
  {
    path: "/policies",
    component: () =>
      import("../pages/KnowledgeBase/Policies.vue"),
    meta: { code: 'policy', auth: true }
  },
  {
    path: "/course-collaterals",
    component: () =>
      import("../pages/KnowledgeBase/CourseCollaterals.vue"),
    meta: { code: 'course-collateral', auth: true }
  },
  {
    path: "/sales-pitch",
    component: () =>
      import("../pages/KnowledgeBase/SalesPitch.vue"),
    meta: { code: 'sales-pitch.access', auth: true }
  },
  // Student Support
  {
    path: "/students-otp",
    component: () =>
      import("../pages/AfterSales/StudentSupport/AcademyHelpdesk.vue"),
  },
  {
    path: "/lms-support",
    component: () =>
      import("../pages/AfterSales/StudentSupport/LmsSupport.vue"),
  },
  {
    path: "/mock-interview-feedback",
    component: () =>
      import("../pages/Placement/PrePlacement/StudentFeedback.vue"),
    // meta: { code: 'mock-interview', auth: true }
  },
  {
    path: "/all-jobs",
    component: () =>
      import("../pages/Placement/Jobs/AllJobs.vue"),
    // meta: { code: 'mock-interview', auth: true }
  },
  {
    path: "/jobs/all-applications",
    component: () =>
      import("../pages/Placement/Jobs/AllApplications.vue"),
    // meta: { code: 'mock-interview', auth: true }
  },
  // Sales Settings
  {
    path: "/all-sales-team-members",
    component: () =>
      import("../pages/SalesSettings/SalesTeamMembers/AllSalesTeamMembers.vue"),
  },
  {
    path: "/all-sales-teams",
    component: () =>
      import("../pages/SalesSettings/SalesTeams/AllSalesTeam.vue"),
  },
  {
    path: "/manage-team/:id",
    component: () =>
      import("../pages/SalesSettings/SalesTeams/ManageTeams.vue"),
  },
  {
    path: "/sales-settings",
    component: () =>
      import("../pages/SalesSettings/Settings.vue"),
  },
  // Dummy Test Page
  {
    path: "/test",
    component: () =>
      import("../pages/Test.vue"),
  },
  ],
},
{
  path: "/login",
  component: () =>
    import("pages/Login/LoginPage.vue"),
},
{
  path: "/forgot-pass",
  component: () =>
    import("pages/Login/ForgotPassPage.vue"),
},



// for testing purpose --

{
  path: "/testing",
  component: () =>
    import("pages/AfterSales/test/test2.vue"),
},

// Always leave this as last one,
// but you can also remove it
{
  path: "/:catchAll(.*)*",
  component: () =>
    import("pages/ErrorNotFound.vue"),
},
];

export default routes;
