import React, { useEffect, useState } from 'react';
import type{ ImageData } from '../../../types/types';
import { getImages } from '../../../services/getImages';

interface ImagesListProps { 
  onSelectImage: (data: ImageData) => void
}

const ImagesList:React.FC<ImagesListProps> = ({onSelectImage}) => {
  const [image, setImage] = useState<ImageData[]>([]);

  const getImagesData = async()=>{
    try {
      const imageData = await getImages();
      setImage(imageData)
    } catch (error) {
      throw new Error(`Image Data has some Error`)
    }
  }
  useEffect(()=>{
    getImagesData()
  },[])
 // create json object for the same
 console.log("image length is :", image.length)
  return (
    <div>
      <div className='grid sm:grid-cols-5 gap-2'>
        {
          image && image.map((item, inx)=>{
            const{name, image}=item
            return(
              <div key={inx} className='p-2 shadow-lg '>
                <img src={`/images/carousel-images/${image}`}></img>
                {name} = {image}
              </div>
            )
          })
        }
      </div>
      <button className='btn' type='button' onClick={()=>{onSelectImage}}>Save image</button>
    </div>
  )
}

export default ImagesList
