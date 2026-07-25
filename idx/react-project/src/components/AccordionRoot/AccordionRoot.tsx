import { Link } from 'react-router'
import Accordion from '../UiComponents/accordion/Accordion'
import type { AccordionItemData } from '../UiComponents/accordion/type';

const faqData: AccordionItemData[] = [
  {
    id: 1,
    title: "What is Tailwind CSS?",
    content: "Text"
  },
  {
    id: 2,
    title: "Why use TypeScript with React?",
    content: "TypeScript adds static type definitions to Javascript. It helps catch errors early, offers better autocompletion in your IDE, and makes your component contracts highly predictable."
  },
  {
    id: 3,
    title: "How does the animation work?",
    content: "Instead of mapping max-height (which causes jumpy layout flashes), this component uses Tailwind's grid-rows properties grid-rows-[0fr] and grid-rows-[1fr] combined with transition-all to create a perfectly fluid height transition."
  }
];

const AccordionRoot = () => {
  return (
    <section className='p-5 '>
      <h1 >Accordion: </h1>
      <Link to={`/`} className='text-[14px] text-primary-6-light-6' >Back to Dashboard</Link>
      <div className='grid md:grid-cols-2 gap-5'>
        <div className='p-5 '>          
          <Accordion items={faqData} />
        </div>
        <div className='p-5 '>
          <h2>Accordion Setting:</h2>
          <p className="mt-1 text-sm/6 text-gray-600">This information will be update Accordion.</p>
        </div>
      </div>
    </section>
  )
}

export default AccordionRoot
