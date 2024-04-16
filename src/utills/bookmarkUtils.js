import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useBookmark() {
  const navigate = useNavigate();

  const handleBookmarkClick = async (product, quantityChange) => {
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

    let existingBookmark = bookmarks.find(
      (bookmark) => bookmark.id === product.id
    );

    if (existingBookmark) {
      // 수량 조절 로직
      const newQuantity = existingBookmark.quantity + quantityChange;
      if (newQuantity > 0) {
        // 수량 업데이트
        existingBookmark.quantity = newQuantity;
        await updateDoc(userDocRef, { bookmarks: bookmarks });
        toast(`장바구니에서 제품의 수량을 ${newQuantity}으로 조정했습니다.`);
      } else {
        // 제품 제거
        bookmarks = bookmarks.filter((bookmark) => bookmark.id !== product.id);
        await updateDoc(userDocRef, { bookmarks: bookmarks });
        toast("장바구니에서 제품을 제거했습니다.");
      }
    } else if (quantityChange > 0) {
      // 새 제품 추가
      let bookmarkObject = {
        id: product.id,
        type: product.type,
        quantity: quantityChange,
      };
      await updateDoc(userDocRef, {
        bookmarks: arrayUnion(bookmarkObject),
      });
      toast(`장바구니에 제품을 추가했습니다. (수량: ${quantityChange})`);
    }
  };

  return handleBookmarkClick;
}
