import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyleDropdown = styled.div`
  .dropdown-menu {
    position: fixed;
    right: 4%;
    top: 6%;
    width: 150px;
    height: 50px;
    border-radius: 12px;
    background: whitesmoke;
    z-index: 999;
  }

  .list-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    padding: 10px;
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
  }
`;

function Dropdown({ handleDropdown }) {
  return (
    <StyleDropdown>
      <div className="dropdown-menu">
        <ul className="dropdown-container">
          <li className="list-box">
            <Link to="/bookmark" onClick={handleDropdown}>
              <span className="dropdown-text">북마크 페이지</span>
            </Link>
          </li>
        </ul>
      </div>
    </StyleDropdown>
  );
}

export default Dropdown;
