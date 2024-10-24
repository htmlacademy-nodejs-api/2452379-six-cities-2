import { Location } from './location.type.js';
import { User } from './user.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[],
  locations: Location[],
  previewUrls:string[],
  images: string[][],
  hosts: User[]
};

