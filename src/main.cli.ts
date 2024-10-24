#!/usr/bin/env node
import { GenerateCommand } from './cli/commands/generate.command.js';
import { CliApplication, ImportCommand, HelpCommand, VersionCommand } from './cli/index.js';

const cliApplication = new CliApplication();
cliApplication.registerCommands([
  new HelpCommand(),
  new VersionCommand(),
  new ImportCommand(),
  new GenerateCommand()
]);

cliApplication.processCommand(process.argv);
