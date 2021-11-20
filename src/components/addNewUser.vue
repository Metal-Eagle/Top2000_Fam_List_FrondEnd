<template>
  <!-- Button trigger modal -->

  <div
    class="btn btn-outline-main"
    data-bs-toggle="modal"
    data-bs-target="#addNewUser"
  >
    Add User
  </div>

  <div
    class="modal fade"
    id="addNewUser"
    tabindex="-1"
    aria-labelledby="addNewUserLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addNewUserLabel">Add a new Member</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-if="loading" class="mb-3 text-center">
            Setting up user please wait..
          </div>

          <input
            class="form-control mb-1"
            v-model="user.secret"
            placeholder="The family secret"
          />

          <input
            class="form-control mb-1"
            v-model="user.fullName"
            placeholder="Member"
          />
          <input
            class="form-control mb-1"
            v-model="user.year[0].vote_year"
            type="number"
            placeholder="Year"
          />
          <input
            class="form-control mb-1"
            v-model="user.year[0].vote_url"
            placeholder="https://stem.nporadio2.nl/top2000-2020/share/v8hb9hvov8hb9hvoxl3hzxq33ddhxl3hzxq33ddh"
          />
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
            :disabled="!checkIfReadyForpost ?? ''"
            type="button"
            class="btn btn-outline-main"
            @click="atSave()"
          >
            Add Member
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addUser } from "@/service/uploadData";

export default {
  name: "Add Year Modal",
  data() {
    return {
      loading: false,
      errorMsg: null,
      user: {
        fullName: null,
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
    ...mapGetters(["getMainId"]),
    checkIfReadyForpost: function () {
      let validInput = false;
      if (
        this.user.fullName !== null &&
        this.user.secret !== null &&
        this.user.year[0].vote_year !== null &&
        this.user.year[0].vote_url !== null
      ) {
        validInput = true;
      }
      return validInput;
    },
  },
  methods: {
    changeSelected() {
      const userId = this.getIdByFullName(this.selectedUser);
      this.user.id = userId;
    },
    atSave() {
      this.user.familyId = this.getMainId;

      addUser(this.user, () => {
        setTimeout(() => {
          location.reload();
          this.loading = false;
        }, 5000);
      });
    },
  },
};
</script>
