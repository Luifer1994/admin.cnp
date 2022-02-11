<template>
  <Sidebar v-if="$route.name !== 'Login'"></Sidebar>
  <div class="content" :class="{ open: open }">
    <Navbar v-if="$route.name !== 'Login'"></Navbar>
    <router-view />
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
export default {
  components: {
    Sidebar,
    Navbar,
  },
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

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
