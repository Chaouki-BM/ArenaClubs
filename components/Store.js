import { createStore } from 'state-pool';
const store = createStore();
store.setState("mode", "#ffffff");
store.setState("Moons", "brightness-high");
store.setState("textcoler", "#242526");
store.setState("lang", { lang: "English" })
store.setState("language", [])
store.setState("inputS", "#f2f2f2");
store.setState("maincolor", "#4169e1");
store.setState("img", "");
store.setState("email", { email: "" });
store.setState("albumS", "#DEDEDE")
store.setState("datauser", [])
store.setState("log", false)
store.setState("data", [])
store.setState("settingalbum", {
    group_name: '',
    email: '',
})
store.setState("dir", "row")
store.setState("Albums", [])
store.setState("whoareyou", "")
store.setState("membres", [])
export default store;