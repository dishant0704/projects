import React from 'react'
interface Props {
    children : React.ReactNode
}

const TabPanel = ({children}:Props) => {
  return (
    <div className="p-5 border border-t-0 border-gray-300 rounded-b-lg">
      {children}
    </div>
  )
}

export default TabPanel
