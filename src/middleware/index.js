import { useCounterStore } from "../store";
import router from "../router";

export default function auth(to, from, next) {
    const store = useCounterStore();
    if (store.getAuth) {
        console.log(to)
        return true;
    } else {
        console.log(to) 
        return router.push({ name: "login" });
    }
}