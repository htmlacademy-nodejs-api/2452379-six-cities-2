import { createWriteStream, WriteStream } from 'node:fs';
import { IFileWriter } from './file-writer.interface.js';

export class TsvFileWriter implements IFileWriter {
  private stream: WriteStream;
  constructor(fileName: string) {
    this.stream = createWriteStream(fileName,
      {
        flags: 'w',
        encoding: 'utf-8',
        autoClose: true
      }
    );
  }

  public async write(row: string): Promise<void> {
    const writeSuccess = this.stream.write(`${row}\n`);
    if (!writeSuccess) {
      return new Promise((resolve) => this.stream.once('drain', resolve));
    }
    return Promise.resolve();
  }
}
