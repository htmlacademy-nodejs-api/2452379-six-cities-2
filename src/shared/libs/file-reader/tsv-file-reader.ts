import path from 'node:path';
import { IFileReader } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

const CHUNK_SIZE = 100;

export class TsvFileReader extends EventEmitter implements IFileReader {
  public rawData: string = '';

  constructor(
    private readonly fileName: string
  ) {
    super();
  }

  public async read(): Promise<void> {
    let chunk;
    let remainingData = '';
    let importedRowsCount = 0;
    let nextLineIndex: number;

    const readStream = createReadStream(path.resolve(this.fileName), { highWaterMark: CHUNK_SIZE, encoding: 'utf-8' });

    readStream.on('readable', () => {
      while (null !== (chunk = readStream.read(CHUNK_SIZE))) {
        remainingData += chunk.toString();
        while ((nextLineIndex = remainingData.indexOf('\n')) >= 0) {
          const row = remainingData.slice(0, nextLineIndex + 1);
          remainingData = remainingData.slice(nextLineIndex + 1);
          importedRowsCount++;

          this.emit('row', row);
        }
      }
    });

    readStream.on('end', () => {
      this.emit('end', importedRowsCount);
    });
  }
}
