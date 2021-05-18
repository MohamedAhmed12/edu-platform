<template>
  <div v-if="this.$auth.user.attributes['user-type'] == 'parent'">
  <div class="page-content">
      <div class="subjects package">
        <div class="row m-15">
          <div class="col-md-8 col-12 my-auto">
            <h2>{{ $t("expenses") }}</h2>
          </div>
          <div class="col-md-4 col-12 text-right payment-m">
            <nuxt-link
              class="btn btn-history"
              :to="localePath('/payment/transfer')"
            >
              <i class="fa fa-arrow-left mr-2"></i>{{ $t("back") }}
            </nuxt-link>
          </div>
          <div class="col-md-12 white-bac">
            <div class="row">
              <div
                v-for="(List, i) in historyList"
                :key="i"
                class="col-md-12 bo-shadow"
              >
              <div class="row align-items-center">
                  <div
                    class="col-lg-1 col-md-2 col-sm-3 col-12 text-center width-15"
                  >
                    <img
                      class="img-fluid rounded-circle thePic"
                      :src="List.user.data.profile_picture"
                    />
                  </div>
                  <div
                    class="col-lg-3 col-md-5 col-sm-4 col-12 my-auto p-0 m-t-4"
                  >
                    <p class="name-user">
                      {{ List.user.data.name }}
                    </p>
                    <!--
                    <p class="name-user">
                      {{ List.description }}
                    </p>-->
                  </div>

                  <div class="col-lg-4 hidden width-30" />
                  <div class="col-lg-4 col-md-5 col-sm-5 col-12">
                    <p class="date"><i class="fas fa-circle"></i> Arabic</p>
                    <p class="date"><i class="fas fa-circle"></i> 21/09/2020, 12:03PM</p>

                    <!--<a href="#" class="btn btn-primary">
                    {{ $t("Show details") }}</a>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/payment-3.css";
export default {
  data() {
    return {
      historyList: [],
    };
  },
  async created() {
    this.getHistory();
  },
  methods: {
    async getHistory() {
      try {
        const res = await this.$axios.get(`parent/payments/expenses`);
        this.historyList = this.$formatter().deserialize(res.data).data;
        console.log(this.historyList);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
