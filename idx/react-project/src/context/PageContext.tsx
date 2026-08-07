
import { createContext, useEffect, useState, type ReactNode, type SetStateAction } from "react";
import { getPages } from "../services/pageService"
 import type { Page, PageContextType } from "../types/types";

interface Props {
    children: ReactNode
}

export const PageConttext = createContext<PageContextType | null >(null);

export const PageProvider= ({children}:Props) => {
    const [pages, setPages] = useState<Page[]>([])
    const [loading, setLoading] = useState(true)
    const STORAGE_KEY = "idx-component-demo";

    const loadPage = async () =>{
        
        try {
             
            // 1. Check localStorage first
            const localData = localStorage.getItem(STORAGE_KEY)
            if(localData){
                const parsedData: Page[] = JSON.parse(localData)
                setPages(parsedData);
                // console.log("Loaded from localStorage:", parsedData);
                return;
            }

            // 2. No localStorage → load default JSON
            const data = await getPages();
            setPages(data.pages);

            // 3. Save default data into localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
            // console.log("Loaded from JSON:", data.pages);
            
        } catch (error) {
            console.error("Failed to load pages:", error);
        }finally{
            setLoading(false)
        }              
    }

    useEffect(()=>{
        loadPage()
    },[])

    // Save whenever pages changes
    useEffect(()=>{
        if(pages.length > 0 && !loading){
            localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
        }
        // console.log("Saved to localStorage:", pages);
    },[pages, loading])

    return(
        <PageConttext value={{pages, loading, setPages}} >
            {children}
        </PageConttext>
    )

}