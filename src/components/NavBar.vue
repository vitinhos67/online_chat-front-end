<template>
  <nav id="nav-bar">
    <div class="nav-bar-user" v-if="user">
      <img class="user-img" src="../assets/user.png" alt="User" />
      <span class="username-nav-bar">{{
        user.username.charAt(0).toUpperCase() + user.username.slice(1)
      }}</span>
      <router-link to="/profile/change"
        ><span class="alterar-perfil">Perfil</span></router-link
      >
      <span class="sair" @click="logoutUser">Sair</span>

      <br class="clear" />
    </div>

    <div v-else class="nav-bar-login">
      <RouterLink to="/"> Chat </RouterLink>
      <RouterLink to="/login"> Login </RouterLink>
      <RouterLink to="/register"> Registrar </RouterLink>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).user
        : "",
    };
  },
  methods: {
    logoutUser() {
      localStorage.removeItem("user");
      window.location.reload();
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap");

:root {
  --default-font: "Roboto", sans-serif;
  --background-color-default: #f6f6f6;
  --size-font: 0.925rem;
}

body {
  margin: 0px;
  padding: 0px;
  font-family: var(--default-font);
  font-size: var(--size-font);
}

a {
  text-decoration: none;
}

#nav-bar {
  width: 100%;

  height: 80px;
  border: 1px solid #ddd;
  background-color: var(--background-color-default);
}
.user-img {
  width: 50px;
  margin-left: 20px;
  margin-top: 12px;
  filter: opacity(50%);
}

.nav-bar-login {
  position: absolute;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  top: 25px;
  margin-left: 20px;
  font-size: 30px;
}

.sair {
  position: absolute;
  font-size: 22px;
  right: 20px;
  top: 30px;
  color: rgb(249, 55, 55);
}

.alterar-perfil {
  position: absolute;
  font-size: 22px;
  right: 70px;
  top: 30px;
}

.username-nav-bar {
  position: absolute;
  top: 25px;
  font-size: 30px;
  font-family: var(--default-font);
  margin-left: 10px;
}

.nav-bar-user {
  width: 30%;
  height: 70px;
  margin: 5px;
}

.logout-nav-bar {
  float: right;
}

.links {
  margin: 10px;
  text-decoration: none;
}
</style>
