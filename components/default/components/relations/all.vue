<template>
  <div
    class="persont-list mb-4 pb-3"
    :class="{ 'animated-background': isLoading }"
  >
    <div class="top">
      <div class="btns">
        <button
          class="button"
          :class="{ active: filter == 'pending' }"
          type="button"
          @click="filter = 'pending'"
        >
          pending request
        </button>
        <button
          class="button"
          :class="{ active: filter == 'accepted' }"
          type="button"
          @click="filter = 'accepted'"
        >
          Parent list
        </button>
        <button
          class="button blue-btn"
          type="button"
          @click="$modal.show('invite-modal')"
        >
          {{ $t("add_parent") }}
        </button>
      </div>
      <form action="" class="persons-search">
        <input class="input" type="text" >
        <button class="submit" type="submit">
          <i class="fas fa-search" />
        </button>
      </form>
    </div>
    <div class="row scorllable-row">
      <One v-for="one in getData()" :key="one.id" :one="one" @change="load" />
    </div>
  </div>
</template>
<script>
import One from "~/components/default/components/relations/one.vue";
export default {
  components: {
    One,
  },
  data() {
    return {
      isLoading: false,
      filter: "accepted",
      pending: [],
      accepted: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.isLoading = true;
      let type = this.$auth.user.attributes.type;
      let sub =
        type == "student"
          ? "student.parents,student.sentInvitation,student.receivedInvitations"
          : "parent.children,parent.sentInvitation,receivedInvitations";
      this.$axios
        .get("profile", {
          params: {
            include: sub,
          },
        })
        .then((response) => {
          this.isLoading = false;
          let sub = type == "student" ? "parents" : "children";
          this.accepted = this.$getByType(sub, response.data.included);
          this.pending = this.$getIncludedByType(
            "invitation",
            response.data.included
          );
        });
    },
    getData() {
      return this[this.filter];
    },
  },
};
</script>
