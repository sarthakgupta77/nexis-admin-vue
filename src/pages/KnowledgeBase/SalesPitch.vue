<template>
  <q-page class="q-pa-md">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="head-btn-box shadowBoder">
            <h5 id="head-1">Sales Pitch</h5>
            <!-- <q-btn label="create new" class="create-btn" @click="createNewModal = true" /> -->
          </div>
          <q-splitter class="shadowBoder" v-model="splitterModel" style="height: 78vh; padding: 0;">

            <template v-slot:before>
              <div class="q-pa-md table-container">
                <q-tabs v-model="tab" vertical class="text-secondary bg-white" align="left" :breakpoint="0">
                  <q-tab name="DS" label="Datascience" class="tab-style" />
                  <q-tab name="IB" label="Investment Banking" class="tab-style" />
                  <q-tab name="HR" label="Human Resource" class="tab-style" />
                  <q-tab name="ECom" label="Ecommerce and Digital Marketing" class="tab-style" />
                </q-tabs>
              </div>
            </template>

            <template v-slot:after>
              <q-scroll-area style="height: 100%;">
                <div class="q-pa-md">
                  <!-- <div class="text-h4 q-mb-md">After</div> -->
                  <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up"
                    transition-next="jump-up">
                    <q-tab-panel name="DS">
                      <!-- <q-card style="
                  margin: auto; "> -->
                      <div class="  col-md-9 col-sm-10 col-12" style="   line-height: 20px">
                        <div class="col-12">
                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Hi, Good morning. Am I speaking with XYZ… This is Aakriti from DataTrained, we got an inquiry for the Data Science course from your end on our (Lead source). So, I guess you are looking to upgrade yourself in this domain. I hope it’s a good time to have a 10-15mins discussion.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Yes, I am free we can discuss']" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'I was just curious to know if you enquired for yourself or someone else?',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Yes, I enquired for myself.']" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Great! How are you? I hope you and your family are keeping safe and doing well at these difficult times.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                            :text="['Yes, we are doing fine / Yes, I am fine.']" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Glad to hear that everything is well at your end. So in which city are you currently living in?',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['I am staying in (City)']" />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 580px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              Discuss about the location and build rapport. And
                              fill in the NPF lead details.
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Can you help me with your details of what you have done for graduation and what is your work experience, so I can guide you accordingly.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="[
                              'I have done my___________. I have around_________ of work experience in a___________.',
                            ]" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'That’s great, in which company are you currently working in?',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['I am working in __________.']" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'So, what made you interested in Data Science & AI, have you researched about it from your side or got to know from someone else.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                            :text="['(Depends on the prospect’s reply)']" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'No doubt it is a great career option to opt for, as the growth is quite good. So, I will first give an overview about Data science and what are the career options.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Data Science is a domain that deals with analyzing large amounts of data and making future predictions out of it. One can say It’s an end-to-end process in which first you collect the data from various sources and analyze it on that basis we are predicting the further outcomes. Right now, as we are becoming more data oriented… in every sector or industry the data is generating a large no. and it is the coal for any organization. As it is in demand in every industry so both technical and non-technical background people can get into this domain. Your profile is going to be related to your past experience only.',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 470px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              **If the prospect is still confused give some more
                              examples.
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'You can say wherever there is data there is a need for data science. I will just give you a very basic examples that you can relate to,',
                            ]" sent />
                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              '1) Ever imagined how you get ads on different social media platforms for things you were searching before. So this is working on your past search history and on that basis Google is predicting your need and suggesting you with the different options. You must have searched about Data science on Google. Thats why you were getting ads of different institutes providing Data science courses on different social media platforms.',
                              ' &nbsp; &nbsp; &nbsp; OR ',
                              ' 2)And another example that we see in our day to day life is whenever you are searching any product on e-commerce portals you get suggestions of similar products which are based on the past search and order history of the consumers, that way they are marketing both the products at the same time. Amazon earns 30%-40% profit through this recommendation model.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'As we are living in an era of technology, we are getting more inclined towards Artificial intelligence. Data science is a part of AI and now it is a need to be skilled in the domain. So that we can sustain in the industry. Everything in our day-to-day life is connected with AI and Data science now,',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 520px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              *(Examples if the customer is not able to
                              understand Data Science)
                            </q-card-section>
                          </q-card>
                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              '1)So you must have noticed on your Gmail account the mail automatically goes to spam or promotions so it is filtering out the mails.',
                              '2) It helps in the personalised results, whenever using Amazon Prime or Netflix you get suggestions of movies or series which are based on your past watch list.',
                              ' 3) Fraud detection in your bank accounts as they detect the strange activities in A/C. ',
                              ' 4) Speech recognition in your iPhone with Siri or on your Alexa speakers.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="[
                              'That’s clear to me, but if I am not good with coding how will I manage?',
                            ]" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'See first of all you need to understand that it is not a coding job, your work is to provide solutions and handle data. About the coding part you will start from very basics and you don’t have to cover the whole Python. You will be using just 30% of it which will be used for Data science, it is more about math. & stats. because at the end we are dealing with numbers and data, The language is a platform on which you are going to work.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'I hope you are not having any doubts as of now, now I will explain to you about the course and the curriculum so that it will give you a clear idea.',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 160px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section> Program Details : </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Let me tell you how this Post Graduate program in Data Science, Machine Learning & Neural Networking is going to help you in the same. I hope you have a pen and paper handy to note down the details.',
                              'To start, the duration of the program is 12 months which we have divided in such a way that you get proper time for conceptual understanding and practical learning as well. It is bifurcated into 3 parts, first 5 months is theory, a month for projects and last 6 months will be live internship with specializations. And in the end we will be focusing on the placement program.',
                              'So, for the first 5 months you will be covering all the concepts of Data Science and Machine Learning by 2 hours of live classes every Saturday and Sunday. These live sessions are recorded as well so you get the video of the class for revision purposes as well. The topics covered in these classes will include Python, SQL, Statistics & Machine Learning.',
                              'Discuss about the work schedule of the prospect.',
                              '*If a prospect asks for a detailed module or specific topic covered in the program, we can refer to the curriculum.',
                              'As soon as you register with us, you will be getting access to our Learning Management System (LMS) where all your Live classes sessions, recordings, study materials and modules can be accessed.',
                              'Lets Discuss about the doubts sessions which are very important in any online session. We provide different methods to clear the doubts of our students, which are ',
                              ' 1) We are the only ed-tech which is providing live chat support so you can directly chat with your mentors just like you do on Swiggy, Zomato etc.',
                              '2) There is a ticketing system so you just need to raise a ticket and the concerned team will solve the problem within 24hrs.',
                              '3) You can directly call the career coach through our IVR no. and discuss your doubts & get the solution then and there.',
                              '4) The last one is the FAQ option in which you can just type in your question and get the related articles. Generally 90% of the doubts are cleared in FAQs only. ',
                              '5)We even have our app of DataTrained through which the students can get access to the LMS and can attend the classes from anywhere.',
                              'Do you have any Questions for me regarding the program details shared?',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 250px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              (Recurring time confirmation)
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Info you should get: Interest shown by Prospect/Make conversation interactive/Avoid breaking the flow',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="[
                              'No, I have understood everything till now.',
                            ]" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Perfect! Moving on I would like to share that in the Data Science domain it is important to understand the concepts and tools but also the execution of the tools in the real-world scenarios.',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 120px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section> Internship : </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'That is why by the 5th month itself, we enrol you for the Internship with any of the 05 companies we have a partnership with. You are expected to spend 28 – 30hrs in a week during your internship period. This Internship will be giving you hands-on experience for 06 months and by the time you will be finishing this program you will be able to prove your skill and will also have talking points to share with the hiring companies. There will be an Subject matter expert to guide you in the internship and you will be reporting to him/her.',
                            ]" sent />
                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 100px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section> Projects : </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Along with this, to give you more clarity on the implementation of Data Science and Machine Learning, in the 6th month you will be getting 20-40 projects, these are the real time data provided to you. Out of all the projects 10 will be for your assessment and rest are for your practice. These projects are provided for your practical knowledge.',
                            ]" sent />
                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 250px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              margin-bottom: 30px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              Specializations via Electives :
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'By the time you have completed the submission of projects and spending almost 02 months in the Internship you will also be able to get an idea about the path you want to choose for the specialization, which will help you with getting more clarity on the role that you will be moving into and the skills you will be needing for it.',
                              'At this stage, we arrange a session with a career coach who will assist you in selecting the specialization according to your learnings and your professional goals.',
                              'We have different elective bundles available ',
                              '1) Deep learning with Natural language processing. ',
                              '2) Deep learning with Computer Vision.',
                              ' 3) Business analytics with R & Advanced Excel 4) Deep learning and Power BI',
                              'We have included NLP with Machine Learning and Business Analytics with Tableau in all our electives, which will give you more opportunities in the industry.  (I hope all is clear about Internship, Projects and Specialization)',
                              'If a prospect says he doesn’t have more time, say I just need the last 2 minutes to explain the placement guarantee that comes with this program.',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 400px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              Program Certification and Placement Assistances :
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Now once you complete this course successfully, you will be getting 04 separate certifications which will be - ',
                              '1) Post Graduate Program in Data Science from Data Trained.',
                              '2) IBM Learning Path Certificate.',
                              '3) Project completion.',
                              '4) Experience letter from the company in which you have done internship.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'But our job is not done yet. We really want to see you be placed in the job you dreamt for and kick start your career in the Data Science domain',
                              'Hence we have a 100% placement commitment that comes with this program.',
                              'So in the 11th and 12th month of the program, our placement team starts working on your resume & profile and once the program is completed we will be organizing placement campaigns in all the metro cities like Delhi NCR, Bangalore, Hyderabad, Pune & Mumbai.',
                              'Though this placement guarantee comes with some commitments that we need from your end too i.e. ',
                              '1)Your attendance & overall score should be 80% or above.',
                              ' 2)All the projects should be submitted by the end of the 06th month.',
                              'This is how our program is designed and delivered. May I know in which salary package you fall in. So that I can explain to you about the placement opportunities.',
                            ]" sent />

                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="[
                              'It is around 3-4LPA (modify your response on the basis of the salary package)',
                            ]" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'That’s great as the minimum package after the placement is around 5LPA, you can easily expect a good hike and depending on the profile & skill sets people generally get average of 7-8LPA which can go upto 18LPA.',
                              'Our placement speaks for itself, just before last year’s lockdown in 2020 we were able to place 350 students in just 15 days which also got published in Hindustan Times.',
                              'And as you told me you are living in (Metro City) there are many companies over there who are regularly hiring people in the same domain. We are tied up with more than 250 companies for placement, like HDFC, Yes bank, Rbl bank, IBM, HCL, KPMG, Bank of America, American Express, P&G, Paytm, Flipkart, Concentrix, Adobe, Accenture etc.',
                              'We will be lining up interviews depending on your location and your profile.',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 260px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              (Recurring time confirmation)
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Do you have any Questions for me regarding the program details shared?',
                            ]" sent />

                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="[
                              'I don’t have doubts as of now, When is your batch going to start and how much will be the fee?',
                            ]" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'May I ask when you are planning to upskill yourself',
                              'If as soon as possible, appreciate and explain the fees.',
                              'If you want more time, use rebuttals and explain why the prospect should start immediately. Then explain fees. (Ex:This month or next month batch is already closed)',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 290px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              Program Fees + Payment options :
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Now let us discuss the program fee which is priced at Rs.1,60,000 + 18% GST which comes out to be Rs. 1,88,800.',
                              'To get the admission in this program you just have to pay a sum of Rs. 10,000 as registration fees to book your seat and the remaining can be paid by 3 options.',
                              'The remaining amount can be paid either in one go or through EMIs. For EMIs we have a tie up with our financial partner i.e. Bajaj Finserv with EMI options of 10, 12, 15 & 20 months.',
                              'Apart from that there are other lending partners Liquiloan, Creditfare & TCPL(Techfino Capital Private Limited) who are providing EMI options for 12, 24 & 36 months.',
                              'So which one would you like to go with?',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 140px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section> If Bajaj Finserv, </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Perfect! So before I proceed to tell you about the documents we require for the loans, I would like to explain to you about the loan process. As Bajaj Finserv is one of our lending partners, there will be no additional charges for our students. So it is going to be no cost EMI.',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 230px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              If Other lending partners,
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Perfect! So before I proceed to tell you about the documents we require for the loans, I would like to support our students. DataTrained is going to absorb the complete interest amount. So there will be 0% interest charged to you on this loan so you can focus on studying and don’t worry about paying any extra money on this loan.',
                              'You only need to pay the 2% + 18%GST on the loan amount as additional charges which will be added in the 1st EMI only.',
                              'Now to proceed you would be required to provide certain documents like, Pan card, Aadhar card, 3 months’ salary statement which should be 25k or above, 6 months’ bank statement.',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 100px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section> If One Go, </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Great! So the remaining amount of INR 1,78,800 needs to be paid in full in the next month.',
                              'Once you register, we will start with the process of LMS creation and once you get login credentials, study material and videos will be uploaded on that. You will be assigned a career coach who will guide you about the system and help you with the installation of servers and tools.',
                              'I am going to send you the brochure of the program, details of the enrolment on your email id we have with us.',
                              'May I ask you what will be a good day and time to connect back with you to start with the registration procedure of the program.',
                              'Take a specific date and time.',
                              'Thank you so much for giving me your valuable time, (Prospect name). It was a pleasure speaking to you. Please feel free to reach me out on this number via call or WhatsApp in case of any doubts or clarifications regarding this program',
                              'Wishing you a wonderful day/evening ahead. Happy Learning.',
                            ]" sent />
                        </div>
                      </div>
                      <!-- </q-card> -->
                    </q-tab-panel>

                    <q-tab-panel name="IB">
                      <!-- <q-card style=" width: 50vw;
                  margin: auto; "> -->
                      <div class="  col-md-9 col-sm-10 col-12">
                        <div class="col-12">
                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Hi, Good morning. Am I speaking with XYZ… This is Adhya from Data Trained, we got an inquiry for the Investment Banking and Capital Market course with 100% placement assistance from your end on our (Lead source). So, I guess you are looking to upgrade yourself in this domain. I hope it’s a good time to have a 10-15 mins discussion.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Yes, I am free we can discuss']" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'I was just curious to know if you enquired for yourself or someone else?',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Yes, I enquired for myself.']" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Great! How are you? I hope you and your family are keeping safe and doing well at these difficult times.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                            :text="['Yes, we are doing fine / Yes, I am fine.']" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Glad to hear that everything is well at your end. So in which city are you currently living in?',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['I am staying in (City)']" />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 600px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              ***Discuss about the location and build rapport.
                              And fill in the NPF lead details
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Can you help me with your details of what you have done for graduation and what is your work experience, so I can guide you accordingly.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="[
                              'I have done my B.Com in 2017 and then completed my MBA marketing in 2019. I have around 2yrs of work experience in a BPO.',
                            ]" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'That’s great, in which company are you currently working in?',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="[
                              'I am working in iEnergizer as a Senior Executive.',
                            ]" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'So, what made you interested in Investment Banking, have you researched about it from your side or got to know from someone else.',
                            ]" sent />
                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="[
                              'Some of my colleagues suggested me and I was planning to switch my industry as there is not much growth in BPO.',
                            ]" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'See, no doubt it is a great career option to opt for, as the growth is quite good. First of all, thank you for sharing your details with me. By understanding your profile, I believe this program can help you achieve your career goals.',
                              'Investment banking is an extremely lucrative sector. Investment Bankers are individuals who help companies, organizations and clients manage and grow their financial assets.',
                              'If I talk about their job role, they help companies make sound decisions when it comes to investing their assets with the motive of increasing the value of their investments. Investment Bankers are expected to have a good knowledge of market trading activities and profitable securities.',
                              'Based on this knowledge, they can guide a client towards making better decisions when it comes to investing their money in the market through activities such as purchasing stock or securities.',
                              'To become an Investment Banker in India, it is not mandatory to take up any particular course or stream. Any person who has a good understanding of financial assets and investing can potentially become an Investment Banker.',
                            ]" sent />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'I will now explain to you about the course and the curriculum so that it will give you a clear idea.',
                            ]" sent />

                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Sure...']" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Let me start by briefing you about my organization, Data Trained. We are one of India’s leading Ed-tech Companies having Global presence, with our offices located in Bengaluru, Noida and New York.',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 160px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              margin-bottom: 20px;
                              height: 4vh;
                            ">
                            <q-card-section> Program Details : </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'This is a 6-months Post Graduate Certificate Program in Investment Banking in collaboration with LGCA (London Governance and compliance academy), one of Europe’s leading providers for certified and executive education, which is licenced by IGCA (International Governance & compliance association) . Which comes with 100% placement assistance.',
                              'The curriculum has been designed by leading industry experts with a simple idea in mind, what do companies actually want? The program is a combination of live classes and pre-recorded videos. Saturday and Sunday will be your live classes and Monday to Friday pre-recorded videos and assignments.',
                              'During the course part, we will cover all the aspects of investment banking like Financial market landscape, Fixed Income Securities, derivatives, foreign Exchange market, risk and regulation of global markets trade life cycle, Asset management, mutual funds, anti-money laundering etc.',
                              'The students will get 8 case studies to work upon for practical knowledge, which will be based on the topics covered in the theory. To give practical exposure, as it is very important to enter the industry. The companies are focusing on people with practical skills. These projects are going to give you practical knowledge & real life experience at the same time.',
                              'As soon as you register with us, you will be getting access to our Learning Management System (LMS) where all your Live classes sessions, recordings, study materials and modules can be accessed.',
                              'Lets Discuss about the doubts sessions which are very important in any online session. We provide different methods to clear the doubts of our students, which are ',
                              ' 1)We are the only ed-tech which is providing live chat support so you can directly chat with your mentors just like you do on Swiggy, Zomato etc.',
                              ' 2)There is a ticketing system so you just need to raise a ticket and the concerned team will solve the problem within 24hrs ',
                              ' 3) You can directly call the career coach through our IVR no. and discuss your doubts & get the solution then and there. The last one is the FAQ option in which you can just type in your question and get the related articles. Generally 90% of the doubts are cleared in FAQs only.',
                              ' 5) We even have our app of DataTrained through which the students can get access to the LMS and can attend the classes from anywhere.',
                              'At the end of the course, you will be getting 3 certificates in total.',
                              ' 1)Course completion certificate from DataTrained',
                              ' 2) LGCA Certificate',
                              '3)Project completion certificate',
                              'But our job is not done yet. We really want to see you be placed in the job you dreamt for and kick start your career in Investment Banking.',
                              'Hence we have a 100% placement assurance that comes with this program.',
                              'Students who will be eligible for the placement will also get the access to the IIMJobs account to search for jobs.',
                              'So by the 6th month of the program, our placement team starts working on your resume & profile and once the program is completed we will be organising placement campaigns in all the metro cities like Delhi NCR, Bangalore, Hyderabad, Pune & Mumbai.',
                              'We will be lining up interviews depending on your location and your profile.',
                              'Do you have any Questions for me regarding the program details shared?',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 250px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              (Recurring time confirmation)
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="[
                              'I don’t have doubts as of now, but tell me about the fees.',
                            ]" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Sure, before moving to the fee structure may I know in which salary package you fall in. So that I can explain to you about the placement opportunities.',
                            ]" sent />

                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="[
                              'It is around 3-4LPA (modify your response on the basis of the salary package)',
                            ]" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'That’s great as the minimum package after the placement is around 4-5LPA, you can easily expect a good hike and depending on the profile & skill sets people generally get average of 7-8LPA which can go upto 18LPA.',
                              'Our placement speaks for itself, just before last year’s lockdown in 2020 we were able to place 350 students in just 15 days which also got published in Hindustan Times.',
                              'And as you told me you are living in (Metro City) there are many Banks over there who are regularly hiring people in the same domain. We are tied up with more than 250 companies for placement, like Genpact, Accenture, KPMG, JP Morgan, Barclays etc. who regularly recruit in (Metro city name).',
                            ]" sent />

                          <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                            avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="[
                              'When is your batch going to start and how much will be the fee?',
                            ]" />

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'May I ask when you are planning to upskill yourself.',
                              'If as soon as possible, appreciate and explain the fees.',
                              'If you want more time, use rebuttals and explain why the prospect should start immediately. Then explain fees. (Ex:This month or next month batch is already closed)',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 290px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              Program Fees + Payment options :
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Now let us discuss the program fee which is priced at Rs.1,40,000 + 18% GST which comes out to be Rs. 1,65,200.',
                              'To get the admission in this program you just have to pay a sum of Rs. 10,000 as registration fees to book your seat and the remaining can be paid by 3 options.',
                              'The remaining amount can be paid either in one go or through EMIs. For EMIs we have a tie up with our financial partners i.e. Bajaj Finserv with EMI options of 10, 12, 15 & 20 months.',
                              'Apart from that there are other lending partners Liquiloan & Creditfare who are providing EMI options for 12, 24 & 36 months.',
                              'So which one would you like to go with?',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 140px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section> If Bajaj Finserv, </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Perfect! So before I proceed to tell you about the documents we require for the loans, I would like to explain to you about the loan process. As Bajaj Finserv is one of our lending partners, there will be no additional charges for our students. So it is going to be no cost EMI.',
                            ]" sent />
                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 230px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section>
                              If Other lending partners,
                            </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Perfect! So before I proceed to tell you about the documents we require for the loans, I would like to support our students. DataTrained is going to absorb the complete interest amount. So there will be 0% interest charged to you on this loan so you can focus on studying and don’t worry about paying any extra money on this loan.',
                              'Perfect! So before I proceed to tell you about the documents we require for the loans, I would like to support our students. DataTrained is going to absorb the complete interest amount. So there will be 0% interest charged to you on this loan so you can focus on studying and don’t worry about paying any extra money on this loan.',
                              'Now to proceed you would be required to provide certain documents like, Pan card, Aadhar card, 3 months’ salary statement which should be 25k or above, 6 months’ bank statement.',
                            ]" sent />

                          <q-card class="my-card text-white text-bold" style="
                              background-color: #fdc208;
                              width: 100px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              margin-top: 20px;
                              height: 4vh;
                            ">
                            <q-card-section> If One Go, </q-card-section>
                          </q-card>

                          <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                            avatar="https://cdn.quasar.dev/img/avatar1.jpg" :text="[
                              'Great! So the remaining amount of INR 1,55,200 needs to be paid in full in the next month.',
                              'Once you register, we will start with the process of LMS creation and once you get login credentials, study material and videos will be uploaded on that. You will be assigned a career coach who will guide you about the system and help you with the installation of servers and tools.',
                              'I am going to send you the brochure of the program, details of the enrolment on your email id we have with us.',
                              'May I ask you what will be a good day and time to connect back with you to start with the registration procedure of the program.',
                              'Take a specific date and time.',
                              'Thank you so much for giving me your valuable time, (Prospect name). It was a pleasure speaking to you. Please feel free to reach me out on this number via call or WhatsApp in case of any doubts or clarifications regarding this program',
                              'Wishing you a wonderful day/evening ahead. Happy Learning.',
                            ]" sent />
                        </div>
                      </div>
                      <!-- </q-card> -->
                    </q-tab-panel>
                    <q-tab-panel name="HR">
                      <!-- <q-card class="no-shadow"> -->
                      <!-- <div class="row justify-center"> -->
                      <div class="col-md-9 col-sm-10 col-12">


                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Hi, Good morning. Am I speaking with XYZ, This is Adhya from Data Trained, we got an inquiry for the PG Program in HR management from your end on our (Lead source). I hope it’s a good time to have a discussion on the same.']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Yes, I am free we can discuss']" />

                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['I was just curious to know if you enquired for yourself or someone else?']" sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Yes, I enquired for myself.']" />

                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Great! How are you? I hope you and your family are keeping safe and doing well at these difficult times.']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                          :text="['Yes, we are doing fine / Yes, I am fine.']" />

                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Glad to hear that everything is well at your end. So in which city are you currently living in?']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['I am staying in (City)']" />


                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 590px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Discuss about the location and build rapport. And fill in the NPF lead details.
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Can you help me with your details of what you have done for graduation and what is your work experience, so I can guide you accordingly.']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                          :text="['I have done my _________. I have around _________ of work experience in a ________.']" />

                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['That’s great, in which company are you currently working in?']" sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['I am working in ____________.']" />

                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['So, what made you interested in HR Management, have you researched about it from your side or got to know from someone else.']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['(Depends on the prospect’s reply)']" />

                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['No doubt it’s a great option to opt for if you are interested in HR management. First of all, thank you for sharing your details with me. By understanding your profile, I believe this program can help you achieve your career goals.']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 430px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            (What is HR, if not HR experienced then explain HRM)
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['HR handles the work force of an organisation it starts from recruitment, employee onboarding and then the exit part. In nutshell it covers the whole life cycle of an employee in an organisation.', 'In recent times HR is more data driven and new terms like digital HR and HR business partner have emerged. To your surprise these designations are getting salaries at par with other managerial positions. Avg. salary package of a HR business partner is around 8-12 LPA. As per naukri.com.']"
                          sent />

                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 200px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            (If experienced in HR)
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['See, the role of HR has changed over time. In the past, HR’s work was more into joining formalities, making salaries etc. but that’s not the case today. Today’s HR is a data-driven function and has the knowledge of various tools and analytics, many more position like HRBP (HR Business Partner) have come into existence which focus on functions like research and analysis of the employee trends, assist stakeholders in conflict resolution and process excellence hence this course that we are offering covers all these aspects and makes you job-ready for higher management role.', 'Avg. salary package of a HR business partner is around 8-12 LPA. As per glassdoor.']"
                          sent />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['I will now explain to you about the course and the curriculum so that it will give you a clear idea.']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Sure...']" />

                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Let me start by briefing you about my organization, Data Trained. We are one of India’s leading Ed-tech Companies having Global presence, with our offices located in Bengaluru, Noida and New York,DataTrained aim is to make quality professional education accessible to all. We are an ed-tech company with the sole aim of imparting quality programs in emerging technologies like Data Science, Analytics, Big Data, Artificial Intelligence, Machine Learning, Cloud Computing, Development, DevOps, Digital Marketing, Management, Engineering and many more.']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 200px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Program Details :
                          </q-card-section>
                        </q-card>

                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['The PG program in HR management is in collaboration with LGCA (London Governances and compliance academy), one of Europe’s leading providers for certified and executive education.', 'Our program is a 6-months program with 100% placement assurance. The curriculum has been designed by leading industry experts with a simple idea in mind, what do companies actually want?', 'The program is a combination of live classes and pre-recorded videos. Saturday and Sunday will be your live classes and Monday to Friday pre-recorded videos and assignments.', 'During the theory part, we will cover all the aspects of HR management, HR administration, compensation and benefits, Staffing recruitment, labor laws, etc. The course will also cover the latest topics like HR business Partner, Interview skills, tools like Tableau and Power BI that will make you ready for the managerial roles and also will future proof your career in HR management.']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 100px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Projects :
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Now moving to Projects, we deeply believe in practical implementation of all the things you learn. Hence, in this program there will be 3 capstone projects during this course also :', 'First, 2 Tech / 2 Non-tech Live Recruitmen Second, Employee journey mapping.And third, Induction of New Hires & Payroll Making.', 'As soon as you register with us, you will be getting access to our Learning Management System (LMS) where all your Live classes sessions, recordings, study materials and modules can be accessed.', 'Let’s Discuss about the doubts sessions which are very important in any online session. We provide different methods to clear the doubts of our students, which are', ' 1-We are the only ed-tech which is providing live chat support so you can directly chat with your mentors just like you do on Swiggy, Zomato etc.', ' 2- There is a ticketing system so you just need to raise a ticket and the concerned team will solve the problem within 24hrs.', ' 3- You can directly call the career coach through our IVR no. and discuss your doubts & get the solution then and there.', ' 4- The last one is the FAQ option in which you can just type in your question and get the related articles. Generally, 90% of the doubts are cleared in FAQs only', ' 5- We even have our app of DataTrained through which the students can get access to the LMS and can attend the classes from anywhere.', 'By the 6th month, the pre-placement activity will start to conduct your mock interviews, resume building and personality development as Rome was not built in a day hence, we too want to dedicate as much time as possible for shaping up your skills for the interview rounds.', 'At the end of the course, you will be getting 3 certificates in total. ', '1- Course completion certificate from DataTrained', ' 2- LGCA Certificate ', '3- Project completion certificate']"
                          sent />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['This is how our program is designed and delivered.', 'But our job is not done yet. We really want to land up your dream job and kick start your career in HR management.', 'Hence, we have a 100% placement assurance that comes with this program.', 'Students who will be eligible for the placement will also get the access to the IIMJobs account to search for jobs.', 'So, by the 6th month of the program, our placement team will be organizing placement campaigns in all the metro cities like Delhi NCR, Bangalore, Hyderabad, Pune & Mumbai etc.']"
                          sent />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['May I know in which salary package you fall in. So that I can explain to you about the placement opportunities.']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                          :text="['It is around 2-3LPA (modify your response on the basis of the salary package)']" />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['That’s great as the minimum package after the placement is around 3.5LPA, you can easily expect a good hike and depending on the profile & skill sets people generally get an average of 4-5LPA which can go up to 18 LPA.', 'Our placement speaks for itself, just before last year’s lockdown in 2020 we were able to place 350 students in just 15 days which also got published in Hindustan Times.', 'And as you told me you are living in (Metro City) there are many companies over there who are regularly hiring people in the same domain. We are tied up with more than 250 companies for placement, like HDFC, Yes bank, Rbl bank, IBM, HCL, KPMG, Bank of America, American Express, P&G, Paytm, Flipkart, Concentrix, Adobe, Accenture etc.', 'We will be lining up interviews depending on your location and your profile.', 'Do you have any Questions for me regarding the program details shared?']"
                          sent />

                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 300px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            (Recurring time confirmation)
                          </q-card-section>
                        </q-card>

                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                          :text="['I don’t have doubts as of now, when is your batch going to start and how much will be the fee?']" />

                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['May I ask when you are planning to upskill yourself.', 'If as soon as possible, appreciate and explain the fees.', 'If you want more time, use rebuttals and explain why the prospect should start immediately. Then explain fees. (Ex: this month or next month batch is already closed).']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 300px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Program Fees + Payment options
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Now let us discuss the program fee which is priced at Rs.1,10,000 + 18% GST which comes out to be Rs. 1,29,800.', 'To get the admission in this program you just have to pay a sum of Rs. 10,000 as registration fees to book your seat and the remaining can be paid by 2 options.', 'The remaining amount can be paid either in one go or through EMIs. For EMIs we have a tie up with our financial partners i.e Liquiloan & Creditfare who are providing EMI options for 10 and 12 months.', 'So, which one would you like to go with?']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 100px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            If EMIs,
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Perfect! So before I proceed to tell you about the documents we require for the loans, I would like to support our students. DataTrained is going to absorb the complete interest amount, so there will be 0% interest charged to you on this loan so you can focus on studying and don’t worry about paying any extra money on this loan.', 'Now to proceed you would be required to provide certain documents like, Pan card, Aadhar card, 3 months’ salary statement.']"
                          sent />

                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 100px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            If One Go,
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Great! So, the remaining amount of INR 1,19,800 needs to be paid in full in the next month.', 'Once you register, we will start with the process of LMS creation and once you get login credentials, study material and videos will be uploaded on that. You will be assigned a career coach who will guide you about the system and help you with the installation of servers and tools.', 'I am going to send you the brochure of the program, details of the enrolment on your email id we have with us.', 'May I ask you what will be a good day and time to connect back with you to start with the registration procedure of the program.', 'Take a specific date and time.', 'Thank you so much for giving me your valuable time, (Prospect name). It was a pleasure speaking to you. Please feel free to reach me out on this number via call or WhatsApp in case of any doubts or clarifications regarding this program', 'Wishing you a wonderful day / evening ahead. Happy Learning.']"
                          sent />



                      </div>
                      <!-- </div> -->
                      <!-- </q-card> -->
                    </q-tab-panel>
                    <q-tab-panel name="ECom">
                      <!-- <q-card class="no-shadow"> -->
                      <!-- <div class="row justify-center"> -->
                      <div class="col-md-9 col-sm-10 col-12">

                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Hi, Good morning. Am I speaking with XYZ… This is Adhya from Data Trained, we got an inquiry from Facebook (Lead Source) for the PG Program in Ecommerce and Digital Marketing program. So, I believe you are looking for a program in E-Commerce and digital marketing. I hope it’s a good time to have a 10-15 mins discussion.']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Yes, I am free we can discuss']" />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['I was just curious to know if you enquired for yourself or someone else?']" sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Yes, I enquired for myself.']" />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Great! How are you? I hope you and your family are keeping safe and doing well at these difficult times.']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                          :text="['Yes, we are doing fine / Yes, I am fine.']" />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Glad to hear that everything is well at your end. So in which city are you currently living in?']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['I am staying in (City).']" />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 590px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Discuss about the location and build rapport. And fill in the NPF lead details.
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Can you help me with your details of what you have done for graduation and if you have got any work experience, so I can guide you accordingly.']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                          :text="['I have done my _________. I have around _________ of work experience in a ________.']" />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['That’s great, in which company are you currently working in?']" sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                          :text="['I am working in __________. (Build rapport here by saying one of my friends or relative work there as well).']" />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['So, what made you interested in our Ecommerce and Digital Marketing course, have you researched about it from your side or got to know from someone else?']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['(Depends on the prospect’s reply)']" />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['That’s great! So, you must have heard about Amazon, Flipkart, Zomato, Swiggy, Grofers, and others. They are e-commerce companies and trust me there are lot of jobs in this segment.', 'This course will help you get jobs in these companies. Let me Go ahead and brief you about the details of the program and tell you how this program can upscale and shape your career in a better manner. Alright? (Wait for customers response)']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Yes sure! Go ahead.']" />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 250px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Datatrained Introduction :
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Let me start by briefing you about my organization, Data Trained. We are one of India’s leading Ed-tech Companies having a Global presence, with our offices located in Bengaluru, Noida, and New York.']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 200px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 5vh;">
                          <q-card-section>
                            Program Details :
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['So, moving forward let’s talk about our PG Program in E-Commerce and Digital Marketing with 100% placement Assistance in collaboration with GoDaddy :', 'So, sir, do you know or have you heard about GoDaddy?  Customer: yes', 'Perfect! Yes, GoDaddy is the worlds largest web host and domain registrar. What that means is when people want to buy a domain name, they can go to GoDaddy and purchase it. After they purchase the domain name, they can host their website with the service. You must have seen their ads and MS Dhoni is their Brand Ambassador.', 'So, this collaboration adds an extra value to our program and our certificates are accepted worldwide.', 'With how accessible the internet is today, would you believe me if I told you the number of people who go online every day is still increasing?', 'In total, the number of people that own a smart and feature phone is 7.26 Billion, making up 91.62% of the worlds population.', 'Now, since most of the Indians spend much of their time being online, they are the perfect place for a business to market its products. These companies use Digital Marketing to do that. So, any form of marketing that exists online comes under Digital Marketing.', 'The companies that do the selling of their products and services with the help of Digital Marketing are known as e-commerce companies like Amazon, Flipkart, Bigbasket, Grofers, and many others. So, you can see, Digital Marketing plays a pivotal role in the success of an e-commerce business.', 'As per a recent estimate, the Indian e-commerce sector has the potential to create 1 million jobs by 2023 alone and would be worth US$ 200 billion by 2026. More than 90% of these jobs need a better understanding of both e-commerce and digital marketing.', 'So, you can see that the best part of our program is our ability to integrate both Digital Marketing and E-commerce. And trust me, this is what the company needs at the moment. And I am talking about the top-notch companies like Amazon, Walmart, Big Bazaar and Flipkart.']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 200px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Program Details :
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Okay so moving forward the Course is divided into 3 parts i.e. First 6 months will be your theoretical and practical part, the next 3 months will be your internship part and the last month will be your pre-placement activity sessions.', 'This course is designed by understanding the latest trends in the industry and also the fact that what is it that the companies are looking for in a candidate for hiring.', 'Let me make you understand the curriculum in a very simple manner.Have you ever thought of making your own website for your own business?']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                          :text="['I did think but all this sounds very technical.']" />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Well, this is where we are coming into the frame sir, you see we will start our course with the basics of E commerce and Digital Marketing like, we will teach you on how to make your own website from the scratch and how to choose your domain name for the same, next we will teach you how to integrate shopping cart and payment gateway on your website, just like you have it on Amazon remember?']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                          :text="['Yes I do, it sounds amazing! Please continue.']" />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Sure Sir, now after building the website you need traffic over it right? For that we will make you understand the basic tools which are required for generating traffic on your website like for example there is one organic manner of generating traffic which is usually free of cost it includes tool like Search Engine Optimization which is really effective but surely requires your continuous effort. Next if you want instant traffic on your website then there is the option of Paid Digital marketing, through which you can get instant traffic and business but this service is paid.', 'Now that we understand how to create a website and then how to generate traffic through which you will get business, next we will understand how to get orders on your website through our Supply chain module which will again make you understand the e-commerce models and marketplaces like Amazon, Flipkart, Zomato and Urbanclap. Now once we are done with all these activities and once you have started taking orders on your website you will definitely want to sell more products or services online, right? So in order to do so, we will teach you how to Create an Inventory in major e-commerce portals like Amazon and Flipkart, sounds amazing right?']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['It really does, please continue.']" />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Sure, Now that you have made the website, attracted traffic, and got the orders, next we will teach you how to do Order Fulfillment & how to handle the Orders Cancellation. Now going to our last topic which is on how to ship your order, for this too we will teach you again from scratch the Logistics and Shipping module in which we will cover Types of Shipping Partners, Ecommerce Shipping Strategy Goals, Ecommerce Shipping Options and much more!, so you see, that through our program we are covering all the basic points of the entire E- Commerce process! we have kept our modules in sync with the requirements which are present at the current scenario in the industry as now the companies are giving more weightage to the candidates who have both E - Commerce as well as the Digital Marketing knowledge as both these fields are in sync and go hand in hand, one is incomplete without the other hence the knowledge of both the fields is very important!']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 100px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Classes :
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Now talking about the classes, our classes will be conducted on weekends i.e on Saturday and Sunday and from Monday to Friday you will be provided with assessments in order to practice as it is rightly said that practice makes a man perfect', 'Any questions till now?']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['No, please go ahead!']" />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 250px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Doubt Clearing Sessions :
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Okay great So let’s discuss the doubts sessions which are very important in any online session. We provide different methods to clear the doubts of our students, which are :', '1-We are the only ed-tech which is providing live chat support so you can directly chat with your career coaches just like you do on Swiggy, Zomato etc.', ' 2- There is a ticketing system so you just need to raise a ticket and the concerned team will solve the problem within 24hrs.', ' 3- You can directly call the career coach through our IVR no. and discuss your doubts & get the solution then and there.', ' 4- The next one is the FAQ option in which you can just type in your question and get the related articles. Generally, 90% of the doubts are cleared in FAQs only.', 'We even have our app of DataTrained through which the students can get access to the LMS and can attend the classes from anywhere.', 'I hope you are clear with doubt options, right?']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['Yes.']" />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 150px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Interships :
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Okay so now let’s talk about your next 3 months which is going to be your internship part. So, talking about internships is one of the most important aspects of learning as it will give you a real-time exposure & hands-on experience which will definitely help you to cut all the rough edges. The internship will be either paid or unpaid depending on your skills and it will be 100% flexible!', 'By the 10th month, the pre-placement activity will start to conduct your mock interviews, resume building, and personality development as Rome was not built in a day hence, we too want to dedicate as much time as possible to shaping up your skills for the interview rounds.']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 150px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Certificates :
                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['At the end of the course, you will be getting 4 certificates in total.', '1- Course completion certificate from DataTrained', ' 2- GODaddy Certificate ', '3- Internship completion certificate', ' 4- Project Completion certificate', 'We will be providing you account access to IIM jobs which will be opening a plethora of opportunities for you. Any questions coming up till now?']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg" :text="['No, Go ahead']" />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 150px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Placement :

                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Okay, so talking about the placement, XYZ Our placement speaks for itself, just before last year’s lockdown in 2020 we were able to place 350 students in just 15 days which also got published in Hindustan Times.', 'And as you told me you are living in (Metro City) there are many partners over there who are regularly hiring people in the same domain. We are tied up with more than 250 companies for placement, like Amazon, Flipkart, Zomato, Swiggy, Big Basket, Blinkit, Web Matrix, Cars 24, India Mart, etc. who regularly recruit in (Metro city’s name).', 'My placement team will start conducting your placements round by the 9th month itself of the program.We will try our level best to get you the highest package that is an assurance that no other market player will be offering you!', 'Any doubt? (keep on asking this in between)']"
                          sent />
                        <q-chat-message bg-color="indigo-11" text-color="white" size="11" name="Prospect"
                          avatar="https://cdn.quasar.dev/img/avatar2.jpg"
                          :text="['I don’t have doubts as of now, when is your batch going to start and how much will be the fee?']" />
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['May I ask when you are planning to upskill yourself', 'If as soon as possible, appreciate and explain the fees.', 'If you want more time, use rebuttals and explain why the prospect should start immediately. Then explain fees. (Ex: this month or next month batch is already']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 300px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 4vh;">
                          <q-card-section>
                            Program Fees + Payment options :

                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Now let us discuss the program fee which is priced at Rs.1,10,000 + 18% GST which comes out to be Rs. 1,29,800.', 'To get the admission in this program you just have to pay a sum of Rs. 10,000 as registration fees to book your seat and the remaining can be paid by 2 options.', 'he remaining amount can be paid either in one go or through EMIs. For EMIs we have a tie up with our financial partners i.e Liquiloan & Creditfare who are providing EMI options for 10 and 12 months.', 'So, which one would you like to go with?']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 100px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 5vh;">
                          <q-card-section>
                            If EMIs,

                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Perfect! So before I proceed to tell you about the documents we require for the loans, I would like to support our students. DataTrained is going to absorb the complete interest amount, so there will be 0% interest charged to you on this loan so you can focus on studying and don’t worry about paying any extra money on this loan.', 'Now to proceed you would be required to provide certain documents like, Pan card, Aadhar card, 3 months’ salary statement.']"
                          sent />
                        <q-card class="my-card text-white text-bold" style="background-color: #fdc208; width: 100px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              margin: auto;
                              height: 5vh;">
                          <q-card-section>
                            If One Go,

                          </q-card-section>
                        </q-card>
                        <q-chat-message bg-color="indigo-1" size="11" name="Counsellor"
                          avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                          :text="['Great! So, the remaining amount of INR 1,19,800 needs to be paid in full in the next month', 'Once you register, we will start with the process of LMS creation and once you get login credentials, study material and videos will be uploaded on that. You will be assigned a career coach who will guide you about the system and help you with the installation of servers and tools.', 'I am going to send you the brochure of the program, details of the enrolment on your email id we have with us.', 'May I ask you what will be a good day and time to connect back with you to start with the registration procedure of the program.', 'Take a specific date and time.', 'Thank you so much for giving me your valuable time, (Prospect name). It was a pleasure speaking to you. Please feel free to reach me out on this number via call or WhatsApp in case of any doubts or clarifications regarding this program', 'Wishing you a wonderful day/evening ahead. Happy Learning.']"
                          sent />




                      </div>
                      <!-- </div> -->
                      <!-- </q-card> -->
                    </q-tab-panel>
                  </q-tab-panels>

                </div>
              </q-scroll-area>
            </template>

          </q-splitter>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from "vue";
import { LocalStorage } from "quasar";

const tab = ref('DS')
const splitterModel = ref(30)
const access = LocalStorage.getItem('access_key')
const state = reactive({
  create: ref(false),
})

onBeforeMount(() => {
  const rights = access.filter(checkEvent);
  rights.forEach(function (el) {
    let key = el.split('.')[1]
    if (el.includes('sales-pitch')) {
      state[key] = true
    }

  });

  function checkEvent(keys) {
    return keys.includes('sales-pitch');
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

// k

td {
  font-size: 13px;
  color: #4f4f4f;
}

.q-tab {
  justify-content: start !important;
  padding: 0px 15px !important;
}

.createNew {
  width: 600px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.q-message-text-content {
  div {
    line-height: 21px !important;
    letter-spacing: 0.3px;
    padding: 10px, 14px;

  }

}

.tab-style {
  border-radius: 5px;
  box-shadow: 0 0 4px 0px rgba(0, 0, 0, 0.1);
}
</style>
