class DatabaseEnums {
  static NoSql = "No-Sql";
  static Rdbms = "RDBMS";

  static getList() {
    var list = [this.NoSql, this.Rdbms];
    return list;
  }
}
export { DatabaseEnums };
