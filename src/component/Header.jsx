import React, { useState } from "react";
import Dropdown from "./Dropdown";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyleHeader = styled.header`
  background: #fff;
  padding: 25px 76px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
  width:100%;
  position:fixed;
  z-index:1;

.logo-container {
  display: flex;
  flex:1;
}

.logo-title {
    font-size: 2rem;
    font-weight: bold;
    margin-left: 12px;
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
      <div className="logo-container">
        <div className="logo-img">
          <Link to='/'>
            <img src="/images/mainLogo.png" alt="mainLogo" />
          </Link>
        </div>
        <span className="logo-title">shopping</span>
      </div>
      <button onClick={handleDropdown}>
        <img className="hamburger-logo" src="/images/HeaderButton.svg" alt="HeaderButton" />
      </button>
      {/* 레이아웃 방해를 받기 때문에 Dropdown 컴포넌트를 header-continer 요소 외부에 렌더링함  */}
      {dropdown && <Dropdown />}

    </StyleHeader>
  );
}

export default Header;
