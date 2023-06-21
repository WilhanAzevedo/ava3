<template>
  <v-container class="d-flex align-center h-screen" variant="indigo-lighten-2">
    <v-row justify="center" class="width-100">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-2" outlined tile>
          <v-form ref="form" v-model="valid" class="d-flex flex-column justify-center align-center">
            <v-text-field class="mb-2 w-100" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field class="mb-2 w-100" v-model="password" :rules="passwordRules" label="Senha" type="password" required></v-text-field>
            <v-btn class="mb-4 w-75" :disabled="!valid" @click="submit" color="success"> Entrar </v-btn>
            <v-btn class="mb-4 w-75" @click="cadastrar" color="primary"> Cadastrar </v-btn>
            <v-btn class="mb-4 w-75" @click="signIn">
              <v-icon left class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
              </v-icon>
              Entrar com Google
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
import firebase from "firebase"
import { useCounterStore } from "../store";
export default {
  data: () => ({
    valid: true,
    email: "",
    password: "",
    nome: "",
    text: "",
    snackbar: false,
    color: "success",
    emailRules: [(v) => !!v || "E-mail é obrigatório", (v) => /.+@.+\..+/.test(v) || "E-mail deve ser válido"],
    passwordRules: [(v) => !!v || "Senha é obrigatória"],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
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
            useCounterStore().setAuth(true);


            this.text = "Login realizado com sucesso!";
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
          });
      }
    },
    cadastrar() {
      this.$router.push("/cadastro");
    },
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          useCounterStore().setUser(result.user);
          useCounterStore().setAuth(true);
          this.text = "Login realizado com sucesso!";
          this.snackbar = true;

          setTimeout(() => {
            this.$router.push("/home");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);

          this.text = "Erro ao realizar login!";
          this.snackbar = true;
          
        });
    },
  },
};
</script>
