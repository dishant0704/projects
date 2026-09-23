import React, { useState } from 'react'
import type{ ImageData } from '../../../types/types'

interface ImagesListProps { 
  onSelectImage:(data:ImageData)=>{}
}

const ImagesList:React.FC<ImagesListProps> = ({onSelectImage}) => {
  const [image, setImage] = useState({
  name: "Image 01",
  img: "img_01.jpg",
})
 
  return (
    <div>
      <button className='btn' type='button' onClick={()=>onSelectImage(image)}>Save image</button>
    </div>
  )
}

export default ImagesList
