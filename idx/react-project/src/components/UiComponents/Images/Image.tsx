import React from 'react'
import { getImageSrc } from '../../../utils/imageUtils';

interface ImageProps{
roundedFlag?: boolean;
cssClass?: string;
image?: {
    name: string;
    image: string;
  }[] | undefined;
}

const Image:React.FC<ImageProps> = ({image, roundedFlag=false, cssClass}) => {

    if(!image) return ;
      const imageSrc = getImageSrc({
        folder: "carousel-images",
        image: image[0]?.image,
      }); 

  return (
    <div className="p-2">
      <img
        src={imageSrc ? imageSrc : ""}
        className={`${roundedFlag? "rounded-full w-32 h-32 object-cover" :"d-block w-100 "} border-5 border-white ${cssClass}`}
        alt={image[0].name}
      />
    </div>
  );
}

export default Image
