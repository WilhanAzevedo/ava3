import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
    user: {
      name: null,
      email: null,
      photo: null,
    },
    isAuth: false,
  }),
  getters: {
    double: (state) => state.count * 2,

    getUser: (state) => state.user || JSON.parse(sessionStorage.getItem("user")),

    getAuth: (state) => state.isAuth || JSON.parse(sessionStorage.getItem("isAuth")),
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },

    setUser(user) {
      this.user.name = user.displayName;
      this.user.email = user.email;
      this.user.photo = user.photoURL;

      let userLocal = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };

      sessionStorage.setItem("user", JSON.stringify(userLocal));
    },

    // set auth
    setAuth() {
      this.isAuth = true;
      sessionStorage.setItem("isAuth", JSON.stringify(this.isAuth));
    },
  },
});
