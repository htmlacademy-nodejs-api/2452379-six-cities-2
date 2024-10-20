import { ICommand } from './command.inerface.js';
import chalk from 'chalk';

const HELP_TEXT =
  `
Программа для подготовки данных для REST API сервера.

Пример: cli.js --<${chalk.blue('command')}> [${chalk.cyan('--arguments')}]

Команды:

 ${chalk.cyan('--version')}:                   # выводит номер версии
 ${chalk.cyan('--help')}:                      # печатает этот текст
 ${chalk.cyan('--import <path>')}:             # импортирует данные из TSV
 ${chalk.cyan('--generate <n> <path> <url>')}: # генерирует произвольное количество тестовых данных
`;


export class HelpCommand implements ICommand {
  getName(): string {
    return '--help';
  }

  async execute(..._params: string[]): Promise<void> {
    console.info(HELP_TEXT);
  }
}
