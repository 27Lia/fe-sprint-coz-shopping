import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("로그아웃 성공");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 에러", error);
    }
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}

export default LogoutButton;
