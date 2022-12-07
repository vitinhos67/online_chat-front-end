<template>
  <div class="chat">
    <div class="messages"></div>
    <input type="text" name="message" v-model="message" />
    <button v-on:click="echo">Enviar Mensagem</button>
  </div>

</template>
<script>

import Socket from "../services/socketio.service";



export default {
  name: "App",
  components: {
  
  },
  data() {
    return {
      message: "",
      errors: [],
    };
  },
  methods: {
    echo() {
      // eslint-disable-next-line no-unused-vars
      const socket = Socket.connection();
    },
  },
  beforeCreate() {},
};
</script>

<style>
html,
body {
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.chat {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  clear: both;
}

.messages {
  width: 600px;
  height: 400px;
  margin: 20px 0;
  border: 1px solid #ddd;
  padding: 20px;
}
</style>