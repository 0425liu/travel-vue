<template>
  <div class="header">
    城市选择
    <router-link to="/">
      <div class="iconfont back-icon">&#xe624;</div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped >
@import "~scss/varibles.scss";
.header {
  position: relative;
  overflow: hidden;
  height: $height;
  line-height: $height;
  text-align: center;
  color: #fff;
  background: $bgColor;
  font-size: 0.32rem;
  .back-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.64rem;
    text-align: center;
    font-size: 0.4rem;
    color: #fff;
  }
}
</style>
