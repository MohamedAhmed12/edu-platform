<template>
  <div>
    <!-- PARENT SECTIONS -->
    <div class="row">
      <ParentSection
        v-for="section in parentSections"
        :key="section.id"
        class="col-12 col-md-6 col-xl-4"
        :section="section"
        :subject="subject"
      />
    </div>
  </div>
</template>

<script>
import ParentSection from "@/components/subjects/student/sectionsCards/ParentSection.vue";
import initMathJaxLib from "~/utilities/mathJax";

export default {
  name: "ParentSections",
  components: { ParentSection },
  props: ["subject"],

  data: function () {
    return {
      parentSections: [],
    };
  },

  mounted() {
    initMathJaxLib();
  },
  created() {
    this.setParentSections();
  },

  methods: {
    setParentSections() {
      if (
        this.subject.subjectFormatSubjects &&
        this.subject.subjectFormatSubjects.data
      ) {
        this.parentSections = this.subject.subjectFormatSubjects.data;
      }
    },
  },
};
</script>
