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
store.setState("followers", [])
store.setState("posts", [])
store.setState("notifications", [])
store.setState("Friends", [])
store.setState("loaddata", [])
store.setState("allsave", [])
store.setState("emailView", { email: '' })
store.setState("FriendsV", [])
store.setState("followersV", [])
store.setState("msgemail", { email: '', name: '', img: '' })
store.setState("reqs", [])
export default store;