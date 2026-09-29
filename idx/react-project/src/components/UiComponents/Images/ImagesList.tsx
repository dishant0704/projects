import React, { useEffect, useState } from "react";
import type { ImageData } from "../../../types/types";
import { getImages } from "../../../services/getImages";
import { getImageFolder } from "../../../utils/imageUtils";

interface ImagesListProps {
  onSelectImage: (data: ImageData) => void;
  multipleSelect: boolean;
}

interface InputRadioProps {
  data: {
    name: string;
    image: string;
  };
  flag: boolean;
}

const ImagesList: React.FC<ImagesListProps> = ({
  onSelectImage,
  multipleSelect,
}) => {
  const [image, setImage] = useState<ImageData[]>([]);
 const imgFolder = getImageFolder({
  folder:'carousel-images'
 })
  const getImagesData = async () => {
    try {
      const imageData = await getImages();
      setImage(imageData);
    } catch (error) {
      throw new Error(`Image Data has some Error`);
    }
  };

  useEffect(() => {
    getImagesData();
  }, []);

  // 1. Rename the component using PascalCase (Capitalized)
  const InputRadio: React.FC<InputRadioProps> = ({ data, flag }) => {
    return (
      // Note: Replaced "align-middle" with "items-center" since "grid" was used
      <div className="grid justify-center items-center">
        {flag ? (
          <input
            className="cursor-pointer"
            type="checkbox" // Fixed: HTML uses "checkbox", not "check"
            name="componentSelected"
            value={data.name}
            // onChange={() => onSelectImage(data)}
          />
        ) : (
          <input
            className="cursor-pointer"
            type="radio"
            name="componentSelected"
            value={data.name}
            onChange={() => onSelectImage(data)}
          />
        )}
      </div>
    );
  };
  
  // create json object for the same  
  return (
    <div>
      <div className="grid sm:grid-cols-4 gap-2">
        {image &&
          image.map((item, inx) => {
            const { image } = item;
            return (
              <div key={inx} className="grid grid-cols-[15px_1fr] gap-2">
                <InputRadio data={item} flag={multipleSelect} />
                <div className="p-2 shadow-lg dark:shadow-zinc-800 dark:bg-zinc-900">
                  <img src={`${imgFolder}${image}`}></img>
                </div>
              </div>
            );
          })}
      </div>
      {multipleSelect ? (
        <div className="py-2 grid justify-items-end">
          <button
            className="btn"
            type="button"
            onClick={() => {
              onSelectImage;
            }}
          >
            Save image
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ImagesList;
