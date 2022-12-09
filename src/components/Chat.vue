<template>
  <div class="container">
    <div class="users">
      <div>
        <input type="text" placeholder="Buscar por usuario..." />
        <br />
        <h3 style="margin-top: 10px">Usuarios Conectados:</h3>
      </div>

      <div class="each-users" :key="user" v-for="user of users">
        <RouterLink v-bind:to="href_user_chat(user.id)">
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
        <div v-if="user">
          <p>Voce esta conectado</p>
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
            v-model="messageInput"
          />
          <button @click="onSubmit" class="send-message-button">
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  </div>

  <p></p>
</template>
<script>
export default {
  name: "chatHome",
  components: {},
  props: {
    onSubmit: {
      type: Function,
      default: (e) =>{
      e.preventDefault();

        alert('ok')
    } 
    },
    message: {
      type: String
    }
  },
  
  data() {
    return {
      messageInput: "",
      from_user: "victor",
      href_user_chat: (id) => `/chat/${id}`,
      user: {
        username: 'test',
        id:75,
        description: "Outro teste",
        external_urls: {
        images: ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Gf1RWi22KtnOd9vNp27fFgHaJ4%26pid%3DApi&f=1&ipt=00081fd41fdbb358184f9b8164d8e00e9172434d4ee0c3a97e2fe4f3e390206d&ipo=images']
      }
    },
      users:  [{
        username: 'test',
        id:75,
        description: "Outro teste",
        external_urls: {
        images: ['https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Gf1RWi22KtnOd9vNp27fFgHaJ4%26pid%3DApi&f=1&ipt=00081fd41fdbb358184f9b8164d8e00e9172434d4ee0c3a97e2fe4f3e390206d&ipo=images']
      }
    }],
      errors: [],
    };
  },
  methods: {

  },
  computed: {
  }
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
