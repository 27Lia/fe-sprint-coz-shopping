import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useBookmark() {
  const navigate = useNavigate();

  const handleBookmarkClick = async (product) => {
    if (!auth.currentUser) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }

    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      await setDoc(userDocRef, { bookmarks: [] });
    }

    let userData = docSnap.exists() ? docSnap.data() : { bookmarks: [] };
    let bookmarks = userData.bookmarks || [];

    let bookmarkObject = { id: product.id, type: product.type };
    let isBookmarked = bookmarks.some((bookmark) => bookmark.id === product.id);

    if (isBookmarked) {
      await updateDoc(userDocRef, {
        bookmarks: bookmarks.filter((bookmark) => bookmark.id !== product.id),
      });
      toast("북마크가 제거되었습니다.");
    } else {
      await updateDoc(userDocRef, {
        bookmarks: arrayUnion(bookmarkObject),
      });
      toast("북마크에 추가되었습니다.");
    }
  };

  return handleBookmarkClick;
}
