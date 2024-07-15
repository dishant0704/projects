import React from 'react'
import Liststyle from "./NewsList.module.css"

export default function NewsItem(props) {
    const{newsItemWrapper, newWrapper, dateWrapper} = Liststyle
    const {url,title,abstract, media, published_date} = props
    const thumbnail = media[0]['media-metadata'][0]
    const imgPath = thumbnail.url    
    console.log(imgPath)
  return (
    <div onClick={()=>window.open(url, "myNews")} className={newsItemWrapper}>
      <h3>{title}</h3>
      <div className={newWrapper}>
        <img src={imgPath} alt={title} />       
        <p>{abstract}</p>
      </div>
      <div className={dateWrapper}>
      Published date : <span>{published_date}</span>
      </div>
    </div>
  )
}
