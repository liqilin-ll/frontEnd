import VueCookies from 'vue-cookies';

export default class Storage {
  public vueCookies: any;
  private USERINFO = 'userInfo';
  private ACCOUNT = 'account';
  private MENULIST = 'menuList';
  public constructor() {
    this.vueCookies = VueCookies;
  }
  public getStorageUserInfo() {
    return this.vueCookies.get(this.USERINFO) || '';
  }
  public setStorageUserInfo(userInfo: any) {
    this.vueCookies.set(this.USERINFO, userInfo);
  }
  public removeStorageuserInfo() {
    this.vueCookies.remove(this.USERINFO);
  }
  // 记录账号密码
  public setStorageAccount(login: any) {
    this.vueCookies.set(this.ACCOUNT, login);
  }
  // 获取账号密码
  public getStorageAccount() {
    return this.vueCookies.get(this.ACCOUNT);
  }
  // 删除本地缓存
  public removeStorageAccount() {
    this.vueCookies.remove(this.ACCOUNT);
  }
  // 判断是否有账号密码
  public isExistAccount() {
    return this.vueCookies.isKey(this.ACCOUNT);
  }
  // 记录菜单列表
  public setStorageMenuList(menuList: any) {
    localStorage.setItem(this.MENULIST, JSON.stringify(menuList));
  }
  // 获取菜单列表
  public getStorageMenuList() {
    return JSON.parse(localStorage.getItem(this.MENULIST) || '[]');
  }
}

