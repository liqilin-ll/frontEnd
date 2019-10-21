import Http from '../http';
export default class {
  private http = new Http();
   // 获取菜单列表
  public getMenuList() {
    const url = 'getMenuList';
    return this.http.get(url);
  }
  // 新增菜单
  public addMenu(data: any) {
    const url = 'addMenu';
    return this.http.post(url, data);
  }
}
