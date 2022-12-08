<template>
  <div class="flex-container">
    <div class="form-container">
      <div class="login-page">
        <div class="form">
          <form class="login-form" method="post" @submit="onSubmit">
            <h1>Registrar-se</h1>
            <br />
            <br />
            <span class="subtitle">USERNAME:</span>
            <br />
            <input type="text" name="username" v-model="username" />
            <br />
            <span class="subtitle">PASSWORD:</span>
            <br />
            <input type="password" name="password" v-model="password"  />
            <br />
            <span class="subtitle">EMAIL:</span>
            <br />
            <input type="email" name="email" v-model="email" />
            <br />
            <br />
            <input type="submit" value="SUBMIT" class="submit-btn" />
            <span class="change-form-btn"> </span>

            <a href="/login">Loga-se aqui</a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
        return {
          username: "",
          password: "",
          email: ""
    }
  },
  components: {},
  methods : {
            async onSubmit(e){
                e.preventDefault()
                if(!this.password || !this.username || !this.email){
                    alert("Por favor, verifique os dados")
                    return
                }

                const response = await axios({
                  method:"POST",
                  url: "http://localhost:3000/user",
                  data: {
                    email: this.email,
                    password: this.password,
                    username: this.username
                  }
                  
                })

                console.log(response)

            }
        }
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
