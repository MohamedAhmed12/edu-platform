<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container bg-light rounded-pill">
          <div class="modal-body">
            <div class="mb-2 mt-2">
              <h5 class="mb-1 font-bold">
                {{ $t("correct_answer_percentage") }}:
              </h5>
              <Progress
                :percent="correct_answer_percentage"
                stroke-color="green"
              />
            </div>
            <div class="mb-2 mt-2">
              <h5 class="mb-1 font-bold">
                {{ $t("wrong_answer_percentage") }}:
              </h5>
              <Progress :percent="wrong_answer_percentage" stroke-color="red" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        href: require("~/assets/css/modal.css"),
      },
    ],
  },

  props: {
    wrong_answer_percentage: {
      type: Number,
      defult: 0,
    },
    correct_answer_percentage: {
      type: Number,
      defult: 0,
    },
  },

  data: () => ({}),

  methods: {},
};
</script>
