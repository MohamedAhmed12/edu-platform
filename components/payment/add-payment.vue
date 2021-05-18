<template>
  <div>
    <div class="page-content p-3">
      <div class="subjects package p-0">
        <div class="m-3">
          <h3 class="px-0 mb-2">
            {{ $t("payment") }}
          </h3>
          <div class="row mx-0">
            <div class="col-lg-8 col-md-10 px-0 col-12">
              <a class="payment img-active" href="#">
                <img class="img-fluid" src="@/assets/img/user.png">
              </a>
              <a class="payment" href="#">
                <img class="img-fluid" src="@/assets/img/user.png">
              </a>
            </div>
            <div class="col-lg-4 col-md-2 col-12 my-auto text-right">
              <nuxtLink class="btn btn-success" to="payment/history">
                history
              </nuxtLink>
            </div>
          </div>
          <div class="white-bac px-3 payment-p mt-1 grey-shadow">
            <div class="row mx-0">
              <div class="col-lg-9 p-2">
                <div class="row mx-0">
                  <div class="col-12 px-0">
                    <h5 class="px-0">
                      Add New Credit Card details
                    </h5>
                    <p class="renew">
                      You can add your credit card for the feature purchase and
                      automatically renew
                    </p>
                  </div>
                  <form class="col-12">
                    <div class="row mx-0 mb-20">
                      <div class="form-group col-md-4">
                        <label> Name on card </label>
                        <input
                          id=""
                          class="form-control"
                          name=""
                          placeholder="Ahmed "
                          type=""
                        >
                      </div>
                      <div class="form-group col-md-4">
                        <label>Exp Date </label>
                        <input
                          id=""
                          class="form-control"
                          name=""
                          placeholder="MM/YY"
                          type=""
                        >
                      </div>
                      <div class="form-group col-md-4">
                        <label>CCV/CVV Code </label>
                        <input id="" class="form-control" name="" type="" />
                      </div>
                    </div>
                    <div class="row mx-0">
                      <div class="form-group col-lg-3 col-sm-6 col-9">
                        <label>Card Number </label>
                        <input
                          class="form-control"
                          name=""
                          placeholder="0000-0000-0000-0000"
                          type=""
                        >
                      </div>
                      <div
                        class="form-group col-lg-2 col-sm-3 col-3 my-auto mastercard"
                      >
                        <p>
                          <!--                                          <i class="fab fa-cc-mastercard"></i>-->
                          <!-- <img class="img-fluid width-63" src="@/assets/img/master.PNG"> -->
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-md-3 mobile-display">
                <!-- <img class="img-fluid payment-side" src="@/assets/img/payment-side.PNG"> -->
              </div>
            </div>
            <div class="row mx-0 px-3">
              <div class="col-md-6 col-sm-6 col-12 p-0">
                <button class="btn btn-primary" type="submit">
                  Add Credit Card
                </button>
              </div>
              <div class="col-md-6 col-sm-6 col-12 mobile-center">
                <nuxt-link class="link" to="payment/transfer">
                  Continue to add money !
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-md-12 grey-shadow white-bac mt-3">
            <div class="row">
              <div class="col-lg-12">
                <h5 class="px-0">
                  Saved cards
                </h5>
                <p class="renew">
                  You can add your credit card for the feature purchase and
                  automatically renew
                </p>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6 m-b-20">
                <img class="img-fluid" src="@/assets/img/mastercard.png">
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <img class="img-fluid" src="@/assets/img/visa.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
};
</script>
