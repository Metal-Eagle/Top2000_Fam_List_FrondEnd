<template>
  <!-- Button trigger modal -->

  <div
    class="btn btn-outline-main"
    data-bs-toggle="modal"
    data-bs-target="#addYearModel"
    @click="atClickGetUsers"
  >
    Add year
  </div>

  <div
    class="modal fade"
    id="addYearModel"
    tabindex="-1"
    aria-labelledby="addYearModelLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addYearModelLabel">Selet a User</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="loading" class="mb-3 text-center">
            Getting data please wait...
          </div>

          <select
            v-model="selectedUser"
            @change="changeSelected"
            class="form-select"
            aria-label="Default select"
          >
            <option v-for="user in users" :key="user.id">
              {{ user.fullName }}
            </option>
          </select>

          <div v-if="user.id !== null">
            <input
              class="form-control mt-1"
              v-model="user.secret"
              placeholder="The family secret"
            />

            <input
              class="form-control mt-1"
              v-model="user.year[0].vote_year"
              type="number"
              placeholder="Year"
            />
            <input
              class="form-control mt-1"
              v-model="user.year[0].vote_url"
              placeholder="https://stem.nporadio2.nl/top2000-2020/share/v8hb9hvov8hb9hvoxl3hzxq33ddhxl3hzxq33ddh"
            />
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
            :disabled="loading ?? ''"
            type="button"
            class="btn btn-outline-main"
            @click="atSave()"
          >
            Add Year
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updateUser } from "@/service/uploadData";

export default {
  name: "showModelForAddingYears",
  data() {
    return {
      users: [],
      loading: false,
      selectedUser: null,
      user: {
        id: null,
        secret: null,
        familyId: null,
        year: [
          {
            vote_year: null,
            vote_url: null,
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters([
      "getUserById",
      "getYearsFromVoters",
      "getIdByFullName",
      "getMainId",
    ]),
  },
  methods: {
    changeSelected() {
      const userId = this.getIdByFullName(this.selectedUser);
      this.user.id = userId;
    },
    atClickGetUsers() {
      //   Clear users at click
      this.users = [];
      this.users = this.getYearsFromVoters;
    },
    atSave() {
      this.user.familyId = this.getMainId;

      this.loading = true;
      updateUser(this.user, (r) => {
        if (r.message === "Request failed with status code 409") {
          this.loading = false;
        } else {
          setTimeout(() => {
            location.reload();
            this.loading = false;
          }, 5000);
        }
      });
    },
  },
};
</script>
