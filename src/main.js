import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import fastClick from "fastclick";
import VueAwesomeSwiper from "vue-awesome-swiper";
import MetaInfo from "vue-meta-info";
import "swiper/dist/css/swiper.css";
import "element-ui/lib/theme-chalk/index.css";
import { post, get } from "@/assets/js/http";
fastClick.attach(document.body);
Vue.use(VueAwesomeSwiper);
Vue.use(MetaInfo);
Vue.prototype.$post = post;
Vue.prototype.$get = get;
import "./assets/reset.css";
import "./assets/border.css";
import "./assets/iconfont.css";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");