<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      内容
    </div>
    <router-link to="/city">
      <div class="header-right">
        {{this.city}}
        <span class="iconfont arrow-icon">&#xe64a;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    city: String
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="scss" scoped >
@import "~scss/varibles.scss";
.header {
  display: flex;
  line-height: 0.86rem;
  background: $bgColor;
  color: #fff;
  .header-left {
    widows: 0.64rem;
    float: left;
    .back-icon {
      text-align: center;
      font-size: 0.4rem;
    }
  }
  .header-input {
    flex: 1;
    height: 0.64rem;
    line-height: 0.64rem;
    margin-top: 0.12rem;
    margin-left: 0.12rem;
    padding-left: 0.2rem;
    background: #fff;
    border-radius: 0.1rem;
    color: #ccc;
  }
  .header-right {
    width: 1.24rem;
    float: right;
    text-align: center;
    color: #fff;
    .arrow-icon {
      font-size: 0.24rem;
    }
  }
}
</style>
