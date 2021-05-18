<template>
  <div class="row mb-4 mx-0">
    <div class="col-lg-12 col-md-12 col-sm-12 mt-30 px-0">
      <div
        class="row m-15 blue border-bottom-0"
        style="margin-bottom: 0; border: 1px solid #03a9f4;"
      >
        <div class="col-md-6 my-auto mobile-padding">
          <p>
            <img
              class="img-fluid rounded-circle pp"
              :src="studentLog.profile_picture"
            >
            {{ studentLog.name }}
          </p>
          <p class="my-2">
            <i aria-hidden="true" class="fa fa-bell" />{{
              $t("Subject Activity")
            }}
          </p>
        </div>
        <div class="col-md-6 col-sm-12 co-12 m-auto mobile-padding text-right">
          <div v-if="$i18n.locale === 'en'">
            <DatePicker
              v-model="datFrom"
              format="yyyy/MM/dd"
              :placeholder="$t('date_from')"
              style="width: 200px;"
              type="date"
            />
            <DatePicker
              v-model="datTo"
              format="yyyy/MM/dd"
              :placeholder="$t('date_to')"
              style="width: 200px;"
              type="date"
            />
            <button
              class="btn-cancel px-4 py-1 ml-3 text-white"
              @click="get(page, actPage, time, data_from, data_to), filter()"
            >
              {{ $t("Filter") }}
            </button>
          </div>
          <div v-if="$i18n.locale === 'ar'">
            <DatePicker
              v-model="datTo"
              format="yyyy/MM/dd"
              :placeholder="$t('date_from')"
              style="width: 200px;"
              type="date"
            />
            <DatePicker
              v-model="datFrom"
              format="yyyy/MM/dd"
              :placeholder="$t('date_to')"
              style="width: 200px;"
              type="date"
            />
            <button
              class="btn-cancel px-4 py-1 ml-3 text-white"
              @click="
                $emit('filters', page, actPage, data_from, data_to), filter()
              "
            >
              {{ $t("Filter") }}
            </button>
          </div>
        </div>
      </div>
      <div v-if="generalData.length == 0" class="row m-5">
        <div class="col-md-12 m-5">
          <h2 class="text-center">
            {{ $t("no Data Found") }}
          </h2>
        </div>
      </div>
      <div
        class="row m-15 m-t-0 border-top-0 mb-4"
        style="border: 1px solid #03a9f4;"
      >
        <div id="style-3" class="col-md-12 p-l-14 tabel-hight scrollbar">
          <div
            v-for="(activity, index) in generalData"
            :key="index"
            :class="`row tabel-block ${index % 2 == 1 ? 'second-row' : ''}`"
          >
            <div class="col-md-10 col-sm-9 col-12">
              <p class="first-col">
                {{ activity.text }}
              </p>
            </div>
            <div class="col-md-2 col-sm-3 col-12 mobile-margin text-center p-0">
              <p class="second-col">
                <i class="far fa-clock" /> {{ activity.date }}
              </p>
            </div>
          </div>
          <div id="tri" ref="trig" class="col-md-12 trig" />
        </div>
        <Loader v-if="loader" />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/loader/index";

export default {
  name: "ActivityLog",
  components: { Loader },
  props: ["total", "get"],
  data() {
    return {
      generalData: [],
      page: 1,
      actPage: 1,
      time: 1,
      maxPerPage: 10,
      datFrom: "",
      datTo: "",
      loader: false,
    };
  },
  computed: {
    activities: function () {
      return this.learningPerformance && this.learningPerformance.activityLog
        ? this.learningPerformance.activityLog.data
        : [];
    },
    pageCount() {
      return Math.ceil(this.total / this.maxPerPage);
    },
    studentLog: function () {
      return this.learningPerformance && this.learningPerformance.studentUser
        ? this.learningPerformance.studentUser.data
        : [];
    },
    data_to() {
      return this.datTo ? this.datTo.toISOString().split("T")[0] : "";
    },
    data_from() {
      return this.datFrom ? this.datFrom.toISOString().split("T")[0] : "";
    },
    learningPerformance() {
      return this.$store.getters["activity-logs/SubjectLogs"];
    },
  },
  watch: {
    activities(nwev) {
      this.loader = true;
      this.generalData.push(...nwev);
      setTimeout(() => {
        this.loader = false;
      }, 700);
    },
  },
  mounted() {
    this.scrollTigger();
  },
  methods: {
    scrollTigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && this.actPage < this.pageCount) {
            this.actPage += 1;
            this.get(
              this.page,
              this.actPage,
              this.time,
              this.data_from,
              this.data_to
            );
          }
        });
      });
      observer.observe(this.$refs.trig);
    },
    filter() {
      this.generalData = [];
    },
  },
};
</script>
<style scoped>
.pp {
  width: 3rem;
}

.trig {
  height: 50px;
}
</style>
