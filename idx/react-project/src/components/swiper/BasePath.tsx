import React, { useEffect, useRef, useState } from 'react'

import type { SwiperData } from "../../types/swiper";

interface BasePathProps {
  data: SwiperData;
  setData: React.Dispatch<React.SetStateAction<SwiperData>>;
}

const BasePath = ({...pros}:BasePathProps):React.JSX.Element => {
    const{data, setData} = pros
    const [pathFlag, setPathFlag]=useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(!pathFlag){            
            inputRef.current?.focus()
        }
    },[pathFlag]);

    return (
        <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
            <div className='g-col-6'>
                <label className="block text-sm/6 font-medium text-gray-900">Base Path</label>                
                <input  
                value={data.path}
                onChange={(e)=>{
                    setData((pre)=>({
                        ...pre,
                        path: e.target.value
                    }))
                }} 
                ref={inputRef} 
                type="text" 
                name="base-path" 
                required={false} 
                aria-required="true" 
                disabled={pathFlag} 
                className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-400 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-back-300 sm:text-sm/6" />
            </div>
            <div className='g-col-2'>                
                <button type="button" onClick={() => setPathFlag((pre) => !pre)} className="bg-sky-500 px-3 py-1.5 text-base mt-8 block rounded-md text-white cursor-pointer">{pathFlag ? "Edit Base URL" : "Close Edit Base URL"} </button>
            </div>
        </div>
    )
}

export default BasePath
