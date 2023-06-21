<template>
  <v-container class="d-flex align-center h-screen" variant="indigo-lighten-2">
    <v-row justify="center" class="width-100">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-2" outlined tile>
          <v-form
            ref="form"
            v-model="valid"
            class="d-flex flex-column justify-center align-center"
          >
            <v-text-field
              class="mb-2 w-100"
              v-model="nome"
              :rules="nomeRules"
              label="Nome"
              required
            ></v-text-field>
            <v-text-field
              class="mb-2 w-100"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              class="mb-2 w-100"
              v-model="password"
              :rules="passwordRules"
              label="Senha"
              type="password"
              required
            ></v-text-field>
            <v-btn class="mb-4 w-75" @click="cadastrar" color="primary">
              Cadastrar
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :color="color" :timeout="2000">
      {{ text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from "firebase";
import { useCounterStore } from "../store";
export default {
  data: () => ({
    valid: true,
    snackbar: false,
    color: "success",
    text: "",
    email: "",
    password: "",
    nome: "",
    emailRules: [
      (v) => !!v || "E-mail é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
    ],
    passwordRules: [(v) => !!v || "Senha é obrigatória"],
    nomeRules: [
      (v) => !!v || "Nome é obrigatório",
      (v) => (v && v.length >= 3) || "Nome deve ter pelo menos 3 caracteres",
    ],
  }),
  methods: {
    cadastrar() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((user) => {
            console.log(user);
            let localUser = {
              displayName: this.nome,
              email: this.email,
              //api image placeholder
              photoURL:
                "https://ui-avatars.com/api/?" +
                encodeURI(
                  "name=" + this.nome + "&background=0D8ABC&color=fff&size=128"
                ),
            };

            useCounterStore().setUser(localUser);

            this.text = "Cadastro realizado com sucesso!";
            this.snackbar = true;

            setTimeout(() => {
                this.$router.push("/home");
            }, 2000);
            
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            this.snackbar = true;
            this.color = "error";
            this.text = errorMessage;
          });
      }
    },
  },
};
</script>
