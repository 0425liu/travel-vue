<template>
  <div>
    <div class="recommend-title">周末去哪儿</div>
    <ul>
      <li class="item"
        v-for="item in recommendList"
        :key="item.id">
        <div class="item-img-wrapper">
          <img class="item-img"
            :src="item.url"
            alt="">
        </div>

        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <div class="item-desc">{{item.desc}}</div>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommendList: [
        {
          id: "1",
          url:
            "http://img1.qunarzz.com/sight/source/1505/d5/abe8a48a6ef8bf.jpg_r_640x214_7c41cc81.jpg",
          title: "武汉玛雅海滩水公园",
          desc: "武汉玛雅海滩水公园"
        },
        {
          id: "2",
          url:
            "http://img1.qunarzz.com/sight/source/1505/d5/abe8a48a6ef8bf.jpg_r_640x214_7c41cc81.jpg",
          title: "武汉玛雅海滩水公园",
          desc: "武汉玛雅海滩水公园"
        }
      ]
    };
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
.item-img-wrapper {
  height: 0;
  overflow: hidden;
  padding-bottom: 37%;
}
.item {
  .item-img {
    width: 100%;
  }
  .item-info {
    padding: 0.1rem;
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
  }
}
</style>
