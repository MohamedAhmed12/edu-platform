<template>
  <div class="row">
    <div class="light-blue-bg rounded-pill col-md-11 mx-auto col-12 mt-5">
      <div class="subject-slider">
        <ul class="list-unstyled d-inline">
          <li
            v-for="(subject, index) in subjects"
            :key="index"
            class="rounded-8 blue-bg d-inline-block p-4px mr-3 mb-2"
            :style="`background-color: ${subject.color}`"
          >
            <div
              class="row rounded-pill"
              @click="loadSections(subject), (loader = false)"
            >
              <div
                class="col-12 p-1 d-flex flex-column justify-content-around align-items-center"
              >
                <div class="img-container">
                  <img class="w-100 h-100" :src="subject.subject_image" />
                </div>
                <div class="subject-name-content m-0 max-width-85">
                  <Poptip :content="subject.name" trigger="hover">
                    <h4 class="h6 mb-0 text-white">
                      {{ subject.name | short }}
                    </h4>
                  </Poptip>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="clearfix col-12 mb-4 pb-1" />
    <!-- Sections  -->
    <div
      v-if="sections.length"
      class="light-blue-bg rounded-pill col-md-11 mx-auto col-12"
    >
      <div
        class="row mx-0 px-1 mb-3 overflow-x-container list-container-height h-100"
      >
        <div
          v-if="sections.length > 0"
          class="col-xl-6 col-lg-10 col-md-6 col-sm-10 mx-auto px-2 mb-3"
        >
          <label class="checkbox checkbox-padding h-100">
            <input
              v-model="allSelected"
              class="d-none"
              type="checkbox"
              @click="selectAll"
            />
            <i class="fas fa-check" />
            <span class="font-bold">{{ $t("select all") }}</span>
          </label>
        </div>
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="col-xl-6 col-lg-10 col-md-6 col-sm-10 mx-auto px-1 mb-3"
        >
          <label class="checkbox checkbox-padding h-100">
            <input
              v-model="selectedSections"
              class="d-none"
              type="checkbox"
              :value="section"
            >
            <i class="fas fa-check" />
            <span
              class="font-bold"
              @click="loadSubSections(section), (loader = false)"
            >{{ section.title }}</span>
          </label>
        </div>
      </div>
    </div>
    <!-- subSections -->
    <div
      v-if="subSections.length"
      class="light-blue-bg rounded-pill col-lg-10 col-md-11 mx-auto col-12 mt-4"
    >
      <div class="checkbox-container pl-2 pr-2 overflow-x-container h-100">
        <label
          v-for="(section, index) in subSections"
          :key="index"
          class="checkbox"
        >
          <input
            v-model="selectedSections"
            class="d-none"
            type="checkbox"
            :value="section"
          />
          <i class="fas fa-check" />
          <img class="img-fluid mr-2" src="~/assets/img/subject-file.svg" >
          <span @click="loadSubSections(section)">{{ section.title }}</span>
        </label>
      </div>
    </div>

    <div class="actions col-lg-10 col-md-11 mx-auto col-12 px-1 my-3">
      <div class="row">
        <div class="col-md-3 mb-2 mb-md-0 col-12">
          <a
            v-if="!loader"
            class="btn btn-block rounded-8 text-center btn-main px-1 py-3"
            @click="generate()"
          >
            {{ $t("start") }}</a
          >
          <div
            v-if="loader"
            class="btn rounded-8 text-center btn-main-hover px-5 py-3"
          >
            <i class="fa fa-spinner fa-spin" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Generate",
  filters: {
    short: function (val) {
      return `${val.slice(0, 7)} ..`;
    },
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sections: [],
      subSections: [],
      subject: {},
      selectedSections: [],
      difficultyLevels: [],
      isLoading: true,
      loader: false,
      allSelected: false,
    };
  },
  computed: {
    selected: {
      get() {
        return this.selectedSections;
      },
      set(val) {
        if (this.allSelected) {
          this.allSelected = false;
        }

        this.selectedSections = val;
      },
    },
    subjects() {
      return this.data;
    },
    disable() {
      return this.selectedSections.length == 0;
    },
  },
  watch: {
    selectedSections(val) {},
  },
  mounted() {
    this.loadSections(this.subjects[0]);
    this.loadDifficultyLevels();
  },
  methods: {
    loadSections(subject) {
      this.subject = subject;
      this.sections = [];
      this.selectedSections = [];
      this.$axios
        .get(`student/subjects/${this.subject.id}/sections`)
        .then((response) => {
          this.subject = this.$formatter().deserialize(response.data);
          if (this.subject.sections) {
            this.sections = this.subject.sections.data;
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.$toast.error("Something went wrong, try again later");
          console.log(err);
        });
    },
    loadSubSections(section) {
      if (!section.has_sections) {
        return;
      }
      this.sections = [];
      this.selectedSections = [];
      this.$axios
        .get(`student/subjects/section/${section.id}/sections`)
        .then((response) => {
          let section = this.$formatter().deserialize(response.data);
          if (section.sections) {
            this.sections = section.sections.data;
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.$toast.error("Something went wrong, try again later");
          console.log(err);
        });
    },
    loadDifficultyLevels() {
      this.$axios.get("look-up?include=difficultyLevel").then((response) => {
        let data = this.$formatter().deserialize(response.data);
        this.difficultyLevels = data.included;
        this.selectedDifficultyLevel = this.difficultyLevels.length
          ? this.difficultyLevels[0].id
          : 0;
        this.isLoading = false;
      });
    },
    generate() {
      this.loader = true;
      if (this.disable) {
        this.loader = true;
        let message = this.$t("it's required to Select section/s");
        this.$toast.error(message);
        setTimeout(() => {
          this.loader = false;
        }, 1000);
        return;
      }
      let selectedSections = this.selectedSections.map((section) => section.id);
      let body = {
        type: "exam",
        id: "null",
        attributes: {
          subject_id: parseInt(this.subject.id),
          subject_format_subject_ids: selectedSections,
        },
      };
      this.$axios
        .post("student/practices/generate-practice", { data: body })
        .then((response) => {
          this.loader = true;
          let data = this.$formatter().deserialize(response.data);
          if (data.data && !data.data.length && data.meta.message) {
            setTimeout(() => {
              this.loader = false;
            }, 1000);
            this.$toast.error(data.meta.message);
            return;
          }
          let path = `/student/practice/${data.id}`;
          this.$router.push(this.localePath({ path }));
          this.isLoading = false;
        })
        .catch((err) => {
          this.loader = true;
          console.log(err.response);
          if (
            err.response &&
            err.response.data.errors.length &&
            err.response.data.errors[0].detail
          ) {
            setTimeout(() => {
              this.loader = false;
            }, 1000);
            this.$toast.error(err.response.data.errors[0].detail);
          }
        });
    },
    selectAll() {
      if (this.allSelected == false) {
        this.selected = this.sections;
      } else {
        this.selected = [];
      }
    },
  },
};
</script>
