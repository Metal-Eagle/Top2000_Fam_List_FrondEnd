import { doSpotifyLogin } from "@/service/spotifyService";

const getters = {
  getUserById: (state) => (id) => {
    return state.users.find((users) => users.id === id);
  },
  getSongsCount: (state) => {
    if (state.songs === null) return 0;
    return state.songs.length;
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
  getTopSongs: (state) => {
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

    return top10Songs;
  },
  getYearsFormSongs: (state) => {
    let years = [];
    state.songs.forEach((e) => {
      let index = years.findIndex((j) => j === e.voteYear);
      if (index === -1) years.push(e.voteYear);
    });
    return years;
  },
  getVottersFormSongs: (state) => {
    let votters = [];
    state.songs.forEach((e) => {
      let index = votters.findIndex((j) => j === e.userId);
      if (index === -1) votters.push(e.userId);
    });
    return votters;
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
};

export default getters;
