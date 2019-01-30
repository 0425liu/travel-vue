<template>
  <div class="wrapper ">

    <swiper :options="swiperOption"
      v-if="showSlide">
      <!-- slides -->
      <swiper-slide v-for="item in swiperList"
        :key="item.id">
        <img class="swiper-img"
          :src="item.imgUrl" />

      </swiper-slide>

      <!-- Optional controls -->
      <div class="swiper-pagination"
        slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    swiperList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true
      }
    };
  },
  computed: {
    showSlide() {
      return this.swiperList.length;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.wrapper /deep/ .swiper-pagination-bullet-active {
  background-color: #fff;
}

.wrapper {
  overflow: hidden;
  height: 0;
  padding-bottom: 31.25%;
  .swiper-img {
    width: 100%;
  }
}
</style>
