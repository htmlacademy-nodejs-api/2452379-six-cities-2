import got from 'got';
import { TsvFileWriter } from '../../shared/libs/file-writer/tsv-file-writer.js';
import { ICommand } from './command.inerface.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { TsvOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';

export class GenerateCommand implements ICommand {
  public async execute(...params: string[]): Promise<void> {
    const count = parseInt(params[0], 10);
    const [, fileName, url] = params;
    const fileWriter = new TsvFileWriter(fileName);
    const offerGenerator = new TsvOfferGenerator();
    const data = await got(url).json<MockServerData>();

    for (let i = 0; i < count; i++) {
      await fileWriter.write(offerGenerator.generate(data));
    }
  }

  public getName(): string {
    return '--generate';
  }
}
