<template>
  <div v-if="this.$auth.user.attributes['user-type'] == 'parent'">
    <div class="page-content">
      <div class="subjects package">
        <div class="row m-3">
          <div class="col-12 mb-3 ">
            <h4 class="mb-0">
              {{ $t("payment") }}
            </h4>
          </div>
          <div class="col-lg-8 col-md-10 mb-3 col-12">
            <div class="pay">
              <a
                v-for="children in childrenList"
                :key="children.id"
                class="payment"
                :class="{ 'img-active': (isActive = children.id == display) }"
                @click.prevent="display = children.id"
              >
                <img class="img-fluid w-15 ml-3" :src="children.profile_picture">
              </a>
            </div>
          </div>
          <div class="col-md-4 text-right">
            <nuxt-link
              class="btn btn-history"
              :to="localePath('payment-history')"
            >
              {{ $t("history") }}
            </nuxt-link>

          <!--  <nuxt-link
              class="btn btn-success"
              :to="localePath('payment-expenses')"
            >
              {{ $t('expenses') }}
            </nuxt-link> -->

          </div>
          <div
            v-for="children in childrenList"
            v-show="display == children.id"
            :key="children.id"
            class="col-md-12 white-bac grey-shadow mb-3"
          >
            <div class="row text-center">
              <div class="col-12 text-center">
                <h4>{{ children.name }}</h4>
              </div>
              <div class="col-12 text-center">
                <img class="img-fluid theImgTransfer" src="@/assets/img/payment.png">
              </div>
              <div class="col-lg-4 col-md-12 mx-auto text-center">
                <form class="row m-t-20">
                  <div class="col-md-12">
                    <h3 class="text-center mb-3">{{ $t('send money') }}</h3>
                    <input
                      v-model="amount"
                      name="firstname"
                      :placeholder="$t('amount')"
                      type="number"
                    >
                  </div>
                  <div class="col-12">
                    <button
                      class="btn btn-ptimary"
                      @click.prevent="addMoney(children.actions.data[4].endpoint_url.match( /\d*$/)[0])"
                    >
                      {{ $t("send") }}
                    </button>
                  </div>
                </form>
                <div class="text-right ">
                  <!--                      <nuxt-link :to="localePath('payment')" class="link">-->
                  <!--                        {{ $t("Back to add credit card Add") }}-->
                  <!--                      </nuxt-link>-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-12 white-bac p-30">
            <div class="row">
              <div class="col-md-12 bo-shadow">
                <div class="row">
                  <div class="col-lg-12 mb-50">
                    <h5>Saved cards</h5>
                    <p class="renew">
                      You can add your credit card for the feature purchase and
                      automatically renew
                    </p>
                  </div>
                  <div class="col-lg-3 col-md-6 col-sm-6 m-b-20">
                    <img class="img-fluid " src="@/assets/img/mastercard.png" />
                  </div>
                  <div class="col-lg-3 col-md-6  col-sm-6  ">
                    <img class="img-fluid " src="@/assets/img/visa.png" />
                  </div>
                </div>
              </div>
            </div>
          </div> -->
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
        childrenList: [],
        isActive: "",
        amount: "",
        display: ""
      };
    },
    async created() {
      this.getHistory();
    },
    async mounted() {
      this.getId();
    },
    methods: {
      async getHistory() {
        try {
          const res = await this.$axios.get(`/parent/payments`);
          this.historyList = this.$formatter().deserialize(res.data);
          // console.log(this.historyList)
        } catch (error) {
          console.log(error);
        }
      },
      async getId() {
        try {
          const res1 = await this.$axios.get(`profile?include=parent.children`);
          this.childrenList = this.$formatter().deserialize(
            res1.data
          ).parent.data.children.data;
          this.display = this.childrenList[0].id;
        } catch (error) {
          console.log(error);
        }
      },

      addMoney(id) {
        const req = {
          data: {
            id: id,
            type: "user",
            attributes: {
              amount: parseInt(this.amount)
            }
          }
        };
        this.$axios.post(`parent/payments/add-money/${id}`, req).then(res => {
          this.$toast.success("amount has been transfered");
        });
      }
    }
  };
</script>
