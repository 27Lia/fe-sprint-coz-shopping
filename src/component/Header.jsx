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
    margin: 0px 20px;
  }

  .button-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
`;

function Header() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      <Link to="/board">
        <StyledButton>게시판</StyledButton>
      </Link>

      <div className="login-container">
        {/* isLoggedIn 값에 따라 버튼 표시 여부 결정 */}
        {isLoggedIn ? (
          <>
            <div className="button-box">
              <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
            </div>
            <div className="button-box">
              <Link to="/bookmark">
                <StyledButton>장바구니</StyledButton>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="button-box">
              <Link to="/login">
                <StyledButton>로그인</StyledButton>
              </Link>
            </div>
            <div className="button-box">
              <Link to="/signup">
                <StyledButton>회원가입</StyledButton>
              </Link>
            </div>
          </>
        )}
      </div>
    </StyleHeader>
  );
}

export default Header;
