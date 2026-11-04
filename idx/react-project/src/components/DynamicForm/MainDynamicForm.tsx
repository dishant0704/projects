import { useEffect, useState } from "react";
import { getComponentMapData } from "../../services/componentService";
import { ComponentRegistry } from "../ComponentRegistry";
import AccordionWithComp from "../UiComponents/accordion/AccordionWithComp";
import type { AccordionDynamicItemData, AccordionItemData, DynamicAccordionItemData, DynamicImage } from "../UiComponents/accordion/type";
import type {
  ComponentListData,
  ImageData,
} from "../../types/types";
import type { DynamicFormData } from "../../components/UiComponents/accordion/type";
import { getImageFieldSchema } from "../../services/helper";
import { useAppDispatch, useAppSelector } from "../../app/hooks/reducHooks";
import { getPageData } from "../../utils/accordionUtils";
import { addDynamicAccordionItem, setAccordionPage} from "../../app/features/accordion/accordionSlice";

interface AccordionDynamicFormProps {
  setTabId: (tabId: string) => void;
}

const MainDynamicForm: React.FC<AccordionDynamicFormProps> = ({ setTabId }) => {
  const [openId, setOpenId] = useState<string | number>(0);
  const [previousIds, setPreviousIds] = useState<(string | number)[]>([]);
  const [data, setData] = useState<ComponentListData[]>([]);
  const [component, setComponent] = useState<string | undefined>(); // TODO: setComponent form Componentlist
  const [subBtnFlag, setSubBtnFlag] = useState<boolean>(false); // TODO: After validation make it false
  const [imageError, setImageError] = useState(false);

  const [loading, setLoading] = useState(true);

  const config = component ? ComponentRegistry[component] : null;
  const imagesSchema = getImageFieldSchema(config, "images");
  const multiImage = imagesSchema?.multiImage ?? false;

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

  const dispatch = useAppDispatch();

  //Get Data from redux / local storage
  const {
    page,
    editObject: { flag, inx },
  } = useAppSelector((state) => state.accordion);

  const formDefaultValue = {
    id: "",
    accordionTitle: "",
    title: "",
    content: "",
    conRev: false,
    image: [],
  };

  const [formData, setFormData] = useState<DynamicFormData>(formDefaultValue);

  const isDynamicAccordionItem = (
    item: AccordionItemData | AccordionDynamicItemData
  ): item is AccordionDynamicItemData => {
    return "component" in item;
  };

  const isDynamicFormData = (
    props: unknown
  ): props is DynamicFormData => {
    if (typeof props !== "object" || props === null) {
      return false;
    }

    return (
      "accordionTitle" in props &&
      typeof props.accordionTitle === "string" &&
      "conRev" in props &&
      typeof props.conRev === "boolean" &&
      "title" in props &&
      typeof props.title === "string" &&
      "content" in props &&
      typeof props.content === "string"
    );
  };

  // this will used at edite mode
  useEffect(() => {
    if (!page || typeof inx !== "number" || !flag) {
      return;
    }

    const dynamicAccordion = getPageData({
      pageData: page,
      pageId: "dynAcc",
    });

    const currentDynamicItem = dynamicAccordion?.items?.[inx];

    // Check whether the item is a dynamic accordion item
    if (
      !currentDynamicItem ||
      !isDynamicAccordionItem(currentDynamicItem)
    ) {
      return;
    }

    // Form data is inside props, not directly inside the item
    const currentFormData = currentDynamicItem.props;

    if (!isDynamicFormData(currentFormData)) {
      return;
    }


    setFormData({
      id: currentFormData.id ?? String(currentDynamicItem.id),
      accordionTitle: currentFormData.accordionTitle,
      title: currentFormData.title === "" ? currentFormData.accordionTitle : currentFormData.title,
      content: currentFormData.content,
      conRev: currentFormData.conRev,
      image: currentFormData.image ?? [],
      name: currentFormData.name,
      designation: currentFormData.designation,
    });
    setComponent(currentDynamicItem.component);
    setOpenId(1);

  }, [page, flag, inx]);

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

      // restate image array
      if (previousId === 0) {
        setFormData(formDefaultValue);
      }

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

  const handleImageSelect = (selectedImage: DynamicImage) => {
    setFormData((previousData) => ({
      ...previousData,
      image: selectedImage,
    }));
    handleGoBack();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.image) {
      setImageError(true);
      return;
    }

    setImageError(false);

    if (!page) {
      return;
    }

    const dynamicAccordion = page.items.find((item) => item.id === "dynAcc");

    if (!dynamicAccordion || !component) {
      return;
    }

    const currentItems = dynamicAccordion.items ?? [];

    if (flag) {
      // EDIT

      if (typeof inx !== "number") return;

      if (inx < 0 || inx >= currentItems.length) return;

      const existingItem = currentItems[inx];

      if (!("component" in existingItem)) return;

      const accTitle =
        formData.accordionTitle === ""
          ? formData.title
          : formData.accordionTitle;

      const updatedItems = [...currentItems];

      updatedItems[inx] = {
        ...existingItem,
        title: accTitle,
        index: inx,
        props: {
          ...existingItem.props,
          ...formData,
        },
      };

      dispatch(
        setAccordionPage({
          ...page,
          items: page.items.map((item) =>
            item.id === "dynAcc"
              ? {
                ...item,
                items: updatedItems,
              }
              : item
          ),
        })
      );
    } else {
      // -----------------------------
      // ADD
      // -----------------------------

      let accTitle = formData.accordionTitle === "" ? formData.title : formData.accordionTitle

      dispatch(
        addDynamicAccordionItem({
          props: { ...formData },
          title: accTitle,
          id: crypto.randomUUID(),
          index: currentItems.length,
          component: component,
        }),
      );
    }

    setSubBtnFlag(false);
    setFormData(formDefaultValue);
    setOpenId(0);
    setTabId("accList");
  };

  const accordionData: DynamicAccordionItemData[] = [
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
        imageError,
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
        multipleSelect: multiImage,
        selectedImageIds:
          Array.isArray(formData.image) && formData.image
            ? formData.image.map((img: ImageData) => img.id)
            : formData.image
              ? [formData.image.id]
              : [],
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
          onOpenIdChange={(id) => {
            if (id !== null) {
              handleOpenIdChange(id);
            } else {
              setOpenId(0);
            }
          }}
        />
        <div className="grid justify-items-end">
          {/* TODO: Check all fild are fill then disabled = false */}
          <button
            type="submit"
            className={`btn ${subBtnFlag ? "disabled:opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed" : ""}`}
            disabled={subBtnFlag}
          >
            {flag ? "Save Data" : "Add Data"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainDynamicForm;
