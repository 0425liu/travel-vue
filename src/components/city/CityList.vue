<template>
  <div class="list"
    ref="wrapper">
    <div class="wrapper">
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{city}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper"
            v-for="item of hotCities"
            :key="item.id">
            <div class="button"
              @click="handleClick(item.name)">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="area"
        v-for="(item,key) of cities"
        :key="key"
        :ref="key">
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list">
          <div class="item"
            v-for="name of item"
            :key="name.id"
            @click="handleClick(name.name)">{{name.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    hotCities: {
      type: Array,
      default: () => []
    },
    cities: Object,
    letter: String
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper);
  },
  computed: mapGetters(["city"]),
  methods: {
    handleClick(city) {
      this.selectCity(city);
      this.$router.back();
    },
    ...mapActions(["selectCity"])
  },
  watch: {
    letter() {
      if (this.letter) {
        this.scroll.scrollToElement(this.$refs[this.letter][0]);
      }
    }
  }
};
</script>

<style lang="scss" scoped >
@import "~scss/varibles.scss";
.border-topbottom {
  &::before {
    border-color: #ccc;
  }
  &::after {
    border-color: #ccc;
  }
}
.border-bottom {
  &::before {
    border-color: #ccc;
  }
}
.list {
  position: absolute;
  top: 1.72rem;
  bottom: 0;
  overflow: hidden;
  right: 0;
  left: 0;
}
.title {
  line-height: 0.6rem;
  background: #eee;
  padding-left: 0.2rem;
  font-size: 0.26rem;
}
.button-list {
  overflow: hidden;
  padding: 0.1rem 0.6rem 0.1rem 0.1rem;
  .button-wrapper {
    float: left;
    width: 33.33%;
    .button {
      margin: 0.1rem;
      padding: 0.1rem 0;
      text-align: center;
      border: 0.02rem solid #ccc;
      border-radius: 0.06rem;
    }
  }
}
.item-list {
  .item {
    line-height: 0.76rem;
    color: #666;
    padding-left: 0.2rem;
  }
}
</style>
