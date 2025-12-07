<template>
  <!-- Modal -->
  <div class="modal fade" id="songDetailsModal">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            class="modal-title"
            id="songDetailsModalLabel"
            v-if="props.selectedSong"
          >
            Details: {{ props.selectedSong.title }} by
            {{ props.selectedSong.artist }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="atClose"
          ></button>
        </div>

        <div class="modal-body" v-if="showDetails">
          <!-- Centered Image -->
          <div class="text-center mb-4">
            <img
              :src="getImage()"
              v-if="!imgError && getImage()"
              alt="cover"
              class="img-fluid rounded shadow"
              style="max-width: 300px; max-height: 300px"
              @error="handleImageError"
            />

            <svg
              v-else
              class="img-fluid rounded shadow"
              width="300"
              height="300"
              viewBox="0 0 1119.000000 1280.000000"
              style="max-width: 300px; max-height: 300px"
            >
              <g
                transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
              >
                <path
                  d="M5232 12787 c-39 -18 -167 -186 -349 -457 -247 -368 -442 -606 -773
            -944 -690 -704 -1483 -1253 -2435 -1686 -88 -40 -203 -97 -255 -127 -690 -392
            -1142 -1162 -1329 -2266 -132 -773 -116 -1772 40 -2539 33 -165 80 -331 109
            -388 25 -50 67 -82 94 -74 77 23 117 126 231 584 223 896 455 1399 805 1751
            190 191 365 296 667 400 201 69 352 105 878 209 471 93 734 171 970 285 142
            69 285 162 357 232 56 55 86 63 74 19 -6 -19 -93 -721 -281 -2261 -41 -335
            -124 -1017 -185 -1515 -61 -498 -128 -1049 -150 -1225 -21 -176 -53 -435 -70
            -575 -41 -327 -42 -455 -5 -606 53 -221 174 -423 375 -625 180 -181 357 -314
            605 -454 488 -277 1060 -438 1800 -507 180 -16 732 -16 885 0 438 48 763 124
            1090 254 527 210 891 495 1061 830 84 167 120 320 120 513 0 329 -128 605
            -415 890 -450 447 -1161 768 -1981 894 -576 89 -1174 89 -1675 0 -415 -73
            -827 -227 -1128 -421 -34 -22 -64 -39 -67 -37 -2 3 63 551 146 1219 82 668
            264 2153 404 3300 140 1147 309 2524 375 3060 190 1548 220 1815 220 1949 0
            244 -87 377 -208 318z"
                />
                <path
                  d="M9949 11573 c-20 -27 -51 -70 -69 -98 -94 -141 -279 -331 -440 -452
            -126 -94 -235 -159 -406 -244 -162 -79 -236 -140 -308 -248 -79 -119 -137
            -283 -167 -476 -30 -186 -11 -568 36 -722 31 -105 52 -83 105 112 71 255 125
            372 218 468 82 85 162 119 376 163 224 45 322 79 403 140 17 13 33 24 35 24 2
            0 -20 -192 -49 -427 -167 -1367 -157 -1258 -118 -1341 33 -72 74 -120 153
            -179 123 -94 275 -157 453 -190 127 -23 413 -23 516 0 236 54 410 161 473 292
            34 72 35 190 1 260 -64 130 -236 255 -437 318 -155 49 -244 61 -444 61 -167
            -1 -194 -3 -285 -27 -55 -15 -135 -45 -179 -67 -44 -22 -81 -38 -82 -37 -2 2
            53 457 121 1012 210 1717 199 1621 186 1666 -17 56 -46 53 -92 -8z"
                />
                <path
                  d="M7563 8208 c-11 -13 -40 -52 -63 -88 -63 -94 -238 -265 -350 -339
            -52 -35 -143 -88 -204 -118 -179 -90 -257 -182 -311 -368 -53 -184 -52 -462 1
            -647 11 -36 33 -18 49 40 80 289 140 390 260 442 23 10 103 32 180 49 137 31
            232 66 268 99 18 16 18 15 13 -8 -3 -14 -35 -271 -71 -571 -74 -606 -73 -589
            -10 -671 60 -80 171 -142 330 -186 88 -25 368 -24 448 1 136 42 230 105 269
            181 29 55 29 137 1 191 -118 225 -608 330 -899 191 l-73 -35 5 27 c4 22 161
            1311 205 1680 9 77 9 108 1 127 -14 31 -23 31 -49 3z"
                />
              </g>
            </svg>
          </div>

          <!-- Statistics Summary -->
          <div class="row text-center mb-4">
            <div class="col-4">
              <div class="p-3 bg-light rounded stats-card">
                <h2 class="mb-0 text-primary">{{ totalVotes }}</h2>
                <small class="text-muted">Total Votes</small>
              </div>
            </div>
            <div class="col-4">
              <div class="p-3 bg-light rounded stats-card">
                <h2 class="mb-0 text-success">{{ uniqueYears.length }}</h2>
                <small class="text-muted">Years Voted</small>
              </div>
            </div>
            <div class="col-4">
              <div class="p-3 bg-light rounded stats-card">
                <h2 class="mb-0 text-info">{{ uniqueVoters }}</h2>
                <small class="text-muted">Unique Voters</small>
              </div>
            </div>
          </div>

          <!-- Additional Stats Row -->
          <div class="row text-center mb-4">
            <div class="col-6">
              <div class="p-3 bg-light rounded stats-card">
                <h6 class="mb-1 text-warning">
                  {{ mostPopularYear.year || "N/A" }}
                </h6>
                <small class="text-muted">Most Popular Year</small>
                <div
                  v-if="mostPopularYear.year"
                  class="text-muted"
                  style="font-size: 0.8rem"
                >
                  {{ mostPopularYear.count }} vote{{
                    mostPopularYear.count !== 1 ? "s" : ""
                  }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="p-3 bg-light rounded stats-card">
                <h6 class="mb-1 text-danger">
                  {{ mostFrequentVoter || "N/A" }}
                </h6>
                <small class="text-muted">Most Frequent Voter</small>
                <div
                  v-if="mostFrequentVoter"
                  class="text-muted"
                  style="font-size: 0.8rem"
                >
                  {{ mostFrequentVoterCount }} time{{
                    mostFrequentVoterCount !== 1 ? "s" : ""
                  }}
                </div>
              </div>
            </div>
          </div>

          <!-- Song Longevity & Comeback Info -->
          <div class="row text-center mb-4">
            <div class="col-6">
              <div class="p-3 bg-light rounded stats-card">
                <h6 class="mb-1 text-success">
                  {{ songLongevity.years }} / {{ songLongevity.totalYears }}
                </h6>
                <small class="text-muted">Song Longevity (Years Voted)</small>
                <div
                  v-if="songLongevity.isEvergreen"
                  class="text-success"
                  style="font-size: 0.8rem"
                ></div>
              </div>
            </div>
            <div class="col-6">
              <div class="p-3 bg-light rounded stats-card">
                <h6 class="mb-1 text-info">
                  {{ songLongevity.isComeback ? "Yes" : "No" }}
                </h6>
                <small class="text-muted">Comeback Song</small>
                <div
                  v-if="songLongevity.isComeback"
                  class="text-muted"
                  style="font-size: 0.8rem"
                >
                  Returned after gap
                </div>
              </div>
            </div>
          </div>

          <!-- Voting Trend Chart -->
          <div class="mb-4" v-if="sortedYears.length > 1">
            <h6 class="fw-bold mb-3">
              <i class="bi bi-graph-up me-2"></i>
              Voting Trend
            </h6>
            <div class="bg-light rounded p-3">
              <Line :data="chartData" :options="chartOptions" />
            </div>
          </div>

          <!-- Artist Statistics Section -->
          <div class="mb-4" v-if="artistStats">
            <h6 class="fw-bold mb-3">
              <i class="bi bi-music-note-beamed me-2"></i>
              Artist Statistics - {{ props.selectedSong.artist }}
            </h6>

            <div class="row text-center mb-3">
              <div class="col-4">
                <div class="p-3 bg-light rounded stats-card">
                  <h4 class="mb-0 text-primary">
                    {{ artistStats.totalSongs }}
                  </h4>
                  <small class="text-muted">Total Songs Voted</small>
                </div>
              </div>
              <div class="col-4">
                <div class="p-3 bg-light rounded stats-card">
                  <h4 class="mb-0 text-success">
                    {{ artistStats.totalVotes }}
                  </h4>
                  <small class="text-muted">Total Artist Votes</small>
                </div>
              </div>
              <div class="col-4">
                <div class="p-3 bg-light rounded stats-card">
                  <h4 class="mb-0 text-info">{{ artistStats.uniqueVoters }}</h4>
                  <small class="text-muted">Unique Voters</small>
                </div>
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-12">
                <div class="p-3 bg-light rounded">
                  <h6 class="mb-2">
                    <i class="bi bi-trophy-fill me-2 text-warning"></i>
                    Biggest Fan
                  </h6>
                  <div v-if="artistStats.topVoter">
                    <strong class="text-primary">{{
                      artistStats.topVoter.name
                    }}</strong>
                    <span class="text-muted ms-2">
                      - {{ artistStats.topVoter.count }} vote{{
                        artistStats.topVoter.count !== 1 ? "s" : ""
                      }}
                      on {{ artistStats.topVoter.songCount }} song{{
                        artistStats.topVoter.songCount !== 1 ? "s" : ""
                      }}
                    </span>
                  </div>
                  <div v-else class="text-muted">No data available</div>
                </div>
              </div>
            </div>

            <!-- Top voted songs by this artist -->
            <div
              v-if="artistStats.topSongs && artistStats.topSongs.length > 0"
              class="mb-3"
            >
              <h6 class="mb-2">
                <i class="bi bi-star-fill me-2 text-warning"></i>
                Most Voted Songs by {{ props.selectedSong.artist }}
              </h6>
              <div class="list-group">
                <div
                  v-for="(song, index) in artistStats.topSongs"
                  :key="index"
                  class="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <span class="badge bg-secondary me-2">{{ index + 1 }}</span>
                    <strong>{{ song.title }}</strong>
                  </div>
                  <span class="badge bg-primary rounded-pill">
                    {{ song.voteCount }} vote{{
                      song.voteCount !== 1 ? "s" : ""
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- First & Last Vote Info -->
          <div class="row mb-4" v-if="firstVote && lastVote">
            <div class="col-6">
              <div class="p-3 bg-light rounded">
                <h6 class="mb-2">
                  <i class="bi bi-star-fill me-2 text-warning"></i>
                  First Vote
                </h6>
                <div class="text-muted" style="font-size: 0.9rem">
                  <strong>{{ firstVote.year }}</strong> by {{ firstVote.user }}
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="p-3 bg-light rounded">
                <h6 class="mb-2">
                  <i class="bi bi-clock-fill me-2 text-primary"></i>
                  Latest Vote
                </h6>
                <div class="text-muted" style="font-size: 0.9rem">
                  <strong>{{ lastVote.year }}</strong> by {{ lastVote.user }}
                </div>
              </div>
            </div>
          </div>

          <!-- Voting History -->
          <div class="voting-history">
            <h6 class="fw-bold mb-3">
              <i class="bi bi-clock-history me-2"></i>
              Voting History
            </h6>

            <div class="accordion" id="votingHistoryAccordion">
              <div
                v-for="year in sortedYears"
                :key="year"
                class="accordion-item"
              >
                <h2 class="accordion-header" :id="`heading${year}`">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#collapse${year}`"
                    :aria-expanded="false"
                    :aria-controls="`collapse${year}`"
                  >
                    <strong>{{ year }}</strong>
                    <span class="badge bg-primary rounded-pill ms-2">
                      {{ votesByYear[year].length }} vote{{
                        votesByYear[year].length !== 1 ? "s" : ""
                      }}
                    </span>
                  </button>
                </h2>
                <div
                  :id="`collapse${year}`"
                  class="accordion-collapse collapse"
                  :aria-labelledby="`heading${year}`"
                  data-bs-parent="#votingHistoryAccordion"
                >
                  <div class="accordion-body p-0">
                    <div class="list-group list-group-flush">
                      <div
                        v-for="vote in sortedVotesByYear(year)"
                        :key="`${vote.userId}-${vote.voteYear}`"
                        class="list-group-item d-flex justify-content-between align-items-center vote-item"
                      >
                        <div>
                          <i class="bi bi-person-fill me-2 text-primary"></i>
                          <strong>{{ getUserName(vote.userId) }}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="sortedYears.length === 0"
                class="text-muted text-center p-3"
              >
                No voting history available
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="atClose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const imgError = ref(false);
const store = useStore();

const props = defineProps(["selectedSong"]);

function atClose() {
  imgError.value = false;
}

const showDetails = computed(() => {
  atClose();
  if (props.selectedSong !== null) return true;
  return false;
});

function getImage() {
  if (!props.selectedSong?.imageBig) {
    imgError.value = true;
    return null;
  }
  return props.selectedSong.imageBig;
}

function handleImageError() {
  imgError.value = true;
}

// Get voting history grouped by year
const votesByYear = computed(() => {
  if (!props.selectedSong) return {};

  return store.getters.getSongVotingHistory(
    props.selectedSong.title,
    props.selectedSong.artist
  );
});

// Get sorted years (most recent first)
const sortedYears = computed(() => {
  return Object.keys(votesByYear.value)
    .map(Number)
    .sort((a, b) => b - a);
});

// Sort votes within a year by user name
const sortedVotesByYear = (year) => {
  const votes = votesByYear.value[year] || [];
  return [...votes].sort((a, b) =>
    getUserName(a.userId).localeCompare(getUserName(b.userId))
  );
};

// Get user name by ID
const getUserName = (userId) => {
  const user = store.getters.getUserById(userId);
  return user ? user.fullName : "Unknown User";
};

// Calculate total votes across all years
const totalVotes = computed(() => {
  if (!props.selectedSong) return 0;

  // Calculate from votesByYear
  let total = 0;
  Object.values(votesByYear.value).forEach((yearVotes) => {
    total += yearVotes.length;
  });

  return total;
});

// Get unique years
const uniqueYears = computed(() => {
  return sortedYears.value;
});

// Count unique voters across all years
const uniqueVoters = computed(() => {
  if (!props.selectedSong) return 0;

  const voterIds = new Set();
  Object.values(votesByYear.value).forEach((yearVotes) => {
    yearVotes.forEach((vote) => voterIds.add(vote.userId));
  });

  return voterIds.size;
});

// Find most popular year (year with most votes)
const mostPopularYear = computed(() => {
  if (!props.selectedSong || sortedYears.value.length === 0) {
    return { year: null, count: 0 };
  }

  let maxYear = sortedYears.value[0];
  let maxCount = votesByYear.value[maxYear].length;

  sortedYears.value.forEach((year) => {
    const count = votesByYear.value[year].length;
    if (count > maxCount) {
      maxCount = count;
      maxYear = year;
    }
  });

  return { year: maxYear, count: maxCount };
});

// Find most frequent voter
const mostFrequentVoter = computed(() => {
  if (!props.selectedSong) return null;

  const voterCounts = {};
  Object.values(votesByYear.value).forEach((yearVotes) => {
    yearVotes.forEach((vote) => {
      voterCounts[vote.userId] = (voterCounts[vote.userId] || 0) + 1;
    });
  });

  let maxUserId = null;
  let maxCount = 0;

  Object.entries(voterCounts).forEach(([userId, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxUserId = userId;
    }
  });
  return maxUserId ? getUserName(maxUserId) : null;
});

const mostFrequentVoterCount = computed(() => {
  if (!props.selectedSong || !mostFrequentVoter.value) return 0;

  const voterCounts = {};
  Object.values(votesByYear.value).forEach((yearVotes) => {
    yearVotes.forEach((vote) => {
      voterCounts[vote.userId] = (voterCounts[vote.userId] || 0) + 1;
    });
  });

  return Math.max(...Object.values(voterCounts));
});

// Calculate song longevity
const songLongevity = computed(() => {
  if (!props.selectedSong || sortedYears.value.length === 0) {
    return {
      years: 0,
      totalYears: 0,
      isEvergreen: false,
      isComeback: false,
    };
  }

  const allSongs = store.getters.getAllSongs || [];
  const uniqueYears = new Set(allSongs.map((s) => s.voteYear));
  const totalYears = uniqueYears.size;
  const yearsVoted = sortedYears.value.length;
  const isEvergreen = yearsVoted === totalYears;

  // Check if it's a comeback song
  let isComeback = false;
  if (sortedYears.value.length > 1) {
    const sortedChronological = [...sortedYears.value].sort((a, b) => a - b);
    for (let i = 1; i < sortedChronological.length; i++) {
      if (sortedChronological[i] - sortedChronological[i - 1] > 1) {
        isComeback = true;
        break;
      }
    }
  }

  return {
    years: yearsVoted,
    totalYears: totalYears,
    isEvergreen: isEvergreen,
    isComeback: isComeback,
  };
});

// Get first vote info
const firstVote = computed(() => {
  if (!props.selectedSong || sortedYears.value.length === 0) return null;

  const earliestYear = sortedYears.value[sortedYears.value.length - 1];
  const votes = votesByYear.value[earliestYear];

  if (!votes || votes.length === 0) return null;

  return {
    year: earliestYear,
    user: getUserName(votes[0].userId),
  };
});

// Get last vote info
const lastVote = computed(() => {
  if (!props.selectedSong || sortedYears.value.length === 0) return null;

  const latestYear = sortedYears.value[0];
  const votes = votesByYear.value[latestYear];

  if (!votes || votes.length === 0) return null;

  return {
    year: latestYear,
    user: getUserName(votes[votes.length - 1].userId),
  };
});

// Chart data
const chartData = computed(() => {
  if (!props.selectedSong || sortedYears.value.length === 0) {
    return {
      labels: [],
      datasets: [],
    };
  }
  const yearsChronological = [...sortedYears.value].reverse();

  return {
    labels: yearsChronological,
    datasets: [
      {
        label: "Votes per Year",
        data: yearsChronological.map((year) => votesByYear.value[year].length),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };
});

// Chart options
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.parsed.y} vote${context.parsed.y !== 1 ? "s" : ""}`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        precision: 0,
      },
      title: {
        display: true,
        text: "Number of Votes",
      },
    },
    x: {
      title: {
        display: true,
        text: "Year",
      },
    },
  },
}));

onMounted(() => {
  const songDetailsModal = document.getElementById("songDetailsModal");
  songDetailsModal.addEventListener("hidden.bs.modal", () => {
    atClose();
  });
});

// Artist Statistics
const artistStats = computed(() => {
  if (!props.selectedSong) return null;

  const artist = props.selectedSong.artist;

  // Get all songs by this artist from the store
  const allSongs = store.getters.getAllSongs || [];
  const artistSongs = allSongs.filter((song) => song.artist === artist);

  if (artistSongs.length === 0) return null;

  // Use a Set to track unique songs (title only, since same artist)
  const uniqueSongTitles = new Set();
  artistSongs.forEach((song) => uniqueSongTitles.add(song.title));

  // Collect all votes for this artist - count each song entry as one vote
  const voterStats = {};
  const songVoteCounts = {};

  artistSongs.forEach((song) => {
    const songKey = song.title;

    if (!songVoteCounts[songKey]) {
      songVoteCounts[songKey] = 0;
    }
    songVoteCounts[songKey]++;

    // Track votes per user per song
    if (!voterStats[song.userId]) {
      voterStats[song.userId] = {
        count: 0,
        songs: new Set(),
      };
    }
    voterStats[song.userId].count++;
    voterStats[song.userId].songs.add(song.title);
  });

  // Find top voter
  let topVoter = null;
  let maxVotes = 0;
  let topVoterId = null;

  Object.entries(voterStats).forEach(([userId, stats]) => {
    if (stats.count > maxVotes) {
      maxVotes = stats.count;
      topVoterId = userId;
    }
  });

  if (topVoterId) {
    topVoter = {
      name: getUserName(topVoterId),
      count: voterStats[topVoterId].count,
      songCount: voterStats[topVoterId].songs.size,
    };
  }

  // Convert songVoteCounts to array and sort
  const topSongs = Object.entries(songVoteCounts)
    .map(([title, voteCount]) => ({ title, voteCount }))
    .sort((a, b) => b.voteCount - a.voteCount)
    .slice(0, 5);

  return {
    totalSongs: uniqueSongTitles.size,
    totalVotes: artistSongs.length,
    uniqueVoters: Object.keys(voterStats).length,
    topVoter: topVoter,
    topSongs: topSongs,
  };
});
</script>
