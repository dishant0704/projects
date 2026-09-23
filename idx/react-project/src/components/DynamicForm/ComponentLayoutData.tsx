import React from 'react'

interface ComponentLayoutDataProps {
    setCom:(data:string) => void
}

const ComponentLayoutData:React.FC<ComponentLayoutDataProps> = ({setCom}) => {
    const fun = () => setCom("text")
  return (
    <div>
        //TODO: set Componet object array load from out side
      <button onClick={fun}>Set Component</button>
    </div>
  )
}

export default ComponentLayoutData
