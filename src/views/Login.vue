<template>
  <div class="container-fluid">
    <div
      class="row h-100 align-items-center justify-content-center"
      style="min-height: 100vh"
    >
      <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
        <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
          <div class="d-flex justify-content-center">
            <img src="../assets/logo-cnp.png" alt="" />
          </div>

          <div class="form-floating mb-3">
            <input
              type="email"
              v-model="userEmail"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email</label>
          </div>
          <div class="form-floating mb-4">
            <input
              type="password"
              v-model="userPassword"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Contraseña</label>
          </div>

          <button
            @click="login"
            type="submit"
            class="btn btn-primary py-3 w-100 mb-4"
          >
            Login
          </button>
          <div class="d-flex justify-content-center mb-3">
            <a href="">Forgot Password</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <notifications />
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    this.emitter.emit("togle");
  },
  data() {
    return {
      userEmail: null,
      userPassword: null,
      urlApi: process.env.VUE_APP_URL_API,
    };
  },
  methods: {
    async login() {
      try {
        let dataUser = new Object();
        dataUser.email = this.userEmail;
        dataUser.password = this.userPassword;
        let res = await axios.post(this.urlApi + "user-login", dataUser);
        if (res.data.user.is_admin) {
          this.$store.commit("userLogin", res.data.user);
          localStorage.token = res.data.token;
          this.emitter.emit("togle");
          this.$router.push("/");
        } else {
          this.$notify({
            title: "Error",
            text: "No tienes permiso para entrar al sistema!",
            type: "error",
          });
        }
      } catch (error) {
        const err = error.response.data;
        if (err.email) {
          this.$notify({
            title: "Error",
            text: "El email es requerido!",
            type: "error",
          });
        }
        if (err.password) {
          this.$notify({
            title: "Error",
            text: "La contraseña es requerida!",
            type: "error",
          });
        }
        if (err.message) {
          this.$notify({
            title: "Error",
            text: err.message,
            type: "error",
          });
        }
      }
    },
  },
};
</script>
<style>
.container-fluid {
  width: 100%;
  position: absolute;
}
</style>