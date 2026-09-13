import React from 'react'
interface Props {
    children : React.ReactNode
}

const TabPanel = ({children}:Props) => {
  return (
    <div className="py-2">
      {children}
    </div>
  )
}

export default TabPanel
