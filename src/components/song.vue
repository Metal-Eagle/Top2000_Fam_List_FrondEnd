<template>
  <td>{{ item.artist }}</td>
  <td>{{ item.title }}</td>
  <td v-if="item.userId">{{ getUserById(item.userId).fullName }}</td>
  <td v-if="item.userIds">{{ getUsers(item.userIds) }}</td>
  <td>{{ item.voteYear }}</td>
  <td>{{ item.votes }}</td>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    getUsers(userIds) {
      let users = [];
      if (userIds !== undefined) {
        userIds.forEach((r) => {
          users.push(this.getUserById(r.userId).fullName);
        });
      }
      return users.filter(this.onlyUnique).join();
    },
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
  },
  props: {
    item: Object,
  },
  computed: {
    ...mapGetters(["getUserById", "playingSong"]),
  },
};
</script>

<style>
</style>