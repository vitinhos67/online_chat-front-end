<template>
  <div id="error">
    <h1>ERROR 404!</h1>
    <h3>Va para o menu inicial <RouterLink to="/chat">aqui</RouterLink></h3>
  </div>
</template>

<script>
export default {
  name: "Error-404-Page",
  components: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#error {
  text-align: center;
  margin-top: 200px;
}
</style>
