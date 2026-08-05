import { useEffect, useState } from "react";
import { Link } from "react-router"
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Keyboard, Zoom, EffectFade, EffectCube, EffectFlip, EffectCards } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import type {DynamicAccordionItemData } from "../UiComponents/accordion/type";
import type { SwiperData, SwiperAdvSettings, EditObject, SwiperModuleName, imageData} from "../../types/swiper";

import BasePath from "./BasePath";
import AddData from "./AddData";
import AdvanceSettings from "./AdvanceSettings";
import SwiperForm from "./SwiperForm";

import SubPageTemplate from "../page-templates/SubPageTemplate";
import SwiperControler from "./SwiperControler";


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
            <SubPageTemplate>
            <SubPageTemplate.Left>
                <div className='p-5 '>
                    <SwiperControler modules={selectedModules} advSettings={advSettings} swiperData={swiperData} />
                </div>
            </SubPageTemplate.Left>
            <SubPageTemplate.Right>
                < SwiperForm data={swiperData.data} setEditObj={setEditObj}  handleReorder={handleReorder} setSwiperData={setSwiperData} AccordionData={AccordionData}/>
            </SubPageTemplate.Right>
        </SubPageTemplate>
        </section>
    )
}

export default SwiperMain
