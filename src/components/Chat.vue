<template>
  <div class="container">
    <div class="users">
      <div class="box-users">
        <div>
          <input
            class="search-users"
            type="text"
            placeholder="Buscar por usuario..."
          />
          <br />
          <h3 class="users-conected">Usuarios conectados:</h3>
        </div>
        <br />

        <div class="user" v-bind:key="user" v-for="user in users">
          <div class="box-profile">
            <router-link
              class="open-chat"
              :to="href_user_chat(user.id)"
              @click="updateDates"
            >
              <img
                class="image-open-chat"
                src="../assets/seta_cinza_direita.png"
                :alt="['Abrir bate-papo com', user.username]"
              />
            </router-link>

            <img
              src="../assets/roberto.jpeg"
              class="image-profile"
              alt="image-profile"
            />

            <span class="username-profile">{{
              user.username.charAt(0).toUpperCase() + user.username.slice(1)
            }}</span>
          </div>
          <div class="description-box">
            <span class="user-description">
              <span v-if="!user.description"
                >Não sabemos muito sobre {{ username }}, mas pode apostar que é
                alguem legal!</span
              >
              <span v-else>{{ user.description }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="messages">
      <div class="box-messages" id="remove-messages">
        <div v-if="user">
          <p style="margin: 5px; color: green">Você esta conectado.</p>
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
import User from "@/services/user.service";
import cookies from "vue-cookies";

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
  props: ["router", "User"],

  data() {
    return {
      message: "",
      href_user_chat: (id) => `/chat/${id}`,
      user: "",
      users: [],
      connectedWith: "",
      auth_user: cookies.get("auth_user"),
      endpoint: this.$route.path,
    };
  },
  computed: {},
  watch: {},
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
      const connected_with_user = await User.find(connected_with_id_user);

      if (!connected_with_id_user) {
        window.location.href = "/";
      }

      this.connectedWith = connected_with_user;
    },

    sendMessageForUser(message) {
      const regex = /[/]chat[/]([1-9]*)/gi;
      const id_for_user = regex.exec(this.endpoint);

      socket.emit("userSendMessage", {
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

      if (messages.statusCode === 204) {
        return;
      }

      for (const message in messages) {
        this.renderMessage({
          message: messages[message].message,
          from_username: messages[message].username,
        });
      }
    },
    renderMessage(data) {
      const element = `<div class='content'>
        <span class='strong-content'>${data.from_username} </span> : ${data.message} 
        <br /> 
        </div>`;

      $(".box-messages").append(element);
    },

    async updateDates(e) {
      if (e) {
        e.preventDefault();
      }
      $(".content").remove();

      await this.updateConnectWith();
      this.loadMessages();
    },
  },
  async created() {
    this.user = this.User;

    if (this.user) {
      console.log(this.user)
      socket.emit("connectionUser", this.user);

      if (this.endpoint !== "/chat") {
        if (this.endpoint === "/chat/") {
          return (window.location.href = "/chat");
        }

        await this.updateDates();
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

.search-users {
  margin: 10px;
  width: 380px;
  height: 30px;
  text-align: center;
  background-image: url("../assets/search.png");
  background-size: 1.1em;
  background-repeat: no-repeat;
  background-position: 320px;
  border-radius: 8px;
}

.box-profile {
  width: 90%;
  height: 50%;
}

.description-box {
  width: 360px;
  height: 50%;

  background-color: #eae8e8;
  padding: 10px;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.884);
}

.users {
  border: var(--default-border);
  width: 1000px;
  height: 100%;
  margin-left: 50px;
}

.box-users {
  margin-left: 10px;
  width: 95%;
  height: 100%;
  overflow-y: auto;
}

.user {
  width: 390px;
  height: 160px;
  background-color: #f6f6f6;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 8px;
  border: var(--default-border);
}

.image-profile {
  width: 50px;
  float: left;
  margin-top: 4px;
  margin-left: 10px;
}

.username-profile {
  float: inline-start;
  font-size: 20px;
  margin-left: 5px;
  margin-top: 15px;
}
.open-chat {
  float: right;
  margin-top: 15px;
}

.image-open-chat {
  width: 10px;
  margin-right: 10px;
}

.users-conected {
  margin-left: 12px;
}

.content {
  font-size: 20px;
  margin-top: 5px;
  margin-left: 5px;
}
.strong-content {
  font-weight: bold;
}

.messages {
  width: 800px;
  justify-content: center;
  margin-left: 30px;
  height: 500px;
  border: var(--default-border);
}

.box-messages {
  border: var(--default-border);
  width: 750px;
  height: 400px;
  margin: 10px;
  overflow-y: auto;

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
