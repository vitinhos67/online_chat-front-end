<template>
  <Chat v-bind:onSubmit="onSubmit" :router="this.$route.path" />
</template>

<script>
import Chat from "./Chat.vue";
export default {
  components: {
    Chat,
  },
  data() {
    return {
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).user
        : "",
      for_user: this.$route.path,
    };
  },
  methods: {},
};
</script>

<style></style>
