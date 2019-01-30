<template>
  <div>
    <Header :city="city"></Header>
    <Swiper :swiperList="data.swiperList"></Swiper>
    <Icons :datalist="data.iconList"></Icons>
    <Recommend :recommendList="data.recommendList"></Recommend>
    <Weekend></Weekend>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Swiper from "@/components/home/Swiper.vue";
import Icons from "@/components/home/icons.vue";
import Recommend from "@/components/home/Recommend.vue";
import Weekend from "@/components/home/Weekend.vue";
import { mapGetters } from "vuex";
export default {
  name: "home",
  metaInfo: {
    title: "去哪儿首页"
  },
  components: {
    lastCity: "",
    Header,
    Swiper,
    Icons,
    Recommend,
    Weekend
  },
  data() {
    return {
      data: ""
    };
  },
  computed: {
    ...mapGetters(["city"])
  },
  activated() {
    if (this.city !== this.lastCity) {
      this.lastCity = this.city;
      this.getHomeInfo();
    }
  },
  methods: {
    getHomeInfo() {
      this.$get("/api/index", { city: this.cit }).then(this.getHomeinfoSucc);
    },
    getHomeinfoSucc(res) {
      this.data = res.data;
    }
  },
  mounted() {
    this.lastCity = this.city;
    this.getHomeInfo();
  }
};
</script>
