import React, { useState } from "react";
import type { RegistryComponentProps } from "../ComponentRegistry";
import type { DynamicProps } from "../UiComponents/accordion/type";

interface DynamicFormProps {
  config: RegistryComponentProps;
  onSubmit: (data: DynamicProps) => void;
  onChangeImage: () => {};
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  onSubmit,
  onChangeImage,
}) => {
  const [formData, setFormData] = useState<DynamicProps>(
    config.props as unknown as DynamicProps,
  );
  const { imgName, fileName } = formData.images[0];

  const schema = config.propSchema;

  if (!schema) {
    return <p>No form schema available.</p>;
  }

  let imageSrc: string;

  if (imgName) {
    imageSrc = `/images/carousel-images/${imgName}`;
  }
  console.log("formData: ", formData);
  return (
    <div>
      <form onSubmit={() => null}>
        <div className="grid gap-5 my-5">
          {Object.entries(schema).map(([fieldName, fieldSchema], i) => {
            // ----------------------------
            // Images Fields
            // ----------------------------
            if (Array.isArray(fieldSchema)) {
              return (
                <div
                  key={`${fieldName}_${i}`}
                  className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 align-items-start dark:bg-zinc-800 bg-zinc-700 p-4 text-stone-100"
                >
                  <div>
                    <div className="bg-white p-2 grid place-items-center h-40 text-gray-600">
                      {imgName !== "" ? (
                        <img
                          src={imageSrc}
                          className="d-block w-100"
                          // alt={formData.images.imgName}
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center h-40">
                   <div>
                    <p>No Image Selected</p>
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
                    value={String(
                      formData[fieldName as keyof DynamicProps] ?? "",
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
                    value={String(
                      formData[fieldName as keyof DynamicProps] ?? "",
                    )}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    rows={5}
                    cols={6}
                    placeholder="Description"
                    required
                  />
                );
              } else if (fieldSchema.type === "boolean") {
                return (
                  <div className="flex gap-2 justify-items-start">
                    <input
                      key={`${fieldName}_${i}`}
                      type="checkbox"
                      checked={Boolean(
                        formData[fieldName as keyof DynamicProps],
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
                      formData[fieldName as keyof DynamicProps] ?? "",
                    )}
                    onChange={(e) => {}}
                  />
                );
              }
            }
          })}
          {/* TODO: Submit button will here */}
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
