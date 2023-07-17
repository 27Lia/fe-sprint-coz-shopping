import React, { useState } from 'react';
import Main from './page/Main';
import './base.css';
import './component/header.css';
import './component/footer.css';
import './component/app.css';
// 헤더, 푸터, 드롭다운 

function App() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="app">
      <div className="header-container">
        <div className='logo-container'>
          <div className='logo-img' >
            <img src="logo.png" alt="logo" />
          </div>
          <span className="logo-title">Coz Shopping</span>
        </div>
        <img src="hamburger.png" alt="hamburger" onClick={toggleDropdown} />
      </div>

      {isDropdownOpen && (
          <div className="dropdown-menu">
            <ul className='dropdown-container'>
            <li className="list-box" ><span className='dropdown-text'>OOO님 안녕하세요!</span ></li>
              <li className="list-box" onClick={() => (window.location.href = '/products/list')}>
             <img className='icon' src='./item.svg' alt='상품 아이콘'></img>  <span className='dropdown-text'>상품리스트</span>
              </li>
              <li className="list-box"onClick={() => (window.location.href = '/bookmark')}>
              <img className='icon' src='./bookmark.svg' alt='북마크 아이콘'></img> <span className='dropdown-text'>북마크 페이지</span>
              </li>
            </ul>
          </div>
      )}

      <Main>
      </Main>
      <footer className="footer-container">
        <span>개인정보 처리방침 | 이용 약관</span>
        <span>All rights reserved @ Codestates</span>
      </footer>
    </div>

  );
}

export default App;
