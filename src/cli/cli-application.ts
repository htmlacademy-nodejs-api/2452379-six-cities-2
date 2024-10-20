import { CommandParser } from './command-parser.js';
import { ICommand } from './commands/command.inerface.js';

type CommandCollection = Record<string, ICommand>;


export class CliApplication {
  private commands: CommandCollection = {};

  constructor(
    private readonly defaultCommand = '--help'
  ) {}

  private getCommand(commandName: string): ICommand {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  private getDefaultCommand(): ICommand | never {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public registerCommands(commands: ICommand[]) {
    commands.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }
      this.commands[command.getName()] = command;
    });
  }

  public processCommand(argv: string[]) {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArgs = parsedCommand[commandName];

    command.execute(...commandArgs);
  }
}
