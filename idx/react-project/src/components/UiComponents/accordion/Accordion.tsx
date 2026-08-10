import React, { useEffect, useState } from 'react'

import type { AccordionProps } from './type'

const Accordion: React.FC<AccordionProps> = ({ index, items, allowMultiple = false, defaultActiveTab = 0 }) => {
    // Track open state: array of IDs if multiple allowed, single ID or null if not
    const [openIds, setOpenIds] = useState<(string | number)[]>([]);
    const [openId, setOpenId] = useState<string | number | null>(defaultActiveTab | 0);    

    useEffect(() => {
        if (index) {
            setOpenId(index);
        }
    }, [items]);

    const handleToggle = (id: string | number) => {
        if (allowMultiple) {
            if (openIds.includes(id)) {
                setOpenIds(openIds.filter((itemIds) => itemIds !== id));
            } else {
                setOpenIds([...openIds, id]);
            }
        } else {
            setOpenId(openId === id ? null : id);
        }
    };

    const checkIsOpen = (id: string | number): boolean => {
        return allowMultiple ? openIds.includes(id) : openId === id;
    };

    return (
        <div className="w-full max-w-2xl mx-auto ">
            {
                items.map((item,inx) => {
                    const { id, content } = item
                    const isOpen = checkIsOpen(inx);
                    // const isLast = index === items.length - 1;
                    return (
                        <div key={id} >
                            {/* Header Trigger */}
                            <button
                                type="button"
                                className={`flex justify-between items-center w-full py-2 text-left font-medium text-slate-700 dark:text-slate-300 hover:border-gray-400 ${!isOpen ? 'border-b' : 'border-0'} dark:hover:border-zinc-800 border-b-transparent transition-colors duration-200 `}
                                onClick={() => handleToggle(inx)}
                                aria-expanded={isOpen}
                            >
                                <h3>{item.title}</h3>
                                {/* Chevron Icon with Rotation Animation */}
                                <svg
                                    className={`w-5 h-5 text-slate-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {/* Content Container with Height Transition */}
                            <div
                                className={`grid transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                            >
                                <div className="min-h-0 border-t border-t-gray-200 dark:border-t-zinc-800">
                                    <div className="p-5 text-sm leading-relaxed">
                                        {content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Accordion
