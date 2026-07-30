import { Link } from "react-router"
import SubPageTemplate from "./page-templates/SubPageTemplate"

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

  const ImageWrapper = () => {
    return (
      <p>Image</p>
    )
  }

  interface RightWrapperProps {
    category: string, types: string[], bgImgPath: string
  }
  interface RightWrapperArray { data: RightWrapperProps[] }
  const RightWrapper: React.FC<RightWrapperArray> = ({ data }) => {
    return (
      <>
        <h2 className='text-xl border-b-2 border-gray-200 dark:border-zinc-800 my-4 py-5 '>Components List:</h2>
        <ul className='my-5'>
          {data && data.map((item, inx) => {
            const { category } = item
            return (
              <li key={`des_${inx}`} className='border-b-2 py-4 text-left border-gray-100  dark:border-zinc-800 capitalize'>
                <Link to={`/${category}`}>{category}</Link>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  return (
    <>
      <SubPageTemplate>
        <SubPageTemplate.Left>
          <ImageWrapper />
        </SubPageTemplate.Left>
        <SubPageTemplate.Right>
          <RightWrapper data={ComponentsData} />
        </SubPageTemplate.Right>
      </SubPageTemplate>
    </>
  )
}

export default Dashboard
