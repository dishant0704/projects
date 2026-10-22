import React from 'react';
import style from './demo.module.css';
import Image from '../UiComponents/Images/Image';

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
  return (
    <div className={`${componentWrapper} py-4 grid grid-cols-1`}>
      <div className="grid dark:bg-zinc-800 bg-zinc-700 p-8 text-stone-100 items-center justify-center h-auto w-ful ">
        <div className="text-center">
            {/* image must be an array data */}          
            <Image image={image} roundedFlag={true} />
            <h1>{name}</h1>
            <h5>{designation}</h5>
        </div>        
      </div>      
    </div>
  )
}

export default DemoB
