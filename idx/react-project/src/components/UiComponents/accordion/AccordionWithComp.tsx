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
  const [internalOpenIds, setInternalOpenIds] = useState<
    (string | number)[]
  >([]);

  const [internalOpenId, setInternalOpenId] = useState<
    string | number | null
  >(null);

  const { flag, id: initialId } = headerButtonObj;

  const isControlled = controlledOpenId !== undefined;

  const currentOpenId = isControlled
    ? controlledOpenId
    : internalOpenId;

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
          : [...previousIds, id]
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
    return allowMultiple
      ? internalOpenIds.includes(id)
      : currentOpenId === id;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {items.map((item) => {
        const { id, component, props } = item;

        const registryItem = ComponentRegistry[component];

        // Check before accessing registryItem.props
        if (!registryItem) {
          return (
            <div key={id}>
              Component not found: {component}
            </div>
          );
        }

        const Component = registryItem.component;
        const defaultProps = registryItem.props ?? {};
        const isOpen = checkIsOpen(id);

        return (
          <div key={id}>
            {flag && (
              <button
                type="button"
                className={`flex justify-between items-center w-full py-2 text-left font-medium text-slate-700 dark:text-slate-300 ${
                  !isOpen ? "border-b" : "border-0"
                } border-b-transparent transition-colors duration-200`}
                onClick={() => handleToggle(id)}
                aria-expanded={isOpen}
              >
                <h3>{item.title}</h3>

                <svg
                  className={`w-5 h-5 text-slate-500 transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            )}

            <div
              className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 border-t border-t-gray-200 dark:border-t-zinc-800">
                <div className="py-5 text-sm leading-relaxed">
                  {isOpen && (
                    <Component
                      {...defaultProps}
                      {...(props ?? {})}
                    />
                  )}
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
