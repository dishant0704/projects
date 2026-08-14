import { useEffect, useState } from 'react'
import SubPageTemplate from '../page-templates/SubPageTemplate'
import Accordion from '../UiComponents/accordion/Accordion'
import type { AccordionItemData } from '../UiComponents/accordion/type'
import AccordionForm from './AccordionForm'

const ReguralAccordion = ({data}:{data:AccordionItemData[]}) => {
    const [accData, setAccData] = useState<AccordionItemData[]>([])    

    useEffect(()=>{
        setAccData(data);
    },[data])    
   
    return (
        <section className=''>
            <SubPageTemplate>
                <SubPageTemplate.Left>
                    <Accordion items={accData} isOpenId={0}/>
                </SubPageTemplate.Left>
                <SubPageTemplate.Right>
                    <AccordionForm />
                </SubPageTemplate.Right>
            </SubPageTemplate>
        </section>
    )
}

export default ReguralAccordion
