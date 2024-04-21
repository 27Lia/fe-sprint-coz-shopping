import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { logout } from "../redux";
import StyledButton from "../component/Button";
import { useEffect, useState } from "react";

const StyleHeader = styled.header`
  background: #fff;
  padding: 25px 76px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-width: 350px;
  position: fixed;
  top: 0;
  z-index: 1;
  @media (min-width: 50px) {
    padding: 25px 16px;
  }

  .logo-container {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .logo-title {
    font-size: 2rem;
    font-weight: bold;
    margin-left: 12px;

    @media (min-width: 50px) {
      font-size: 1.5rem;
    }
  }

  img {
    cursor: pointer;
  }

  button {
    border: none;
    padding: 10px;
    width: 110px;
    cursor: pointer;
  }
  .login-container {
    display: flex;
    gap: 20px;
  }

  .button-box {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    background-color: #412dd4;
    border-radius: 5px;
    &:hover {
      background-color: #5b4adb;
    }
  }

  @media (max-width: 780px) {
    .login-container {
      display: none;
      position: absolute;
      top: 100%;
      background: #fff;
      box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.1);
      flex-direction: column;
      padding: 10px;
    }

    .login-container.active {
      display: flex;
    }
  }
`;
const DrowDownBox = styled.div`
  gap: 20px;
  display: flex;
`;

function Header() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 780);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());

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
            <img
              src={`${process.env.PUBLIC_URL}/images/mainLogo.png`}
              alt="Main Logo"
            />
          </Link>
        </div>
        <span className="logo-title">shopping</span>
      </div>
      <DrowDownBox>
        {isMobile ? (
          <div className="button-box">
            <button onClick={toggleDropdown}>메뉴</button>
            <div
              className={`login-container ${isDropdownOpen ? "active" : ""}`}
            >
              {isLoggedIn ? (
                <>
                  <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
                  <Link to="/bookmark">
                    <StyledButton>장바구니</StyledButton>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/board">
                    <StyledButton>게시판</StyledButton>
                  </Link>
                  <Link to="/login">
                    <StyledButton>로그인</StyledButton>
                  </Link>
                  <Link to="/signup">
                    <StyledButton>회원가입</StyledButton>
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="login-container">
              <Link to="/board">
                <StyledButton>게시판</StyledButton>
              </Link>
              {isLoggedIn ? (
                <>
                  <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
                  <Link to="/bookmark">
                    <StyledButton>장바구니</StyledButton>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <StyledButton>로그인</StyledButton>
                  </Link>
                  <Link to="/signup">
                    <StyledButton>회원가입</StyledButton>
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </DrowDownBox>{" "}
    </StyleHeader>
  );
}

export default Header;
