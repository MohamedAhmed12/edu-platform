<template>
  <div class="row m-15 mx-0 my-4">
    <div class="col-lg-12 px-0 col-md-12 col-sm-12 p-xl">
      <div class="table-responsive">
        <!--        table in large screen-->
        <div class="d-none d-lg-block">
          <table class="table large-table">
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
              <tr
                v-for="exam in exams"
                :key="exam.id"
                :class="{ 'second-row': exam.id % 2 !== 0 }"
              >
                <td class="first-td text-center first-td">
                  {{ exam.exam_name ? exam.exam_name : "no name" }}
                </td>
                <td class="second-td text-center">
                  {{ $t(exam.difficulty_level) }}
                </td>
                <td class="first-td text-center first-td">
                  {{ new Date(exam.time).toLocaleDateString() }}
                  <br />
                  {{ new Date(exam.time).toLocaleTimeString() }}
                </td>
                <td class="second-td text-center">
                  {{ exam.estimated_time }}
                </td>
                <td class="first-td text-center first-td">
                  {{ exam.student_time }}
                </td>
                <td class="second-td text-center">
                  {{ exam.result }}
                </td>
                <td class="first-td text-center first-td">
                  <nuxt-link
                    class="btn btn-primary"
                    :to="
                      localePath({
                        path: `/subject-activities/${currentUserType}/exam-results/${exam.id}`,
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
      <!--      table in small screen-->
      <div class="d-lg-none d-block">
        <table
          v-for="exam in exams"
          :key="exam.id"
          class="table mb-0 table-bordered"
        >
          <thead>
            <tr>
              <th class="text-center first-th py-4" colspan="2">
                Exam Name : {{ exam.exam_name ? exam.exam_name : "no name" }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="text-center">
                Dificiltey Level
              </th>
              <td class="text-center">
                {{ exam.difficulty_level }}
              </td>
            </tr>
            <tr class="small-strip">
              <th class="text-center">
                Date/Time
              </th>
              <td class="text-center">
                {{ new Date(exam.time).toLocaleDateString() }}
                &nbsp; &nbsp;
                {{ new Date(exam.time).toLocaleTimeString() }}
              </td>
            </tr>
            <tr>
              <th class="text-center">
                Est-Time
              </th>
              <td class="text-center">
                {{ exam.estimated_time }}
              </td>
            </tr>
            <tr class="small-strip">
              <th class="text-center">
                Student Time
              </th>
              <td class="text-center">
                {{ exam.student_time }}
              </td>
            </tr>
            <tr>
              <th class="text-center">
                Result
              </th>
              <td class="text-center">
                {{ exam.result }}
              </td>
            </tr>
            <tr class="small-strip">
              <th class="text-center">
                Recomendation
              </th>
              <td class="text-center">
                <nuxt-link
                  class="btn btn-primary"
                  :to="
                    localePath({
                      path: `/subject-activities/${currentUserType}/exam-results/${exam.id}`,
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
    <div class="mx-auto mt-4">
      <Page class="m-auto mt-5" :total="totalInt" @on-change="paginat" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ExamsTable",
  props: [
    "currentUserType", // parent, student-teacher
    "learningPerformance",
    "recall",
  ],
  computed: {
    exams: function () {
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
  },
  methods: {
    paginat(i) {
      this.$router.push({ query: { page: i } });
      this.recall(i);
    },
  },
};
</script>
