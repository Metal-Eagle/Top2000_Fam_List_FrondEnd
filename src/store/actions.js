const actions = {
  add_MainName_and_id({
    commit
  }, items) {
    commit("ADDMAINNAMEADNID", items);
  },
  add_songs({
    commit
  }, songs) {
    commit("ADDSONGS", songs);
  },
  add_users({
    commit
  }, users) {
    commit("ADD_USERS", users);
  },
  change_playing_song({
    commit
  }, song) {
    commit("CHANGE_PLAYING_SONG", song);
  },
  show_error_msg({
    commit
  }, error) {
    const {
      timeOut = 1000, msg = "There is an error", show = true
    } = error;
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