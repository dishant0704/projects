import React from "react";
import style from "./demo.module.css";
import Image from "../UiComponents/Images/Image";

type DemoAPropsObj = {
  image?:
    | {
        name: string;
        image: string;
      }[]
    | undefined;
};

const DemoC: React.FC<DemoAPropsObj> = ({ image }) => {
  const { componentWrapper } = style;
  return (
    <div
      className={`${componentWrapper} py-4 grid grid-cols-4 gap-3 dark:bg-zinc-800 bg-zinc-700 p-4 text-stone-100`}
    >
      {image &&
        image.map((item) => {
          return (
            //* image must be an array data */
            <Image image={[item]} />
          );
        })}
    </div>
  );
};

export default DemoC;
