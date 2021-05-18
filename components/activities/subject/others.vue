<template>
  <div>
    <div class="row m-15 rounded-circle">
      <div class="col-lg-12 col-md-12 col-sm-12 mt-30">
        <div class="row m-15 blue">
          <div class="col-md-12 col-sm-12 co-12 my-auto mobile-padding">
            <p>
              <img class="img-fluid" src="~/assets/img/Gone.png">
              {{ $t("study time") }}
            </p>
          </div>
        </div>
        <div class="slider-course">
          <div class="row m-auto justify-content-center tabel-hight scrollbar">
            <div class="col-md-10">
              <Time :get="get" :time="req" :time-paginate="timePaginate" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-15">
      <div class="col-lg-12 col-md-12 col-sm-12 mt-30">
        <div class="row m-15 blue">
          <div class="col-md-12 col-sm-12 co-12 my-auto mobile-padding">
            <p>
              <img class="img-fluid" src="~/assets/img/Gone.png">
              {{ $t("Student Rank") }}
            </p>
          </div>
        </div>
        <div class="slider-course lessons position-relative m-15 m-t-0">
          <div class="row m-auto justify-content-center">
            <div class="col-md-4">
              <div class="item">
                <div class="card p-3">
                  <div class="row">
                    <div class="col-3">
                      <span class="d-block text-center btn-primary">
                        <i class="far fa-star" />
                      </span>
                    </div>
                    <div class="col-9 m-auto">
                      <h4 class="card-title">
                        {{ $t("student order") }}:{{
                          learningPerformance.student_order
                        }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="item">
                <div class="card p-3">
                  <div class="row">
                    <div class="col-3">
                      <span class="d-block text-center btn-primary">
                        <i class="far fa-star" />
                      </span>
                    </div>
                    <div class="col-9 m-auto">
                      <h4 class="card-title">
                        {{ $t("number of taken exams") }}:{{
                          learningPerformance.number_of_taken_exams
                        }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="item">
                <div class="card p-3">
                  <div class="row">
                    <div class="col-3">
                      <span class="d-block text-center btn-primary">
                        <i class="far fa-star" />
                      </span>
                    </div>
                    <div class="col-9 m-auto">
                      <h4 class="card-title">
                        {{ $t("success rate") }} :
                        {{ learningPerformance.success_rate }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="item">
                <div class="card p-3">
                  <div class="row">
                    <div class="col-3">
                      <span class="d-block text-center btn-primary">
                        <i class="far fa-star" />
                      </span>
                    </div>
                    <div class="col-9 m-auto">
                      <h4 class="card-title">
                        {{ $t("exams_count_order") }} :
                        {{ learningPerformance.exams_count_order }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="item">
                <div class="card p-3">
                  <div class="row">
                    <div class="col-3">
                      <span class="d-block text-center btn-primary">
                        <i class="far fa-star" />
                      </span>
                    </div>
                    <div class="col-9 m-auto">
                      <h4 class="card-title">
                        {{ $t("solving_speed_percentage_order") }} :
                        {{ learningPerformance.solving_speed_percentage_order }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="item">
                <div class="card p-3">
                  <div class="row">
                    <div class="col-3">
                      <span class="d-block text-center btn-primary">
                        <i class="far fa-star" />
                      </span>
                    </div>
                    <div class="col-9 m-auto">
                      <h4 class="card-title">
                        {{ $t("subject_progress_percentage_order") }} :
                        {{
                          learningPerformance.subject_progress_percentage_order
                        }}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Time from "@/components/time-tracking/index.vue";

export default {
  components: { Time },
  props: ["learningPerformance", "get"],
  computed: {
    req() {
      return this.learningPerformance.times
        ? this.learningPerformance.times.data
        : [];
    },
    timePaginate() {
      return this.learningPerformance["times-pagination"]
        ? this.learningPerformance["times-pagination"]
        : {};
    },
  },
};
</script>

<style></style>
