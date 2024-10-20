import { TsvFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { ICommand } from './command.inerface.js';

export class ImportCommand implements ICommand {
  async execute(...params: string[]): Promise<void> {
    const [filePath] = params;

    const fileReader = new TsvFileReader(filePath.trim());
    await fileReader.read();
    console.log(fileReader.toArray());
  }

  getName(): string {
    return '--import';
  }
}
