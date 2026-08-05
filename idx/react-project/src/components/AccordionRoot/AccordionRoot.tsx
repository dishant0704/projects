import { Link } from 'react-router'

import Tabs from '../UiComponents/Tabs';

import ReguralAccordion from './ReguralAccordion';
import DynamicAccordion from './DynamicAccordion';



const tabs = [
    {
      id: "regAcc",
      label: "Regural Accordion",
      component: ReguralAccordion ,
      props: {},
    },
    {
      id: "dynAcc",
      label: "Dynamic Accordion",
      component: DynamicAccordion,
      props: {},
    },
    // {
    //   id: "settings",
    //   label: "Settings",
    //   content: <div>Settings Content</div>,
    // },
  ];


const AccordionRoot = () => {
  return (
    <section className='p-5 '>
      <h1 >Accordion: </h1>
      <Link to={`/`} className='text-[14px] text-primary-6-light-6' >Back to Dashboard</Link>
      <div className="w-full">
      <Tabs
        items={tabs}
        defaultActiveTab="regAcc"
      />
    </div>
    </section>
  )
}

export default AccordionRoot
