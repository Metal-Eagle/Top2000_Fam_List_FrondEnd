<template>
  <div v-if="getError.show" class="alert alert-danger">
    {{ getError.msg }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "addAlert",
  computed: {
    ...mapGetters(["getError"]),
  },
};
</script>
