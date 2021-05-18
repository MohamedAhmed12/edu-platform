<template>
  <div class="row m-15">
    <div class="col-lg-12 col-md-12 col-sm-12 p-xl">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th class="first-th">
                {{ $t("Exam Name") }}
              </th>
              <th class="second-th">
                {{ $t("Dificiltey Level") }}
              </th>
              <th class="first-th">
                {{ $t("Date/Time") }}
              </th>
              <th class="second-th">
                {{ $t("Est-Time") }}
              </th>
              <th class="first-th">
                {{ $t("Student Time") }}
              </th>
              <th class="second-th">
                {{ $t("Result") }}
              </th>
              <th class="first-th">
                {{ $t("Recomendation") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exam in examsLog" :key="exam.id">
              <td class="first-td">
                {{ exam.exam_name ? exam.exam_name : "no name" }}
              </td>
              <td class="second-td">
                {{ $t(exam.difficulty_level) }}
              </td>
              <td class="first-td">
                {{ new Date(exam.time).toLocaleDateString() }}
                <br>
                {{ new Date(exam.time).toLocaleTimeString() }}
              </td>
              <td class="second-td">
                {{ exam.estimated_time }}
              </td>
              <td class="first-td">
                {{ exam.student_time }}
              </td>
              <td class="second-td">
                {{ exam.result }}
              </td>
              <td class="first-td">
                <nuxt-link
                  class="btn btn-primary"
                  :to="
                    localePath({
                      path: `/subject-activities/parent/exam-results/${exam.id}`,
                    })
                  "
                >
                  {{ $t("Recomendation") }}
                </nuxt-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-md-12 text-center">
      <div v-if="totalInt > 10" class="m-auto">
        <template>
          <Page
            class="my-5"
            :class="{ lrt: this.$i18n.locale === 'ar' }"
            :page-size="pageSize"
            :total="totalInt"
            @on-change="paginat"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["learningPerformance", "recall"],
  data() {
    return {
      setLimte: 10,
    };
  },
  computed: {
    examsLog: function () {
      return this.learningPerformance &&
        this.learningPerformance.examsPerformance
        ? this.learningPerformance.examsPerformance.data
        : [];
    },
    paginate: function () {
      return this.learningPerformance &&
        this.learningPerformance.exams_pagination
        ? this.learningPerformance.exams_pagination
        : [];
    },
    first() {
      return this.paginate.last_page === 1 || this.paginate.current_page === 1;
    },
    end() {
      return (
        this.paginate.last_page === 1 ||
        this.paginate.current_page === this.paginate.last_page
      );
    },
    totalInt() {
      return parseInt(this.paginate.total);
    },
    pageSize() {
      return parseInt(this.paginate.per_page);
    },
  },
  methods: {
    paginat(i) {
      this.$router.push({ query: { page: i } });
      this.recall(i);
    },
  },
};
</script>

<style scoped lang="css"></style>
