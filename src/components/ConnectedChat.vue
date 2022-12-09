<template>
  <Chat v-bind:onSubmit="onSubmit" />
</template>

<script>
import Chat from "./Chat.vue";
/* import socket from "@/services/socketio.service"; */
import $ from "jquery";
export default {
  components: {
    Chat,
  },
  data() {
    return {
      from_user: "Victor",
      for_user: this.$route,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      const element = `<div class='content'>
        <span class='strong-content'>${this.from_user} </span> : ${this.message} 
        <br /> 
        </div>`;

      $(".box-messages").append(element);
    },
  },
};
</script>

<style></style>
