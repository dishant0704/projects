import React, { useEffect, useState } from 'react'

import type {AccordionProps } from './type'

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
    // Track open state: array of IDs if multiple allowed, single ID or null if not
    const [openIds, setOpenIds] = useState<(string | number)[]>([]);
    const [openId, setOpenId] = useState<string | number | null>(null);

    useEffect(() => { handleToggle(0) }, [])

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
        <div className="w-full max-w-2xl mx-auto border border-slate-200 rounded-lg bg-white shadow-sm">
            {
                items.map((item, index) => {
                    const { id, content } = item
                    const isOpen = checkIsOpen(id);
                    const isLast = index === items.length - 1;
                    return (
                        <div key={id} className={`border-slate-200 ${!isLast ? 'border-b' : ''}`}>
                            {/* Header Trigger */}
                            <button
                                type="button"
                                className="flex justify-between items-center w-full p-5 text-left font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                                onClick={() => handleToggle(id)}
                                aria-expanded={isOpen}
                            >
                                <span>{item.title}</span>
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
                                className={`grid transition-all duration-300 ease-in-out overflow-hidden text-slate-600 bg-slate-50/50 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                            >
                                <div className="min-h-0">
                                    <div className="p-5 text-sm leading-relaxed border-t border-slate-100">
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
