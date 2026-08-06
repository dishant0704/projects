
import { createContext, useEffect, useState, type ReactNode } from "react";
import { getPages } from "../services/pageService"

interface PageContextType{
    pages:any[];
    loading:boolean;
}

interface Props {
    children: ReactNode
}

export const PageConttext = createContext<PageContextType | null >(null);

export const PageProvider= ({children}:Props) => {
    const [pages, setPages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const loadPage = async () =>{
        const data = await getPages();
        setPages(data);
        setLoading(false)
    }

    useEffect(()=>{
        loadPage()
    },[])

    return(
        <PageConttext value={{pages, loading}} >
            {children}
        </PageConttext>
    )

}