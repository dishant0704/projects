import React, { PropsWithChildren } from 'react'

const PageBody = ({children}: PropsWithChildren) => {
  return (
    <div className='container mx-auto my-5'>
      {children}
    </div>
  )
}

export default PageBody
