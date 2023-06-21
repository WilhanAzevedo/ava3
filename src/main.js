import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createPinia } from "pinia";
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAc-1vwYDF-lnwawSQ7IBBiO6zNJcnvJnc",
  authDomain: "ava3-dfa82.firebaseapp.com",
  projectId: "ava3-dfa82",
  storageBucket: "ava3-dfa82.appspot.com",
  messagingSenderId: "645766856112",
  appId: "1:645766856112:web:28bef7ff954f0ce0a3aa75",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

loadFonts();

createApp(App).use(createPinia()).use(router).use(vuetify).mount("#app");
