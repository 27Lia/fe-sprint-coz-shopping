import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../redux";
import StyledButton from "../component/Button";
import { Firestore, collection, doc, getDoc } from "firebase/firestore";
import { updateData } from "../redux";
import { getFirestore } from "firebase/firestore"; // Firestore를 가져오기 위한 import 추가

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
      // Firestore 인스턴스를 가져옵니다.
      const firestore = getFirestore();

      // "bookmarks" 컬렉션과 사용자 문서에 대한 참조를 만듭니다.
      const bookmarksCollection = collection(firestore, "bookmarks");
      const userBookmarkDoc = doc(bookmarksCollection, userId);

      // 사용자 북마크 데이터를 가져옵니다.
      const bookmarkDocSnapshot = await getDoc(userBookmarkDoc);

      if (bookmarkDocSnapshot.exists()) {
        // 북마크 데이터가 있을 경우
        const bookmarksData = bookmarkDocSnapshot.data();
        console.log("사용자의 북마크 데이터:", bookmarksData);

        // 가져온 데이터로 Redux 스토어를 업데이트합니다.
        dispatch(updateData(bookmarksData));
      } else {
        console.log("이 사용자의 북마크 데이터가 존재하지 않습니다.");
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
