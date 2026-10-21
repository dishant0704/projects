import React from 'react';
import style from './demo.module.css';
import { getImageSrc } from '../../utils/imageUtils';

type DemoAPropsObj = {
  name:string;
  designation: string;
  image?: {
    name: string;
    image: string;
  }[] | undefined;
};

const DemoB:React.FC<DemoAPropsObj> = ({name, designation, image}) => {
  const{componentWrapper} = style
  
  const imageSrc = getImageSrc({
    folder: "carousel-images",
    image: image[0]?.image,
  }); 

  return (
    <div className={`${componentWrapper} py-4 grid grid-cols-1`}>
      <div className="grid dark:bg-zinc-800 bg-zinc-700 p-8 text-stone-100 items-center justify-center h-auto w-ful ">
        <div className="text-center">
          <div className="bg-white p-2 rounded-full">
            <img src={imageSrc} className="rounded-full w-32 h-32 object-cover" alt="..." />            
          </div>
            <h1>{name}</h1>
            <h5>{designation}</h5>
        </div>        
      </div>      
    </div>
  )
}

export default DemoB
