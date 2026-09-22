import { useState } from "react";

import { ComponentRegistry } from "../ComponentRegistry";
import AccordionWithComp from "../UiComponents/accordion/AccordionWithComp";
import type { AccordionDynamicItemData } from "../UiComponents/accordion/type";

interface AccordionDynamicFormProps {
  setTabId: (tabId: string) => void;
}

const AccordionDynamicForm: React.FC<AccordionDynamicFormProps> = ({
  setTabId,
}) => {
  const config = ComponentRegistry["demo_a"];

  const [openId, setOpenId] = useState<string | number>(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    conRev: false,
    image: undefined,
  });

  const handleOpenImageList = () => {
    setOpenId(1);
  };

  const handleImageSelect = (selectedImage: {
    name: string;
    img: string;
  }) => {
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
      title: "Form",
      component: "dynamic-form",
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
      id: 1,
      title: "Image list",
      component: "image-list",
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
          setOpenId(nextId ?? 0);
        }}
      />
    </div>
  );
};

export default AccordionDynamicForm;