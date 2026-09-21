import React from "react";
import style from "./demo.module.css";

type DemoAPropsObj = {
  discription: string;
  conRev: boolean;
  image?: {
    name: string;
    img: string;
  };
};

const DemoA: React.FC<DemoAPropsObj> = ({
  discription,
  conRev,
  image,
}) => {
  const { componentWrapper } = style;

   if (!image?.img) {
    return (
      <div className={`${componentWrapper} py-4`}>
        <p>Image data is missing.</p>
        <p>{discription}</p>
      </div>
    );
  }

  // Build the public image URL
  const imageSrc = `/images/carousel-images/${image.img}`;

  return (
    <div className={`${componentWrapper} py-4`}>
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 align-items-start dark:bg-zinc-800 bg-zinc-700 p-4 text-stone-100"
        dir={conRev ? "rtl" : "ltr"}
      >
        <div>
          <div className="bg-white p-2">
            <img
              src={imageSrc}
              className="d-block w-100"
              alt={image.name}
            />
          </div>
        </div>

        <div className="v-aligh-center text-left">
          <h1>First slide label</h1>
          <p>{discription}</p>
        </div>
      </div>
    </div>
  );
};

export default DemoA;