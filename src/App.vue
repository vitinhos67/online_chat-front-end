<template>
  <NavBar />

  <div class="chat">
    <div class="messages"></div>
    <input type="text" name="message" v-model="message" />
    <button v-on:click="echo">Enviar Mensagem</button>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Socket from "./services/socketio.service";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      message: "",
      errors: [],
    };
  },
  methods: {
    echo() {
      const socket = Socket.connection();

      console.log(socket);
      if (!this.message) {
        return;
      }

      const date = new Date();

      const created_at = {
        year: date.getFullYear(),
        month: date.getMonth(),
        hours: `${date.getHours()}:${date.getMinutes()}`,
      };
      socket.emit("message", {
        message: this.message,
        author: "Victor",
        created_at,
      });
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
