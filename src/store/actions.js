const actions = {
  add_MainName_and_id({ commit }, items) {
    commit("ADDMAINNAMEADNID", items);
  },
  add_songs({ commit }, songs) {
    commit("ADDSONGS", songs);
  },
  add_users({ commit }, users) {
    commit("ADD_USERS", users);
  },
  change_playing_song({ commit }, song) {
    commit("CHANGE_PLAYING_SONG", song);
  },
  add_spotify_access_token({ commit }, token) {
    //Token expiry  in 1 hour
    let expires_in_ms = token.expires_in * 1000;
    token.expiresAt = +new Date().getTime() + expires_in_ms;
    console.log("Spotify Token", token);
    commit("ADDSPOTIFYACCESSTOKEN", token);
  },
  add_spotify_user({ commit }, users) {
    commit("ADDSPOTIFYUSER", users);
  },
  show_error_msg({ commit }, error) {
    const { timeOut = 1000, msg = "There is an error", show = true } = error;
    commit("SHOWERRORMSG", {
      timeOut,
      msg,
      show,
    });
    //If timeout hide msg in time
    if (timeOut) {
      setTimeout(() => {
        commit("SHOWERRORMSG", {
          timeOut: null,
          msg: null,
          show: false,
        });
      }, timeOut);
    }
  },
};

export default actions;
