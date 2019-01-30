import axios from "axios";
import qs from "qs";
import { Message, Loading } from "element-ui";
import _ from "lodash";
import router from "@/router";
const Axios = axios.create({
  //  baseURL: "/"因为我本地做了反向代理
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(
  url,
  data = {},
  config = {
    showLoading: true
  }
) {
  return new Promise((resolve, reject) => {
    Axios.post(url, data, config).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(
  url,
  params = {},
  config = {
    showLoading: true
  }
) {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params: params,
      ...config
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
/** start loading*/
let requestCount = 0;
let loading;

function showLoading() {
  if (requestCount === 0) {
    startLoading();
  }
  requestCount++;
}

function hideLoading() {
  if (requestCount <= 0) return;
  requestCount--;
  if (requestCount === 0) {
    _.debounce(endLoading, 300)();
  }
}

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "加载中……",
    background: "rgba(0, 0, 0, 0.7)"
  });
}

function endLoading() {
  if (requestCount === 0) {
    loading.close();
  }
}
/** end loading*/
/*
请求拦截
*/
Axios.interceptors.request.use(
  config => {
    if (config.showLoading) {
      showLoading();
    }
    if (config.method === "post") {
      // 序列化
      config.data = qs.stringify(config.data);
      // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
    }
    // 若是有做鉴权token , 就给头部带上token
    // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
    // 这里localStorage一般是请求成功后我们自行写入到本地的,因为你放在vuex刷新就没了
    // 一些必要的数据写入本地,优先从本地读取
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }
    return config;
  },
  error => {
    //error 的回调信息, 看贵公司的定义
    Message({
      //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: error && error.data.error.message,
      type: "error"
    });
    return Promise.reject(error.data.error.message);
  }
);
Axios.interceptors.response.use(
  res => {
    if (res.config.showLoading) {
      hideLoading();
    }
    // if (res.data && !res.data.success) {
    //   Message({
    //     //  饿了么的消息弹窗组件,类似toast
    //     showClose: true,
    //     message: res.data.error.message.message
    //       ? res.data.error.message.message
    //       : res.data.error.message,
    //     type: "error"
    //   });
    //   return Promise.reject(res.data.error.message);
    // }
    return res;
  },
  error => {
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    if (!window.localStorage.getItem("loginUserBaseInfo")) {
      // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
      router.push({
        path: "/login"
      });
    } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
        1000;
      let nowTime = new Date().getTime(); // 当前时间的时间戳
      console.log(nowTime, lifeTime);
      console.log(nowTime > lifeTime);
      if (nowTime > lifeTime) {
        Message({
          showClose: true,
          message: "登录状态信息过期,请重新登录",
          type: "error"
        });
        router.push({
          path: "/login"
        });
      } else {
        // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
        if (error.response.status === 403) {
          router.push({
            path: "/error/403"
          });
        }
        if (error.response.status === 500) {
          router.push({
            path: "/error/500"
          });
        }
        if (error.response.status === 502) {
          router.push({
            path: "/error/502"
          });
        }
        if (error.response.status === 404) {
          router.push({
            path: "/error/404"
          });
        }
      }
    }
    // 返回 response 里的错误信息
    let errorInfo = error.data.error ? error.data.error.message : error.data;
    return Promise.reject(errorInfo);
  }
);
