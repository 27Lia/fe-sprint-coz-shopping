import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import InnerContainer from "./InnerContainer";
import { db, auth } from "../firebase";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { useBookmark } from "../utills/bookmarkUtils";
import {
  QuantityButton,
  QuantityControl,
  QuantityDisplay,
} from "./ProductDetailPage";

function BookMark() {
  const [filterOption, setFilterOption] = useState("전체");
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const handleBookmarkClick = useBookmark();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const bookmarks = userData.bookmarks || [];
            const newQuantities = {};
            const bookmarkedFilteredProducts = products.filter((product) =>
              bookmarks.some((bookmark) => {
                if (bookmark.id === product.id) {
                  newQuantities[product.id] = bookmark.quantity;
                  return true;
                }
                return false;
              })
            );
            setQuantities(newQuantities);
            setFilteredProducts(bookmarkedFilteredProducts);
          } else {
            setFilteredProducts([]);
          }
        });
        return () => unsubscribeSnapshot;
      } else {
        setFilteredProducts(products);
      }
    });
    return () => unsubscribeAuth();
  }, [products, filterOption]);

  const handleQuantityChange = (productId, delta) => {
    const newQuantity = Math.max(1, (quantities[productId] || 1) + delta);
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
    handleBookmarkClick({ id: productId }, delta);
  };

  const handleRemoveClick = async (productId) => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef); // Firestore에서 사용자 문서를 가져옵니다.
      if (userDoc.exists()) {
        const bookmarks = userDoc.data().bookmarks || [];
        const updatedBookmarks = bookmarks.filter(
          (bookmark) => bookmark.id !== productId
        );
        await updateDoc(userDocRef, {
          bookmarks: updatedBookmarks,
        });
      }
    }
  };

  return (
    <InnerContainer>
      <StyleBookMark>
        {/* <Nav setFilterOption={setFilterOption} /> */}
        <main>
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <Product key={product.id}>
                <ProductCard product={product} />
                <QuantityControl>
                  <QuantityButton
                    onClick={() => handleQuantityChange(product.id, -1)}
                  >
                    -
                  </QuantityButton>
                  <QuantityDisplay>
                    {quantities[product.id] || 1}
                  </QuantityDisplay>
                  <QuantityButton
                    onClick={() => handleQuantityChange(product.id, 1)}
                  >
                    +
                  </QuantityButton>
                </QuantityControl>
                <RemoveButton onClick={() => handleRemoveClick(product.id)}>
                  삭제
                </RemoveButton>
              </Product>
            ))
          ) : (
            <h4>북마크된 항목이 존재하지 않습니다.</h4>
          )}
        </main>
      </StyleBookMark>
    </InnerContainer>
  );
}

export default BookMark;

const Product = styled.div`
  margin: 0 auto;
`;
const StyleBookMark = styled.div`
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul {
    display: flex;
    gap: 36px;
  }

  main {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-template-rows: repeat(4, 3fr);
    align-items: center;
    margin: 24px 76px;
    gap: 17px;
  }

  button {
    cursor: pointer;
  }
  .blank {
    height: 100px;
  }
`;

const RemoveButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
