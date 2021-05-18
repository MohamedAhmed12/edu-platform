<template>
  <div class="down">
    <div class="container">
      <div class="inner row mx-0">
        <div class="col-3 col-md-2">
          <nuxt-link
            class="logo d-none d-md-block w-100 text-center"
            :to="localePath('/')"
          >
            <img
              alt
              class="main-header-logo"
              src="~/assets/img/logo/arbiconlywhite.svg"
            />
          </nuxt-link>
        </div>
        <div class="col-md-6 col-12 px-0 col-xl-4">
          <div class="right">
            <a class="link" href="tel:920010600">
              <i class="fas fa-phone" />
              <span class="title ml-2">
                {{ $t("call_us") }}
                <br />920010600
              </span>
            </a>
            <a class="link m-0" href="mailto:info@t3lom.com">
              <i>@</i>
              <span class="title ml-2">
                {{ $t("mail") }}
                <br />info@t3lom.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomHeader",
};
</script>
