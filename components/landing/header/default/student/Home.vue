<template>
  <div>
    <section class="subjects">
      <h3 class="title-font">
        Subject
      </h3>
      <div class="subjects-container">
        <div class="subject-box" style="background-color: #3040c4;">
          <div class="img">
            <img alt src="~/assets/img/abc.png" />
          </div>
          <p class="content small-font">
            English
          </p>
        </div>
        <div class="subject-box" style="background-color: #82b5a5;">
          <div class="img">
            <img alt src="~/assets/img/science.png" />
          </div>
          <p class="content small-font">
            Science
          </p>
        </div>
        <div class="subject-box" style="background-color: #f36b7f;">
          <div class="img">
            <img alt src="~/assets/img/abgd.png" />
          </div>
          <p class="content small-font">
            Arabic
          </p>
        </div>
        <div class="subject-box" style="background-color: #6470b3;">
          <div class="img">
            <img alt src="~/assets/img/gyolgya.png" />
          </div>
          <p class="content small-font">
            Gyolgya
          </p>
        </div>
        <div class="subject-box" style="background-color: #f8cf61;">
          <div class="img">
            <img alt src="~/assets/img/math.png" />
          </div>
          <p class="content small-font">
            Math
          </p>
        </div>
        <div class="subject-box" style="background-color: #3040c4;">
          <div class="img">
            <img alt src="~/assets/img/abc.png" />
          </div>
          <p class="content small-font">
            English
          </p>
        </div>
        <div class="subject-box" style="background-color: #82b5a5;">
          <div class="img">
            <img alt src="~/assets/img/science.png" />
          </div>
          <p class="content small-font">
            Science
          </p>
        </div>
        <div class="subject-box" style="background-color: #f36b7f;">
          <div class="img">
            <img alt src="~/assets/img/abgd.png" />
          </div>
          <p class="content small-font">
            Arabic
          </p>
        </div>
        <div class="subject-box" style="background-color: #6470b3;">
          <div class="img">
            <img alt src="~/assets/img/gyolgya.png" />
          </div>
          <p class="content small-font">
            Gyolgya
          </p>
        </div>
      </div>
    </section>
    <div class="running-courses bg-transparent">
      <div class="with-more">
        <p class="title-font">
          Running Courses
        </p>
        <a class="see-all" href>{{ $t("see_all") }}</a>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="run-course-box">
            <div class="img">
              <img alt src="~/assets/img/lesson-box.png" />
            </div>
            <div class="info">
              <div class="up">
                <p class="title">
                  Subject
                </p>
                <div class="drop-container run-dropdown user-dropdown">
                  <button class="drop-btn">
                    <i class="fas fa-ellipsis-h" />
                  </button>
                  <div class="drop-menu">
                    <span class="link">English</span>
                    <span class="link">Arabic</span>
                  </div>
                </div>
              </div>
              <p class="sub">
                35 hours of 75 hours taken
              </p>
              <p class="progres-title">
                Process (65%)
              </p>
              <div class="progress">
                <div class="fill" style="width: 65%;" />
              </div>
              <a class="run-more" href>
                <i class="fas fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <div class="run-course-box">
            <div class="img">
              <img alt src="~/assets/img/lesson-box.png" />
            </div>
            <div class="info">
              <div class="up">
                <p class="title">
                  Subject
                </p>
                <div class="drop-container run-dropdown user-dropdown">
                  <button class="drop-btn">
                    <i class="fas fa-ellipsis-h" />
                  </button>
                  <div class="drop-menu">
                    <span class="link">English</span>
                    <span class="link">Arabic</span>
                  </div>
                </div>
              </div>
              <p class="sub">
                35 hours of 75 hours taken
              </p>
              <p class="progres-title">
                Process (65%)
              </p>
              <div class="progress">
                <div class="fill" style="width: 65%;" />
              </div>
              <a class="run-more" href>
                <i class="fas fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4">
          <div class="run-course-box">
            <div class="img">
              <img alt src="~/assets/img/lesson-box.png" />
            </div>
            <div class="info">
              <div class="up">
                <p class="title">
                  Subject
                </p>
                <div class="drop-container run-dropdown user-dropdown">
                  <button class="drop-btn">
                    <i class="fas fa-ellipsis-h" />
                  </button>
                  <div class="drop-menu">
                    <span class="link">English</span>
                    <span class="link">Arabic</span>
                  </div>
                </div>
              </div>
              <p class="sub">
                35 hours of 75 hours taken
              </p>
              <p class="progres-title">
                Process (65%)
              </p>
              <div class="progress">
                <div class="fill" style="width: 65%;" />
              </div>
              <a class="run-more" href>
                <i class="fas fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recomented-whth-side">
      <div class="recomended-lessons bg-transparent">
        <div class="with-more">
          <p class="title-font">
            Recommended lessons
          </p>
          <a class="see-all" href>{{ $t("see_all") }}</a>
        </div>
        <div class="recomended-slider">
          <div class="lesson-box">
            <div class="img">
              <img alt src="~/assets/img/lesson-box.png" />
            </div>
            <div class="info">
              <div class="left">
                <div class="user-img">
                  <img alt src="~/assets/img/user2.png" />
                </div>
                <div class="data">
                  <p class="tit">
                    Math
                  </p>
                  <p class="content">
                    master ce ali
                  </p>
                </div>
              </div>
              <a class="play" href>
                <i class="fas fa-play" />
              </a>
            </div>
          </div>
          <div class="lesson-box">
            <div class="img">
              <img alt src="~/assets/img/lesson-box.png" />
            </div>
            <div class="info">
              <div class="left">
                <div class="user-img">
                  <img alt src="~/assets/img/user2.png" />
                </div>
                <div class="data">
                  <p class="tit">
                    Math
                  </p>
                  <p class="content">
                    master ce ali
                  </p>
                </div>
              </div>
              <a class="play" href>
                <i class="fas fa-play" />
              </a>
            </div>
          </div>
          <div class="lesson-box">
            <div class="img">
              <img alt src="~/assets/img/lesson-box.png" />
            </div>
            <div class="info">
              <div class="left">
                <div class="user-img">
                  <img alt src="~/assets/img/user2.png" />
                </div>
                <div class="data">
                  <p class="tit">
                    Math
                  </p>
                  <p class="content">
                    master ce ali
                  </p>
                </div>
              </div>
              <a class="play" href>
                <i class="fas fa-play" />
              </a>
            </div>
          </div>
          <div class="lesson-box">
            <div class="img">
              <img alt src="~/assets/img/lesson-box.png" />
            </div>
            <div class="info">
              <div class="left">
                <div class="user-img">
                  <img alt src="~/assets/img/user2.png" />
                </div>
                <div class="data">
                  <p class="tit">
                    Math
                  </p>
                  <p class="content">
                    master ce ali
                  </p>
                </div>
              </div>
              <a class="play" href>
                <i class="fas fa-play" />
              </a>
            </div>
          </div>
          <div class="arrows">
            <i class="fas fa-chevron-left prev" />
            <i class="fas fa-chevron-right next" />
          </div>
        </div>
      </div>

      <div class="recomented-side">
        <div class="pay-box">
          <img alt class="img" src="~/assets/img/get-better-result.png" >
          <div class="info">
            <p class="price">
              Available
            </p>
            <button class="button">
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
