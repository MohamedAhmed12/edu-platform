<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 mt-30">
      <div class="row m-15 blue">
        <div class="col-md-12 col-sm-12 co-12 my-auto mobile-padding">
          <p>
            <img class="img-fluid" src="~/assets/img/Gone.png" />
            {{ $t("Subject") }}
          </p>
        </div>
      </div>

      <div class="slider-course lessons position-relative m-15 m-t-0">
        <div v-if="data.length" class="row mx-0">
          <div v-if="$i18n.locale === 'ar'" class="col-lg-2" />
          <div class="col-lg-10 px-0">
            <carousel
              :autoplay="false"
              class="studen-subject"
              :dots="false"
              :loop="true"
              :nav="true"
              :responsive="{
                0: { items: 1, margin: 10, stagePadding: 10 },
                450: { items: 1, margin: 10 },
                550: { items: 2, margin: 10 },
                991: { items: 3, margin: 10 },
                1280: { items: 4, margin: 10 },
              }"
              :rewind="false"
            >
              <div v-for="(subject, i) in data" :key="i" class="item">
                <div class="card-content p-3">
                  <div class="row">
                    <div class="col-3">
                      <span class="d-block text-center">
                        <i class="fas fa-book-open" />
                      </span>
                    </div>
                    <div class="col-9">
                      <h4 class="card-title">
                        {{ subject.name }}
                      </h4>
                      <p class="progres-title">
                        {{ $t("Process") }} (
                        {{ subject.progress | decimalConvert }}% )
                      </p>
                      <div class="progress">
                        <template>
                          <Progress hide-info :percent="subject.progress" />
                        </template>
                      </div>
                      <div class="row mt-3 mx-0">
                        <div class="col-8 px-1">
                          <nuxt-link
                            class="d-block rounded text-center py-2 text-white bg-primary"
                            :to="
                              localePath({
                                path: `/subject-activities/${
                                  usertYPE == 'parent'
                                    ? 'parent'
                                    : 'student-teacher'
                                }/${subject.id}/${studentId}`,
                              })
                            "
                          >
                            {{ $t("performance") }}
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </carousel>
          </div>
          <div v-if="$i18n.locale === 'en'" class="col-lg-2" />
        </div>
        <div v-if="data.length == 0" class="row m-auto">
          <div class="col-md-12">
            <h2 class="text-center">
              {{ $t("no Data Found") }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      studentId: this.$route.params.id,
      usertYPE: this.$auth.user.attributes["user-type"],
    };
  },
  computed: {},
  mounted() {},

  created() {},
  methods: {},
};
</script>

<style lang="css" scoped>
.progress {
  display: contents;
}
</style>
