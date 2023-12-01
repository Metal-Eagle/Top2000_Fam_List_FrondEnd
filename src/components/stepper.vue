<template>
  <div>
    <div v-if="current_step == step" class="card">
      <div class="card-body">
        <p class="card-title h5">{{ title }}</p>

        <slot></slot>

        <!-- <p>Something for {{ step }} step.</p> -->
        <div class="row mt-4">
          <ul class="pagination justify-content-center">
            <li
              class="page-item btn-outline-main btn-outline-main"
              :class="step !== 1 || 'disabled'"
            >
              <a class="page-link btn-outline-main" @click="onClickBack"
                >Previous</a
              >
            </li>

            <li v-for="item in pageItems" :key="item.number">
              <a
                class="page-link btn-outline-main"
                :class="item.number !== step || 'btn-active'"
                @click="onClickGoto(item.number)"
                >{{ item.number }}</a
              >
            </li>

            <li class="page-item">
              <a
                class="page-link btn-outline-main"
                v-if="max_step !== step"
                @click="onClickNext"
                >Next</a
              >
              <a
                class="page-link btn-outline-main"
                v-if="max_step === step"
                @click="onClickFinish"
                >Finish</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "addSteper",
  data() {
    return {
      pageItems: [],
    };
  },
  props: {
    title: String,
    step: Number,
    current_step: {
      type: Number,
      default: 1,
    },
    max_step: Number,
    onClickGoto: Function,
    onClickNext: Function,
    onClickBack: Function,
    onClickFinish: Function,
  },
  mounted() {
    this.countMaxSteps();
  },
  methods: {
    countMaxSteps() {
      let i;
      for (i = 1; i < this.max_step + 1; i++) {
        this.pageItems.push({
          number: i,
        });
      }
    },
  },
};
</script>
