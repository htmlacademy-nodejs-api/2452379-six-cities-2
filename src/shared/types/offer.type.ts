import { OFFER_TYPES } from '../const/offer-types.js';
import { CityName } from './city-name.type.js';
import { Location } from './location.type.js';
import { Good } from './good.type.js';
import { User } from './user.type.js';

type OfferFlags = 'isPremium' | 'isFavorite';
type OfferType = typeof OFFER_TYPES[number];

export type Offer = {
  title: string;
  description: string;
  city: CityName;
  location: Location;
  previewUrl: string;
  images: string[];
  rating: number;
  type: OfferType;
  roomsCount: number;
  questsCount: number;
  price: number;
  goods: Good[];
  host: User;
  reviewsCount: number;
  datetime: string;
} & Record<OfferFlags, boolean>;
