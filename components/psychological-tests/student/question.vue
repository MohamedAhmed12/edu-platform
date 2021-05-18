<template>
  <div class="row mb-40">
    <div class="col-md-12 p-0">
      <ul
        :class="`${this.$i18n.locale == 'ar' ? 'breadcrumb-ar' : 'breadcrumb'}`"
      >
        <li>
          <a href="#">{{ question.test.data.name }} </a>
        </li>
        <li>{{ $t("exam_page") }}</li>
      </ul>
    </div>
    <div class="col-md-12 text-center mt-50 exam">
      <h2 class="exame-title">
        {{ question.name }}
      </h2>
      <div class="row">
        <div class="col-lg-11 col-md-8">
          <div v-for="(options, i) in activeOptionsCunked" :key="i" class="row">
            <div
              v-for="(option, k) in options"
              :key="k"
              :class="`col-lg-6 ${k == 0 ? 'first' : 'second'}-q p-0`"
            >
              <label>
                <input
                  v-model="answer"
                  class="mycheckbox"
                  :name="option.id"
                  type="radio"
                  :value="option.id"
                />
                <span
                  :class="`myCheckbox${
                    activeOptions.findIndex((o) => o.id == option.id) + 1
                  } ${
                    activeOptions.findIndex((o) => o.id == option.id) + 1 > 4
                      ? 'radio-last'
                      : ''
                  }`"
                >
                  {{
                    upperCaseAlp[
                      dataOptions.findIndex((x) => x.id === option.id)
                    ]
                  }}
                </span>
                <p>{{ option.name }}</p>
              </label>
            </div>
          </div>
          <!-- <div class="mt-40">
            <button @click="submit()" v-if="answer" class="  btn-black-custome disabled" type="button">
              {{question.actions.data[0].label}}
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
Object.defineProperty(Array.prototype, "chunk_inefficient", {
  value: function (chunkSize) {
    var array = this;
    return [].concat.apply(
      [],
      array.map(function (elem, i) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
      })
    );
  },
});
export default {
  name: "Question",
  props: ["question", "hasNext"],
  data() {
    return {
      answer: null,
      dataOptions: null,
      upperCaseAlp: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  computed: {
    activeOptions() {
      this.dataOptions = this.question.test.data.activeOptions.data;
      return this.question.test.data.activeOptions.data;
    },
    activeOptionsCunked() {
      return this.activeOptions.chunk_inefficient(2);
    },
  },
  watch: {
    answer(val) {
      if (val != null) {
        this.submit();
      }
    },
    question() {
      this.answer = null;
    },
  },
  methods: {
    submit() {
      this.$emit("submit", {
        question_id: this.question.id,
        option_id: this.answer,
      });
    },
  },
};
</script>
<style scoped></style>
