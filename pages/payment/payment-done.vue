<template>
  <div v-if="this.$auth.user.attributes['user-type'] == 'parent'">
    <div class="col-9 col-sm-10 col-md-10 col-lg-12 page-content">
      <div class="subjects package">
        <div class="row m-15">
          <div class="col-lg-12 col-12 m-b-10">
            <h3>payment</h3>
          </div>
          <div class="col-lg-8 col-md-10 col-12">
            <a class="payment img-active" href="#">
              <img class="img-fluid" src="@/assets/img/user.png">
            </a>
            <a class="payment" href="#">
              <img class="img-fluid" src="@/assets/img/user.png">
            </a>
          </div>
          <div class="col-lg-4 col-md-2 col-12 my-auto text-right">
            <a class="btn btn-success" href="payment-histoy.html"> history</a>
          </div>

          <div class="col-md-12 white-bac">
            <div class="row">
              <div class="col-md-12 bo-shadow">
                <div class="row">
                  <div class="col-lg-12">
                    <h4>Son name here</h4>
                  </div>
                  <div class="col-lg-7 col-md-8 col-sm-7">
                    <img class="img-fluid" src="@/assets/img/payment.png" />
                  </div>

                  <div
                    class="col-lg-5 alight-mobile col-md-4 col-sm-5 text-center"
                  >
                    <img
                      class="img-fluid width-80"
                      src="@/assets/img/success.png"
                    >
                    <h4 class="m-t-20">
                      Transfer Done <br>
                      Successfully
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 white-bac p-30">
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
                  <div class="col-md-3">
                    <img class="img-fluid" src="@/assets/img/mastercard.png">
                  </div>
                  <div class="col-md-3">
                    <img class="img-fluid" src="@/assets/img/visa.png">
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
</script>
