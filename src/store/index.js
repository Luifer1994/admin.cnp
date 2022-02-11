import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import axios from "axios";

export default createStore({
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    userLogin(state, user) {
      state.user = user;
    },
    RESET_USER(state) {
      state.user = null;
    },
  },
  actions: {
    async logout({ commit }) {
      let response;
      const urlApi = process.env.VUE_APP_URL_API;
      const token = localStorage.getItem("token");
      try {
        response = await axios.get(urlApi + "user-logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.res && localStorage.getItem("token")) {
          commit("RESET_USER");
          console.log(response.data.res);
          localStorage.removeItem("token");
          window.location.reload();
        }
      } catch (ex) {
        // Handle error
        console.log(ex);
        localStorage.removeItem("token");
      }
    },
  },
  plugins: [new VuexPersistence().plugin],
});
