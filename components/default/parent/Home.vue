<template>
  <div class="home-content">
    <div class="left-side">
      <Relations />
      <Subjects />
      <Courses />
    </div>
    <div class="right-side">
      <div class="pay-box">
        <img alt="" class="img" src="~/assets/img/pay.png" />
        <div class="info">
          <p class="price">
            325$ <br >
            Available
          </p>
          <button class="button">
            Request
          </button>
        </div>
      </div>
      <div class="view-box">
        <img alt="" class="img" src="~/assets/img/online-exercies.png" />
        <div class="info">
          <div class="btns">
            <button class="button">
              VIew exams
            </button>
            <button class="button">
              View practice
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Relations from "~/components/default/components/relations/all.vue";
import Subjects from "~/components/default/components/subjects/all.vue";
import Courses from "~/components/default/components/courses/all.vue";
export default {
  components: {
    Relations,
    Subjects,
    Courses,
  },
};
</script>
