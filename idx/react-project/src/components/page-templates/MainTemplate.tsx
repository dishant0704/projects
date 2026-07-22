import { Outlet } from "react-router"
import Header from "./Header"
import Footer from "./Footer"
const MainTemplate = () => {
  return (
    <div className=" h-auto py-5">
      <div className="container  mx-auto shadow-md  bg-white p-5 rounded-md">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default MainTemplate
