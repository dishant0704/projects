import React, { useState } from 'react'
import SubPageTemplate from '../page-templates/SubPageTemplate'
import AccordionWithComp from '../UiComponents/accordion/AccordionWithComp'
import type { AccordionItemData, DynamicAccordionItemData } from '../UiComponents/accordion/type'

import DemoA from '../demo/DemoA'
import DemoB from '../demo/DemoB'

const DynamicAccordion = () => {
    const [accData, setAccData] = useState<AccordionItemData[]>([])
    const [formData, setFormData] = useState<AccordionItemData>({ id: 0, title: "", content: "" })
    const [demoAValue, setDemoAValue] = useState("Demo A");
    const [demoBValue, setDemoBValue] = useState("Demo B")
    const AccordionData: DynamicAccordionItemData[] = [
        {
            id: 0,
            title: "Demo A",
            component: DemoA,
            props: {
                value: demoAValue,
                setEditObj:setDemoAValue,
            }
        },
        {
            id: 1,
            title: "Demo B",
            component: DemoB,
            props: {
                value: demoBValue,
                setEditObj:setDemoBValue,
            }
        }
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newItem: AccordionItemData = {
            ...formData,
            id: Date.now(),
        };

        setAccData(prev => [...prev, newItem]);

        setFormData({
            id: 0,
            title: "",
            content: "",
        });
    };

    const AccordionForm = () => {
        return (
            <div className='p-5 '>
                <h2>Accordion Setting:</h2>
                <p className="mt-1 text-sm/6 text-gray-600">This information will be update Accordion.</p>
                <form onSubmit={handleSubmit}>
                    <div className='grid gap-5 my-5'>
                        <input value={formData.title} onChange={(e) => setFormData((pre) => ({ ...pre, title: e.target.value }))} type='text' className='w-auto' placeholder='Title' required />
                        <textarea value={formData.content} onChange={(e) => setFormData((pre) => ({ ...pre, content: e.target.value }))} rows={5} cols={6} placeholder='Description' required ></textarea>
                        <div className='grid justify-items-end'><button type='submit' className='btn'>Save</button></div>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <section className=''>
            <SubPageTemplate>
                <SubPageTemplate.Left>
                    <AccordionWithComp items={AccordionData} />
                </SubPageTemplate.Left>
                <SubPageTemplate.Right>
                    <AccordionForm />
                </SubPageTemplate.Right>
            </SubPageTemplate>
        </section>
    )
}

export default DynamicAccordion
