<template>
  <div class="bar-container">
    <div :class="'bar-' + progress" />
  </div>
</template>

<script>
export default {
  name: "Bar",
  props: {
    progress: {
      required: true,
    },
  },
  created() {},
};
</script>

<style scoped>
/* The bar container */
.bar-container {
  width: 95%;
  background-color: #f1f1f1;
  text-align: center;
  color: white;
  margin-bottom: 15px;
}

/* Individual bars */
.bar-10 {
  width: 100%;
  height: 18px;
  background-color: #a1a7b3;
}
.bar-9 {
  width: 95%;
  height: 18px;
  background-color: #a1a7b3;
}
.bar-8 {
  width: 90%;
  height: 18px;
  background-color: #a1a7b3;
}
.bar-7 {
  width: 80%;
  height: 18px;
  background-color: #a1a7b3;
}
.bar-6 {
  width: 70%;
  height: 18px;
  background-color: #a1a7b3;
}
.bar-5 {
  width: 60%;
  height: 18px;
  background-color: #a1a7b3;
}

.bar-4 {
  width: 30%;
  height: 18px;
  background-color: #a1a7b3;
}

.bar-3 {
  width: 16%;
  height: 18px;
  background-color: #a1a7b3;
}

.bar-2 {
  width: 4%;
  height: 18px;
  background-color: #a1a7b3;
}

.bar-1 {
  width: 15%;
  height: 18px;
  background-color: #a1a7b3;
}
</style>
