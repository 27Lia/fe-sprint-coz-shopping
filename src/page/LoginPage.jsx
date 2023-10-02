import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth"; // 여기서 signInWithEmailAndPassword 함수를 직접 import

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 15px;
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 300px;
  font-size: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 30px;
  background-color: #412dd4;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #5b4adb;
  }
`;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
