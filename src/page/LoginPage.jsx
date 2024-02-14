import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../redux";
import StyledButton from "../component/Button";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(login());

      // 사용자의 북마크 목록을 불러오는 로직
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("북마크 목록:", userData.bookmarks); // 북마크 목록 콘솔에 출력
      } else {
        console.log("사용자의 북마크 목록이 존재하지 않습니다.");
      }

      navigate("/");
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("아이디 및 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <LoginForm onSubmit={handleLogin}>
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
        <StyledButton>로그인</StyledButton>
      </LoginContainer>
    </LoginForm>
  );
}

export default LoginPage;
