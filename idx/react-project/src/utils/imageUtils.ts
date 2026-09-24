interface ImageSourceOptions {
  folder: string;
  image?: string | null
}

export const getCarouselImageSrc = ({
  folder,
  image,
}: ImageSourceOptions): string | null => {
  if (!image) {
    return null;
  }

  return `/images/${folder}/${image}`;
};