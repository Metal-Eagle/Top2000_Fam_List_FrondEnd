import {
  doSpotifyLogin
} from "@/service/spotifyService";

const getters = {
  getUserById: (state) => (id) => {
    return state.users.find((users) => users.id === id);
  },
  getIdByFullName: (state) => (fullName) => {
    return state.users.find((users) => users.fullName === fullName).id;
  },
  getSongsCount: (state) => {
    if (state.songs === null) return 0;
    return state.songs.length;
  },

  getSetOfYears: (state) => {
    const setOfYears = new Set()
    for (let i = 0; i < state.songs.length; i++) {
      const r = state.songs[i];
      const toAdd = r.voteYear
      if (!setOfYears.has(toAdd)) setOfYears.add(toAdd)
    }
    return setOfYears
  },


  getAllVoteYears: (state, getters) => {
    const setOfYears = getters.getSetOfYears

    const years = []

    for (const item of setOfYears) {
      years.push({
        "year": item
      })
    }
    return years

  },
  getLastVoteYear: (state, getters) => {
    const setOfYears = getters.getSetOfYears

    const year = new Date().getFullYear();
    let lastVoteYear = year

    if (!setOfYears.has(year)) {
      lastVoteYear = year - 1
    }
    return lastVoteYear
  },
  getMainName: (state) => {
    return state.mainName;
  },
  getMainId: (state) => {
    return state.mainId;
  },
  playingSong: (state) => {
    return state.playingSong;
  },
  getAllSongs: (state) => {
    return state.songs;
  },
  getTopSongs: (state, getters) => {
    let top10Songs = [];

    if (state.songs) {
      state.songs.forEach((song) => {
        let addSong = {
          id: song.id,
          artist: song.artist,
          title: song.title,
          audio: song.audio,
          image: song.image,
          votes: 1,
          userIds: [],
        };
        let foundSong = top10Songs.find((r) => {
          if (r.title === song.title && r.artist === song.artist) return r;
        });
        if (foundSong) {
          foundSong.votes = ++foundSong.votes;
          foundSong.userIds.push({
            id: foundSong.votes,
            userId: song.userId,
            voteYear: song.voteYear,
          });
        } else {
          addSong.userIds.push({
            id: 1,
            userId: song.userId,
            voteYear: song.voteYear,
          });
          top10Songs.push(addSong);
        }
      });
    }
    top10Songs.sort((a, b) => {
      return b.votes - a.votes;
    });
    const setOfYears = getters.getSetOfYears
    const topSongs = top10Songs.filter(r => r.userIds.length >= setOfYears.size + 1)

    return topSongs;
  },
  getYearsFormSongs: (state) => {
    let years = [];
    state.songs.forEach((e) => {
      let index = years.findIndex((j) => j === e.voteYear);
      if (index === -1) years.push(e.voteYear);
    });
    return years;
  },
  getVotersFormSongs: (state) => {
    let voters = [];
    state.songs.forEach((e) => {
      let index = voters.findIndex((j) => j === e.userId);
      if (index === -1) voters.push(e.userId);
    });
    return voters;
  },
  getSpotifyAccessToken: (state) => {
    //Check if valid token
    if (
      state.spotifyAccessToken.expiresAt <= +new Date() &&
      state.spotifyAccessToken.access_token !== null
    ) {
      //if not login again
      doSpotifyLogin();
    }
    return state.spotifyAccessToken.access_token;
  },
  getSpotifyUser: (state) => {
    return state.spotifyUser;
  },
  getError: (state) => {
    return state.error;
  },
  getUsersFromSongs: (state, getters) => {

    let userIds = getters.getVotersFormSongs

    const users = []
    // Find user By UserId
    userIds.forEach(r => {
      const userToAdd = getters.getUserById(r)
      users.push(userToAdd)
    })
    return users;
  }

};

export default getters;