<template>
  <div class="stepper">
    <div class="progress">
      <b class="progress-bar progress-bar-striped bg-main" :style="progress">
        {{ current_step }}/{{ max_step }}
      </b>
    </div>
    <br />
    <stepper
      :step="1"
      :max_step="max_step"
      :onClickGoto="onClickGoto"
      :current_step="current_step"
      :onClickNext="onClickNext"
      :onClickBack="onClickBack"
      :onClickFinish="onClickFinish"
      title="Give your list a name"
    >
      <div class="input-group mb-3">
        <input
          v-model="list.name"
          type="text"
          class="form-control"
          placeholder="Name"
        />
      </div>
      <div class="input-group mb-3">
        <input
          v-model="list.secret"
          type="text"
          class="form-control"
          placeholder="secret"
        />
      </div>
    </stepper>

    <stepper
      :step="2"
      :max_step="max_step"
      :onClickGoto="onClickGoto"
      :current_step="current_step"
      :onClickNext="onClickNext"
      :onClickBack="onClickBack"
      :onClickFinish="onClickFinish"
      title="Add members"
    >
      <div class="row">
        <div class="input-without-glow input-group flex-nowrap mb-2">
          <input
            class="form-control flex-nowrap mb-2"
            placeholder="Name"
            v-model="user.fullName"
          />

          <button
            type="button"
            :class="!user.fullName || `glowing`"
            class="btn btn-outline-main mb-2"
            @click="addUser"
          >
            Add user
          </button>
        </div>

        <div
          class="input-group flex-nowrap mb-2"
          v-for="year in user.years"
          :key="year"
        >
          <input
            class="form-control"
            v-model="year.vote_year"
            placeholder="year"
          />
          <input
            class="form-control"
            v-model="year.vote_url"
            placeholder="https://stem.nporadio2.nl/top2000-2020/share/v8hb9hvov8hb9hvoxl3hzxq33ddhxl3hzxq33ddh"
          />
        </div>

        <div class="col">
          <button
            type="button"
            class="btn btn-outline-main mb-4 me-1"
            @click="addYear"
          >
            Add year
          </button>

          <button
            type="button"
            class="btn btn-outline-main mb-4 me-1"
            @click="removeYear"
          >
            Remove year
          </button>
          <button
            type="button"
            :class="user.fullName === null || 'blink-me'"
            class="btn btn-primary mb-4 me-1"
            @click="addUser"
          >
            Add user
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <span
            class="bg-main main-badge col-1 me-1"
            v-for="user in list.users"
            :key="user.id"
          >
            {{ user.fullName }}
            <button type="button" @click="removeUser(user)" class="btn-close" />
          </span>
        </div>
      </div>
    </stepper>

    <div class="alert alert-danger mt-3" v-if="error.show" role="alert">
      {{ error.msg }}
    </div>

    <loading class="mt-3" :loading="loading" />
  </div>
</template>

<script>
import stepper from "@/components/stepper";
import { addFamily } from "@/service/uploadData";
import loading from "@/components/loading";

import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      loading: false,
      current_step: 1,
      max_step: 2,
      error: {
        show: false,
        msg: null,
      },
      list: {
        name: "",
        secret: "",
        users: [],
      },
      user: {
        id: null,
        fullName: null,
        years: [],
      },
    };
  },
  methods: {
    addYear() {
      let year = {
        vote_year: null,
        vote_url: null,
      };
      this.user.years.push(year);
    },
    removeYear() {
      this.user.years.pop();
    },
    addUser() {
      this.user.id = uuidv4();
      this.list.users.push(this.user);
      this.user = {
        id: null,
        fullName: null,
        years: [],
      };
    },
    onClickNext() {
      this.current_step++;
    },
    onClickBack() {
      this.current_step--;
    },
    onClickGoto(number) {
      this.current_step = number;
    },
    onClickFinish() {
      this.loading = true;
      addFamily(this.list, (r) => {
        if (r.message === "Request failed with status code 409") {
          this.error.show = true;
          this.error.msg = `The name ${this.list.name} is already in use`;
          this.loading = false;
        } else {
          setTimeout(() => {
            this.loading = false;
            this.$router.push(`/dashboard/${r.id}`);
          }, 3000);
        }
      });
    },
    removeUser(user) {
      let indexOfuser = this.list.users.indexOf(user);
      this.list.users.splice(indexOfuser, 1);
    },
  },
  computed: {
    progress: function () {
      let number = `width: ${
        Math.round(100 / this.max_step) * this.current_step
      }%`;
      return number;
    },
  },
  components: {
    stepper,
    loading,
  },
};
</script>

<style>
</style>