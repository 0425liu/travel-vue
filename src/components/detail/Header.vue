<template>
  <div>
    <div class="header-abs"
      v-show="showHeader">
      <span class="iconfont header-abs-back">&#xe624;</span>
    </div>
    <div class="header-fixed"
      v-show="!showHeader"
      :style="styleOpacity">
      景点详情
      <span class="iconfont header-fixed-back">&#xe64a;</span>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHeader: true,
      styleOpacity: {
        opacity: 0
      }
    };
  },
  methods: {
    handleScroll() {
      const top = document.documentElement.scrollTop;
      console.log(top);
      if (top > 60) {
        const opacity = top / 140 > 1 ? 1 : top / 140;
        this.styleOpacity = {
          opacity
        };
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
    }
  },
  activated() {
    window.addEventListener("scroll", this.handleScroll);
  },
  deactivated() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss" scoped >
@import "~scss/varibles.scss";
.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $height;
  line-height: $height;
  text-align: center;
  color: #fff;
  background: $bgColor;
  font-size: 0.32rem;
  .header-fixed-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.64rem;
    text-align: center;
    font-size: 0.4rem;
    color: #fff;
  }
}
.header-abs {
  position: absolute;
  left: 0.2rem;
  top: 0.2rem;
  width: 0.8rem;
  line-height: 0.8rem;
  border-radius: 0.4rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
  .header-abs-back {
    color: #fff;
    font-size: 0.4rem;
  }
}
</style>
