import React from 'react'
interface Props {
    children : React.ReactNode
}

const TabPanel = ({children}:Props) => {
  return (
    <div className="p-5">
      {children}
    </div>
  )
}

export default TabPanel
