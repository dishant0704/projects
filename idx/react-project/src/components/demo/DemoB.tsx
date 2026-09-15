import React from 'react'
import img04 from '/images/carousel-images/img_04.jpg'
import style from './demo.module.css'
interface Props {
    value:[],
    setValue: ()=> void;
}
const DemoB:React.FC<Props> = (Props) => {
  const{componentWrapper} = style    
  return (
    <div className={`${componentWrapper} py-4 grid grid-cols-1`}>
      <div className="grid grid-cols-3 gap-4 align-items-start dark:bg-zinc-800 bg-zinc-700 p-4 text-stone-100">
        <div className="">
          <div className="bg-white p-2">
            <img src={img04} className="d-block w-100" alt="..." />
          </div>
        </div>
        <div className="col-span-2 v-aligh-center">
         <h1 className=''>First slide label</h1>
            <p>Some representative placeholder content for the first slide. Some representative placeholder content for the first slide.vSome representative placeholder content for the first slide.</p>
          </div>
      </div>
      <div className="clickable bullets">
        <span className="bullet bullet-active" role="button" aria-label="Go to slide 1" aria-current="true">1</span>
        <span className="bullet"  role="button" aria-label="Go to slide 2">1</span>
      </div>
    </div>
  )
}

export default DemoB
