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
          {
            Object.entries(schema)
              .map(([fieldName, fieldSchema]) => {
                // ----------------------------
                // Array Field
                // ----------------------------                
                return `${fieldName} == ${fieldSchema}`
              })
          }

        </div>
      </form>
    </div>
  )
}

export default DynamicForm
