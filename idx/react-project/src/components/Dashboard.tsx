import { Link } from "react-router"

const Dashboard = () => {
  const ComponentsData = [
    {
      category: "Accordion",
      types: ["Accordion", "Dynamic Accordion"],
      bgImgPath: ""
    },
    {
      category: "chart",
      types: ["Pie", "Line", "Bar"],
      bgImgPath: ""
    },
    {
      category: "swiper",
      types: [],
      bgImgPath: ""
    },
    {
      category: "banners",
      types: [],
      bgImgPath: ""
    }
  ]
  return (
    <section className='p-5 '>
      <h2 className='text-2xl'>Dashboard: </h2>
      <div className='grid grid-cols-2 gap-5'>
        <div className="grid items-center justify-center">
          Image
        </div>
        <div className='p-5'>
          <h2 className='text-xl border-b-2 border-gray-200 py-4 '>Components List:</h2>
          <ul className='my-5'>
            {ComponentsData && ComponentsData.map((item) => {
              const { category } = item
              return (
                <li className='border-b-2 py-4 text-left border-gray-100 capitalize'>
                  <Link to={`/${category}`}>{category}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
