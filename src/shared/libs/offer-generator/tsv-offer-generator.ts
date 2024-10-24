import { AVAILABLE_LOCATIONS } from '../../const/available-locations.js';
import { GOODS } from '../../const/goods.js';
import { OFFER_TYPES } from '../../const/offer-types.js';
import { generateRandomArraySlice, generateRandomValue, getRandomElement } from '../../helpers/common.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { IOfferGenerator } from './offer-generator.interface.js';
import dayjs from 'dayjs';

const MIN_RATING = 1;
const MAX_RATING = 5;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_QUESTS = 1;
const MAX_QUESTS = 10;
const MIN_PRICE = 100;
const MAX_PRICE = 10000;
const MIN_REVIEWS = 0;
const MAX_REVIEWS = 100;

export class TsvOfferGenerator implements IOfferGenerator {
  public generate(mockData: MockServerData): string {
    let result = '';
    result += `${getRandomElement(mockData.titles)}\t`;
    result += `${getRandomElement(mockData.descriptions)}\t`;
    result += `${getRandomElement(AVAILABLE_LOCATIONS)}\t`;
    const { latitude, longitude } = getRandomElement(mockData.locations);
    result += `${latitude} ${longitude}\t`;
    result += `${getRandomElement(mockData.previewUrls)}\t`;
    result += `${getRandomElement(mockData.images)}\t`;
    result += `${generateRandomValue(MIN_RATING, MAX_RATING)}\t`;
    result += `${getRandomElement(OFFER_TYPES)}\t`;
    result += `${generateRandomValue(MIN_ROOMS, MAX_ROOMS)}\t`;
    result += `${generateRandomValue(MIN_QUESTS, MAX_QUESTS)}\t`;
    result += `${generateRandomValue(MIN_PRICE, MAX_PRICE)}\t`;
    result += `${generateRandomArraySlice(GOODS).join(',')}\t`;
    const { name, email, avatarUrl, password, type } = getRandomElement(mockData.hosts);
    result += `${name}\t${email}\t${avatarUrl}\t${password}\t${type}\t`;
    result += `${generateRandomValue(MIN_REVIEWS, MAX_REVIEWS)}\t`;
    result += `${dayjs().subtract(generateRandomValue(0, 100)).toISOString()}\t`;
    result += `${generateRandomValue(0, 1) ? 'true' : 'false'}\t`;
    result += `${generateRandomValue(0, 1) ? 'true' : 'false'}\t`;

    return result;
  }
}
