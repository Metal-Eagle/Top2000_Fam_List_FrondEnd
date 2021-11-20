<template>
  <!-- Button trigger modal -->

  <div
    class="btn btn-outline-main"
    data-bs-toggle="modal"
    data-bs-target="#addNewUser"
    @click="atClickGetUsers"
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
          <h5 class="modal-title" id="addNewUserLabel">Add a new User</h5>
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
          TEST!
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
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Add Year Modal",
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
      "getVottersFormSongs",
      "getIdByFullName",
      "getMainId",
    ]),
  },
  methods: {
    changeSelected() {
      const userId = this.getIdByFullName(this.selectedUser);
      this.user.id = userId;
    },
    atClickGetUsers() {},
    atSave() {},
  },
};
</script>
