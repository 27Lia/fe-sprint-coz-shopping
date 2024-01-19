import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, setUserBookmarks } from "../redux";
import StyledButton from "../component/Button";
import { Firestore, collection, doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

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

      // 사용자의 북마크 데이터 불러오는 함수 호출
      fetchUserBookmarks(user.uid);
      navigate("/");
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("아이디 및 비밀번호가 틀렸습니다.");
    }
  };

  const fetchUserBookmarks = async (userId) => {
    try {
      const firestore = getFirestore();
      // 사용자별 북마크를 가져오기 위해 북마크 컬렉션 내의 문서 ID가 사용자 ID와 일치하도록 설정
      const userBookmarkDoc = doc(firestore, "bookmarks", userId);
      const bookmarkDocSnapshot = await getDoc(userBookmarkDoc);

      if (bookmarkDocSnapshot.exists()) {
        const bookmarksData = bookmarkDocSnapshot.data();
        console.log("사용자의 북마크 데이터:", bookmarksData);

        // 리덕스 스토어에 사용자의 북마크 데이터 저장
        dispatch(setUserBookmarks(bookmarksData));
      } else {
        console.log("이 사용자의 북마크 데이터가 존재하지 않습니다.");
        // 사용자 북마크가 없을 경우 빈 객체나 초기 값을 설정할 수 있음
        dispatch(setUserBookmarks({}));
      }
    } catch (error) {
      console.error("북마크 데이터를 가져오는데 실패했습니다:", error);
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
