import { TsvFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { CityName } from '../../shared/types/city-name.type.js';
import { Good } from '../../shared/types/good.type.js';
import { Offer, OfferType } from '../../shared/types/offer.type.js';
import { UserType } from '../../shared/types/user.type.js';
import { ICommand } from './command.inerface.js';

export class ImportCommand implements ICommand {
  public toOffer(row: string): Offer | undefined {
    if (!row || !row.length) {
      return;
    }
    const [
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
    ] = row.split('\t');

    const [latitude, longitude] = location.split(' ').map((value) => parseFloat(value));

    return ({
      title,
      description,
      city: city as CityName,
      location: {
        latitude,
        longitude
      },
      previewUrl,
      images: images.split(' '),
      rating: parseFloat(rating),
      type: offerType as OfferType,
      roomsCount: parseInt(roomsCount, 10),
      questsCount: parseInt(questsCount, 10),
      price: parseFloat(price),
      goods: goods.split(',') as Good[],
      host: {
        name: hostName,
        email: hostEmail,
        avatarUrl: hostAvatarUrl,
        password: hostPassword,
        type: hostType as UserType,
      },
      reviewsCount: parseInt(reviewsCount, 10),
      datetime,
      isPremium: isPremium === 'true',
      isFavorite: isFavorite === 'true'
    });
  }

  async execute(...params: string[]): Promise<void> {
    const [filePath] = params;

    const fileReader = new TsvFileReader(filePath.trim());
    fileReader.addListener('row', (row) => console.info(this.toOffer(row)));
    fileReader.addListener('end', (importedRowsCount) => console.info(`Imported objects count: ${importedRowsCount}`));
    fileReader.read();
  }

  getName(): string {
    return '--import';
  }
}
