import { useEffect } from "react"
import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"

const MainTemplate = () => {
  const fetchData = async () => {
    try {
      const response = await fetch('/data/pageData.json')
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)

      }
      const responce = await response.json();
      console.log("responce: ", responce.pages)

    } catch (error) {
      console.error('Error loading JSON:', error)
    }
    
  }

  useEffect(() => {
    // Files in the public folder are served at the root URL '/'
    fetchData()

  }, [])
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
