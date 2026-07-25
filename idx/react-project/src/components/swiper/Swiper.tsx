import { useEffect, useState } from "react";
import { Link } from "react-router"
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Keyboard, Zoom, EffectFade, EffectCube, EffectFlip, EffectCards } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import type { SwiperData, SwiperAdvSettings, EditObject, SwiperModuleName, imageData} from "../../types/swiper";

import ImageCont from "./ImageCont";
import BasePath from "./BasePath";
import AddData from "./AddData";
import AdvanceSettings from "./AdvanceSettings";
import SorTableList from "../UiComponents/SorTableList";
import AccordionWithComp from "../UiComponents/accordion/AccordionWithComp";
import type {DynamicAccordionItemData } from "../UiComponents/accordion/type";


const swiperAdvSettings: SwiperAdvSettings = {
    spaceBetween: 50,
    slidesPerView: 1,
    modules: [
        {
            name: "Navigation",
            flag: true
        },
        {
            name: "Pagination",
            flag: true
        },
        {
            name: "Scrollbar",
            flag: true
        },
        {
            name: "A11y",
            flag: true
        },
        {
            name: "Autoplay",
            flag: false
        },
        {
            name: "Keyboard",
            flag: false
        },
        {
            name: "Zoom",
            flag: false
        },
        {
            name: "EffectFade",
            flag: false
        },
        {
            name: "EffectCube",
            flag: false
        },
        {
            name: "EffectFlip",
            flag: false
        },
        {
            name: "EffectCards",
            flag: false
        }
    ]
}

const SwiperMain = () => {
    const defaultSwiperData: SwiperData = {
        path: "./images/swiper/",
        data: []
    }
    const [swiperData, setSwiperData] = useState<SwiperData>(defaultSwiperData);
    const [advSettings, setAdvSettings] = useState<SwiperAdvSettings>(swiperAdvSettings);
    const [editObj, setEditObj] = useState<EditObject>({ inx: null, flag: false })

    const swiperModuleMap: Record<SwiperModuleName, any> = {
        Navigation, Pagination, Scrollbar, A11y, Autoplay, Keyboard, Zoom, EffectFade, EffectCube, EffectFlip, EffectCards
    }

    const selectedModules = (advSettings?.modules ?? [])
        .filter(({ flag }) => flag)
        .map(({ name }) => swiperModuleMap[name]);
    // console.log("selectedModules: ", selectedModules)

    //store data in to local storage
    useEffect(() => {
        const localData = localStorage.getItem("idx-swiper");
        if (!localData) return
        try {
            const parseData = JSON.parse(localData)
            setSwiperData(parseData.swiperData ?? defaultSwiperData);
            setAdvSettings(parseData.advSettings ?? swiperAdvSettings)

        } catch (error) {
            console.error(error);
            localStorage.removeItem("idx-swiper");
        }
    }, []);

    useEffect(() => {
        if (swiperData.data.length > 0) {
            localStorage.setItem("idx-swiper", JSON.stringify({ swiperData: swiperData, advSettings: advSettings }))
        }
    }, [swiperData, advSettings])

    const handleReorder = (items: imageData) => {
        setSwiperData(prev => ({
            ...prev,
            data: items,
        }));
    };

    const AccordionData: DynamicAccordionItemData[] = [
        {
            id: 0,
            title: "Add Image",
            component: AddData,
            props: {
                editObj: editObj,
                setEditObj: setEditObj,
                mainData: swiperData,
                setData: setSwiperData,
            }
        },
        {
            id: 1,
            title: "Base Path",
            component: BasePath,
            props: {
                data: swiperData,
                setData: setSwiperData,
            },
        },
        {
            id: 2,
            title: "Advance Settings",
            component: AdvanceSettings,
            props: {
                advData: advSettings,
                setAdvData: setAdvSettings
            },
        },
    ];

    return (
        <section className='p-5 '>
            <h2 className='text-2xl'>Swiper: </h2>
            <Link to={`/`} className='text-[14px] text-red-500' >Back to Dashboard</Link>
            <div className='grid md:grid-cols-2 gap-5'>
                <div className='p-5 '>
                    <h2 className="text-base/7 font-semibold text-gray-900">Swiper </h2>
                    <Swiper
                        className="grid gap-5"
                        // install Swiper modules
                        modules={selectedModules}
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

                </div>
                <div className='p-5'>
                    <h2 className="text-base/7 font-semibold text-gray-900">Swiper Setting:</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">This information will be update Swiper.</p>
                    <h2 className="text-base/7 font-semibold text-gray-900 py-4 border-b-2 border-gray-200">Images</h2>
                    {swiperData.data.length > 0 && (
                        <>
                            {/* <ListImages setEditObj={setEditObj} mainData={swiperData} setData={setSwiperData}/> */}
                            <SorTableList className="my-5" setEditObj={setEditObj} items={swiperData.data} onReorder={handleReorder} setData={setSwiperData} />
                        </>
                    )}
                    <AccordionWithComp items={AccordionData} />

                </div>
            </div>
        </section>
    )
}

export default SwiperMain
