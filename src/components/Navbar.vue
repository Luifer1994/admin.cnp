<template>
  <nav class="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
    <button class="btn sidebar-toggler" @click="emitMyEvent()">
      <i class="fa fa-bars"></i>
    </button>

    <div class="navbar-nav align-items-center ms-auto">
      <div class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
          <img
            class="rounded-circle me-lg-2"
            src="img/user.jpg"
            alt=""
            style="width: 40px; height: 40px"
          />
        </a>
        <div
          class="
            dropdown-menu dropdown-menu-end
            bg-light
            border-0
            rounded-0 rounded-bottom
            m-0
          "
        >
          <button @click="logout" class="dropdown-item">Cerrar sesión</button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  methods: {
    emitMyEvent() {
      this.emitter.emit("togle");
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>