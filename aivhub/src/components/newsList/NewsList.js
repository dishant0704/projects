/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import Liststyle from "./NewsList.module.css"

import Header from "./Header";
import NewsItem from "./NewsItem";
import Footer from "./Footer";

const NewsList = () => {

  const {bodyWrapper} = Liststyle
 
  const [productsData, setproductsData] = useState([]);

  //pagination section
  const perPageData = process.env.REACT_APP_PERPAGE_DATA;
  const [totalPages, setTotalPages] = useState();
  const [currPage, setCurrPage] = useState(1);
  const [startData, setStartData] = useState(perPageData);
  const [endData, setendData] = useState(1);
  const [loadingFlag, setLoadingFlag] =useState(true)

  const apiURL =  `${process.env.REACT_APP_API_URL}api-key=${process.env.REACT_APP_API_KEY}`
  const [searchProductsField, setSearchField] = useState("");
  const fetchAPI = async (URL) => {
    const responce = await fetch(URL);
    const newData = await responce.json();
    setTotalPages(generatePageNumberArray(newData.results));
    setproductsData(newData.results);
    setLoadingFlag(false)
  };

  useEffect(() => {
   fetchAPI(apiURL);
  }, []);

  const pageNation_prePage = () => {
    setCurrPage(currPage - 1);
  };

  const pageNation_nextPage = () => {
    setCurrPage(currPage + 1);
  };

  //filterData
  const filterData = productsData.filter((products) => {
    return products.title.toLocaleLowerCase().includes(searchProductsField);
  });

  //generate page number array
  const generatePageNumberArray = function (array) {
    const arrayLength = array.length;
    let pageArrayLeagth = Number(arrayLength / perPageData);
    if (!Number.isInteger(pageArrayLeagth)) {
      pageArrayLeagth = Math.trunc(pageArrayLeagth) + 1;
    }
    return pageArrayLeagth;
  };  

  const debounce = (cb, d) =>{
    let timer;
    return function(...args){
        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
            cb(...args);
        },d)
    }
 }

  const pageSliceNav = function () {
    setStartData(currPage * perPageData - perPageData);
    setendData(currPage * perPageData);
  };

  useEffect(() => {
    pageSliceNav();
    setTotalPages(generatePageNumberArray(filterData));
  }, [currPage, searchProductsField]);

  const searchFilter = function (e) {
    if (e) {
      setSearchField(e.target.value.toLocaleLowerCase());
    }
    setTotalPages(generatePageNumberArray(filterData));
    pageSliceNav();
  };

  return (
    <Fragment>     
      <Header onKeyUp={(e) => debounce(searchFilter(e), 1000)} dataLength={filterData.length}/>        
      <div key="mainBody" className={bodyWrapper}>
        <h2>New York Times API</h2>
        {loadingFlag? "loadingFlag...":    
          <ul>
            {filterData.length > 0 &&
              filterData.slice(startData, endData).map((item) => {              
                return (
                  <NewsItem key={item.id} {...item} />
                );
              })}
          </ul>}
      </div>      
      <Footer preBtn={pageNation_prePage} nextBtn={pageNation_nextPage} totalPages={totalPages} setCurrPage={setCurrPage} currPage={currPage} />
    </Fragment>
  );
};
export default NewsList;