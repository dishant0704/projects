import type { AccordionData } from "../components/UiComponents/accordion/type";

interface GetPageData{
    pageData:AccordionData,
    pageId: string
}
 export const getPageData = ({pageData, pageId}:GetPageData) => {
    if (!pageData) return
    return pageData.items.find(
      (item) => item.id === pageId
    );
  }