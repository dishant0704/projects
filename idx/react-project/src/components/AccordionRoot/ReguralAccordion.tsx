import React, { useState } from 'react'
import SubPageTemplate from '../page-templates/SubPageTemplate'
import Accordion from '../UiComponents/accordion/Accordion'
import type { AccordionItemData } from '../UiComponents/accordion/type'

// const Accordion_a: AccordionItemData[] = [
//   {
//     id: 1,
//     title: "What is Tailwind CSS?",
//     content: "Text"
//   },
//   {
//     id: 2,
//     title: "Why use TypeScript with React?",
//     content: "TypeScript adds static type definitions to Javascript. It helps catch errors early, offers better autocompletion in your IDE, and makes your component contracts highly predictable."
//   },
//   {
//     id: 3,
//     title: "How does the animation work?",
//     content: "Instead of mapping max-height (which causes jumpy layout flashes), this component uses Tailwind's grid-rows properties grid-rows-[0fr] and grid-rows-[1fr] combined with transition-all to create a perfectly fluid height transition."
//   }
// ];

const ReguralAccordion = () => {
    const [accData, setAccData] = useState<AccordionItemData[]>([])
    const [formData, setFormData] = useState<AccordionItemData>({ id: 0, title: "", content: "" })

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
                    <Accordion items={accData} />
                </SubPageTemplate.Left>
                <SubPageTemplate.Right>
                    <AccordionForm />
                </SubPageTemplate.Right>
            </SubPageTemplate>
        </section>
    )
}

export default ReguralAccordion
