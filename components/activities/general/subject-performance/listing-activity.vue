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
            @click="
              get(actPage, page, data_from, data_to), (generalData = activities)
            "
          >
            {{ $t("Filter") }}
          </button>
        </div>
      </div>
      <div
        class="row m-15 m-t-0 border-top-0 mb-4"
        style="border: 1px solid #03a9f4;"
      >
        <div id="style-3" class="col-md-12 p-l-14 tabel-hight scrollbar">
          <div
            v-for="(activity, index) in generalData"
            v-show="loader"
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
        <div v-show="!loader" class="col-md-12 text-center m-auto">
          <svg
            height="100px"
            preserveAspectRatio="xMidYMid"
            style="
              margin: auto;
              background: none;
              display: block;
              shape-rendering: auto;
            "
            viewBox="0 0 100 100"
            width="100px"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <path
                id="path"
                d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15"
                fill="none"
              />
              <path
                id="patha"
                d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0"
                fill="none"
              />
            </defs>
            <g transform="rotate(0 50 50)">
              <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
            </g>
            <g transform="rotate(60 50 50)">
              <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
            </g>
            <g transform="rotate(120 50 50)">
              <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
            </g>
            <g transform="rotate(0 50 50)">
              <circle cx="50" cy="15" fill="#e15b64" r="9">
                <animateMotion begin="0s" dur="1s" repeatCount="indefinite">
                  <mpath xlink:href="#patha" />
                </animateMotion>
              </circle>
            </g>
            <g transform="rotate(60 50 50)">
              <circle cx="50" cy="15" fill="#f8b26a" r="9">
                <animateMotion
                  begin="-0.16666666666666666s"
                  dur="1s"
                  repeatCount="indefinite"
                >
                  <mpath xlink:href="#patha" />
                </animateMotion>
              </circle>
            </g>
            <g transform="rotate(120 50 50)">
              <circle cx="50" cy="15" fill="#abbd81" r="9">
                <animateMotion
                  begin="-0.3333333333333333s"
                  dur="1s"
                  repeatCount="indefinite"
                >
                  <mpath xlink:href="#patha" />
                </animateMotion>
              </circle>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityLog",
  props: ["total", "loader", "get"],
  data() {
    return {
      generalData: [],
      page: 1,
      actPage: 1,
      maxPerPage: 10,
      datFrom: "",
      datTo: "",
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
      return this.datTo.toISOString().split("T")[0];
    },
    data_from() {
      return this.datFrom.toISOString().split("T")[0];
    },
    learningPerformance() {
      return this.$store.getters["activity-logs/activitySubjectLogs"];
    },
  },
  watch: {
    activities(nwev) {
      this.generalData.push(...nwev);
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
            this.get(this.page, this.actPage);
            // this.generalData.push(...this.activities);
          }
        });
      });
      observer.observe(this.$refs.trig);
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
