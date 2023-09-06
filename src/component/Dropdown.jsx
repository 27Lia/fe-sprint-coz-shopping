import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyleDropdown = styled.div`
.dropdown-menu {
    position: fixed;
    right: 2%;
    top: 7%; 
    width: 200px;
    height: 150px;
    border-radius: 12px;
    background: whitesmoke ;
    z-index:999; 
} 


.list-box{
    display: flex;
    align-items: center;
    list-style: none;
    height: 50px;
    margin-left: 24px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.10);

}

.icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
}

.list-container {
    display: flex;
    flex-direction: column;
    gap: 12px;    
}

.item-container {
    list-style: none;
    gap: 0.75rem;
    width: 1128px;
    height: 264px;
    display: flex;
    align-items: flex-start;
    gap: 24px;
}

.list-title {
    font-size: 1.5rem;
    font-style: normal;
}

.img {
    width: 264px;
    height: 210px;
}

.item {
    width: 264px;
    height: 264px;
}`

function Dropdown({ handleDropdown }) {
    return (
        <StyleDropdown>
            <div className="dropdown-menu">
                <ul className='dropdown-container'>
                    <li className="list-box" ><span className='dropdown-text'>OOO님 안녕하세요!</span ></li>
                    <li className="list-box">
                        <Link to='/products/list' onClick={handleDropdown}>
                            <img className='icon' src='/images/item.svg' alt='상품 아이콘'></img>  <span className='dropdown-text'>상품리스트</span>
                        </Link>
                    </li>
                    <li className="list-box">
                        <Link to='/bookmark' onClick={handleDropdown}>
                            <img className='icon' src='/images/bookmark.svg' alt='북마크 아이콘'></img> <span className='dropdown-text'>북마크 페이지</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </StyleDropdown>
    )
}

export default Dropdown;