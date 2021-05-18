<template>
  <div class="commnts">
    <div class="commnts-box">
      <div v-for="i in 2" :key="i" class="receive">
        <a class="img" href>
          <img alt src="@/assets/img/user.png" />
        </a>
        <p class="content">
          graphic or web designs. The passage is attributed to an unknown
          typesetter in the 15th
        </p>
      </div>
      <div class="receive send">
        <a class="img" href>
          <img alt src="@/assets/img/user.png" />
        </a>
        <p class="content">
          graphic or web designs. The passage is attributed
        </p>
      </div>
    </div>
    <form action class="send-msgs">
      <input class="input" placeholder="quick message" type="text" >
      <button class="submit">
        <i class="fas fa-location-arrow" />
      </button>
    </form>
  </div>
</template>

<script>
export default {};
</script>
