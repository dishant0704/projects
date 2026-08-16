import SubPageTemplate from '../page-templates/SubPageTemplate'
import Accordion from '../UiComponents/accordion/Accordion'
import type { AccordionItemData } from '../UiComponents/accordion/type'
import AccordionForm from './AccordionForm';
interface ReguralAccordionProps {
  data?: AccordionItemData[];
}
const ReguralAccordion = ({
  data = [],
}: ReguralAccordionProps) => {
   
    return (
        <section className=''>
            <SubPageTemplate>
                <SubPageTemplate.Left>
                    <Accordion items={data} defaultActiveTab={0} />
                </SubPageTemplate.Left>
                <SubPageTemplate.Right>
                    <AccordionForm />
                </SubPageTemplate.Right>
            </SubPageTemplate>
        </section>
    )
}

export default ReguralAccordion
