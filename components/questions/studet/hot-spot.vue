<template>
  <div>
    <p class="title-font" />
    <div class="position-relative btn">
      <img
        ref="img"
        class="img-fluid col-12 true-false-img"
        :src="questionData.media.url"
      />
      <canvas
        v-if="questionData.accepted_answers"
        id="answerCorrection"
        class="hotspot__canvas col-12"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "Hotspot",
  props: {
    question: {
      type: Object,
      default: () => ({}),
    },
    questionNumber: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      answer: null,
      imgHeight: null,
      imgWidth: null,
      xCoordinate: null,
      yCoordinate: null,
      correctAnswer: null,
    };
  },
  computed: {
    questionData() {
      return this.$store.getters["exams/student/questionData"];
    },
    questionAnswer: {
      get() {
        return this.questionNumber
          ? this.$store.getters["exams/student/answers"][this.questionNumber]
          : {};
      },
      set(answer) {
        let answers = this.$store.getters["exams/student/answers"];
        answers[this.questionNumber] = answer;
        this.$store.commit("exams/student/SET_ANSWERS", answers);
      },
    },
  },
  watch: {
    question(val) {
      this.answer = null;
      this.imgHeight = null;
      this.imgWidth = null;
      this.xCoordinate = null;
      this.yCoordinate = null;
      if (
        this.questionAnswer &&
        this.questionAnswer.question_id == this.question.id
      ) {
        this.answer = this.questionAnswer.answer;
      }
    },
  },
  mounted() {
    let questionAnswer = this.$store.getters["exams/student/answers"][
      this.questionNumber
    ];
    if (questionAnswer && questionAnswer.question_id == this.question.id) {
      this.answer = questionAnswer.answer;
    }
    this.drawAnswerCorrectionCanvas();
  },
  methods: {
    adjustClickCoordinates() {
      $(document).ready(() => {
        $(this.$refs.img).click((e) => {
          var offset = $(this.$refs.img).offset();
          this.xCoordinate = e.pageX - offset.left;
          this.yCoordinate = e.pageY - offset.top;
          this.imgWidth = $(this.$refs.img).width();
          this.imgHeight = $(this.$refs.img).height();

          this.setAnswer();
        });
      });
    },
    setAnswer() {
      this.answer = [
        {
          type: "answer",
          id: "new",
          attributes: {
            x_coordinate: this.xCoordinate,
            y_coordinate: this.yCoordinate,
            image_width: this.imgWidth,
            image_height: this.imgHeight,
          },
        },
      ];
      this.questionAnswer = {
        answer: this.answer,
        question_id: this.question.id,
      };

      this.$emit("setAnswer", this.answer);
    },
    drawAnswerCorrectionCanvas() {
      if (!this.questionData.accepted_answers) return;

      let dimensions = this.questionData.accepted_answers.answer;
      let canvas = document.getElementById("answerCorrection");
      var ctx = canvas.getContext("2d");
      dimensions = JSON.parse(dimensions);

      // ctx.fillStyle = "#94d6a387";
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.moveTo(0, 0);

      dimensions.forEach((dimension) => {
        console.log(ctx.lineTo(dimension.x, dimension.y));
        return ctx.lineTo(dimension.x, dimension.y);
      });

      ctx.closePath();
      ctx.fill();
      this.adjustClickCoordinates();
    },
  },
};
</script>
