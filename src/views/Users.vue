<template>
  <div class="container-fluid pt-4 px-4">
    <div class="bg-light rounded h-100 p-4 table-responsive">
      <div v-if="!users" class="d-flex justify-content-center">
        <div
          class="spinner-border text-primary"
          style="width: 4rem; height: 4rem"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else>
        <h6 class="mb-4">Usuarios</h6>
        <div class="row">
          <div class="col-9 col-sm-8 col-lg-9 col-md-9">
            <div class="d-flex flex-row bd-highlight mb-3">
              <input
                class="form-control border-0"
                placeholder="Buscar"
                v-model="search"
                @keyup="list()"
              />
            </div>
          </div>
          <div class="col-3 col-sm-4 col-lg-3 col-md-3">
            <div class="d-flex flex-row-reverse bd-highlight">
              <div class="btn-group my-2">
                <button
                  class="btn btn-falcon-primary btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Ver
                </button>
                <div class="dropdown-menu">
                  <a
                    class="dropdown-item"
                    :class="{ active: limit == 5 }"
                    style="cursor: pointer"
                    @click="views(5)"
                    >5</a
                  >
                  <a
                    class="dropdown-item"
                    :class="{ active: limit == 10 }"
                    style="cursor: pointer"
                    @click="views(10)"
                    >10</a
                  >
                  <a
                    class="dropdown-item"
                    style="cursor: pointer"
                    :class="{ active: limit == 15 }"
                    @click="views(15)"
                    >15</a
                  >
                  <a
                    class="dropdown-item"
                    :class="{ active: limit == 20 }"
                    style="cursor: pointer"
                    @click="views(20)"
                    >20</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ROL</th>
              <th scope="col">FECHA_REGISTRO</th>
              <th scope="col">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <th scope="row">{{ user.id }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td v-if="user.is_admin">
                <span class="badge bg-warning">ADMIN</span>
              </td>
              <td v-else>
                <span class="badge bg-success">USER</span>
              </td>

              <td>{{ formatDate(user.created_at) }}</td>
              <td>
                <div
                  class="btn-group"
                  role="group"
                  aria-label="Basic mixed styles example"
                >
                  <button
                    type="button"
                    class="btn btn-sm btn-success"
                    title="Editar"
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-danger"
                    title="Eliminar"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="...">
          <ul class="pagination pagination-sm">
            <li
              class="page-item"
              v-for="link in links"
              :key="link"
              :class="{ active: link.active == true }"
            >
              <a
                @click="next(link.label)"
                style="cursor: pointer"
                class="page-link"
                >{{ link.label }}</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      urlApi: process.env.VUE_APP_URL_API,
      token: localStorage.getItem("token"),
      users: null,
      links: [],
      page: 1,
      limit: 10,
      search: "",
      option: {},
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    async list(limit = null, page = null) {
      if (limit) {
        this.limit = limit;
      }
      if (page) {
        this.page = page;
      }
      const res = await axios.get(
        this.urlApi +
          "users-list?limit=" +
          this.limit +
          "&page=" +
          this.page +
          "&search=" +
          this.search,
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      );
      this.users = res.data.data.data;
      this.links = res.data.data.links.slice(1, res.data.data.links.length - 1);
    },
    next(num) {
      this.list(this.limit, num);
    },
    views(num) {
      this.limit = num;
      this.list(this.limit, this.page);
    },
    formatDate(value) {
      moment.locale("es");
      if (value) {
        return moment(String(value)).format("LL");
      }
    },
  },
};
</script>
