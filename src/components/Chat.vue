<template>
  <div class="container">
    <div class="users">
      <div>
        <input class='search-users' type="text" placeholder="Buscar por usuario..." >
       
        <br />
        <h3 class="users-conected">Usuarios conectados:</h3>
      </div>

      <div class="each-users" :key="user" v-for="user of users">
        <RouterLink v-bind:to="href_user_chat(user.id)">
          <div class="each-user-grid-image">
            <img
              class="image-user"
              v-bind:src="images"
              alt="Imagem"
            />
          </div>
          <div class="each-user-grid-text">
            <p class="user-username">{{ user.username }}</p>
            <p class="user-description">{{ user.description }}</p>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="messages">
      <div class="box-messages">
        <div v-if="user">
          <p> Voce esta conectado.</p>
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

socket.on('receivedMessage', (data) => {
  console.log(data)
  const element = `<div class='content'>
        <span class='strong-content'>${data.from_username} </span> : ${data.message} 
        <br /> 
        </div>`;

      $(".box-messages").append(element);
})




export default {
  name: "chatHome",
  components: {},
  props: ['router'],

  data() {
    return {
      message: "",
      href_user_chat: (id) => `/chat/${id}`,
      user: localStorage.getItem('user') ? 
      JSON.parse(localStorage.getItem('user')).user 
      : '',
      users: [],
    };
  },
  computed: {

  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.sendMessageForUser(this.message)
      this.renderMessage({from_username: this.user.username, message: this.message})

    },

    sendMessageForUser(message) {

      const regex = /[/]chat[/]([1-9]*)/gi

      const id_for_user = regex.exec(this.$route.fullPath);
      
      socket.emit('messageBetweenUsers', {
        message,
        username: this.user.username,
        user: this.user.id,
        for_user: id_for_user[1],
        room: `users:${this.user.id}-${id_for_user[1]}`
      })

    },
    renderMessage(data) {
      const element = `<div class='content'>
        <span class='strong-content'>${data.from_username} </span> : ${data.message} 
        <br /> 
        </div>`;

      $(".box-messages").append(element);
    }
  },
  async mounted() {
    
    if(this.user){
    socket.emit('connectionUser', this.user)
    }

    if(this.$route.fullPath !== '/') { 
      
      const regex = /[/]chat[/]([1-9]*)/gi
      const connectedWith = regex.exec(this.$route.fullPath);
      
      socket.emit('createRoom', `clients:${this.user.id}-${connectedWith[1]}`)
     }

    
    setTimeout(async () => {
      const users = await allUsersOnService();
      this.users = users.data;
    }, 3000)


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
  background-image: url('../assets/search.png');
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
