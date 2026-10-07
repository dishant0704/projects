import type React from "react";

import AccordionForm from "./AccordionRoot/AccordionForm";
import AccordionList from "./AccordionRoot/AccordionList";
import AccordionDynamicList from "./AccordionRoot/AccordionDynamicList";
import Accordion from "./UiComponents/accordion/Accordion";
import MainDynamicForm from "./DynamicForm/MainDynamicForm";
import SorTableList from "./UiComponents/dragAndDrop/SorTableList";
import DynamicForm from "./DynamicForm/DynamicForm";
import ImagesList from "./UiComponents/Images/ImagesList";
import ComponentLayoutData from "./DynamicForm/ComponentLayoutData";

import DemoA from "./demo/DemoA";
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
// Registry Types
// -------------------------------------

export type FieldType = "text" | "textarea" | "boolean" | "number";

export interface TextFieldSchema {
  type: FieldType;
  label?: string;
  required?: boolean;
}

export interface ImageFieldSchema {
  type: "image";
  flag?: boolean;
  multiImage?: boolean;  
}

export type PropSchemaField = TextFieldSchema | ImageFieldSchema;

export type PropSchema = Record<string, PropSchemaField>;

export interface RegistryComponentProps {
  component: React.ComponentType<any>;
  props: Record<string, unknown>;
  propSchema?: PropSchema;
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
    component: MainDynamicForm,
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
      images: [],
    },
    propSchema: {
      title: {
        type: "text",
        label: "Title",
        required: true,
      },
      content: {
        type: "textarea",
        label: "content",
        required: true,
      },
      conRev: {
        type: "boolean",
        label: "Align Content from Right",
        required: true,
      },
      images: {
        type: "image",
        flag: true,
        multiImage: false,
      },
    },
  },

  "profile-picture-component": {
    component: DemoA,
    props: {
      title: "",
      images: [],
    },
    propSchema: {
      title: {
        type: "text",
        label: "Title",
        required: true,
      },
      images: {
        type: "image",
        flag: true,
        multiImage: false,
      },
    },
  },

  "profile-picture-carousel-component": {
    component: DemoA,
    props: {
      title: "",
      images: [],
    },
    propSchema: {
      title: {
        type: "text",
        label: "Title",
        required: true,
      },
      images: {
        type: "image",
        flag: true,
        multiImage: true,
      },
    },
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
    propSchema: {
      title: {
        type: "text",
        label: "Title",
        required: true,
      },
      images: {
        type: "image",
        flag: true,
        multiImage: true,
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
