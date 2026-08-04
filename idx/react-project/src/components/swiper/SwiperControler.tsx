import React from 'react'
import type { SwiperAdvSettings, SwiperData, } from '../../types/swiper'

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ImageCont from './ImageCont';

type ModulesType = React.ComponentProps<typeof Swiper>["modules"];

interface Props {
    modules: ModulesType,
    advSettings: SwiperAdvSettings,
    swiperData: SwiperData
}

const SwiperControler:React.FC<Props> = ({modules, advSettings, swiperData}) => {
   return (
            <>
                <h2 className="text-base/7 font-semibold text-gray-900">Swiper </h2>
                <Swiper
                    className="w-full"
                    // install Swiper modules
                    modules={modules}
                    spaceBetween={advSettings.spaceBetween}
                    slidesPerView={advSettings.slidesPerView}
                    navigation={advSettings.modules.find(m => m.name === "Navigation")?.flag}
                    pagination={
                        advSettings.modules.find(m => m.name === "Pagination")?.flag
                            ? { clickable: true }
                            : { clickable: false }
                    }
                    scrollbar={
                        advSettings.modules.find(m => m.name === "Scrollbar")?.flag
                            ? { draggable: true }
                            : { draggable: false }}
                    onSwiper={(swiper: any) => console.log("swiper:", swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    {swiperData.data && swiperData.data.map((item) => {
                        let updatedData = {
                            id: item.id,
                            url: swiperData.path + "" + item.url,
                            name: item.name,
                            className: 'object-contain md:object-cover ketan'
                        }

                        return (
                            <SwiperSlide className=" py-5 grid text-center items-center justify-center">
                                <ImageCont {...updatedData} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </>
        )
}

export default SwiperControler
