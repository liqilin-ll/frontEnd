import axios from './axios';

export default class {
    private baseUrl = 'http://localhost:3333/push/userManager';
    /**
     * get请求,可传多个请求参数,参数顺序和后台商量
     * @param url
     * @param params
     */
    public get(url: string, ...params: string[]) {
      if (params) {
        let requestParams = '';
        for (const param of params) {
          requestParams += '/' + param;
        }
        url = this.baseUrl + '/' + url + requestParams;
      } else {
        url = this.baseUrl + '/' + url;
      }
      return axios.get(url);
    }
    /**
     * post请求,参数传对象
     * @param url
     * @param params
     */
    public post(url: string, params: any) {
      url = this.baseUrl + '/' + url;
      return axios.post(url, params);
    }
    /**
     * delete请求, 可传多个参数，参数顺序和后台商量
     * @param url
     * @param params
     */
    public delete(url: string, ...params: string[]) {
      if (params) {
        let requestParams = '';
        for (const param of params) {
          requestParams += '/' + param;
        }
        url = this.baseUrl + '/' + url + requestParams;
      } else {
        url = this.baseUrl + '/' + url;
      }
      return axios.delete(url);
    }
    /**
     * put请求，传对象
     * @param url
     * @param params
     */
    public put(url: string, params: any) {
      url = this.baseUrl + '/' + url;
      return axios.put(url, params);
    }
}
