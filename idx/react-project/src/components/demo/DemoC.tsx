import React from 'react'
import style from './demo.module.css'
import img01 from '/images/carousel-images/img_01.jpg'
import img06 from '/images/carousel-images/img_06.jpg'
import img08 from '/images/carousel-images/img_08.jpg'
import img10 from '/images/carousel-images/img_10.jpg'

interface Props {
    value: [],
    setValue: () => void;
}
const DemoC: React.FC<Props> = () => {
    const { componentWrapper } = style
    return (
        <div className={`${componentWrapper} py-4 grid grid-cols-4 gap-3 dark:bg-zinc-800 bg-zinc-700 p-4 text-stone-100`}>
            <div className="bg-white p-2">
                <img src={img01} className="d-block w-100" alt="..." />
            </div>
            <div className="bg-white p-2">
                <img src={img06} className="d-block w-100" alt="..." />
            </div>
            <div className="bg-white p-2">
                <img src={img08} className="d-block w-100" alt="..." />
            </div>
            <div className="bg-white p-2">
                <img src={img10} className="d-block w-100" alt="..." />
            </div>

        </div>
    )
}

export default DemoC
