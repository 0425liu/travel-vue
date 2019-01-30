<template>
  <div>

    <div class="banner"
      @click="showGallery =true">
      <img :src="data.bannerImg"
        class="banner-img">
      <div class="banner-info">
        <div class="banner-title">{{data.sightName}}</div>
        <div class="banner-number">
          <span class="iconfont banner-icon">&#xe632;</span>39
        </div>
      </div>

    </div>
    <Header></Header>
    <Fade>
      <gallery :imgs="imgs"
        v-show="showGallery"
        @close="showGallery=false"></gallery>
    </Fade>

    <div class="box">
      <List :list="list"></List>

    </div>
  </div>
</template>

<script>
import Gallery from "@/components/common/Gallery";
import Header from "@/components/detail/Header";
import List from "@/components/detail/List";
import Fade from "@/components/common/Fade";
export default {
  metaInfo: {
    title: "商品详情"
  },
  name: "detail",
  data() {
    return {
      imgs: [],
      showGallery: false,
      list: [],
      data: {}
    };
  },
  components: {
    Gallery,
    Header,
    List,
    Fade
  },
  methods: {
    getList(res) {
      res = res.data;
      const data = res.data;
      this.list = data.categoryList;
      this.data = data;
      this.imgs = data.gallaryImgs;
    }
  },
  mounted() {
    this.$get("/api/detail", { id: this.$route.params.id }).then(this.getList);
  }
};
</script>

<style lang="scss" scoped >
.box {
  height: 1000px;
}
.banner {
  position: relative;
  overflow: hidden;
  height: 0;
  padding-bottom: 55%;
  .banner-img {
    width: 100%;
  }
  .banner-info {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 0.6rem;
    color: #fff;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.8)
    );
    .banner-title {
      flex: 1;
      font-size: 0.32rem;
      padding: 0.2rem;
    }
    .banner-number {
      height: 0.32rem;
      padding: 0 0.4rem;
      line-height: 0.32rem;
      border-radius: 0.2rem;
      margin-top: 0.2rem;
      background: rgba(0, 0, 0, 0.8);
      font-size: 0.24rem;
      .banner-icon {
        font-size: 0.24rem;
      }
    }
  }
}
</style>
