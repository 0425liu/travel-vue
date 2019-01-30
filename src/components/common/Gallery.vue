<template>
  <div class="container"
    @click="handleClick">
    <div class="wrapper">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(img,i) in imgs"
          :key="i">
          <img :src="img"
            class="gallery-img">
        </swiper-slide>

        <div class="swiper-pagination"
          slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgs: {
      type: Array,
      default: () => [
        "//img1.qunarzz.com/sight/p0/1705/66/66e7d0114b541a57a3.img.jpg_600x330_228d4caf.jpg",
        "//img1.qunarzz.com/sight/p0/1705/66/66e7d0114b541a57a3.img.jpg_600x330_228d4caf.jpg"
      ]
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        observer: true,
        observeParents: true
      }
    };
  },
  methods: {
    handleClick() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped >
.container {
  display: flex;
  align-items: center;
  z-index: 99;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  background: #000;
  .wrapper {
    padding-bottom: 100%;
    width: 100%;
    height: 0;
    .gallery-img {
      width: 100%;
    }
  }
  .swiper-pagination {
    color: #fff;
    bottom: -1rem;
  }
  .swiper-container {
    overflow: inherit;
  }
}
</style>
