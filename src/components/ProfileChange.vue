<template>
  <div class="flex-container">
    <div class="form-container">
      <div class="login-page">
        <div class="form">
          <form class="login-form" @submit="loginUser">
            <div class="box-input">
              <h1>Adicione dados adicionais a sua conta.</h1>
              <br />
              <span class="subtitle">Descrição:</span>
              <br />
              <input type="text" name="description" v-model="description" />
              <br />
              <input value="Alterar" class="submit-btn" @click="onSubmit" />
            </div>
            <span class="message-status"></span>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import cookies from "vue-cookies";
export default {
  data() {
    return {
      user: cookies.get("user") ? cookies.get("user") : "",
      description: "",
      href_user_chat: (id) => `/chat/${id}`,
    };
  },
  components: {},
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      if (!this.description) {
        return;
      }
      const sendDescription = await axios({
        method: "post",
        url: "http://localhost:3000/add/description",
        data: {
          description: this.description,
        },
        headers: {
          Authorization: `Bearer ${this.user.access_token}`,
        },
      });

      if (sendDescription.status === 200) {
        $(".message-status")
          .append(`Descrição alterada com sucesso`)
          .css("display", "block");
      }

      setTimeout(() => {
        $(".message-status").css("display", "none");
      }, 1000);
    },
  },
};
</script>
<style>
html {
  scroll-behavior: smooth;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100%;
}

a {
  text-decoration: none;
  color: black;
}

.message-status {
  margin-left: 5px;
  padding: 10px;
  display: none;
  color: green;
  border-radius: 7px;
  border: 1px solid green;
}

h1 {
  font-size: 35px;
  font-weight: 800;
}
.box-input {
  text-align: center;
  align-items: center;
}

.flex-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 500px;
  height: 600px;
  flex-direction: column;

  margin-top: 5px;
  padding-top: 20px;
  border-radius: 12px;
}

.subtitle {
  font-size: 11px;
  color: black;
}

input {
  border: none;
  border-bottom: solid rgb(143, 143, 143) 1px;

  margin-bottom: 30px;

  background: none;
  color: black;

  height: 35px;
  width: 300px;
}

.submit-btn {
  cursor: pointer;
  padding-left: 19px;
  border: none;
  border-radius: 8px;
  background: #ddd;
  color: black;
  width: 80px;

  transition: all 1s;
}

.submit-btn:hover {
  box-shadow: none;
}

.change-form-btn {
  font-size: 10px;
  color: rgb(134, 134, 134);

  margin-left: 10px;
}

.change-form-btn a {
  font-size: 10px;
  color: black;
  padding-bottom: 5px;
}

.form .register-form {
  display: none;
}
</style>
