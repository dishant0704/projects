import React from 'react'
interface Props {
    value:[],
    setValue: ()=> void;
}
const DemoB:React.FC<Props> = (Props) => {
  const {value} = Props
  return (
    <div>
      {value}
    </div>
  )
}

export default DemoB
