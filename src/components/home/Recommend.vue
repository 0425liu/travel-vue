<template>
  <div>
    <div class="recommend-title">热门推荐</div>
    <ul>
      <router-link tag="li"
        class="item"
        v-for="item in recommendList"
        :key="item.id"
        :to="`/detail/${item.id}`">
        <img class="item-img"
          :src="item.imgUrl"
          alt="">
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <div class="item-desc">{{item.desc}}</div>
          <button class="item-button">查看详情</button>
        </div>

      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    recommendList: Array
  },
  components: {}
};
</script>

<style lang="scss" scoped >
@import "~scss/mixins.scss";
.recommend-title {
  margin-top: 0.2rem;
  line-height: 0.8rem;
  background: #eee;
  text-indent: 0.2rem;
}
.item {
  display: flex;
  .item-img {
    width: 1.7rem;
    height: 1.7rem;
    padding: 0.1rem;
  }
  .item-info {
    flex: 1;
    padding: 0.1rem;
    min-width: 0;
    .item-title {
      line-height: 0.54rem;
      font-size: 0.32rem;
      @include ellipsis;
    }
    .item-desc {
      line-height: 0.4rem;
      color: #ccc;
      @include ellipsis;
    }
    .item-button {
      background-color: #ff9600;
      padding: 0 0.1rem;
      line-height: 0.44rem;
      margin-top: 0.16rem;
      border-radius: 0.06rem;
      color: #fff;
    }
  }
}
</style>
