import { useEffect, useState } from "react";
import { getComponentMapData } from "../../services/componentService";
import { ComponentRegistry } from "../ComponentRegistry";
import AccordionWithComp from "../UiComponents/accordion/AccordionWithComp";
import type { AccordionDynamicItemData } from "../UiComponents/accordion/type";
import type { ComponentListData, ImageData } from "../../types/types";

type FormData = {
  title: string;
  description: string;
  conRev: boolean;
  image?: ImageData;
};

interface AccordionDynamicFormProps {
  setTabId: (tabId: string) => void;
}

const MainDynamicForm: React.FC<AccordionDynamicFormProps> = ({
  setTabId,
}) => {
  // const config = ComponentRegistry["image-text-component"];

  const [openId, setOpenId] = useState<string | number>(0);
  const [data, setData] = useState<ComponentListData[]>([]);
  const [component, setComponent] = useState<string | undefined>();// TODO: setComponent form Componentlist
  const [subBtnFlag, setSubBtnFlag] = useState<boolean>(true); // TODO: After validation make it false

  //TODO: change once get data from local storage
   const editObject = { flag:false, inx:null } 

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    conRev: false,
    image: undefined,
  });

  const handleComponentSelect = (id) =>{
    setComponent(id)
    setOpenId(1);
  }

  const handleOpenImageList = () => {
    setOpenId(2);
  };

  const handleImageSelect = (selectedImage: ImageData) => {
    setFormData((previousData) => ({
      ...previousData,
      image: selectedImage,
    }));

    // Close image list and reopen form
    setOpenId(1);
  };

  const handleSubmit = ( e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setOpenId(0);
    setSubBtnFlag(true)
  }  
    const [loading, setLoading] = useState(true);   

    const config = component
  ? ComponentRegistry[component]
  : null;
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const result = await getComponentMapData();
          setData(result);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      loadData();
    }, []);

  const accordionData: AccordionDynamicItemData[] = [
    {
      id: 0,
      title: "component layout list",
      component: "component-layout-list",
      showHeader: false,
      props: {
        setCom: handleComponentSelect,
        data,
        loading,
      },
    },
    {
      id: 1,
      title: "Form",
      component: "dynamic-form",
      showHeader: false,
      props: {
        config,
        formData,
        setFormData,       
        onChangeImage: handleOpenImageList,
      },
    },
    {
      id: 2,
      title: "Image list",
      component: "image-list",
      showHeader: false,
      props: {
        onSelectImage: handleImageSelect,
      },
    },
  ];
console.log("component: ",component)
  return (
    <div className="p-5">
      <h2>Accordion Setting:</h2>

      <p className="mt-1 text-sm/6 text-gray-600">
        This information will update Accordion.
      </p>
      <form onSubmit={handleSubmit}>
      <AccordionWithComp
        items={accordionData}
        openId={openId}
        onOpenIdChange={(nextId) => {
          setOpenId(nextId);
        }}
      />
      <div className="grid justify-items-end">
        {/* TODO: Check all fild are fill then disabled = false */}
            <button type="submit" className={`btn ${subBtnFlag?"disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed":""}`} disabled={subBtnFlag}> 
              {editObject.flag ? "Save Data" : "Add Data"}
            </button>
          </div>
      </form>
    </div>
  );
};

export default MainDynamicForm;
