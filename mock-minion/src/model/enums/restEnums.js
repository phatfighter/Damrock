class RestEnums {
  static Get = "GET";
  static Put = "PUT";
  static Post = "POST";
  static Delete = "DELETE";

  static getList() {
    var list = [this.Get, this.Put, this.Post, this.Delete];
    return list;
  }
}
export { RestEnums };
