<template>
  <div class="container">
    <div class="users">
      <div>
        <input
          class="search-users"
          type="text"
          placeholder="Buscar por usuario..."
        />

        <br />
        <h3 class="users-conected">Usuarios conectados:</h3>
      </div>

      <div
        class="each-users"
        :key="user"
        v-for="user of users"
        @click="updateDates"
      >
        <RouterLink v-bind:to="href_user_chat(user.id)">
          <div class="each-user-grid-image">
            <!-- <img class="image-user" v-bind:src="images" alt="Imagem" /> -->
          </div>
          <div class="each-user-grid-text">
            <p class="user-username">{{ user.username }}</p>
            <p class="user-description">{{ user.description }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="messages">
      <div class="box-messages" id="remove-messages">
        <div v-if="user">
          <p>Voce esta conectado.</p>
        </div>
        <div class="buttons-link" v-else>
          <h1 class="login-message-h1">
            Faça seu cadastro para conversar com milhares de pessoas todos os
            dias.
          </h1>

          <div class="session-login">
            <RouterLink class="message-signin" to="/login"
              >Clique aqui se você ja tenho uma conta!</RouterLink
            >
            <br />
            <RouterLink class="message-signin" to="/login"
              >Clique aqui caso não tenha um conta</RouterLink
            >
          </div>
        </div>
      </div>
      <div class="grid-send-message">
        <form action="">
          <input
            placeholder="Digite aqui sua mensagem..."
            class="send-message-input"
            type="text"
            name="message"
            v-model="message"
          />
          <button @click="onSubmit" class="send-message-button">
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import socket from "@/services/socketio.service";
import allUsersOnService from "@/services/allUsersOn.service";
import restoreMessages from "../services/load-messages-users.service";
import find_userService from "@/services/find_user.service";


socket.on("receivedMessage", (data) => {
  const element = `<div class='content' id='chat-message-with-${data.from_id}'>
        <span class='strong-content'>${data.from_username} </span> : ${data.message} 
        <br /> 
        </div>`;

  $(".box-messages").append(element);
});

export default {
  name: "chatHome",
  components: {},
  props: ["router"],

  data() {
    return {
      message: "",
      href_user_chat: (id) => `/chat/${id}`,
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).user
        : "",
      users: [],
      connectedWith: 'null',
    };
  },
  computed: {},
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.sendMessageForUser(this.message);
      this.renderMessage({
        from_username: this.user.username,
        message: this.message,
        from_id: this.connectedWith,
      });
    },
    async updateConnectWith() {
      
      const regex = /[/]chat[/]([1-9]*)/gi;
      
      const connected_with_id_user = regex.exec(this.$route.fullPath)[1];
      const connected_with_user = await find_userService(connected_with_id_user)
      if(!connected_with_id_user) {
        return;
      }
      this.connectedWith = connected_with_user
    },

    sendMessageForUser(message) {
      const regex = /[/]chat[/]([1-9]*)/gi;
      const id_for_user = regex.exec(this.$route.fullPath);

      socket.emit("messageBetweenUsers", {
        for_username: this.connectedWith.username,
        from_username: this.user.username,
        message,
        username: this.user.username,
        user: this.user.id,
        for_user: id_for_user[1],
      });
    },
    async loadMessages() {
      const messages = await restoreMessages({
        from_id: this.user.id,
        for_id: this.connectedWith.id,
      });

      for(let index in messages) {
        
        if(!messages[index]) {
          continue;
        }
      this.renderMessage({
          from_username: messages[index].from_username,
          message: messages[index].message
        }) 
      }
    },
    renderMessage(data) {
      const element = `<div class='content'>
        <span class='strong-content'>${data.from_username} </span> : ${data.message} 
        <br /> 
        </div>`;

      $(".box-messages").append(element);
    },
    async updateDates() {
      $('.content').remove();
      
      await this.updateConnectWith()
      this.loadMessages();
    },
  },
  async mounted() {
    
    if (this.user) {
      socket.emit("connectionUser", this.user);
    if (this.$route.fullPath !== "/") {
      await this.updateConnectWith()
      
    }
    }

    setTimeout(async () => {
      const users = await allUsersOnService();
      this.users = users.data;
    }, 1000);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");

:root {
  --default-font: "Roboto", sans-serif;
  --default-border: solid 1px #ddd;
  --default-color-text: #333333;
}

html,
body {
  height: 100%;
  font-family: var(--default-font);
  color: var(--default-color-text);
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
  width: 1200px;
  height: 500px;
  clear: both;
}

.search-img {
  width: 20px;
  margin-top: 8px;
}

.search-users {
  margin: 10px;
  width: 350px;
  height: 35px;
  text-align: center;
  background-image: url("../assets/search.png");
  background-size: 1.3em;
  background-repeat: no-repeat;
  background-position: 320px;

  border-radius: 10px;
}

.users-conected {
  margin-left: 12px;
}

.user-link-profile {
  position: absolute;
}

.content {
  font-size: 20px;
}
.strong-content {
  font-weight: bold;
}
.each-users {
  border-radius: 1px;
  width: 100%;
  height: 100px;
}

.each-user-grid-image {
  height: 100%;
  float: left;
  width: 80px;
}

.each-user-grid-text {
  height: 100%;
  width: 108;
}

.image-user {
  width: 100%;
  height: 100%;
}

.user-username {
  margin-top: 15px;

  color: black;
}

.user-description {
  color: black;
  font-size: 20px;
}

.users {
  border: var(--default-border);
  width: 1000px;
  margin-left: 30px;
  margin-right: 30px;
  height: 100%;
}

.messages {
  width: 800px;
  justify-content: center;
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
  height: 50px;
  border: var(--default-border);
  margin-left: 20px;
  background-color: white;
  border-radius: 10px;
}
.send-message-input {
  border: var(--default-border);
  position: relative;
  width: 580px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
}

a {
  text-align: center;
  font-size: 20px;
  align-items: center;
}

a:visited {
  color: var(--default-color-text);
}

.session-login {
  padding-top: 20px;
  text-align: center;
  width: 500px;
  height: 50px;
}

.login-message-h1 {
  text-align: center;
  align-items: center;
}

.buttons-link {
  margin-top: 20px;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
  height: 350px;
}
</style>
