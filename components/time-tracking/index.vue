<template>
  <div>
    <div class="row">
      <div class="col-md-12 text-center mt-5">
        <h2 class="">
          {{ $t("view study time") }}
        </h2>

        <section v-show="time.length" class="timeline">
          <div
            v-for="(i, index) in generalData"
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-img" />
            <div class="timeline-content">
              <h2 class="mt-4">
                {{ i.title }}
              </h2>
              <div class="date">{{ $t("start_time") }} {{ i.start_time }}</div>
              <p>{{ i.time }}</p>
            </div>
          </div>
        </section>

        <div id="tri" ref="tri" class="col-md-12 trig" />
        <div v-show="load" class="col-md-12 text-center m-auto">
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
        <div v-if="time.length == 0" class="timeline-item">
          <h2 class="text-center">
            {{ $t("no Data Found") }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["time", "get", "timePaginate"],
  head: {
    link: [
      {
        rel: "stylesheet",
        href: require("~/assets/css/instructor.css"),
      },
    ],
  },
  data() {
    return {
      page: 1,
      actPage: 1,
      timer: 1,
      data_from: "",
      data_to: "",
      maxPerPage: 10,
      generalData: [],
      load: false,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.timePaginate.total / this.maxPerPage);
    },
  },
  watch: {
    time(nwev) {
      this.load = true;
      this.generalData.push(...nwev);
      setTimeout(() => {
        this.load = false;
      }, 800);
    },
  },
  mounted() {
    this.scrollTigger();
  },
  methods: {
    scrollTigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && this.timer < this.pageCount) {
            this.timer += 1;
            this.get(
              this.page,
              this.actPage,
              this.timer,
              this.data_from,
              this.data_to
            );
          }
        });
      });
      observer.observe(this.$refs.tri);
    },
  },
};
</script>
