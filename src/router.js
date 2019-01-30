import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { Message } from "element-ui";
Vue.use(Router);

const router = new Router({
  mode: "history", //  hash模式
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/city",
      name: "city",
      component: () =>
        import(/* webpackChunkName: "city"    */ "./views/City.vue")
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: () =>
        import(/* webpackChunkName: "detail"    */ "./views/Detail.vue")
    }
  ],
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
    if (window.localStorage.getItem("loginUserBaseInfo")) {
      // 判断是否登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
        1000;
      let nowTime = new Date().getTime(); // 当前时间的时间戳
      if (nowTime < lifeTime) {
        next();
      } else {
        Message({
          showClose: true,
          message: "登录状态信息过期,请重新登录",
          type: "error"
        });
        next({
          path: "/login",
          query: {
            redirect: to.fullPath
          } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      }
    } else {
      // 没登录则跳转到登录界面
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});

export default router;
