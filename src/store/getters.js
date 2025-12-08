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
  getTopSongsByYear: (state, getters) => {
    const year = getters.getLastVoteYear;
    let topSongsByYear = [];

    if (state.songs) {
      // Filter songs by the given year
      const songsForYear = state.songs.filter(song => song.voteYear === year);
      songsForYear.forEach((song) => {
        let addSong = {
          id: song.id,
          artist: song.artist,
          title: song.title,
          audio: song.audio,
          image: song.image,
          votes: 1,
          userIds: [],
        };
        let foundSong = topSongsByYear.find((r) => r.title === song.title && r.artist === song.artist);
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
          topSongsByYear.push(addSong);
        }
      });
    }
    topSongsByYear.sort((a, b) => b.votes - a.votes);
    return topSongsByYear;
  },
  getTopSongsBySelectedYear: (state) => (year) => {
    let topSongsByYear = [];

    if (state.songs) {
      const songsForYear = state.songs.filter(song => song.voteYear === year);
      songsForYear.forEach((song) => {
        let addSong = {
          id: song.id,
          artist: song.artist,
          title: song.title,
          audio: song.audio,
          image: song.image,
          votes: 1,
          userIds: [],
        };
        let foundSong = topSongsByYear.find((r) => r.title === song.title && r.artist === song.artist);
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
          topSongsByYear.push(addSong);
        }
      });
    }
    topSongsByYear.sort((a, b) => b.votes - a.votes);
    return topSongsByYear;
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
  },
  getSongVotingHistory: (state) => (title, artist) => {
    if (!state.songs) return [];

    const songVotes = state.songs.filter(
      song => song.title === title && song.artist === artist
    );

    // Group by year
    const votesByYear = {};
    songVotes.forEach(vote => {
      if (!votesByYear[vote.voteYear]) {
        votesByYear[vote.voteYear] = [];
      }
      votesByYear[vote.voteYear].push({
        userId: vote.userId,
        voteYear: vote.voteYear,
        id: vote.id
      });
    });

    return votesByYear;
  },
  getTopSongsByYearWithTieBreaker: (state, getters) => {
    const currentYear = getters.getLastVoteYear;
    const lastYear = currentYear - 1;
    let topSongsByYear = [];

    if (state.songs) {
      const songsForYear = state.songs.filter(song => song.voteYear === currentYear);
      songsForYear.forEach((song) => {
        let foundSong = topSongsByYear.find((r) => r.title === song.title && r.artist === song.artist);
        if (foundSong) {
          foundSong.votes = ++foundSong.votes;
          foundSong.userIds.push({
            id: foundSong.votes,
            userId: song.userId,
            voteYear: song.voteYear,
          });
        } else {
          topSongsByYear.push({
            id: song.id,
            artist: song.artist,
            title: song.title,
            audio: song.audio,
            image: song.image,
            votes: 1,
            userIds: [{
              id: 1,
              userId: song.userId,
              voteYear: song.voteYear,
            }],
          });
        }
      });
    }

    // Calculate last year's votes for tiebreaker
    topSongsByYear.forEach(song => {
      const lastYearVotes = state.songs.filter(
        s => s.title === song.title && s.artist === song.artist && s.voteYear === lastYear
      ).length;
      song.lastYearVotes = lastYearVotes;
    });

    // Sort by this year's votes (descending), then by last year's votes (descending)
    topSongsByYear.sort((a, b) => {
      if (b.votes !== a.votes) {
        return b.votes - a.votes;
      }
      return b.lastYearVotes - a.lastYearVotes;
    });

    const rankedSongs = topSongsByYear.slice(0, 10).map((song, index) => ({
      ...song,
      rank: index + 1
    }));

    return rankedSongs;
  },
};

export default getters;