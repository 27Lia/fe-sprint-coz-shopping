import React from "react";
import styled from "styled-components";

const StyledNav = styled.nav`
  ul {
    display: flex;
    gap: 16px;
    flex-wrap: wrap; /* 화면이 작아질 때 항목들이 다음 줄로 넘어가도록 설정 */
    justify-content: center;
  }

  li {
    list-style: none;
  }
`;

function Nav({ setFilterOption }) {
  return (
    <StyledNav>
      <ul>
        <li>
          <button className="all" onClick={() => setFilterOption("전체")}>
            <img src={`${process.env.PUBLIC_URL}/images/allimg.svg`} alt="" />
          </button>
        </li>
        <li>
          <button
            className="Product"
            onClick={() => setFilterOption("Product")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/productimg.svg`}
              alt=""
            />
          </button>
        </li>
        <li>
          <button
            className="Category"
            onClick={() => setFilterOption("Category")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/categoryimg.svg`}
              alt=""
            />
          </button>
        </li>
        <li>
          <button
            className="Exhibition"
            onClick={() => setFilterOption("Exhibition")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/images/Exhibitionimg.svg`}
              alt=""
            />
          </button>
        </li>
        <li>
          <button className="Brand" onClick={() => setFilterOption("Brand")}>
            <img src={`${process.env.PUBLIC_URL}/images/Brandimg.svg`} alt="" />
          </button>
        </li>
      </ul>
    </StyledNav>
  );
}

export default Nav;
