import React from 'react'
import img01 from '/images/carousel-images/img_01.jpg'
import style from './demo.module.css'
interface Props {
    value:[],
    setValue: ()=> void;
}
const DemoA:React.FC<Props> = () => {
  const{componentWrapper} = style    
  return (
    <div className={`${componentWrapper} py-4`}>
      <div className="grid grid-cols-3 gap-4 align-items-start dark:bg-zinc-800 bg-zinc-700 p-4 text-stone-100">
        <div className="">
          <div className="bg-white p-2">
            <img src={img01} className="d-block w-100" alt="..." />
          </div>
        </div>
        <div className="col-span-2 v-aligh-center">
         <h1 className=''>First slide label</h1>
            <p>Some representative placeholder content for the first slide. Some representative placeholder content for the first slide.vSome representative placeholder content for the first slide.</p>
          </div>
      </div>
    </div>
  )
}

export default DemoA
