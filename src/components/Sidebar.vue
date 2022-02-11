<template>
  <div class="sidebar pe-4 pb-3" :class="{ open: open }">
    <nav class="navbar bg-light navbar-light">
      <a href="index.html" class="navbar-brand mx-4 mb-3">
        <img src="../assets/logo-cnp.png" alt="" width="100" />
      </a>
      <div class="d-flex align-items-center ms-4 mb-4">
        <div class="position-relative">
          <img
            class="rounded-circle"
            src="img/user.jpg"
            alt=""
            style="width: 40px; height: 40px"
          />
          <div
            class="
              bg-success
              rounded-circle
              border border-2 border-white
              position-absolute
              end-0
              bottom-0
              p-1
            "
          ></div>
        </div>
        <div class="ms-3">
          <span>Admin</span>
        </div>
      </div>
      <div class="navbar-nav w-100">
        <router-link
          to="/"
          class="nav-item nav-link"
          :class="{ active: $route.name === 'Gondola' }"
        >
          <i class="bi bi-columns-gap"></i>
          Gondolas
        </router-link>
        <router-link
          to="/users"
          class="nav-item nav-link"
          :class="{ active: $route.name === 'User' }"
        >
          <i class="bi bi-people-fill"></i>
          Usuarios
        </router-link>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "Sidebar",
  data() {
    return {
      open: false,
    };
  },
  mounted() {
    this.emitter.on("togle", () => {
      this.open = !this.open;
    });
  },
};
</script>