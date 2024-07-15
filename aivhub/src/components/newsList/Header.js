import React from 'react'
import Liststyle from "./NewsList.module.css"

export default function Header(props) {
    const {headerWrapper, title, searchWrapper, searchRasult} = Liststyle
    const {onKeyUp, dataLength} = props
  return (
    <div className={headerWrapper}>
        <div className={title}><h1>NewsList</h1></div> 
        <div className={searchWrapper}>
            <input
                type="search"
                className="form-control"
                placeholder="Search by news title"
                onKeyUp={onKeyUp}
            />
            <div className={searchRasult}>Search Results : <span>{dataLength}</span></div>
        </div>        
    </div>
  )
}
