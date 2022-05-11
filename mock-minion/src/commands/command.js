class Command {
  action;
  component;
  constructor(component, action) {
    this.action = action;
    this.component = component;
  }
}
export default Command;
