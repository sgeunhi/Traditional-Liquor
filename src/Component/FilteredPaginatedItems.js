import * as React from "react";
import ReactPaginate from "react-paginate";
import {filteredPageCountState, currentFilteredAlcoholListState, filteredItemOffsetState} from "../Store/atom";
import {useRecoilState, useRecoilValue} from "recoil";
import {useEffect, useRef} from "react";

import FilteredItems from "./FilteredItems";

import "../Styles/Home.scss";
import "../Styles/Pagination.css"
import "../Styles/Reset.css";
import { dummyAlcoholListState, filteredAlcoholListState } from "../Store/atom";
import { alcoholListState } from "../Store/selector";

function FilteredPaginatedItems({itemsPerPage}){
    const [filteredPageCount, setFilteredPageCount] = useRecoilState(filteredPageCountState);
    const [currentFilteredAlcoholList, setCurrentFilteredAlcoholList] = useRecoilState(currentFilteredAlcoholListState);
    const [filteredItemOffset, setFilteredItemOffset] = useRecoilState(filteredItemOffsetState);
    const filteredAlcoholList = useRecoilValue(filteredAlcoholListState);
    const scrollToRef = useRef();
    useEffect(()=> {
        const filteredEndOffset = filteredItemOffset + itemsPerPage;
        setCurrentFilteredAlcoholList(filteredAlcoholList.slice(filteredItemOffset, filteredEndOffset));
        setFilteredPageCount(Math.ceil(filteredAlcoholList.length / itemsPerPage));
    }, [filteredAlcoholList, filteredItemOffset, itemsPerPage]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredAlcoholList.length;
        setFilteredItemOffset(newOffset);
    }
    return (
        <>
            <div ref={scrollToRef} className="liquor-card-wrapper">
                <FilteredItems currentItems={currentFilteredAlcoholList}/>
            </div>
            <div className="footer">
                <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={filteredPageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName={"pagination-ul"}
                activeClassName={"currentPage"}
                previousClassName={"pageLabel-btn"}
                nextClassName={"pageLabel-btn"}
                onClick = {()=>scrollToRef.current.scrollIntoView({behavior: 'smooth'})}
                />
            </div> 
        </>
    )
}

export default FilteredPaginatedItems;
