import { useState } from "react";

import { ComponentRegistry } from "../ComponentRegistry";
import AccordionWithComp from "../UiComponents/accordion/AccordionWithComp";
import type { AccordionDynamicItemData } from "../UiComponents/accordion/type";
import type { ImageData } from "../../types/types";

type FormData = {
  title: string;
  description: string;
  conRev: boolean;
  image?: ImageData;
};

interface AccordionDynamicFormProps {
  setTabId: (tabId: string) => void;
}

const AccordionDynamicForm: React.FC<AccordionDynamicFormProps> = ({
  setTabId,
}) => {
  const config = ComponentRegistry["image-text-component"];

  const [openId, setOpenId] = useState<string | number>(0);
  const [component, setComponent] = useState<string>()

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    conRev: false,
    image: undefined,
  });

  const handleOpenImageList = () => {
    setOpenId(1);
  };

  const handleImageSelect = (selectedImage: ImageData) => {
    setFormData((previousData) => ({
      ...previousData,
      image: selectedImage,
    }));

    // Close image list and reopen form
    setOpenId(0);
  };

  const accordionData: AccordionDynamicItemData[] = [
    {
      id: 0,
      title: "component layout list",
      component: "component-layout-list",
      showHeader: false,
      props: {
        setCom: setComponent,
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
        onSubmit: () => {
          console.log("Demo A Form Data:", formData);
        },
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

  return (
    <div className="p-5">
      <h2>Accordion Setting:</h2>

      <p className="mt-1 text-sm/6 text-gray-600">
        This information will update Accordion.
      </p>

      <AccordionWithComp
        items={accordionData}
        openId={openId}
        onOpenIdChange={(nextId) => {
          setOpenId(nextId);
        }}
      />
    </div>
  );
};

export default AccordionDynamicForm;
