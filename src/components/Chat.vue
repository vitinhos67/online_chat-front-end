<template>
  

    <div class="container">
      <div class="users"></div>
    <div class="messages">
      <div class="box-messages"></div>
      <div class="grid-send-message">
        
        <form action="">
          <input  class='send-message-input' type="text" name="message" v-model="message"/>
          <button class='send-message-button' v-on:click="echo">Enviar Mensagem</button>
        </form>

      </div>
    </div>
  </div>
  
  
</template>
<script>
import Socket from "../services/socketio.service";

export default {
  name: "App",
  components: {},
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

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

:root {
  --default-font: 'Roboto', sans-serif;
  --default-border: solid 1px #ddd;
}

html,
body {
  height: 100%;
  font-family: var(--default-font);
}



* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



.container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 1000px;
  height: 500px;
  clear: both;
}

.users {
  border: var(--default-border);
  width: 200px;
  margin-left: 30px;
  margin-right: 30px;
  height: 100%;
}


.messages {
  width: 800px;
  align-self: center;
  height: 500px;
  border: var(--default-border);
}

.box-messages {
  border: var(--default-border);
  width: 750px;
  height: 400px;
  margin: 10px;

  border-radius: 10px;
}

.grid-send-message {

  width: 750px;
  margin: 10px;
  height: 60px;
}


.send-message-button {
  position: absolute;
  width: 150px;
  height: 60px;
  border: var(--default-border);
  margin-left: 20px;
  background-color: white;
  color: #F6F6F6;
  border-radius: 10px;
}
.send-message-input {
  border: var(--default-border);
  position: relative;
  width: 580px;
  height: 60px;
  border-radius: 10px;
  font-size: 30px;
  
}


</style>
