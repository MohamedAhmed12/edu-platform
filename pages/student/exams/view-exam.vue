<template>
  <div>
    <main
      class="main-content inner-content-old row container-fluid m-0 pl-0 pr-1"
    >
      <div class="page-content">
        <div class="subjects p-0">
          <div class="row m-15">
            <div class="col-md-12 mt-30">
              <h3 class="title-font">
                {{ $t("View exams") }}
              </h3>
            </div>
            <div
              v-for="(list, i) in listExams"
              :key="i"
              class="col-lg-6 col-md-8 col-sm-10 mx-auto"
            >
              <div class="row package-card mx-0 p-3 mb-3">
                <div class="col-2 px-0">
                  <i aria-hidden="true" class="fa fa-eye" />
                </div>
                <div class="col-6 px-2">
                  <p class="package-name d-inline-block">
                    {{ list.title }}
                  </p>
                  <div class="row">
                    <div class="col-lg-4 col-md-5 col-7 mt-6">
                      <p>
                        <i class="fas fa-file-alt" />
                        {{ $t(list.difficulty_level) }}
                      </p>
                    </div>
                    <div class="col-lg-4 col-5 p-0 mt-6">
                      <p>
                        <i class="fas fa-trophy" />
                        {{ list.result }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-4 px-0">
                  <a
                    class="btn d-block ml-auto btn-Re-evaluate mb-3 text-white mb-2"
                    type="button"
                    @click="retake_exam(list)"
                  >
                    {{ $t("Re-evaluate") }}
                  </a>
                  <nuxt-link
                    class="btn d-block ml-auto btn-Re-evaluate text-white"
                    :to="
                      localePath({ path: `/student/exams/${list.id}/feedback` })
                    "
                    type="button"
                  >
                    {{ $t("View details") }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="col-md-12 text-center">
      <div class="pagination pag-course py-3" />
      <Page
        v-if="paginater.total_pages > 10"
        class="m-5"
        :current="parseInt(page)"
        :total="parseInt(paginater.total)"
        @on-change="paginat"
      />
    </div>
  </div>
</template>

<script>
import "~/assets/css/View-exams.css";
export default {
  filters: {
    substring: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.substring(value.lastIndexOf("/") - 13);
    },
  },
  data() {
    return {
      studentActivites: [],
      listExams: [],
      paginater: {},
      page: this.$route.query["page"] ? this.$route.query["page"] : 1,
      actions: {},
      linker: "http://ouredu.testenv.tech/api/v1/en",
      id: "",
    };
  },
  computed: {
    lang() {
      return this.$store.state.i18n.locale;
    },
  },
  created() {
    this.listExam();
    this.studentAct();
  },

  mounted() {},
  methods: {
    studentAct() {
      this.$axios
        .get("profile?include=student.activities")
        .then((res) => {
          this.studentActivites = this.$formatter().deserialize(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listExam(page = 1) {
      this.$axios
        .get(`student/exams/list-exams?page=${page}`)
        .then((res) => {
          let data = this.$formatter().deserialize(res.data);
          this.listExams = data.data;
          this.actions = data.data[0].actions;
          this.paginater = data.meta.pagination;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    paginat(i) {
      this.$router.push({ query: { page: i } });
      this.listExam(i);
    },
    async retake_exam(list) {
      let url;
      let method;
      list.actions.data.map((item) => {
        if (item.key === "retake_exam") {
          url = item.endpoint_url;
          method = item.method;
        }
      });
      await this.$axios({ url: url, method: method }).then((response) => {
        this.id = response.data.data.id;
      });
      await this.$axios
        .post(`student/exams/start-exam/${this.id}`)
        .then((response) => {
          let data = this.$formatter().deserialize(response.data);
          if (data.data && !data.data.length && data.meta.message) {
            this.$toast.error(data.meta.message);
            return;
          }
          let path = `/student/exams/${this.id}`;
          this.$router.push(this.localePath({ path }));
        })
        .catch((err) => {
          console.log(err);
          if (
            err.response &&
            err.response.data.errors.length &&
            err.response.data.errors[0].detail
          ) {
            this.$toast.error(err.response.data.errors[0].detail);
          }
        });
    },
  },
};
</script>
