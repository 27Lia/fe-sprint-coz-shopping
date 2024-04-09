import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export async function handleBookmarkClick(product) {
  if (!auth.currentUser) {
    alert("로그인이 필요합니다.");
    Navigate("/login");
    return;
  }

  const userDocRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(userDocRef);

  if (!docSnap.exists()) {
    // 사용자 문서가 존재하지 않을 경우, 새로운 문서를 생성
    await setDoc(userDocRef, { bookmarks: [] });
  }

  // 사용자 문서가 이미 존재하거나 새로 생성된 경우, 북마크를 추가하거나 삭제
  let userData = docSnap.exists() ? docSnap.data() : { bookmarks: [] };
  let bookmarks = userData.bookmarks || [];

  // 북마크 객체 생성
  let bookmarkObject = { id: product.id, type: product.type };

  // 상품 ID 기반으로 북마크 여부 확인
  let isBookmarked = bookmarks.some((bookmark) => bookmark.id === product.id);

  if (isBookmarked) {
    // 북마크에서 제거
    await updateDoc(userDocRef, {
      bookmarks: bookmarks.filter((bookmark) => bookmark.id !== product.id),
    });
    toast("북마크가 제거되었습니다.");
  } else {
    // 북마크에 추가
    await updateDoc(userDocRef, {
      bookmarks: arrayUnion(bookmarkObject),
    });
    toast("북마크에 추가되었습니다.");
  }
}
