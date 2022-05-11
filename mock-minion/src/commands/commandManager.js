class CommandManager {
  constructor() {
    this.currentCommandIndex = -1;
    this.commandCount = 0;
    this.commands = [];
    this.commandManager = new CommandManager();
  }

  pushCommand(command) {
    executeCommand(command);
    this.commands.push(command);
  }

  executeCommand(command) {}

  undo() {
    if (this.currentCommandIndex >= 0) {
      currentCommand = this.commands.at(this.currentCommandIndex);

      this.currentCommandIndex--;
    }
  }
  redo() {}
}

export default CommandManager;
