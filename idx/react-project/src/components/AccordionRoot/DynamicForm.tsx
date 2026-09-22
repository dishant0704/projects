import React, { useState } from 'react'
import type { RegistryComponentProps } from '../ComponentRegistry'
import type { DynamicProps } from '../UiComponents/accordion/type'

interface DynamicFormProps {
  config: RegistryComponentProps,
  onSubmit: (data: DynamicProps) => void
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState<DynamicProps>(
    config.props as unknown as DynamicProps
  );
  const schema = config.propSchema;
  if (!schema) {
    return <p>No form schema available.</p>;
  }
  console.log("schema: ", schema);
  return (
    <div>
      <form onSubmit={() => null}>
        <div className="grid gap-5 my-5">
          {Object.entries(schema).map(([fieldName, fieldSchema]) => {
            
            // ----------------------------
            // Images Fields
            // ----------------------------
            if (Array.isArray(fieldSchema)) {
              return (
                <div>
                  <h3 className="capitalize">{fieldName}</h3>

                </div>
              );
           
            } else {
              // ----------------------------
              // Regular Fields
              // ----------------------------

              if (fieldSchema.type === "text") {
                return (
                  <input
                    key={fieldName}
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
        </div>
      </form>
    </div>
  );
}

export default DynamicForm
