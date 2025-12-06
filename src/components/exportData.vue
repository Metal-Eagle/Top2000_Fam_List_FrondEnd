<template>
  <!-- Button trigger modal -->
  <div
    class="btn btn-outline-main"
    data-bs-toggle="modal"
    data-bs-target="#exportData"
  >
    Export Data
  </div>

  <div
    class="modal fade"
    id="exportData"
    tabindex="-1"
    aria-labelledby="exportDataLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exportDataLabel">Export Song Data</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label">Select Voter</label>
              <select class="form-select" v-model="selectedVoter">
                <option :value="null">All voters</option>
                <option
                  v-for="voter in getUsersFromSongs"
                  :key="voter.id"
                  :value="voter.id"
                >
                  {{ voter.fullName }}
                </option>
              </select>
            </div>

            <div class="col-md-6">
              <label class="form-label">Select Year</label>
              <select class="form-select" v-model="selectedYear">
                <option :value="null">All years</option>
                <option
                  v-for="year in getAllVoteYears"
                  :key="year.year"
                  :value="year.year"
                >
                  {{ year.year }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Export Format</label>
            <select class="form-select" v-model="exportFormat">
              <option value="csv">CSV (Comma Separated)</option>
              <option value="tsv">TSV (Tab Separated)</option>
              <option value="markdown">Markdown Table</option>
              <option value="plain">Plain Text</option>
              <option value="simple">Simple List (Artist - Title)</option>
            </select>
          </div>

          <div class="alert alert-info" role="alert">
            <strong>{{ filteredSongs.length }}</strong> songs will be exported
          </div>

          <div v-if="exportPreview" class="mb-3">
            <label class="form-label">Preview:</label>
            <textarea
              class="form-control"
              rows="8"
              :value="exportPreview"
              readonly
              style="font-family: monospace; font-size: 0.85rem"
            ></textarea>
          </div>

          <div v-if="copySuccess" class="alert alert-success" role="alert">
            ✓ Copied to clipboard!
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-info"
            @click="openTuneMyMusic"
            title="Transfer songs to streaming services"
          >
            🎵 Transfer to Streaming Service
          </button>
          <button
            type="button"
            class="btn btn-outline-main"
            @click="copyToClipboard"
            :disabled="filteredSongs.length === 0"
          >
            <span v-if="!copying">📋 Copy to Clipboard</span>
            <span v-else>
              <span class="spinner-border spinner-border-sm"></span> Copying...
            </span>
          </button>
          <button
            type="button"
            class="btn btn-outline-main"
            @click="downloadFile"
            :disabled="filteredSongs.length === 0"
          >
            💾 Download File
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "exportData",
  data() {
    return {
      selectedVoter: null,
      selectedYear: null,
      exportFormat: "simple",
      copySuccess: false,
      copying: false,
    };
  },
  computed: {
    ...mapGetters([
      "getAllSongs",
      "getUsersFromSongs",
      "getAllVoteYears",
      "getUserById",
      "getMainName",
    ]),
    filteredSongs() {
      let songs = this.getAllSongs;

      if (this.selectedVoter !== null) {
        songs = songs.filter((song) => song.userId === this.selectedVoter);
      }

      if (this.selectedYear !== null) {
        songs = songs.filter((song) => song.voteYear === this.selectedYear);
      }

      return songs;
    },
    exportPreview() {
      if (this.filteredSongs.length === 0) return "";

      const preview = this.filteredSongs.slice(0, 5);
      return (
        this.generateExportData(preview) +
        (this.filteredSongs.length > 5
          ? "\n... (" + (this.filteredSongs.length - 5) + " more rows)"
          : "")
      );
    },
  },
  methods: {
    generateExportData(songs = null) {
      const data = songs || this.filteredSongs;

      switch (this.exportFormat) {
        case "csv":
          return this.generateCSV(data);
        case "tsv":
          return this.generateTSV(data);
        case "markdown":
          return this.generateMarkdown(data);
        case "plain":
          return this.generatePlainText(data);
        case "simple":
          return this.generateSimpleList(data);
        default:
          return this.generateCSV(data);
      }
    },
    generateCSV(songs) {
      const header = "Artist,Title,Voter,Year\n";
      const rows = songs.map((song) => {
        const artist = this.escapeCSV(song.artist);
        const title = this.escapeCSV(song.title);
        const voter = this.escapeCSV(song.voterName || "Unknown");
        return `${artist},${title},${voter},${song.voteYear}`;
      });
      return header + rows.join("\n");
    },
    generateTSV(songs) {
      const header = "Artist\tTitle\tVoter\tYear\n";
      const rows = songs.map((song) => {
        const artist = song.artist.replace(/\t/g, " ");
        const title = song.title.replace(/\t/g, " ");
        const voter = (song.voterName || "Unknown").replace(/\t/g, " ");
        return `${artist}\t${title}\t${voter}\t${song.voteYear}`;
      });
      return header + rows.join("\n");
    },
    generateMarkdown(songs) {
      let output = "| Artist | Title | Voter | Year |\n";
      output += "|--------|-------|-------|------|\n";
      songs.forEach((song) => {
        const artist = this.escapeMarkdown(song.artist);
        const title = this.escapeMarkdown(song.title);
        const voter = this.escapeMarkdown(song.voterName || "Unknown");
        output += `| ${artist} | ${title} | ${voter} | ${song.voteYear} |\n`;
      });
      return output;
    },
    generatePlainText(songs) {
      let output = `${this.getMainName} - Song List\n`;
      output += `${"=".repeat(60)}\n\n`;
      songs.forEach((song, index) => {
        output += `${index + 1}. ${song.artist} - ${song.title}\n`;
        output += `   Voter: ${song.voterName || "Unknown"} | Year: ${
          song.voteYear
        }\n\n`;
      });
      return output;
    },
    generateSimpleList(songs) {
      return songs.map((song) => `${song.artist} - ${song.title}`).join("\n");
    },
    escapeCSV(text) {
      if (text.includes(",") || text.includes('"') || text.includes("\n")) {
        return `"${text.replace(/"/g, '""')}"`;
      }
      return text;
    },
    escapeMarkdown(text) {
      return text.replace(/\|/g, "\\|");
    },
    async copyToClipboard() {
      this.copying = true;
      this.copySuccess = false;

      try {
        const exportData = this.generateExportData();
        await navigator.clipboard.writeText(exportData);
        this.copySuccess = true;

        this.$store.dispatch("show_success_msg", {
          msg: `${this.filteredSongs.length} songs copied to clipboard!`,
        });

        setTimeout(() => {
          this.copySuccess = false;
        }, 3000);
      } catch (err) {
        console.error("Failed to copy:", err);
        this.$store.dispatch("show_error_msg", {
          msg: "Failed to copy to clipboard. Please try downloading instead.",
        });
      } finally {
        this.copying = false;
      }
    },
    downloadFile() {
      const exportData = this.generateExportData();
      const extension =
        this.exportFormat === "markdown"
          ? "md"
          : this.exportFormat === "simple"
          ? "txt"
          : this.exportFormat;
      const filename = `${this.getMainName}_songs_${
        new Date().toISOString().split("T")[0]
      }.${extension}`;

      const blob = new Blob([exportData], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      this.$store.dispatch("show_success_msg", {
        msg: `File "${filename}" downloaded successfully!`,
      });
    },
    openTuneMyMusic() {
      window.open("https://www.tunemymusic.com/nl/transfer", "_blank");

      this.$store.dispatch("show_success_msg", {
        msg: "Opening TuneMyMusic in new tab. Copy your song list and paste it there!",
      });
    },
  },
};
</script>
