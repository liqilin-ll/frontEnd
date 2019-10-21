import axios, {AxiosInstance} from 'axios';
import { Loading, Message } from 'element-ui';

let loadinginstace: any;
function startLoading() {    // 使用Element loading-start 方法
    loadinginstace = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)',
    });
}
function endLoading() {    // 使用Element loading-close 方法
    loadinginstace.close();
}
// 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) {return; }
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
}

// http请求拦截
axios.interceptors.request.use( (config: any) => {
    showFullScreenLoading();
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
    };
    return config;
}, (error: any) => {
    tryHideFullScreenLoading();
    Message.error('加载超时');
    return Promise.reject(error);
});


// 请求响应结果拦截
axios.interceptors.response.use( (response: any) => {
    tryHideFullScreenLoading();
    if (response.data.errCode === 0) {
        return response.data;
    } else {
        Message.info(response.data.errMsg);
        Promise.resolve(response);
    }
}, (error: any) => {
    tryHideFullScreenLoading();
    Message.error(error.response.data.errMsg);
    return Promise.reject(error);
});

// // 声明request，合并到typescript中
declare module 'Vue/types/vue' {
  interface Vue {
      request: AxiosInstance;
  }
}

export default axios;
