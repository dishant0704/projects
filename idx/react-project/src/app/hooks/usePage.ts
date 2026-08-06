import { useContext } from 'react'
import { PageConttext } from '../../context/PageContext'

const usePage = () => {
    const context = useContext(PageConttext)
if(!context){
    throw new Error('usePages must be used inside PageProvider')
}
  return context
}

export default usePage
