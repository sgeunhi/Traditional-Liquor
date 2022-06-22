import * as React from "react";
import ReactPaginate from "react-paginate";
import {pageCountState, currentAlcoholListState, itemOffsetState} from "../Store/atom";
import {useRecoilState, useRecoilValue} from "recoil";
import {useEffect, useRef} from "react";
import {alcoholListState} from "../Store/selector";
import Items from "./Items";
import "../Styles/Home.scss";
import "../Styles/Pagination.css"
import "../Styles/Reset.css";

function PaginatedItems({itemsPerPage}) {
  const [pageCount, setPageCount] = useRecoilState(pageCountState);
  const [currentAlcoholList, setCurrentAlcoholList] = useRecoilState(currentAlcoholListState);
  const [itemOffset, setItemOffset] = useRecoilState(itemOffsetState);
  const alcoholList = useRecoilValue(alcoholListState);
  const scrollToRef = useRef();

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentAlcoholList(alcoholList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(alcoholList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % alcoholList.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div ref={scrollToRef} className="liquor-card-wrapper">
        <Items currentItems={currentAlcoholList}/>
      </div>
      <div className="footer">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName={"pagination-ul"}
          activeClassName={"currentPage"}
          previousClassName={"pageLabel-btn"}
          nextClassName={"pageLabel-btn"}
          onClick={() => scrollToRef.current.scrollIntoView({behavior: 'smooth'})}
        />
      </div>
    </>
  );
};

export default PaginatedItems;
