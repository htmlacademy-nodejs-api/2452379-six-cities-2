import { CliApplication, ImportCommand, HelpCommand, VersionCommand } from './cli/index.js';

const cliApplication = new CliApplication();
cliApplication.registerCommands([
  new HelpCommand(),
  new VersionCommand(),
  new ImportCommand()
]);

cliApplication.processCommand(process.argv);
