import { ICommand } from './command.inerface.js';
import fs from 'node:fs/promises';
import path from 'node:path';

type PackageJsonConfig = {
  version: string;
};

function isPackageJsonConfig(value: unknown): value is PackageJsonConfig {
  return (value !== null && typeof value === 'object' && Object.hasOwn(value, 'version'));
}

export class VersionCommand implements ICommand {
  constructor(
    private readonly filePath: string = './package.json'
  ) { }

  private async readVersion(): Promise<string> {
    const data = await fs.readFile(path.resolve(this.filePath), { encoding: 'utf-8' });
    const parsedData = JSON.parse(data);

    if (!isPackageJsonConfig(parsedData)) {
      throw new Error();
    }

    return parsedData.version;
  }

  getName(): string {
    return '--version';
  }

  async execute(..._params: string[]): Promise<void> {
    try {
      console.info(await this.readVersion());
    } catch (error) {
      console.error(`Failed to read version from: ${this.filePath}`);
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
