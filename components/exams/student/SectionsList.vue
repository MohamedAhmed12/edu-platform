<template>
  <div>
    <!-- sections -->
    <div
      v-if="sections.length != 0"
      class="light-blue-bg rounded-pill position-relative"
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
              v-model="selected"
              checked
              class="d-none"
              type="checkbox"
              :value="section"
            />
            <i class="fas fa-check" />
            <span class="font-bold" @click="loadSubSections(section)">{{
              section.title
            }}</span>
          </label>
        </div>
      </div>
      <Spin
        v-if="isLoading('sections')"
        class="bg-transparent"
        fix
        size="large"
      />
      <p v-if="!selectedSubject && !isLoading('sections')">
        select subject
      </p>
      <p v-if="emptySections">
        No Sections
      </p>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import section from "../../../apis/student/section";
const {
  mapState,
  mapActions,
  mapGetters,
  mapMutations,
} = createNamespacedHelpers("exams/student/generate");
export default {
  data() {
    return {
      allSelected: false,
    };
  },

  mounted() {
    this.SET_SECTIONS([]);
    this.SET_SELECTED_SECTIONS([]);
    this.SET_LOADING({ attr: "sections", bool: false });
  },

  updated() {},

  computed: {
    ...mapState(["sections", "selectedSubject", "selectedSections"]),
    ...mapGetters(["isLoading", "emptySections"]),
    selected: {
      get() {
        return this.selectedSections;
      },
      set(val) {
        if (this.allSelected) {
          this.allSelected = false;
        }

        this.SET_SELECTED_SECTIONS(val);
      },
    },
    checkAll: {
      get: function () {
        return this.sections
          ? this.selected.length == this.sections.length
          : false;
      },
      set: function (value) {
        var checked = [];
        if (value) {
          this.sections.forEach(function (lang) {
            checked.push(lang.id);
          });
        }
        this.selected = checked;
      },
    },
  },
  watch: {
    selectedSubject(id) {
      this.allSelected = false;
      this.loadSections(id);
    },
    selectedSections(val) {
      if (this.checkAll) {
        return;
      }

      // //  section that has subsections
      // let sectionHasSubSections = val.find(section => section.has_sections);

      // if (sectionHasSubSections) {
      //   return this.loadSubSections(sectionHasSubSections.id);
      // }
    },
  },
  methods: {
    ...mapActions(["loadSections", "loadSubSections"]),
    ...mapMutations(["SET_SELECTED_SECTIONS", "SET_SECTIONS", "SET_LOADING"]),
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
