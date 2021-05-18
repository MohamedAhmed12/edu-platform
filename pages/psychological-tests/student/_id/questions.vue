<template>
  <section class="subjects">
    <Question
      v-if="questions[0] && !showResult"
      :has-next="hasNext"
      :question="questions[0]"
      @next="next"
      @submit="submit"
    />
    <Result v-else-if="showResult" :action="action" />
  </section>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
import Question from "~/components/psychological-tests/student/question";
import Result from "~/components/psychological-tests/student/result";
export default {
  name: "Questions",
  components: { Result, Question },
  layout: "default",
  head: {
    link: [
      {
        rel: "stylesheet",
        href: require("~/assets/css/Psychological.css"),
      },
      {
        rel: "stylesheet",
        href: require("~/assets/css/test-custom.css"),
      },
    ],
  },
  data() {
    return {
      questions: [],
      formatter: new Formatter(),
      action: null,
      showResult: false,
      hasNext: false,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    const url = "/student/psychological-tests/start/" + id;
    const method = "POST";
    this.getQuestions(url, method);
  },
  methods: {
    getQuestions(url, method) {
      this.$axios({
        url,
        method,
      })
        .then(({ data }) => {
          this.questions = this.formatter.deserialize(data).data;
          this.hasNext = false;
          console.log(this.questions);
        })
        .catch((e) => console.log({ e }));
    },
    next() {
      if (this.questions[0].actions.data[1]) {
        this.action = this.questions[0].actions.data[1];
        this.getQuestions(this.action.endpoint_url, this.action.method);
      } else {
        this.showResult = true;
      }
    },
    submit(attributes) {
      const submit = this.questions[0].actions.data[0];
      const data = {
        data: {
          id: null,
          type: "psychological_answer",
          attributes,
        },
      };

      this.$axios({
        url: submit.endpoint_url,
        method: submit.method,
        data,
      })
        .then(({ data }) => {
          if (data.data) {
            this.action = data.data[0];
          }
          this.hasNext = true;
          if (this.questions[0].actions.data[1]) {
            this.action = this.questions[0].actions.data[1];
            this.getQuestions(this.action.endpoint_url, this.action.method);
          } else {
            this.showResult = true;
          }
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  },
};
</script>

<style scoped></style>
