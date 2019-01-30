<template>
  <div class="icons">
    <swiper v-if="showIcon">
      <swiper-slide v-for="(list,index) in pages"
        :key="index">
        <div class="icon"
          v-for="item in list"
          :key="item.id">
          <div class="icon-img">
            <img :src="item.imgUrl"
              class="icon-img-content">
          </div>
          <p class="icon-desc">{{item.desc}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    datalist: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    pages() {
      const pages = [];
      this.datalist.forEach((item, i) => {
        const page = Math.floor(i / 8);
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    },
    showIcon() {
      return this.datalist.length;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import "~scss/varibles.scss";
@import "~scss/mixins.scss";
.icons /deep/ .swiper-container {
  height: 0;
  padding-bottom: 50%;
}
.icon {
  overflow: hidden;
  float: left;
  width: 25%;
  padding-bottom: 25%;
  position: relative;
  .icon-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0.44rem;
    box-sizing: border-box;
    padding: 0.1rem;
    .icon-img-content {
      height: 100%;
      display: block;
      margin: 0 auto;
    }
  }
  .icon-desc {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    line-height: 0.44rem;
    color: $colorText;
    text-align: center;
    @include ellipsis;
  }
}
</style>
