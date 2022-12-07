<template>
  
  <nav id="nav-bar">
    <div class="nav-bar-user">
      <img class="user-img" src="../assets/user.png" alt="User" />
      <span class="username-nav-bar">Username-example</span>
    </div>

    <br class="clear" />

    <RouterLink to="/chat" class="links">Chat</RouterLink>
    <RouterLink to='/login'  class="logout-nav-bar">Login/Logout</RouterLink>
    <RouterLink to="/home" class="links">Home</RouterLink>
    
  
    
  </nav>
</template>

<script>
export default {};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}

#nav-bar {
  width: 100%;
  height: 50px;
  border: solid red 1px;
  display: block;
}

.user-img {
  width: 40px;
  margin-left: 10px;
  border: 1px red solid;
}

.username-nav-bar {
  position: absolute;
  top: 17px;
  border: red solid 1px;
  margin-left: 10px;
}

.nav-bar-user {
  width: 30%;
  height: 40px;
  float: left;

  margin: 5px;
  border: solid blue 1px;
}

.logout-nav-bar {
  float: right;
  border: solid red 1px;
}

.links {
  margin: 10px;
  text-decoration: none;
}
</style>
