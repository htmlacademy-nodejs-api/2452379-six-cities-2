export const generateRandomValue =
  (min: number, max: number, numAfterDigit = 0): number =>
    +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomElement =
  <T>(array: T[] | readonly T[]): T =>
    array[generateRandomValue(0, array.length - 1)];

export const generateRandomArraySlice =
  <T>(array: T[] | readonly T[], sliceLength = 0): T[] => {
    const arrayCopy = array.slice();

    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }

    return arrayCopy.slice(0, sliceLength || generateRandomValue(0, array.length - 1));
  };
