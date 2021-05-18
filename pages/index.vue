<template>
  <!-- start content -->
  <section class="main-content">
    <!-- start head -->
    <section
      class="home-head"
      :style="`background-image: url(${require('~/assets/img/header-bg.jpg')}`"
    >
      <h1 class="title font-bold h1 w-50 text-uppercase">
        {{ $t("you_can") }}
        {{ $t("learn") }}
        {{ $t("anything") }}
        {{ $t("now") }}
        <br />
        {{ $t("knowledge") }}
        {{ $t("at_your_fingertips") }}
      </h1>
      <a class="more" href>{{ $t("learn_more") }}</a>
    </section>
    <!-- end head -->
    <!-- start Education level-->
    <section class="education section-padding">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="row mx-0">
              <div class="col-10 mx-auto">
                <img
                  alt="education level image"
                  class="img-fluid"
                  src="~/assets/img/education-lev.png"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12">
            <h1 class="education-title">
              {{ $t("all_educational_levels") }}
            </h1>

            <div class="row">
              <div class="col-lg-6">
                <div class="education-levels">
                  <span class="icon-grap">
                    <i class="fas fa-check" />
                  </span>
                  <span class="educatiion-levels--info">{{
                    $t("primary")
                  }}</span>
                </div>

                <div class="education-levels">
                  <span class="icon-grap">
                    <i class="fas fa-check" />
                  </span>
                  <span class="educatiion-levels--info">{{
                    $t("preparatory")
                  }}</span>
                </div>
                <div class="education-levels">
                  <span class="icon-grap">
                    <i class="fas fa-check" />
                  </span>
                  <span class="educatiion-levels--info">{{
                    $t("training")
                  }}</span>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="education-levels">
                  <span class="icon-grap">
                    <i class="fas fa-check" />
                  </span>
                  <span class="educatiion-levels--info">{{
                    $t("secondary")
                  }}</span>
                </div>

                <div class="education-levels">
                  <span class="icon-grap">
                    <i class="fas fa-check" />
                  </span>
                  <span class="educatiion-levels--info">{{ $t("exams") }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end Education level-->
    <!-- start subjects -->

    <section class="subjects section-padding">
      <div class="container">
        <p class="subject-title text-center">
          {{ $t("distinguished_students") }}
        </p>
        <div class="subjects-container mt-3 mb-3">
          <div v-for="i in DistinguishedStudent" class="subject-box">
            <img alt="student image" :src="i.student.data.profile_picture" />
            <h4 class="mt-2 mb-2">
              {{ i.student.data.name }}
            </h4>
            <p>{{ i.subject.data.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- end subjects -->

    <!-- start fun-intro -->

    <section class="fun-intro section-padding">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-6">
            <h3 class="title title-font">
              {{ $t("Study With The Best And Most Famous Teachers") }}
              <!--              Study With The Best And Most Famous Teachers-->
            </h3>
            <div class="row">
              <div class="col-lg-9">
                <p class="content normal-font">
                  {{
                    $t(
                      "Wherever you can access the elite teachers in all subjects We offer millions of high quality online tutors for every student.... We have a wide range of courses for languages, academic subjects and skills"
                    )
                  }}
                </p>
                <h5 class="content normal-font mt-3">
                  {{
                    $t(
                      "register with us"
                    )
                  }}
                </h5>
                <p class="content normal-font mt-1">
                  {{
                    $t(
                      "our Customer Support will match you with an elite tutor and schedule class time for you!"
                    )
                  }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <img
              alt
              class="img w-100"
              src="~/assets/img/future-technology.png"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- end fun-intro -->

    <!-- Start How IT Works-->
    <section class="features features-padding">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p class="features-title text-center">
              {{ $t("how_it_works") }}
            </p>
            <ul class="features-icons">
              <li>
                <span>
                  <i class="icon-file" />
                </span>
                <p class="content normal-font text-center text-black mb-0 mt-3">
                  {{ $t("test") }}
                </p>
              </li>
              <li>
                <span>
                  <i class="icon-like" />
                </span>
                <p class="content normal-font text-center text-black mb-0 mt-3">
                  {{ $t("recommend") }}
                </p>
              </li>

              <li>
                <span>
                  <i class="icon-live" />
                </span>
                <p class="content normal-font text-center text-black mb-0 mt-3">
                  {{ $t("explain") }}
                </p>
              </li>
              <li>
                <span>
                  <i class="icon-open-book" />
                </span>
                <p class="content normal-font text-center text-black mb-0 mt-3">
                  {{ $t("lesson") }}
                </p>
              </li>
              <li>
                <span>
                  <i class="icon-video" />
                </span>
                <p class="content normal-font text-center text-black mb-0 mt-3">
                  {{ $t("training") }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- End  How IT Works-->

    <!-- start your-dreem -->

    <!--    <section class="your-dream">-->
    <!--
      <div class="row">
        <div class="col-12 col-lg-6"></div>
        <div class="col-12 col-lg-6">
          <div class="info">
            <h2 class="title">
              You Dream <br>
              To Know More ?
            </h2>
            <h2 class="sub-title">
              JOIN US NOW
            </h2>
          </div>
        </div>
      </div>
    -->
    <!--      <img alt class="w-100" src="~/assets/img/how-dream.png" />-->
    <!--    </section>-->

    <!-- end your-dreem -->

    <!-- start how-it-work -->

    <section class="how-it-work">
      <p class="features-title text-center mb-4">
        <!--        {{ urlMeta.title }}-->
        {{ $t("how_it_works") }}
      </p>
      <iframe src="https://www.youtube.com/embed/xoNDZquBI-w?autoplay=false" />
    </section>

    <!-- end how-it-work -->
  </section>

  <!-- end content -->
</template>

<script>
import "~/assets/css/header.css";
import "~/assets/css/home-landing.css";
import "~/assets/css/footer.css";

import { Formatter } from "sarala-json-api-data-formatter";

export default {
  layout: "landing",
  auth: "guest",
  data() {
    return {
      formatter: new Formatter(),
      DistinguishedStudent: [],
      urlMeta: {},
      url: "",
      data: [],
    };
  },
  created() {
    this.getStudent();
    this.getUrl();
  },
  methods: {
    getStudent() {
      this.$axios
        .get("static-pages/homepage?include=blocks")
        .then((response) => {
          this.data = this.formatter.deserialize(response.data);
          this.DistinguishedStudent = this.data.distinguishedStudents.data;
          console.log(this.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUrl() {
      this.$axios
        .get("static-pages/homepage/homepage-how-it-works")
        .then((response) => {
          this.urlMeta = this.formatter.deserialize(response.data);
          this.url = this.urlMeta.body[0].link;
          console.log(this.urlMeta);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
