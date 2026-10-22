import React from "react";
import style from "./demo.module.css";
import Image from "../UiComponents/Images/Image";

type DemoAPropsObj = {
  title:string;
  content: string;
  conRev: boolean;
  image?: {
    name: string;
    image: string;
  }[] | undefined;
};

const DemoA: React.FC<DemoAPropsObj> = ({title, content, conRev, image }) => {
const { componentWrapper } = style;

if(!image){return}
  
  if (!image[0]?.image) {
    return (
      <div className={`${componentWrapper} py-4`}>
        <p className="error">Image data is missing.</p>
        <p>{content}</p>
      </div>
    );
  }

  // Build the public image URL
  return (
    <div className={`${componentWrapper} py-4`}>
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 align-items-start dark:bg-zinc-800 bg-zinc-700 p-4 text-stone-100"
        dir={conRev ? "rtl" : "ltr"}
      >
        <div>
          {/* image must be an array data */}
          <Image image={image}/>
        </div>

        <div className="v-aligh-center text-left">
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default DemoA;
