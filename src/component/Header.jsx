import React, { useState } from "react";
import Dropdown from "./Dropdown";
import styled from "styled-components"; 
import { Link } from "react-router-dom";

const StyleHeader =  styled.header`
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0px 76px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #FFF;
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.10);
}


.logo-title {
    font-size: 2rem;
    font-weight: bold;
    padding-left: 12px;
}

.logo-container {
    display: flex;
    align-items: center;
}

img {
    cursor: pointer;
}


button {
    border: none;
    background-color: transparent;
}
`;





function Header() {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
  <StyleHeader>
    <div className="header-container">
      <div className="logo-container">
        <div className="logo-img">
          <Link to ='/'>
          <img src="/images/mainLogo.png" alt="mainLogo" />
          </Link>
        </div>
        <span className="logo-title">Coz Shopping</span>
      </div>
      <button onClick={handleDropdown}>
        <img className="hamburger-logo"src="/images/HeaderButton.svg" alt="HeaderButton" />
      </button>
    </div>
    {/* 레이아웃 방해를 받기 때문에 Dropdown 컴포넌트를 header-continer 요소 외부에 렌더링함  */}
    {dropdown && <Dropdown />}

</StyleHeader>
  );
}

export default Header;
