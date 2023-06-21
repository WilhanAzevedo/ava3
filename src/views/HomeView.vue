<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" expand-on-hover rail>
      <v-list>
        <v-list-item
          :prepend-avatar="user.photo"
          :title="user.name"
          :subtitle="user.email"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-calendar"
          title="Eventos"
          value="eventos"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Usuarios"
          value="usuarios"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Eventos</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- // form input user nome email cpf data de nascimento -->
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>
                <span class="headline">Dados do usuário</span>
              </v-card-title>

              <v-card-text>
                <v-form>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="user.nome"
                          label="Nome"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="user.email"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="user.cpf"
                          label="CPF"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="user.dataNascimento"
                          label="Data de nascimento"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="primary">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <!-- //list all users -->
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>
                <span class="headline">Lista de usuários</span>
              </v-card-title>

              <v-card-text>
                <v-card v-for="(user, i) in users" :key="i">
                  <v-card-title>
                    <span class="headline">{{ user.name }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="user.email"
                            label="E-mail"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="user.cpf"
                            label="CPF"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="user.dataNascimento"
                            label="Data de nascimento"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="primary">Apagar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { useCounterStore } from "../store";
export default {
  data: () => ({
    drawer: null,
    user: {
      name: null,
      email: null,
      photo: null,
    },
    headers: [
      {
        text: "Nome",
        align: "left",
        sortable: false,
        value: "name",
      },
      { text: "E-mail", value: "email" },
      { text: "CPF", value: "cpf" },
      { text: "Data de nascimento", value: "dataNascimento" },
    ],
    users: [
      {
        name: "John",
        email: "jhon@email.com",
        cpf: "12345678910",
        dataNascimento: "01/01/2000",
      },
    ],
  }),
  created() {
    
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          useCounterStore().setUser(result.user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    user() {
      console.log(sessionStorage.getItem("user"));
      return useCounterStore().getUser;
    },
  },
};
</script>
