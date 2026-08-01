import React from 'react'
import type { SwiperData } from '../../types/swiper'

const SwiperForm:React.FC = ({props}:SwiperData) => {
  return(
            <>
        <h2 className="text-base/7 font-semibold text-gray-900">Swiper Setting:</h2>
        <p className="mt-1 text-sm/6 ">This information will be update Swiper.</p>
        <h2 className="text-base/7 font-semibold text-gray-900 py-4 border-b-2 border-gray-200 dark:border-zinc-800">Images</h2>
        {props.data.length > 0?(
            <>
                {/* <ListImages setEditObj={setEditObj} mainData={props} setData={setSwiperData}/> */}
                <SorTableList className="my-5" setEditObj={setEditObj} items={props.data} onReorder={handleReorder} setData={setSwiperData} />
            </>
        ):(
            <div className="align-middle text-center py-5 my-2 text-xs text-red-500">No images available. Please add image</div>
        )}
        <AccordionWithComp items={AccordionData} />
            </>
        )
}

export default SwiperForm
