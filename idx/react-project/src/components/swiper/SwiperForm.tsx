import React from 'react'
import type { EditObject, imageData, SwiperData, SwiperItem} from '../../types/swiper'
import AccordionWithComp from '../UiComponents/accordion/AccordionWithComp'
import SorTableList from '../UiComponents/dragAndDrop/SorTableList'
import type { DynamicAccordionItemData } from '../UiComponents/accordion/type';
import SwiperItemComponent from './SwiperItemComponent';

interface Props {
  data:imageData,
  AccordionData: DynamicAccordionItemData[],
  handleReorder: (items: imageData) => void;
  setSwiperData: React.Dispatch<React.SetStateAction<SwiperData>>;  
  setEditObj: React.Dispatch<React.SetStateAction<EditObject>>;
}

const SwiperForm:React.FC<Props> = (props) => {
    const{ data, setEditObj, handleReorder, setSwiperData, AccordionData} = props
  return(
            <>
        <h2 className="text-base/7 font-semibold text-gray-900">Swiper Setting:</h2>
        <p className="mt-1 text-sm/6 ">This information will be update Swiper.</p>
        <h2 className="text-base/7 font-semibold text-gray-900 py-4 border-b-2 border-gray-200 dark:border-zinc-800">Images</h2>
          {data.length > 0 ? (
              <>
                  {/* <ListImages setEditObj={setEditObj} mainData={props} setData={setSwiperData}/> */}
                  <SorTableList<SwiperItem>
                      items={data}
                      onReorder={handleReorder}
                      onEdit={(item, index) => {
                          setEditObj({
                              inx: index,
                              flag: true,
                          });
                      }}
                      onDelete={(item) => {
                          setSwiperData((prev) => ({
                              ...prev,
                              data: prev.data.filter(
                                  (currentItem) => currentItem.id !== item.id
                              ),
                          }));
                      }}
                      renderItem={(item, index, handlers) => (
                          <SwiperItemComponent
                              item={item}
                              index={index}
                              {...handlers}
                          />
                      )}
                  />
                  {/* <SorTableList className="my-5" setEditObj={setEditObj} items={data} onReorder={handleReorder} setData={setSwiperData} /> */}
              </>
          ) : (
              <div className="align-middle text-center py-5 my-2 text-xs text-red-500">No images available. Please add image</div>
          )}
        <AccordionWithComp items={AccordionData} />
            </>
        )
}

export default SwiperForm
