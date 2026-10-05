import { useEffect, useState } from "react";
import { getComponentMapData } from "../../services/componentService";
import { ComponentRegistry } from "../ComponentRegistry";
import AccordionWithComp from "../UiComponents/accordion/AccordionWithComp";
import type { AccordionDynamicItemData } from "../UiComponents/accordion/type";
import type { ComponentListData, ImageData, FormData } from "../../types/types";
import { getImageFieldSchema } from "../../services/helper";

interface AccordionDynamicFormProps {
  setTabId: (tabId: string) => void;
}

const MainDynamicForm: React.FC<AccordionDynamicFormProps> = ({ setTabId }) => {

  const [openId, setOpenId] = useState<string | number>(0);
  const [previousIds, setPreviousIds] = useState<(string | number)[]>([]);
  const [data, setData] = useState<ComponentListData[]>([]);
  const [component, setComponent] = useState<string | undefined>(); // TODO: setComponent form Componentlist
  const [subBtnFlag, setSubBtnFlag] = useState<boolean>(true); // TODO: After validation make it false

  //TODO: change once get data from local storage
  const editObject = { flag: false, inx: null };

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    conRev: false,
    image: undefined,
  });

  const handleOpenIdChange = (nextId: string | number) => {
    setPreviousIds((prev) => [...prev, openId]);
    setOpenId(nextId);
  };

  const handleGoBack = () => {
    setPreviousIds((prev) => {
      if (prev.length === 0) {
        return prev;
      }

      const previousId = prev[prev.length - 1];

      setOpenId(previousId);

      return prev.slice(0, -1);
    });
  };

  const handleComponentSelect = (id: string) => {
    setComponent(id);
    handleOpenIdChange(1);
  };

  const handleOpenImageList = () => {
    handleOpenIdChange(2);
  };

  const handleImageSelect = (selectedImage: ImageData) => {
    setFormData((previousData) => ({
      ...previousData,
      image: selectedImage,
    }));
    handleGoBack();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setOpenId(0);
    setPreviousIds([]);
    setSubBtnFlag(true);
  };
  const [loading, setLoading] = useState(true);

  const config = component ? ComponentRegistry[component] : null;

  const imagesSchema = getImageFieldSchema(config, "images");

  const multiImage = imagesSchema?.multiImage ?? false;

  console.log("multiImage:", multiImage);

  console.log(multiImage);

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
        goBack: handleGoBack,
        onSelectImage: handleImageSelect,
        multipleSelect: false,
        selectedImageIds: Array.isArray(formData.image) && formData.image ? formData.image.map((img: ImageData) => img.id) : formData.image ? [formData.image.id] : [],
      },
    },
  ];
  return (
    <div className="p-5">
      <h2>Accordion Setting:</h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        This information will update Accordion.
      </p>
      {previousIds.length > 0 && (
        <span
          className="py-2 text-[14px] text-primary-6-light-5 cursor-pointer"
          onClick={handleGoBack}
        >
          Go Back to Previous Section
        </span>
      )}
      <form onSubmit={handleSubmit}>
        <AccordionWithComp
          items={accordionData}
          openId={openId}
          onOpenIdChange={() => handleOpenIdChange}
        />
        <div className="grid justify-items-end">
          {/* TODO: Check all fild are fill then disabled = false */}
          <button
            type="submit"
            className={`btn ${subBtnFlag ? "disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed" : ""}`}
            disabled={subBtnFlag}
          >
            {editObject.flag ? "Save Data" : "Add Data"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainDynamicForm;
