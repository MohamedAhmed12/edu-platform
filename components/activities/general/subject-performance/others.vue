<template>
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
                      <i class="far fa-angle-right" />
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
                      <i class="fas fa-percent" />
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["learningPerformance"],
};
</script>

<style></style>
