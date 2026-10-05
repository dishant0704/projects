import React, { useEffect, useState } from "react";
import type { ImageData } from "../../../types/types";
import { getImageFolder } from "../../../utils/imageUtils";

import { loadImagesPage } from "../../../app/features/images/imagesSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/reducHooks";

interface ImagesListProps {
  goBack: () => void;
  onSelectImage: (data: ImageData | ImageData[]) => void;
  multipleSelect: boolean;

  // IDs of images already selected by the parent.
  // Useful when editing an existing section.
  selectedImageIds?: string[];
}

interface InputSelectionProps {
  data: ImageData;
  multipleSelect: boolean;
  onSelect: () => void;
}

const InputSelection: React.FC<InputSelectionProps> = ({
  data,
  multipleSelect,
  onSelect,
}) => {
  return (
    <div className="grid justify-center items-center">
      <input
        className={!multipleSelect && data.flag? "cursor-not-allowed":"cursor-pointer"}
        type={multipleSelect ? "checkbox" : "radio"}
        name="componentSelected"
        value={data.id}
        checked={data.flag ?? false}
        onChange={onSelect}
        disabled={!multipleSelect && data.flag? true : false}
      />
    </div>
  );
};

const ImagesList: React.FC<ImagesListProps> = ({
  goBack,
  onSelectImage,
  multipleSelect,
  selectedImageIds = [],
}) => {
  const dispatch = useAppDispatch();

  const { data: mainImagesData } = useAppSelector(
    (state) => state.images
  );

  const [images, setImages] = useState<ImageData[]>([]);
  const [saveButtonVisible, setSaveButtonVisible] = useState<boolean>(true);

  const imgFolder = getImageFolder({
    folder: "carousel-images",
  });

  // --------------------------------------------------
  // Load images
  // --------------------------------------------------

  useEffect(() => {
    if (!mainImagesData) {
      dispatch(loadImagesPage());
    }
  }, [dispatch, mainImagesData]);

  // --------------------------------------------------
  // Create local selection state
  // --------------------------------------------------

  useEffect(() => {

  if (!mainImagesData) {
    return;
  }

  // Redio button mode: If selectedImageIds is provided, mark the corresponding image as selected
  // Create a local copy of the images with selection flags based on selectedImageIds
  // If selectedImageIds is not provided, it will be an empty array

  const ids = Array.isArray(selectedImageIds)
    ? selectedImageIds
    : [];

  const updatedImages = mainImagesData.map((item) => ({
    ...item,
    flag: ids.includes(item.id),
  }));
  
  setImages(updatedImages);
  updateSaveButtonVisibility(updatedImages); 
}, [mainImagesData, selectedImageIds]);
  // --------------------------------------------------
  // Select image
  // --------------------------------------------------

  const selectImage = (data: ImageData) => {
    // -----------------------------------------------
    // RADIO MODE
    // -----------------------------------------------
    if (!multipleSelect) {
      const updatedImages = images.map((item) => ({
        ...item,
        flag: item.id === data.id,
      }));
      
      setImages(updatedImages);

      // Immediately send selected image to parent
      const selectedImage = updatedImages.filter(
        (item) => item.id === data.id
      );

      if (selectedImage) {        
        onSelectImage(selectedImage);
      }

      return;
    }else{     
      // -----------------------------------------------
      // CHECKBOX / MULTIPLE MODE
      // -----------------------------------------------
  
      const updatedImages = images.map((item) => {
        if (item.id === data.id) {
          return {
            ...item,
            flag: !item.flag,
          };
        }
  
        return item;
      });   
      setImages(updatedImages);
      updateSaveButtonVisibility(updatedImages); 
    }

  };

  // --------------------------------------------------
  // Save multiple images
  // --------------------------------------------------

  const saveSelectedImages = () => {
    const selectedImages = images.filter(
      (item) => item.flag
    );

    if (selectedImages.length === 0) {
      return;
    }
    onSelectImage(selectedImages);
  };

  // --------------------------------------------------
  // set save button visibility based on selection
  // --------------------------------------------------
  const updateSaveButtonVisibility = (array:ImageData[]) => {
    const selectedImages = array.filter(
      (item) => item.flag
    );

    if (selectedImages.length > 0) {
      setSaveButtonVisible(true);
    } else {
      setSaveButtonVisible(false);
    }
 
  }

  // --------------------------------------------------
  // close button
  // --------------------------------------------------
  const closeButton = () =>{
    goBack
    onSelectImage([])
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div>
      <div className="grid sm:grid-cols-4 gap-2">
        {images.map((item) => {
          const { image } = item;

          return (
            <div
              key={item.id}
              className="grid grid-cols-[15px_1fr] gap-2"
            >
              <InputSelection
                data={item}
                multipleSelect={multipleSelect}
                onSelect={() => selectImage(item)}
              />

              <div
                className={`
                  p-2
                  shadow-lg
                  dark:shadow-zinc-800
                  dark:bg-zinc-900
                  ${
                    item.flag
                      ? "opacity-25"
                      : "opacity-100"
                  }
                `}
              >
                <img
                  src={`${imgFolder}${image}`}
                  alt={item.name}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 
      --------------------------------------------
      Save button for multiple selection
      -------------------------------------------- 
      // todo: if only one image is selected then send it to parent without save button
      // if on image select button text is back and if imge button text is save image then send it to parent
      */}      
      {multipleSelect && (
        <div className="py-2 grid justify-items-end">
          <button
            className="btn"
            type="button"
            onClick={saveButtonVisible ? saveSelectedImages : closeButton}
          >{saveButtonVisible ? "Save Images" : "Close"}</button>
        </div>
      )}
    </div>
  );
};

export default ImagesList;
