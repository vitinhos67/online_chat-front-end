<template>
  <div class="flex-container">
    <div class="form-container">
      <div class="login-page">
        <div class="form">
          <form class="login-form" @submit="loginUser">
            <h1>Login</h1>
            <br />
            <br />
            <span class="subtitle">EMAIL:</span>
            <br />
            <input type="email" name="email" v-model="email" />
            <br />
            <span class="subtitle">PASSWORD:</span>
            <br />
            <input type="password" name="password" v-model="password" />
            <br />
            <br />
            <input v-on:click="loginUser" class="submit-btn" value="Login" />
            <span class="change-form-btn">
              <a href="/register">Registre aqui</a>
            </span>
            
          </form>


          <div class="message-status"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import login from "../services/login.service";
import $ from "jquery"
import cookies from "vue-cookies";
export default {
  data() {
    return {
      email: "",
      password: "",
      href_user_chat: (id) => `/chat/${id}`,
    };
  },
  components: {},
  methods: {
    async loginUser() {
      try {
        if (!this.password || !this.email) {
          return;
        }

        const authorization = await login({
          password: this.password,
          email: this.email,
        })

        if (authorization.statusCode === 401) {
          
          $(".message-status")
          .append(`O usuario não foi encontrado`)
          .css("display", "block");


        setTimeout(() => {
        $(".message-status").css("display", "none");
      }, 2000);
        return 
        }
        cookies.set("auth_user", authorization.access_token);
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
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

h1 {
  font-size: 35px;
  font-weight: 800;
}

.message-status {
  margin-left: 5px;
  padding: 10px;
  display: none;
  color: red;
  border-radius: 7px;
  border: 1px solid red
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
  padding-left: 22px;
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
