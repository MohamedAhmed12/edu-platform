<template>
  <div v-if="this.$auth.user.attributes['user-type'] == 'parent'">
    <div class="page-content">
      <div class="subjects package">
        <div class="row m-15">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <h2>{{ $t("history") }}</h2>
            <nuxt-link
              class="btn btn-history"
              :to="localePath('/payment/transfer')"
            >
            <i class="fa fa-arrow-left mr-2"></i>{{ $t("back") }}
            </nuxt-link>
          </div>
          <div class="col-12 white-bac">
            <div class="row mx-0">
              <div
                v-for="(List, i) in historyList"
                :key="i"
                class="col-12 my-2 history-div"
              >
                <div class="row align-items-center">
                  <div
                    class="col-lg-1 col-md-2 col-sm-3 col-12 text-center width-15"
                  >
                    <img
                      class="circle-img"
                      :src="List.receiver.data.profile_picture"
                    />
                  </div>
                  <div class="col-lg-3 col-md-5 col-sm-4 col-12 my-auto p-0 m-t-4">
                    <p class="name-user">
                      {{ List.receiver.data.name }}
                    </p>
                  </div>
                  <div class="col-lg-3 col-md-5 col-sm-4 col-12 my-auto p-0 m-t-4 text-center">
                    <p class="price">
                      {{ List.amount }}
                    </p>
                  </div>
                  <div class="col-lg-4 col-md-5 col-sm-5 col-12 text-right mobile-magin">
                    <p class="date"><i class="fas fa-circle"></i> 21/09/2020, 12:03PM</p>
                    <!--                    <a href="#" class="btn btn-primary">-->
                    <!--                      {{ $t("Show details") }}</a-->
                    <!--                    >-->
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
        const res = await this.$axios.get(`/parent/payments`);
        this.historyList = this.$formatter().deserialize(res.data).data;
        console.log(this.historyList);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
