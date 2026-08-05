import React from 'react'
interface Props {
    value:[],
    setValue: ()=> void;
}
const DemoA:React.FC<Props> = (Props) => {
    const {value} = Props
  return (
    <div>
      {value}
    </div>
  )
}

export default DemoA
