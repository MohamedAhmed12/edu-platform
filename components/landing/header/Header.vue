<template>
  <header class="header">
    <TopHeader :is-open="isOpen" @toggle-nav="toggleNav()" />
    <BottomHeader />
    <Nav :is-open="isOpen" @toggle-nav="toggleNav()" />
  </header>
</template>

<script>
import "~/assets/css/header.css";
import Nav from "~/components/landing/Nav.vue";
import TopHeader from "~/components/landing/header/top-header";
import BottomHeader from "~/components/landing/header/bottom-header";

export default {
  components: {
    Nav,
    TopHeader,
    BottomHeader,
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    toggleNav() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
