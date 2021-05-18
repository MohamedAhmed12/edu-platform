<template>
  <nav class="main-nav">
    <div class="nav-overlay" :class="{ 'transform-none': isOpen }" />

    <div class="container" @click="$emit('toggle-nav')">
      <ul class="nav-list" :class="{ 'transform-none': isOpen }">
        <li class="list-item">
          <nuxt-link class="list-link font-bold" :to="localePath('/')">
            {{ $t("home") }}
          </nuxt-link>
        </li>
        <li class="list-item">
          <nuxt-link
            class="list-link font-bold"
            :to="localePath('/static/about')"
          >
            {{ $t("about") }}
          </nuxt-link>
        </li>
        <li class="list-item">
          <nuxt-link
            class="list-link font-bold"
            :to="localePath('/static/available-teachers')"
          >
            {{ $t("teachers") }}
          </nuxt-link>
        </li>
        <li class="list-item">
          <nuxt-link
            class="list-link font-bold"
            :to="localePath('/static/news')"
          >
            {{ $t("news") }}
          </nuxt-link>
          <!-- news -->
        </li>
        <li class="list-item">
          <nuxt-link
            class="list-link font-bold"
            :to="localePath('/static/testimonials')"
          >
            {{ $t("testimonials") }}
          </nuxt-link>
        </li>
        <li class="list-item">
          <nuxt-link
            class="list-link font-bold"
            :to="localePath('/static/test-and-evaluation')"
          >
            {{ $t("test_and_evaluation") }}
          </nuxt-link>
        </li>
        <li class="list-item">
          <nuxt-link
            class="list-link font-bold"
            :to="localePath('/static/contact')"
          >
            {{ $t("contact") }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["isOpen"],
};
</script>
