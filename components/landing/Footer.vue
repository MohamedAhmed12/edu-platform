<template>
  <footer class="footer footer-padding">
    <div class="container pl-5 pr-5">
      <div class="row align-items-center">
        <div class="col-lg-12 text-center mx-auto">
          <img
            alt="footer-logo"
            class="p-0 footer-logo-img"
            src="~/assets/img/logo/color logo.svg"
          />
        </div>
        <div class="col-lg-12 text-center mx-auto mt-3">
          <nuxt-link class="footer-title mr-4" :to="localePath('/static/about')">
            {{ $t("about") }}
          </nuxt-link>
          <nuxt-link class="footer-title mr-4" :to="localePath('/static/contact')">
            {{ $t("contact_us") }}
          </nuxt-link>
          <nuxt-link
            class="footer-title mr-4"
            :to="localePath('/static/terms-and-conditions')"
          >
            {{ $t("terms_conditions") }}
          </nuxt-link>
          <nuxt-link
            class="footer-title mr-4"
            :to="localePath('/static/policy')"
          >
            {{ $t("privacy_policy") }}
          </nuxt-link>
        </div>
        <!--        <div class="col-lg-3 text-center text-lg-left">-->
        <!--          <h4 class="footer-title&#45;&#45;footer">-->
        <!--            {{ $t("get_social") }}-->
        <!--          </h4>-->
        <!--          <div class="social mx-auto ml-lg-0">-->
        <!--            <div-->
        <!--              class="d-flex justify-content-around justify-content-lg-between w-100"-->
        <!--            >-->
        <!--              <a class="mx-1" href>-->
        <!--                <i class="fab fa-twitter" />-->
        <!--              </a>-->
        <!--              <a class="mx-1" href>-->
        <!--                <i class="fab fa-facebook-f" />-->
        <!--              </a>-->
        <!--              <a class="mx-1" href>-->
        <!--                <i class="fab fa-youtube" />-->
        <!--              </a>-->
        <!--              <a class="mx-1" href>-->
        <!--                <i class="fab fa-instagram" />-->
        <!--              </a>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
  </footer>
</template>
<script></script>
