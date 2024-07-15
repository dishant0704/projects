import React from 'react'
import Liststyle from "./NewsList.module.css"

export default function Footer(props) {
    const{preBtn, nextBtn, totalPages, setCurrPage, currPage} = props
    const{footerWrapper, pageNum, copyRight}=Liststyle
  return (
    <div className={footerWrapper}>       
        <div className={pageNum}>
          <button onClick={preBtn} disabled={currPage === 1}>
            prePage
          </button>
          <ul>
            {[...Array(totalPages)].map((_, i) => {
              return (
                <li
                  key={`pageNav_${i}`}
                  className={currPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrPage(i + 1)}
                >
                  {i + 1}
                </li>
              );
            })}
          </ul>
          <button
            onClick={nextBtn}
            disabled={currPage === totalPages}
          >
            nextPage
          </button>
        </div>
        <div className={copyRight}>Develop by Ketan Sawant,<br/>email: ketandutt@gmail.com, </div>
      </div>
  )
}
