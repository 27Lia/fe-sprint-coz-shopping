import React, { useState } from "react";
import Dropdown from "./Dropdown";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logout } from "../redux";
import StyledButton from "../component/Button";
const StyleHeader = styled.header`
  background: #fff;
  padding: 25px 76px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;

  .logo-container {
    display: flex;
    flex: 1;
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
    color: #fff;
  }
  .login-container {
    display: flex;
    margin-right: 20px;
  }

  .login-box,
  .signup-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
`;

function Header() {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.error("로그아웃 에러", error);
    }
  };

  return (
    <StyleHeader>
      <div className="logo-container">
        <div className="logo-img">
          <Link to="/">
            <img src="/images/mainLogo.png" alt="mainLogo" />
          </Link>
        </div>
        <span className="logo-title">shopping</span>
      </div>
      <div className="login-container">
        {/* isLoggedIn 값에 따라 버튼 표시 여부 결정 */}
        {isLoggedIn ? (
          <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
        ) : (
          <>
            <div className="login-box">
              <Link to="/login">
                <StyledButton>로그인</StyledButton>
              </Link>
            </div>
            <div className="signup-box">
              <Link to="/signup">
                <StyledButton>회원가입</StyledButton>
              </Link>
            </div>
          </>
        )}
      </div>
      <button onClick={handleDropdown}>
        <img
          className="hamburger-logo"
          src="/images/HeaderButton.svg"
          alt="HeaderButton"
        />
      </button>

      {/* 레이아웃 방해를 받기 때문에 Dropdown 컴포넌트를 header-continer 요소 외부에 렌더링함  */}
      {dropdown && <Dropdown />}
    </StyleHeader>
  );
}

export default Header;
