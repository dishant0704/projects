import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"

import { useAppDispatch, useAppSelector } from "../../app/hooks/reducHooks"

import { loadPages } from "../../app/features/pageSlice"

const MainTemplate = () => {
  const dispatch = useAppDispatch();
  
  const {pages, loading, error} =  useAppSelector((state)=>state.pages);
   if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log("Pages:", pages);
  return (
    <div className=" h-screen py-5">
      <div className="container  mx-auto shadow-md  bg-white dark:bg-zinc-950 p-5 rounded-md">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default MainTemplate
