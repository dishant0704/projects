import React, { useState } from "react";
import type { RegistryComponentProps } from "../ComponentRegistry";
import type { DynamicProps } from "../UiComponents/accordion/type";
import type { FormData } from "../../types/types";

interface DynamicFormProps {
  config: RegistryComponentProps | null;
  formData: FormData;
  onChangeImage: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  formData,
  onChangeImage,
}) => {
  if (!config) {
    return <p>Please select a component.</p>;
  }
  const [newFormData, setNewFormData] = useState<DynamicProps>(
    config.props as unknown as DynamicProps,
  );

  if (!newFormData) return;

  const schema = config.propSchema;

  if (!schema) {
    return <p>No form schema available.</p>;
  }

  let imageSrc: string;

  if (!formData.image) {
    imageSrc = "";
  } else {
    const { image } = formData.image;
    imageSrc = `/images/carousel-images/${image}`;
  }
  console.log("formData: ", formData.image);
  return (
    <div>
      <div className="grid gap-5 my-5">
        {Object.entries(schema).map(([fieldName, fieldSchema], i) => {
          // ----------------------------
          // Images Fields
          // ----------------------------

          if (fieldSchema === true) {
            return (
              <div
                key={`${fieldName}_${i}`}
                className="grid grid-cols-[150px_1fr] gap-4 align-items-start dark:bg-zinc-800 bg-zinc-200 p-4 dark:text-stone-100 text-zinc-900" 
              >
                <div>
                  {imageSrc !== "" ? (
                    <div className="bg-white p-2 grid place-items-center h-auto text-gray-600">
                      <img
                        src={imageSrc}
                        className="d-block w-100"
                        // alt={newFormData.images.imgName}
                      />
                    </div>
                  ) : (
                    <div className=" h-auto grid place-items-center ">No Image Selected</div>
                  )}
                </div>
                <div className="grid items-center h-auto">
                  <div>
                      {formData.image?.name ? (
                        <h3>
                        {formData.image?.name}
                      </h3>
                        ) : null}
                    <button
                      className="btn"
                      type="button"
                      onClick={onChangeImage}
                    >
                      Please Select Image
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
                    newFormData[fieldName as keyof DynamicProps] ?? "",
                  )}
                  onChange={(e) =>
                    setNewFormData((prev) => ({
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
                    newFormData[fieldName as keyof DynamicProps] ?? "",
                  )}
                  onChange={(e) =>
                    setNewFormData((prev) => ({
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
                    checked={Boolean(
                      newFormData[fieldName as keyof DynamicProps],
                    )}
                    onChange={(e) => {}}
                  />
                  <label>{fieldSchema.label} </label>
                </div>
              );
            } else {
              return (
                <input
                  key={`${fieldName}_${i}`}
                  type={fieldSchema.type === "number" ? "number" : "text"}
                  required={fieldSchema.required}
                  value={String(
                    newFormData[fieldName as keyof DynamicProps] ?? "",
                  )}
                  onChange={(e) => {}}
                />
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default DynamicForm;
