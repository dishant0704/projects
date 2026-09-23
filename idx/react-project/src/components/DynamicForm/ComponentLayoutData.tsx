import React, { useEffect, useState } from 'react'

interface ComponentLayoutDataProps {
  setCom: (data: string) => void
}
// type DataProps = {name:string; discription:string}
const ComponentLayoutData: React.FC<ComponentLayoutDataProps> = ({ setCom }) => {

  const [data, setData] = useState([])
  const fun = () => setCom("text")

  const fetchData = async (url:string) => {
    try {
       const response = await fetch(url).then(response => response.json()); 
       setData(response)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

  fetchData("/data/ComponentMapData.json");   
    
  }, [])
  console.log("data:", data)
  return (
    <div>
        //TODO: set Componet object array load from out side
      <button className='btn' onClick={fun}>Set Component</button>
    </div>
  )
}

export default ComponentLayoutData
