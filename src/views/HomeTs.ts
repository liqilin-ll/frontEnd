export default class HomeTs {
  public id!: string;
  public menuName!: string;
  public icon!: string;
  public constructor(id: string, menuName: string, icon: string) {
    this.id = id;
    this.menuName = menuName;
    this.icon = icon;
  }
}
