import path from 'node:path';
import { FileReader } from './file-reader.interface.js';
import fs from 'node:fs/promises';
import { Offer } from '../../types/offer.type.js';

export class TsvFileReader implements FileReader {
  public rawData: string = '';

  constructor(
    private readonly fileName: string
  ) { }

  public async read(): Promise<void> {
    this.rawData = await fs.readFile(path.resolve(this.fileName), { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('The file wasn\'t read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((row) => row.split('\t'))
      .map(([
        title,
        description,
        city,
        location,
        previewUrl,
        images,
        rating,
        offerType,
        roomsCount,
        questsCount,
        price,
        goods,
        hostName,
        hostEmail,
        hostAvatarUrl,
        hostPassword,
        hostType,
        reviewsCount,
        datetime,
        isPremium,
        isFavorite
      ]) => {
        const [latitude, longitude] = location.split(' ').map((value) => parseFloat(value));

        return ({
          title,
          description,
          city: city,
          location: {
            latitude,
            longitude
          },
          previewUrl,
          images: images.split(' '),
          rating: parseFloat(rating),
          type: offerType,
          roomsCount: parseInt(roomsCount, 10),
          questsCount: parseInt(questsCount, 10),
          price: parseFloat(price),
          goods: goods.split(','),
          host: {
            name: hostName,
            email: hostEmail,
            avatarUrl: hostAvatarUrl,
            password: hostPassword,
            type: hostType,
          },
          reviewsCount: parseInt(reviewsCount, 10),
          datetime,
          isPremium: isPremium === 'true',
          isFavorite: isFavorite === 'true'
        }) as Offer;
      }
      );
  }
}
