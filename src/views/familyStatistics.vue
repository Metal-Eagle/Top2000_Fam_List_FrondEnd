<template>
  <alert />
  <navBar />
  <loading :loading="!getMainName" />
  <div v-if="getMainName && stats" class="container mt-4">
    <h2 class="mb-4 text-center">{{ getMainName }} - Family Statistics</h2>
    <div class="row text-center mb-4">
      <div class="col-4">
        <div class="p-3 bg-light rounded stats-card">
          <h2 class="mb-0 text-primary">{{ stats.totalSongs }}</h2>
          <small class="text-muted">Total Songs</small>
        </div>
      </div>
      <div class="col-4">
        <div class="p-3 bg-light rounded stats-card">
          <h2 class="mb-0 text-success">{{ stats.totalArtists }}</h2>
          <small class="text-muted">Unique Artists</small>
        </div>
      </div>
      <div class="col-4">
        <div class="p-3 bg-light rounded stats-card">
          <h2 class="mb-0 text-info">{{ stats.totalUsers }}</h2>
          <small class="text-muted">Unique Voters</small>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-6">
        <div class="p-3 bg-light rounded stats-card">
          <h4 class="mb-0 text-warning">
            {{ stats.mostVotedSong.title || "N/A" }}
          </h4>
          <small class="text-muted">Most Voted Song</small>
          <div v-if="stats.mostVotedSong.title" class="text-muted">
            {{ stats.mostVotedSong.artist }} ({{ stats.mostVotedSong.votes }}
            votes)
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="p-3 bg-light rounded stats-card">
          <h4 class="mb-0 text-danger">{{ stats.topVoter.name || "N/A" }}</h4>
          <small class="text-muted">Top Voter</small>
          <div v-if="stats.topVoter.name" class="text-muted">
            {{ stats.topVoter.count }} votes on
            {{ stats.topVoter.songCount }} songs
          </div>
        </div>
      </div>
    </div>
    <!-- More grafs: Artist and User statistics -->
    <div class="row mb-4">
      <div class="col-4">
        <div class="p-3 bg-light rounded stats-card">
          <h4 class="mb-0 text-primary">
            {{ stats.mostVotedArtist.name || "N/A" }}
          </h4>
          <small class="text-muted">Most Voted Artist</small>
          <div v-if="stats.mostVotedArtist.name" class="text-muted">
            {{ stats.mostVotedArtist.votes }} votes
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="p-3 bg-light rounded stats-card">
          <h4 class="mb-0 text-success">
            {{ stats.artistWithMostSongs.name || "N/A" }}
          </h4>
          <small class="text-muted">Artist With Most Songs</small>
          <div v-if="stats.artistWithMostSongs.name" class="text-muted">
            {{ stats.artistWithMostSongs.count }} songs
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="p-3 bg-light rounded stats-card">
          <h4 class="mb-0 text-info">
            {{ stats.userWithMostArtists.name || "N/A" }}
          </h4>
          <small class="text-muted">User With Most Unique Artists Voted</small>
          <div v-if="stats.userWithMostArtists.name" class="text-muted">
            {{ stats.userWithMostArtists.artistCount }} artists
          </div>
        </div>
      </div>
    </div>

    <!-- Evergreen & Loyalty Metrics -->
    <div class="row mb-4">
      <div class="col-3">
        <div class="p-3 bg-light rounded stats-card">
          <h4 class="mb-0 text-success">{{ stats.evergreenSongs.title }}</h4>
          <small class="text-muted">By {{ stats.evergreenSongs.artist }}</small>
          <div class="text-muted" style="font-size: 0.8rem">
            Voted Every Year (Song)
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="p-3 bg-light rounded stats-card">
          <h4 class="mb-0 text-primary">{{ stats.evergreenArtists.name }}</h4>
          <small class="text-muted"> Artists</small>
          <div class="text-muted" style="font-size: 0.8rem">
            Appeared Every Year
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="p-3 bg-light rounded stats-card">
          <h4 class="mb-0 text-warning">{{ stats.oneHitWonders.title }}</h4>
          <div class="text-muted" style="font-size: 0.8rem">
            {{ stats.oneHitWonders.artist }}
          </div>
          <small class="text-muted">One-Hit Wonders Voted Only Once</small>
        </div>
      </div>
      <div class="col-3">
        <div class="p-3 bg-light rounded stats-card">
          <h4 class="mb-0 text-info">{{ stats.comebackSongs.title }}</h4>
          <small class="text-muted">Comeback Song</small>
          <div class="text-muted" style="font-size: 0.8rem">
            Returned After Gap
          </div>
        </div>
      </div>
    </div>

    <!-- Most Consistent Songs & Artists -->
    <div class="row mb-4">
      <div class="col-6">
        <div class="p-3 bg-light rounded">
          <h5 class="mb-3">
            <i class="bi bi-arrow-repeat me-2 text-success"></i>
            Most Consistent Songs
          </h5>
          <div class="list-group">
            <div
              v-for="(song, index) in stats.mostConsistentSongs.slice(0, 5)"
              :key="index"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{{ song.title }}</strong>
                <span class="text-muted ms-2">by {{ song.artist }}</span>
              </div>
              <span class="badge bg-success rounded-pill">
                {{ song.yearCount }}/{{ stats.totalYears }} years
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="p-3 bg-light rounded">
          <h5 class="mb-3">
            <i class="bi bi-arrow-repeat me-2 text-primary"></i>
            Most Consistent Artists
          </h5>
          <div class="list-group">
            <div
              v-for="(artist, index) in stats.mostConsistentArtists.slice(0, 5)"
              :key="index"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{{ artist.name }}</strong>
              </div>
              <span class="badge bg-primary rounded-pill">
                {{ artist.yearCount }}/{{ stats.totalYears }} years
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Common Favourites -->
    <div class="row mb-4" v-if="stats.commonFavourites.length > 0">
      <div class="col-12">
        <div class="p-3 bg-light rounded">
          <h5 class="mb-3">
            <i class="bi bi-heart-fill me-2 text-danger"></i>
            Family Favourites (Voted by Multiple Members)
          </h5>
          <div class="list-group">
            <div
              v-for="(song, index) in stats.commonFavourites.slice(0, 5)"
              :key="index"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{{ song.title }}</strong>
                <span class="text-muted ms-2">by {{ song.artist }}</span>
              </div>
              <span class="badge bg-danger rounded-pill">
                {{ song.voterCount }} member{{
                  song.voterCount !== 1 ? "s" : ""
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart.js grafs -->
    <div class="row mb-4">
      <div class="col-md-6 mb-4">
        <div class="p-3 bg-light rounded stats-card">
          <h5 class="mb-3 text-center">Top 5 Voted Songs</h5>
          <canvas id="topSongsChart"></canvas>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="p-3 bg-light rounded stats-card">
          <h5 class="mb-3 text-center">Top 5 Artists by Votes</h5>
          <canvas id="topArtistsChart"></canvas>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="p-3 bg-light rounded stats-card chart-container-small">
          <h5 class="mb-3 text-center">Votes Distribution Per User</h5>
          <canvas id="votesPerUserChart"></canvas>
        </div>
      </div>
      <div class="col-md-6">
        <div
          class="p-3 bg-light rounded stats-card chart-container-scroll"
          style="height: 500px; overflow-x: auto"
        >
          <h5 class="mb-3 text-center">Songs Per Artist Distribution</h5>
          <canvas id="songsPerArtistChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import loading from "@/components/loading";
import navBar from "@/components/navBar";
import alert from "@/components/alert";
import Chart from "chart.js/auto";

export default {
  components: {
    loading,
    navBar,
    alert,
  },
  data() {
    return {
      charts: {
        topSongs: null,
        topArtists: null,
        votesPerUser: null,
        songsPerArtist: null,
      },
    };
  },
  computed: {
    ...mapGetters(["getMainName", "getAllSongs", "getUsersFromSongs"]),
    stats() {
      const songs = this.getAllSongs || [];
      const users = this.getUsersFromSongs || [];
      const artistsSet = new Set();
      const userStats = {};
      const songStats = {};
      const artistVoteStats = {};
      const artistSongStats = {};
      const userArtistStats = {};

      songs.forEach((song) => {
        const normalizedArtist = this.normalizeArtistName(song.artist);
        artistsSet.add(normalizedArtist);
        // Count votes per user
        if (!userStats[song.userId]) {
          userStats[song.userId] = { count: 0, songs: new Set() };
        }
        userStats[song.userId].count++;
        userStats[song.userId].songs.add(song.title);

        // Count votes per song
        const key = `${song.title}|${normalizedArtist}`;
        if (!songStats[key]) {
          songStats[key] = {
            title: song.title,
            artist: normalizedArtist,
            votes: 0,
          };
        }
        songStats[key].votes++;

        // Count votes per artist
        if (!artistVoteStats[normalizedArtist]) {
          artistVoteStats[normalizedArtist] = 0;
        }
        artistVoteStats[normalizedArtist]++;

        // Count songs per artist
        if (!artistSongStats[normalizedArtist]) {
          artistSongStats[normalizedArtist] = new Set();
        }
        artistSongStats[normalizedArtist].add(song.title);

        // Track unique artists per user
        if (!userArtistStats[song.userId]) {
          userArtistStats[song.userId] = new Set();
        }
        userArtistStats[song.userId].add(normalizedArtist);
      });

      // Most voted song
      const mostVotedSong =
        Object.values(songStats).sort((a, b) => b.votes - a.votes)[0] || {};

      // Top voter
      let topVoterId = null,
        maxVotes = 0;
      Object.entries(userStats).forEach(([userId, stats]) => {
        if (stats.count > maxVotes) {
          maxVotes = stats.count;
          topVoterId = userId;
        }
      });
      const topVoterUser = users.find((u) => u.id === topVoterId);
      const topVoter = topVoterUser
        ? {
            name: topVoterUser.fullName,
            count: maxVotes,
            songCount: userStats[topVoterId].songs.size,
          }
        : {};

      // Most voted artist
      const mostVotedArtistName = Object.keys(artistVoteStats).sort(
        (a, b) => artistVoteStats[b] - artistVoteStats[a]
      )[0];
      const mostVotedArtist = mostVotedArtistName
        ? {
            name: mostVotedArtistName,
            votes: artistVoteStats[mostVotedArtistName],
          }
        : {};

      // Artist with most songs
      const artistWithMostSongsName = Object.keys(artistSongStats).sort(
        (a, b) => artistSongStats[b].size - artistSongStats[a].size
      )[0];
      const artistWithMostSongs = artistWithMostSongsName
        ? {
            name: artistWithMostSongsName,
            count: artistSongStats[artistWithMostSongsName].size,
          }
        : {};

      // User with most unique artists voted
      let userWithMostArtistsId = null,
        maxArtistCount = 0;
      Object.entries(userArtistStats).forEach(([userId, artistSet]) => {
        if (artistSet.size > maxArtistCount) {
          maxArtistCount = artistSet.size;
          userWithMostArtistsId = userId;
        }
      });
      const userWithMostArtistsUser = users.find(
        (u) => u.id === userWithMostArtistsId
      );
      const userWithMostArtists = userWithMostArtistsUser
        ? {
            name: userWithMostArtistsUser.fullName,
            artistCount: maxArtistCount,
          }
        : {};

      // Calculate evergreen songs (voted every year)
      const songsByYear = {};
      songs.forEach((song) => {
        const normalizedArtist = this.normalizeArtistName(song.artist);
        const key = `${song.title}|${normalizedArtist}`;
        if (!songsByYear[key]) {
          songsByYear[key] = {
            title: song.title,
            artist: normalizedArtist,
            years: new Set(),
          };
        }
        songsByYear[key].years.add(song.voteYear);
      });
      const uniqueYears = new Set(songs.map((s) => s.voteYear));
      const totalYears = uniqueYears.size;
      const evergreenSong = Object.values(songsByYear).filter(
        (song) => song.years.size === totalYears
      )[0];

      // Calculate evergreen artists (appeared every year)
      const artistsByYear = {};
      songs.forEach((song) => {
        const normalizedArtist = this.normalizeArtistName(song.artist);
        if (!artistsByYear[normalizedArtist]) {
          artistsByYear[normalizedArtist] = {
            name: normalizedArtist,
            years: new Set(),
          };
        }
        artistsByYear[normalizedArtist].years.add(song.voteYear);
      });
      const evergreenArtist = Object.values(artistsByYear).filter(
        (artist) => artist.years.size === totalYears
      )[0];

      // Calculate most consistent songs (by year frequency)
      const mostConsistentSongs = Object.values(songsByYear)
        .map((song) => ({
          title: song.title,
          artist: song.artist,
          yearCount: song.years.size,
        }))
        .sort((a, b) => b.yearCount - a.yearCount);

      // Calculate most consistent artists (by year frequency)
      const mostConsistentArtists = Object.values(artistsByYear)
        .map((artist) => ({
          name: artist.name,
          yearCount: artist.years.size,
        }))
        .sort((a, b) => b.yearCount - a.yearCount);

      // Calculate one-hit wonders (voted exactly once across all years)
      const oneHitWonder = Object.values(songStats).filter(
        (song) => song.votes === 1
      )[0];

      // Calculate comeback songs (disappeared for years then reappeared)
      const comebackSong = Object.values(songsByYear).filter((songData) => {
        const years = songData.years;
        if (years.size < 2) return false;
        const sortedYears = Array.from(years).sort((a, b) => a - b);
        for (let i = 1; i < sortedYears.length; i++) {
          if (sortedYears[i] - sortedYears[i - 1] > 1) {
            return true;
          }
        }
        return false;
      })[0];

      // Calculate common favourites (songs voted by multiple users in same year)
      const songVoterCounts = {};
      songs.forEach((song) => {
        const normalizedArtist = this.normalizeArtistName(song.artist);
        const key = `${song.title}|${normalizedArtist}`;
        if (!songVoterCounts[key]) {
          songVoterCounts[key] = {
            title: song.title,
            artist: normalizedArtist,
            voters: new Set(),
          };
        }
        songVoterCounts[key].voters.add(song.userId);
      });
      const commonFavourites = Object.values(songVoterCounts)
        .filter((song) => song.voters.size > 1)
        .map((song) => ({
          title: song.title,
          artist: song.artist,
          voterCount: song.voters.size,
        }))
        .sort((a, b) => b.voterCount - a.voterCount);

      return {
        totalSongs: songs.length,
        totalArtists: artistsSet.size,
        totalUsers: users.length,
        totalYears,
        mostVotedSong,
        topVoter,
        mostVotedArtist,
        artistWithMostSongs,
        userWithMostArtists,
        evergreenSongs: evergreenSong,
        evergreenArtists: evergreenArtist,
        mostConsistentSongs,
        mostConsistentArtists,
        oneHitWonders: oneHitWonder,
        comebackSongs: comebackSong,
        commonFavourites,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.renderCharts();
    });
  },
  methods: {
    normalizeArtistName(artist) {
      if (!artist) return artist;
      return artist.toLowerCase().replace(/&/g, "en");
    },
    renderCharts() {
      const songs = this.getAllSongs || [];
      const users = this.getUsersFromSongs || [];
      const isMobile = window.innerWidth < 768;

      if (!songs.length) return;

      // Get top 5 songs by votes
      const songVoteMap = {};
      songs.forEach((song) => {
        const normalizedArtist = this.normalizeArtistName(song.artist);
        const key = `${song.title}|${normalizedArtist}`;
        if (!songVoteMap[key]) {
          songVoteMap[key] = {
            title: song.title,
            artist: normalizedArtist,
            votes: 0,
          };
        }
        songVoteMap[key].votes++;
      });
      const top5Songs = Object.values(songVoteMap)
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 5);

      // Top 5 artists by votes
      const artistVoteMap = {};
      songs.forEach((song) => {
        const normalizedArtist = this.normalizeArtistName(song.artist);
        if (!artistVoteMap[normalizedArtist])
          artistVoteMap[normalizedArtist] = 0;
        artistVoteMap[normalizedArtist]++;
      });
      const top5Artists = Object.entries(artistVoteMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      // Votes per user
      const userVoteMap = {};
      songs.forEach((song) => {
        if (!userVoteMap[song.userId]) userVoteMap[song.userId] = 0;
        userVoteMap[song.userId]++;
      });
      const userLabels = users.map((u) => u.fullName);
      const userVotes = users.map((u) => userVoteMap[u.id] || 0);

      // Songs per artist (unique songs count)
      const artistSongMap = {};
      songs.forEach((song) => {
        const normalizedArtist = this.normalizeArtistName(song.artist);
        if (!artistSongMap[normalizedArtist]) {
          artistSongMap[normalizedArtist] = new Set();
        }
        artistSongMap[normalizedArtist].add(song.title);
      });
      const artistLabels = Object.keys(artistSongMap);
      const artistSongCounts = artistLabels.map(
        (artist) => artistSongMap[artist].size
      );

      // Top Songs Chart
      const ctxSongs = document.getElementById("topSongsChart");
      if (ctxSongs) {
        this.charts.topSongs = new Chart(ctxSongs, {
          type: "bar",
          data: {
            labels: top5Songs.map((s) => {
              const title =
                s.title.length > 20
                  ? s.title.substring(0, 17) + "..."
                  : s.title;
              const artist =
                s.artist.length > 15
                  ? s.artist.substring(0, 12) + "..."
                  : s.artist;
              return isMobile ? `${title}\n${artist}` : `${title} - ${artist}`;
            }),
            datasets: [
              {
                label: "Votes",
                data: top5Songs.map((s) => s.votes),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true },
              x: { ticks: { font: { size: isMobile ? 10 : 12 } } },
            },
          },
        });
      }

      // Top Artists Chart
      const ctxArtists = document.getElementById("topArtistsChart");
      if (ctxArtists) {
        this.charts.topArtists = new Chart(ctxArtists, {
          type: "bar",
          data: {
            labels: top5Artists.map((a) =>
              a[0].length > 20 ? a[0].substring(0, 17) + "..." : a[0]
            ),
            datasets: [
              {
                label: "Votes",
                data: top5Artists.map((a) => a[1]),
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true },
              x: { ticks: { font: { size: isMobile ? 10 : 12 } } },
            },
          },
        });
      }

      // Votes per User Chart
      const ctxUsers = document.getElementById("votesPerUserChart");
      if (ctxUsers) {
        this.charts.votesPerUser = new Chart(ctxUsers, {
          type: "doughnut",
          data: {
            labels: userLabels.map((label) =>
              label.length > 15 ? label.substring(0, 12) + "..." : label
            ),
            datasets: [
              {
                label: "Votes",
                data: userVotes,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: isMobile ? "bottom" : "bottom",
                labels: { font: { size: isMobile ? 10 : 12 } },
              },
            },
          },
        });
      }

      // Songs per Artist Chart
      const ctxSongsPerArtist = document.getElementById("songsPerArtistChart");
      if (ctxSongsPerArtist) {
        // Sort artists by song count for better visualization
        const sortedArtistData = artistLabels
          .map((artist, index) => ({
            artist,
            count: artistSongCounts[index],
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, isMobile ? 10 : 20);

        // Use the same color palette as votesPerUserChart
        const colorPalette = [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ];
        const borderPalette = [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ];

        this.charts.songsPerArtist = new Chart(ctxSongsPerArtist, {
          type: "bar",
          data: {
            labels: sortedArtistData.map((d) =>
              d.artist.length > 20
                ? d.artist.substring(0, 17) + "..."
                : d.artist
            ),
            datasets: [
              {
                label: "Unique Songs",
                data: sortedArtistData.map((d) => d.count),
                backgroundColor: sortedArtistData.map(
                  (_, i) => colorPalette[i % colorPalette.length]
                ),
                borderColor: sortedArtistData.map(
                  (_, i) => borderPalette[i % borderPalette.length]
                ),
                borderWidth: 2,
              },
            ],
          },
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.label}: ${context.parsed.x} songs`;
                  },
                },
              },
              title: {
                display: !isMobile,
                text: `Top ${isMobile ? 10 : 20} Artists by Unique Songs`,
                font: { size: 16 },
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: !isMobile,
                  text: "Number of Unique Songs",
                  font: { size: 12 },
                },
                ticks: { font: { size: isMobile ? 9 : 12 } },
              },
              y: {
                title: {
                  display: false,
                },
                ticks: { font: { size: isMobile ? 9 : 12 } },
              },
            },
          },
        });
      }
    },
  },
};
</script>
