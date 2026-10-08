import React, { useState } from "react";
import type { RegistryComponentProps } from "../ComponentRegistry";
import type { DynamicProps } from "../UiComponents/accordion/type";
import type { FormData, ImageData } from "../../types/types";
import { getImageFolder } from "../../utils/imageUtils";

interface DynamicFormProps {
  config: RegistryComponentProps | null;
  formData: FormData;
  imageError:boolean
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onChangeImage: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  formData,
  imageError,
  setFormData,
  onChangeImage,
}) => {  
  if (!config) {
    return <p>Please select a component.</p>;
  }

  const schema = config.propSchema;

  if (!schema) {
    return <p>No form schema available.</p>;
  }

  let imageArray: ImageData[] = [];

  if (!formData.image) {
    imageArray = [];
  } else {
    imageArray = Array.isArray(formData.image)
      ? formData.image
      : [formData.image];
  }
  const imgFolder = getImageFolder({
    folder: "carousel-images",
  });

  return (
    <div>
      <div className="grid gap-5 my-5">
        {Object.entries(schema).map(([fieldName, fieldSchema], i) => {
          // ----------------------------
          // Images Fields
          // ----------------------------
          if (fieldName === "images") {
            return (
              <div
                key={`${fieldName}_${i}`}
                className={`${imageArray && imageArray.length > 1 ? "align-items-start" : "grid grid-cols-[170px_minmax(0,1fr)] gap-4 align-items-start"} dark:bg-zinc-800 bg-zinc-200 p-4 dark:text-stone-100 text-zinc-900`}
              >
                <div
                  className={`${imageArray && imageArray.length > 1 ? "grid grid-cols-4 gap-4 items-center h-auto" : "grid items-center h-auto"}`}
                >
                  {imageArray && imageArray.length > 0 ? (
                    imageArray.map((img) => {
                      const {id, name, image } = img;
                      return (
                        <div key={id} className="bg-white p-2 grid place-items-center h-auto text-gray-600">
                          <img
                            src={`${imgFolder}${image}`}
                            alt={name}
                            className="d-block w-100"
                          />
                        </div>
                      );
                    })
                  ) : imageError? (
                    <div className="dark:text-red-400 text-red-500">
                      Please Choose Image
                    </div>
                  ) : (
                    <div className="dark:text-yellow-400 text-orange-500">
                      No Image Selected
                    </div>
                  )}
                </div>
                <div className="grid items-center h-auto">
                  <div>
                    {formData.image?.name ? (
                      <h3>{formData.image?.name}</h3>
                    ) : null}
                    <button
                      className="btn"
                      type="button"
                      onClick={onChangeImage}
                    >
                      {imageArray && imageArray.length === 1
                        ? "Change Image"
                        : imageArray && imageArray.length > 1
                          ? "Add / Remove Image"
                          : " Please Select Image"}
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            // ----------------------------
            // Regular Fields
            // ----------------------------

            if (fieldSchema.type === "text") {
              return (
                <input
                  key={`${fieldName}_${i}`}
                  name={fieldName}
                  value={String(
                    formData[fieldName as keyof FormData] ?? "",
                  )}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [fieldName]: e.target.value,
                    }))
                  }
                  type="text"
                  className="w-auto"
                  placeholder={fieldSchema.label}
                  required={fieldSchema.required}
                />
              );
            } else if (fieldSchema.type === "textarea") {
              return (
                <textarea
                  key={`${fieldName}_${i}`}
                  name={fieldName}
                  value={String(
                    formData[fieldName as keyof FormData] ?? "",
                  )}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  rows={5}
                  cols={6}
                  placeholder="Content"
                  required
                />
              );
            } else if (fieldSchema.type === "boolean") {
              return (
                <div
                  key={`${fieldName}_${i}`}
                  className="flex gap-2 justify-items-start"
                >
                  <input
                    type="checkbox"
                    name={fieldName}
                    checked={Boolean(
                      formData[fieldName as keyof FormData],
                    )}
                    onChange={(e) => setFormData((prev) => (
                      { ...prev, [fieldName]: e.target.checked, }
                    ))}
                    required={fieldSchema.required}
                  />
                  <label>{fieldSchema.label} </label>
                </div>
              );
            } else {
              {
                fieldSchema.type !== "image" ? (
                  <input
                    key={`${fieldName}_${i}`}
                    type={fieldSchema.type === "number" ? "number" : "text"}
                    required={fieldSchema.required}
                    value={String(
                      formData[fieldName as keyof FormData] ?? "",
                    )}
                    onChange={(e) => setFormData((prev) => (
                      { ...prev, [fieldName]: e.target.checked, }
                    ))}
                  />
                ) : null;
              }
            }
          }
        })}
      </div>
    </div>
  );
};

export default DynamicForm;
