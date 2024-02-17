import React from "react";

function Nav({ setFilterOption }) {
  return (
    <nav>
      <ul>
        <li>
          <button className="all" onClick={() => setFilterOption("전체")}>
            <img
              src={`${process.env.PUBLIC_URL}/images/allimg.svg`}
              alt=""
            ></img>
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
            ></img>
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
            ></img>
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
            ></img>
          </button>
        </li>
        <li>
          <button className="Brand" onClick={() => setFilterOption("Brand")}>
            <img
              src={`${process.env.PUBLIC_URL}/images/Brandimg.svg`}
              alt=""
            ></img>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
