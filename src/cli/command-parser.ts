type ParsedCommand = Record<string, string[]>;

export class CommandParser {
  public static parse(cliArgs: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommand: string = '';

    for (const cliArg of cliArgs) {
      if (cliArg.startsWith('--')) {
        currentCommand = cliArg;
        parsedCommand[currentCommand] = [];
      } else if (currentCommand) {
        parsedCommand[currentCommand].push(cliArg);
      }
    }

    return parsedCommand;
  }
}
