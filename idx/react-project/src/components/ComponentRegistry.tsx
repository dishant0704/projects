import type React from "react";

import AccordionForm from "./AccordionRoot/AccordionForm";
import AccordionList from "./AccordionRoot/AccordionList";
import AccordionDynamicList from "./AccordionRoot/AccordionDynamicList";
import Accordion from "./UiComponents/accordion/Accordion";
import AccordionDynamicForm from "./AccordionRoot/AccordionDynamicForm";
import SorTableList from "./UiComponents/dragAndDrop/SorTableList";
import DynamicForm from "./DynamicForm/DynamicForm";
import ImagesList from "./UiComponents/Images/ImagesList";
import ComponentLayoutData from "./DynamicForm/ComponentLayoutData";

import DemoA from "./demo/DemoA";
import DemoB from "./demo/DemoB";
import DemoC from "./demo/DemoC";

// Icons
import {
  ListIcon,
  ComponentIcon,
  FormIcon,
  PencilIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";

// -------------------------------------
// Component Props
// -------------------------------------

export type DemoComponentProps = {
  title: string;
  discription: string;
  conRev: boolean;
  image: {
    name: string;
    img: string;
  };
};

// -------------------------------------
// Registry Types
// -------------------------------------

export type FieldType =
  | "text"
  | "textarea"
  | "boolean"
  | "number";

export interface FieldSchema {
  type: FieldType;
  label?: string;
  required?: boolean;
}

interface ObjectSchema {
  [key: string]: FieldSchema;
}

export interface RegistryComponentProps {
  component: React.ComponentType<any>;
  props: Record<string, unknown>;
  propSchema?: Record<
  string,
  FieldSchema | ObjectSchema[] | FieldSchema[]
  >;
}

// -------------------------------------
// Component Registry
// -------------------------------------

export const ComponentRegistry: Record<string, RegistryComponentProps> = {
  accordion: {
    component: Accordion,
    props: {},
  },

  "accordion-list": {
    component: AccordionList,
    props: {},
  },

  "accordion-dynamic-list": {
    component: AccordionDynamicList,
    props: {},
  },

  "accordion-form": {
    component: AccordionForm,
    props: {},
  },

  "accordion-dynamic-form": {
    component: AccordionDynamicForm,
    props: {},
  },

  "dynamic-form": {
    component: DynamicForm,
    props: {},
  },

  "image-list": {
    component: ImagesList,
    props: {},
  },

  "component-layout-list": {
    component: ComponentLayoutData,
    props: {},
  },
  "sor-table-list": {
    component: SorTableList,
    props: {},
  },

  "image-text-component": {
    component: DemoA,
    props: {
      title: "",
      discription: "",
      conRev: false,
      images: [
        {
          imgName: "",
          fileName: "",
        },
      ],
    },
    propSchema: {
      title: {
        type: "text",
        label: "Title",
        required: true,
      },
      discription: {
        type: "textarea",
        label: "Description",
      },
      conRev: {
        type: "boolean",
        label: "Align Content from Right",
      },
      images: [
        {
          type: "text",
          label: "Image Name",
          required: true,
        },
        {
          type: "text",
          label: "File Name",
          required: true,
        },
      ],
    },
  },

  demo_b: {
    component: DemoB,
    props: {},
  },

  demo_c: {
    component: DemoC,
    props: {
      title: "",
      discription: "",
      conRev: false,
      image: {
        name: "",
        img: "",
      },
    },
  },
};

// -------------------------------------
// Icon Registry
// -------------------------------------

export const IconRegistry: Record<string, React.ComponentType<any>> = {
  list: ListIcon,
  component: ComponentIcon,
  form: FormIcon,
  edit: PencilIcon,
  setting: SettingsIcon,
  delete: Trash2Icon,
};
