import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

// 로그인 페이지 전체를 감싸는 컨테이너를 스타일링합니다.
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

// 입력 필드를 스타일링합니다.
const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 200px;
`;

// 로그인 버튼을 스타일링합니다.
const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

function LoginPage() {
  console.log("LoginPage 렌더링");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };

  return (
    <LoginContainer>
      <StyledInput
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledButton onClick={handleLogin}>로그인</StyledButton>
    </LoginContainer>
  );
}

export default LoginPage;
