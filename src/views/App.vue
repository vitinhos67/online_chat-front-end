<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <NavBar :User="user" />
    <RouterView :User="user" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import cookies from "vue-cookies";
import User from "../services/user.service";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      user: "",
      loading: Boolean,
      error: null,
    };
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = [];
      try {
        const { access_token } = cookies.get("auth_user");
        if (access_token) {
          const user = await User.dataUser(access_token);
          if (!user) {
            this.error.push("Não foi possivel encontrar o usuario");
          }

          this.user = user;
        }
      } catch (error) {
        this.error.push(error.message);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
