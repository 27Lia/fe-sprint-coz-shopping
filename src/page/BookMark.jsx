import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import InnerContainer from "./InnerContainer";
import Nav from "../component/Nav";
import { db, auth } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

const StyleBookMark = styled.div`
  margin-top: 150px;
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
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 3fr);
    align-items: center;
    margin: 24px 76px;
    gap: 0.75rem;
  }

  button {
    cursor: pointer;
  }
  .blank {
    height: 100px;
  }
`;

function BookMark() {
  const [filterOption, setFilterOption] = useState("전체");
  const products = useSelector((state) => state.products); // 전체 상품 데이터
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        // 사용자 문서의 실시간 변경 감시
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            // 북마크 정보를 바탕으로 상품 필터링
            const bookmarkedFilteredProducts = products.filter((product) =>
              userData.bookmarks.some(
                (bookmark) =>
                  bookmark.id === product.id &&
                  (filterOption === "전체" || product.type === filterOption)
              )
            );

            // 필터링된 상품을 상태에 저장하여 렌더링
            setFilteredProducts(bookmarkedFilteredProducts);
          } else {
            // 문서가 존재하지 않는 경우, 빈 배열 설정
            setFilteredProducts([]);
          }
        });

        // 컴포넌트 언마운트 시 실시간 감시 해제
        return unsubscribeSnapshot;
      } else {
        // 사용자가 로그인하지 않은 경우, 전체 상품 목록을 렌더링
        setFilteredProducts(products);
      }
    });

    // 컴포넌트 언마운트 시 인증 상태 리스너 해제
    return () => unsubscribeAuth();
  }, [products, filterOption]);
  return (
    <InnerContainer>
      <StyleBookMark>
        <Nav setFilterOption={setFilterOption} />
        <main>
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <h4>북마크된 항목이 존재하지 않습니다</h4>
          )}
        </main>
        <div className="blank"></div>
      </StyleBookMark>
    </InnerContainer>
  );
}
export default BookMark;
