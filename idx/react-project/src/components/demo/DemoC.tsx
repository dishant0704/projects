import React from 'react'
import style from './demo.module.css'
import { getImageSrc } from '../../utils/imageUtils'

type DemoAPropsObj = { 
  image?: {
    name: string;
    image: string;
  }[] | undefined;
};

const DemoC: React.FC<DemoAPropsObj> = ({image}) => {
    const { componentWrapper } = style
    return (
        <div className={`${componentWrapper} py-4 grid grid-cols-4 gap-3 dark:bg-zinc-800 bg-zinc-700 p-4 text-stone-100`}>
            {
                image && image.map((item) => {
                    const imageSrc = getImageSrc({
                        folder: "carousel-images",
                        image: item?.image,
                    });
                    return (
                        <div className="bg-white p-2">
                            <img src={imageSrc} className="d-block w-100" alt="..." />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DemoC
