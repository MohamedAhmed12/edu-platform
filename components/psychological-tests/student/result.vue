<template>
  <section v-if="data" class="subjects">
    <div class="row mb-40">
      <div class="col-md-12 p-0">
        <ul
          :class="`${
            this.$i18n.locale == 'ar' ? 'breadcrumb-ar' : 'breadcrumb'
          }`"
        >
          <!--          <li>{{ data.test.data.name }}</li>-->
          <!--          <li>{{ $t("exam_page") }}</li>-->
          <li>{{ $t("result_page") }}</li>
          <!--          <li>{{$t('result')}}</li>-->
        </ul>
      </div>
      <div class="back-color mb-40">
        <div class="row mb-40">
          <div class="col-md-8">
            <h3>
              {{ $t("result") }}
            </h3>
            <p class="mb-20" v-html="data.recomendation.data.result" />
            <h3>{{ $t("percentage") }} : ({{ data.percentage }}%)</h3>
          </div>

          <div class="col-md-4 mobile-top">
            <img
              alt="Card image"
              class="img-fluid"
              src="~/assets/img/cup.png"
            />
          </div>
        </div>
      </div>
      <div class="mb-30">
        <div class="row mb-20 p-20">
          <div class="col-md-12">
            <h3 class="result">
              {{ $t("Recomendation") }}
            </h3>
            <p class="mb-20" v-html="data.recomendation.data.recomendation" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
export default {
  name: "Result",
  props: ["action"],
  data() {
    return {
      formatter: new Formatter(),
      data: null,
    };
  },
  mounted() {
    this.finishExam();
  },
  methods: {
    finishExam() {
      this.$axios({
        url: this.action.attributes.endpoint_url,
        method: this.action.attributes.method,
      })
        .then(({ data }) => {
          this.data = this.formatter.deserialize(data);
        })
        .catch((err) => {
          console.log({ err });
        });
    },
  },
};
</script>

<style scoped></style>
