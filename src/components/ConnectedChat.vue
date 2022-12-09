<template>
  <Chat v-bind:onSubmit="onSubmit" />
</template>

<script>

/* import socketioService from "@/services/socketio.service"; */
import Chat from "./Chat.vue";

import $ from "jquery";

export default {
  components: {
    Chat,
  },
  data() {
    return {
      from_user: JSON.parse(localStorage.getItem('user')).user,
      for_user: this.$route,

    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

/*    
      const socket = socketioService.connection()


      const sendData = {
        from_user : this.from_user.id,
        for_user: this.for_user,
        message: this.message,
      }

      socket.emit('message', sendData) */
      
    
      
      
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
