import axios from "axios";
import store from "@/store/index";
const backEndUrl = process.env.VUE_APP_BACKEND_URL;

async function getSongByIdAndSetInStore(id) {
  let url = `${backEndUrl}/api/v1/family?id=${id}`;

  axios
    .get(url)
    .then((resp) => {
      store.dispatch("add_users", resp.data.users);
      store.dispatch("add_MainName_and_id", resp.data);
      store.dispatch("add_songs", resp.data.songs);
    })
    .catch((err) => {
      console.error(err);
    });
}

async function getSongByName(name, cb) {
  let url = `${backEndUrl}/api/v1/family?name=${name}`;

  axios.get(url).then((resp) => {
    cb(resp.data);
  });
}

export { getSongByIdAndSetInStore, getSongByName };
