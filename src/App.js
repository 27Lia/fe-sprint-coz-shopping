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
        <div className="dropdown-overlay">
          <div className="dropdown-menu">
            <ul className='list-container'>
            <li className="list-box" >OOO님 안녕하세요!</li>
              <li className="list-box" onClick={() => (window.location.href = '/products/list')}>
                상품리스트
              </li>
              <li className="list-box"onClick={() => (window.location.href = '/bookmark')}>
                북마크 페이지
              </li>
            </ul>
          </div>
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
