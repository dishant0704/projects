import { useEffect, useState } from "react";
import type { DynamicAccordionProps } from "./type";
import { ComponentRegistry } from "../../ComponentRegistry";

const AccordionWithComp: React.FC<DynamicAccordionProps> = ({
  items,
  allowMultiple = false,
  headerButtonObj = { flag: true, id: null },
  openId: controlledOpenId,
  onOpenIdChange,
}) => {
  const [internalOpenIds, setInternalOpenIds] = useState<(string | number)[]>(
    [],
  );

  const [internalOpenId, setInternalOpenId] = useState<string | number | null>(
    null,
  );

  const { flag, id: initialId } = headerButtonObj;  

  const isControlled = controlledOpenId !== undefined;

  const currentOpenId = isControlled ? controlledOpenId : internalOpenId;

  // Set initial accordion only when the items or initial ID changes.
  useEffect(() => {
    if (allowMultiple) {
      return;
    }

    const nextId = initialId ?? items[0]?.id ?? null;

    if (!isControlled) {
      setInternalOpenId(nextId);
    }
  }, [items, initialId, allowMultiple, isControlled]);

  const handleToggle = (id: string | number) => {
    if (allowMultiple) {
      setInternalOpenIds((previousIds) =>
        previousIds.includes(id)
          ? previousIds.filter((itemId) => itemId !== id)
          : [...previousIds, id],
      );

      return;
    }

    const nextId = currentOpenId === id ? null : id;

    if (!isControlled) {
      setInternalOpenId(nextId);
    }

    onOpenIdChange?.(nextId);
  };

  const checkIsOpen = (id: string | number): boolean => {
    return allowMultiple ? internalOpenIds.includes(id) : currentOpenId === id;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {items.map((item) => {
        const { id, component, props } = item;

        const registryItem = ComponentRegistry[component];

        if (!registryItem) {
          return <div key={id}>Component not found: {component}</div>;
        }

        const Component = registryItem.component;
        const defaultProps = registryItem.props ?? {};
        const isOpen = checkIsOpen(id);

        const showHeader = item.showHeader ?? flag;

        return (
          <div key={id}>
            {showHeader && (
              <button
                type="button"
                onClick={() => handleToggle(id)}
                aria-expanded={isOpen}
                className="flex justify-between items-center w-full py-2 text-left font-medium"
              >
                <h3>{item.title}</h3>
                <span>{isOpen ? "▲" : "▼"}</span>
              </button>
            )}

            <div
              className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <div className="py-5 text-sm leading-relaxed">
                  {isOpen && <Component {...defaultProps} {...(props ?? {})} />}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionWithComp;
