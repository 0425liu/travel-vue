<template>
  <div>
    <city-header></city-header>
    <div class="search">
      <input type="text"
        placeholder="输入城市名或拼音"
        v-model="keyword">
    </div>
    <div class="search-content"
      v-show="keyword"
      ref="wrapper">
      <ul>
        <li @click="handleClick(item.name)"
          class="search-item border-bottom"
          v-for="item in list"
          :key="item.id">
          {{item.name}}
        </li>
        <li class="search-item border-bottom"
          v-show="noData">暂无数据</li>
      </ul>
    </div>
    <city-list :hotCities="hotCities"
      :cities="cities"
      :letter="letter"></city-list>
    <alphabet :cities="cities"
      @change="handleChangeletter"></alphabet>
  </div>
</template>

<script>
import CityHeader from "@/components/city/CityHeader.vue";
import CityList from "@/components/city/CityList.vue";
import Alphabet from "@/components/city/Alphabet.vue";
import BScroll from "better-scroll";
import { mapActions } from "vuex";
export default {
  metaInfo: {
    title: "城市列表"
  },
  data() {
    return {
      hotCities: [],
      cities: {},
      letter: "",
      timer: null,
      keyword: "",
      list: []
    };
  },
  components: {
    CityHeader,
    CityList,
    Alphabet
  },
  computed: {
    noData() {
      return !this.list.length;
    }
  },
  methods: {
    _getCityData() {
      this.$axios.get("/api/list").then(res => {
        res = res.data;
        if (res.ret) {
          const data = res;
          this.hotCities = data.hotCities;
          this.cities = data.cities;
        }
      });
    },
    handleChangeletter(letter) {
      this.letter = letter;
    },
    handleClick(city) {
      this.selectCity(city);
      this.$router.back();
    },
    ...mapActions(["selectCity"])
  },
  watch: {
    keyword() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.keyword) {
        this.list = [];
        return;
      }
      this.timer = setTimeout(() => {
        const list = [];
        for (let i in this.cities) {
          this.cities[i].forEach(val => {
            if (
              val.spell.indexOf(this.keyword) > -1 ||
              val.name.indexOf(this.keyword) > -1
            ) {
              list.push(val);
            }
          });
        }
        this.list = list;
      }, 100);
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper);
    this._getCityData();
  }
};
</script>

<style lang="scss" scoped >
@import "~scss/varibles.scss";
.search {
  height: 0.72rem;
  padding: 0.1rem;
  background: $bgColor;
  input {
    width: 100%;
    padding: 0 0.1rem;
    line-height: 0.62rem;
    height: 0.62rem;
    text-align: center;
    border-radius: 0.06rem;
    color: #666;
    box-sizing: border-box;
  }
}
.search-content {
  z-index: 1;
  overflow: hidden;
  position: absolute;
  top: 1.58rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eee;
  .search-item {
    line-height: 0.62rem;
    padding-left: 0.2rem;
    color: #666;
  }
}
</style>
