import axios from "axios";
const backEndUrl = process.env.VUE_APP_BACKEND_URL;

async function addFamily(list, cb) {
  const config = {
    method: "post",
    url: `${backEndUrl}/api/v1/family`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(list),
  };

  axios(config)
    .then((resp) => {
      cb(resp.data);
    })
    .catch((err) => {
      console.error("ERROR", err);
      cb(err);
    });
}

async function addSpotifyList(spotifyList, cb) {
  const config = {
    method: "post",
    url: `${backEndUrl}/api/v1/spotifyList`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(spotifyList),
  };

  axios(config)
    .then((resp) => {
      cb(resp.data);
    })
    .catch((err) => {
      console.error("ERROR", err);
      cb(err);
    });
}

async function updateUser(user, cb) {
  const list = {
    familyId: user.familyId,
    userId: user.id,
    secret: user.secret,
    years: user.year,
  };
  const config = {
    method: "put",
    url: `${backEndUrl}/api/v1/user`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(list),
  };

  axios(config)
    .then((resp) => {
      cb(resp.data);
    })
    .catch((err) => {
      console.error("ERROR", err);
      cb(err);
    });
}

export { addFamily, addSpotifyList, updateUser };
