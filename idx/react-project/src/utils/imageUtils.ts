interface ImageSourceOptions {
  folder: string;
  image?: string | null
}

interface GetImageFolderProps {
  folder: string;
}

export const getImageSrc = ({
  folder,
  image,
}: ImageSourceOptions): string | null => {
  if (!image) {
    return null;
  }

  return `/images/${folder}/${image}`;
};

export const getImageFolder = ({folder}:GetImageFolderProps): string | null =>{
   if (!folder) {
    return null;
  }
  return `/images/${folder}/`;
}