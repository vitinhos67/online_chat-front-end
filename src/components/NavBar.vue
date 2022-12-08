<template>
  <nav id="nav-bar">
    <div class="nav-bar-user" v-if="user">
      <img class="user-img" src="../assets/user.png" alt="User" />
      <span class="username-nav-bar">Username-example</span>
    </div>
    <div v-else class="nav-bar-login">
      <RouterLink to="/login"> Signin/Signup </RouterLink>
    </div>

    <br class="clear" />
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: "",
    };
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
  width: 60px;
  margin-left: 20px;
  margin-top: 4px;
  filter: opacity(50%);
}

.nav-bar-login {
  position: absolute;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  top: 25px;
  margin-left: 20px;
  font-size: 30px;
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
  align-items: center;
  float: left;
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
