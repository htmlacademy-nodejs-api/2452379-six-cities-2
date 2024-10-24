import { MockServerData } from '../../types/mock-server-data.type.js';

export interface IOfferGenerator {
  generate(mockData: MockServerData): string;
}
