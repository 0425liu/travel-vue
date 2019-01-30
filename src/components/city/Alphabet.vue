<template>
  <div class="list">
    <div class="item"
      v-for="item in letters"
      :key="item"
      @touchstart.prevent="handleTouchStart"
      @touchmove.prevent="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleClick"
      :ref="item">{{item}}</div>
  </div>
</template>

<script>
export default {
  props: {
    cities: Object
  },
  data() {
    return {
      touchstatus: false,
      timemove: null
    };
  },
  computed: {
    letters() {
      const letters = [];
      for (let i in this.cities) {
        letters.push(i);
      }
      return letters;
    }
  },
  methods: {
    handleClick(e) {
      this.$emit("change", e.target.innerText);
    },
    handleTouchStart(e) {
      this.touchstatus = true;
      this.startY = e.touches[0].clientY;
      this.touchIndex = this.letters.indexOf(e.target.innerText);
    },
    handleTouchMove(e) {
      if (this.touchstatus) {
        if (this.timemove) {
          clearTimeout(this.timemove);
        }
        this.timemove = setTimeout(() => {
          const differY = e.touches[0].clientY - this.startY;
          const index = Math.floor(differY / 20) + this.touchIndex;
          if (index >= 0 && index < this.letters.length) {
            this.$emit("change", this.letters[index]);
          }
        }, 16);
      }
    },
    handleTouchEnd() {
      this.touchstatus = false;
    }
  }
};
</script>

<style lang="scss" scoped >
@import "~scss/varibles.scss";
.list {
  position: absolute;
  top: 1.5rem;
  right: 0;
  bottom: 0;
  width: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .item {
    line-height: 0.4rem;
    color: $bgColor;
    text-align: center;
  }
}
</style>
