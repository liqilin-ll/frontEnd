import Http from '../http';
export default class {
  private http = new Http();
  // 登录
  public login(data: any) {
    const url = 'login';
    return this.http.post(url, data);
  }
   // 获取菜单列表
  public getMenuList(id: any) {
    const url = 'getMenuList';
    return this.http.get(url, id);
  }
  // 新增菜单
  public addMenu(data: any) {
    const url = 'addMenu';
    return this.http.post(url, data);
  }
}
