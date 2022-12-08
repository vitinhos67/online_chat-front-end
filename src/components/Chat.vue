<template>
  <div class="container">
    <div class="users" :key="user" v-for="user of users">
      <div>
        <input type="text" placeholder="Buscar por usuario..." />
        <br />
        <h3 style="margin-top: 10px">Usuarios Conectados:</h3>
      </div>

      <div class="each-users">
        <RouterLink to="/chat/4">
          <div class="each-user-grid-image">
            <img
              class="image-user"
              v-bind:src="user.external_urls.images[0]"
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
        <div class="buttons-link">
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
          <button class="send-message-button" v-on:click="echo">
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "chatHome",
  components: {},
  data() {
    return {
      message: "",
      users: [
        {
          username: "Amante dos gatos",
          id: 3434,
          external_urls: {
            images: [
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.imgur.com%2FkT3j3Lf.jpg&f=1&nofb=1&ipt=42823d5716256710503f124330e1c10d021b12e3205d697ed2759d6249b4ade7&ipo=images",
            ],
          },
          access_token: "token",
          description: `Gosto de gatos.`,
        },
      ],
      errors: [],
    };
  },
  methods: {
    echo() {
      // eslint-disable-next-line no-unused-vars
    },
  },
  beforeCreate() {},
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

.user-link-profile {
  position: absolute;
}

.each-users {
  border: 1px solid red;
  width: 100%;
  height: 100px;
}

.each-user-grid-image {
  border: 1px solid red;
  height: 100%;
  float: left;
  width: 80px;
}

.each-user-grid-text {
  border: 1px solid red;
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
  background-color: red 1px solid;
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
