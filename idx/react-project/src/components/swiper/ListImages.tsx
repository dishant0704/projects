import React from 'react'

import type { SwiperData, EditObject, SwiperItem } from '../../types/swiper'
// { inx: null; flag: boolean; }, Dispatch<SetStateAction<{ inx: null; flag: boolean; }
interface ListImagesProps {
    setEditObj:React.Dispatch<React.SetStateAction<EditObject>> 
    mainData:SwiperData,
    setData:React.Dispatch<React.SetStateAction<SwiperData>>
}
const ListImages = ({...props}:ListImagesProps):React.JSX.Element => {
    const{mainData:{data}, setData, setEditObj}=props;

    const editHandler = (i:number)=>{
    setEditObj({inx:i, flag:true})
    }

    const deleteHandler = (id:number | null)=>{
     const newData = data.filter((item)=>item.id !== id);
     setData((pre)=>({
        ...pre,
        data:newData
     }))
    }

  return (
    <>
    <h3 className='my-2 py-2 font-bold border-b-2 border-gray-100'>List:</h3>
            
          {data && data.map((item, inx) => {
              const { id, name, url }:SwiperItem = item
              return (
                  <div key={id} className="grid my-2 grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4">
                      <div>{name}</div>
                      <div>{url}</div>
                      <div>
                        <button
                        onClick={()=>editHandler(inx)}
                        className="bg-orange-400 px-3 py-1 text-base block rounded-md text-white cursor-pointer">Edit</button></div>
                      <div>
                        <button
                        onClick={()=>deleteHandler(id)} 
                        className="bg-red-400 px-3 py-1 text-base block rounded-md text-white cursor-pointer">Delete</button></div>
                  </div>
              )
          })} 
    </>
  )
}

export default ListImages
