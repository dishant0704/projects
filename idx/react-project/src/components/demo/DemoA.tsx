import React from "react";
import style from "./demo.module.css";
import { getImageSrc } from "../../utils/imageUtils";

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
console.log("image: ", image)
if(!image){return}
const imageSrc = getImageSrc({
  folder: "carousel-images",
  image: image[0]?.image,
});
  
  // let imageSrc;

  // if (!image?.img) {
  //   return (
  //     <div className={`${componentWrapper} py-4`}>
  //       <p className="error">Image data is missing.</p>
  //       <p>{content}</p>
  //     </div>
  //   );
  // } else {
  //   imageSrc = `/images/carousel-images/${image.img}`;
  // }

  // Build the public image URL
  return (
    <div className={`${componentWrapper} py-4`}>
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 align-items-start dark:bg-zinc-800 bg-zinc-700 p-4 text-stone-100"
        dir={conRev ? "rtl" : "ltr"}
      >
        <div>
          <div className="bg-white p-2">
            <img src={imageSrc} className="d-block w-100" alt={image[0].name} />
          </div>
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
