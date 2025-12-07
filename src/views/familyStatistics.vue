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
        <div class="p-3 bg-light rounded stats-card chart-container-small">
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
        artistsSet.add(song.artist);
        // Count votes per user
        if (!userStats[song.userId]) {
          userStats[song.userId] = { count: 0, songs: new Set() };
        }
        userStats[song.userId].count++;
        userStats[song.userId].songs.add(song.title);

        // Count votes per song
        const key = `${song.title}|${song.artist}`;
        if (!songStats[key]) {
          songStats[key] = { title: song.title, artist: song.artist, votes: 0 };
        }
        songStats[key].votes++;

        // Count votes per artist
        if (!artistVoteStats[song.artist]) {
          artistVoteStats[song.artist] = 0;
        }
        artistVoteStats[song.artist]++;

        // Count songs per artist
        if (!artistSongStats[song.artist]) {
          artistSongStats[song.artist] = new Set();
        }
        artistSongStats[song.artist].add(song.title);

        // Track unique artists per user
        if (!userArtistStats[song.userId]) {
          userArtistStats[song.userId] = new Set();
        }
        userArtistStats[song.userId].add(song.artist);
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

      return {
        totalSongs: songs.length,
        totalArtists: artistsSet.size,
        totalUsers: users.length,
        mostVotedSong,
        topVoter,
        mostVotedArtist,
        artistWithMostSongs,
        userWithMostArtists,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.renderCharts();
    });
  },
  beforeUnmount() {
    // Destroy charts to prevent memory leaks
    Object.values(this.charts).forEach((chart) => {
      if (chart) chart.destroy();
    });
  },
  methods: {
    renderCharts() {
      const songs = this.getAllSongs || [];
      const users = this.getUsersFromSongs || [];

      if (!songs.length) return;

      // Get top 5 songs by votes
      const songVoteMap = {};
      songs.forEach((song) => {
        const key = `${song.title}|${song.artist}`;
        if (!songVoteMap[key]) {
          songVoteMap[key] = {
            title: song.title,
            artist: song.artist,
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
        if (!artistVoteMap[song.artist]) artistVoteMap[song.artist] = 0;
        artistVoteMap[song.artist]++;
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
        if (!artistSongMap[song.artist]) {
          artistSongMap[song.artist] = new Set();
        }
        artistSongMap[song.artist].add(song.title);
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
            labels: top5Songs.map((s) => `${s.title} - ${s.artist}`),
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
            scales: { y: { beginAtZero: true } },
          },
        });
      }

      // Top Artists Chart
      const ctxArtists = document.getElementById("topArtistsChart");
      if (ctxArtists) {
        this.charts.topArtists = new Chart(ctxArtists, {
          type: "bar",
          data: {
            labels: top5Artists.map((a) => a[0]),
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
            scales: { y: { beginAtZero: true } },
          },
        });
      }

      // Votes per User Chart
      const ctxUsers = document.getElementById("votesPerUserChart");
      if (ctxUsers) {
        this.charts.votesPerUser = new Chart(ctxUsers, {
          type: "doughnut",
          data: {
            labels: userLabels,
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
            plugins: { legend: { position: "bottom" } },
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
          .slice(0, 20);

        this.charts.songsPerArtist = new Chart(ctxSongsPerArtist, {
          type: "bar",
          data: {
            labels: sortedArtistData.map((d) => d.artist),
            datasets: [
              {
                label: "Unique Songs",
                data: sortedArtistData.map((d) => d.count),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Number of Unique Songs",
                },
              },
            },
          },
        });
      }
    },
  },
};
</script>
