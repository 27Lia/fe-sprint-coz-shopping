import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import InnerContainer from "./InnerContainer";
import Nav from "../component/Nav";
import { useSelector } from "react-redux";
import { db, auth } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const StyleProductList = styled.div`
  nav {
    display: flex;
    margin-top: 24px;
    justify-content: center;
    align-items: center;
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

function ProductListPage() {
  const [filterOption, setFilterOption] = useState("전체");
  const products = useSelector((state) => state.products); // 전체 상품 데이터
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        // onSnapshot을 사용하여 북마크 정보의 실시간 변경을 감시
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          let bookmarkedIds = [];
          if (docSnap.exists()) {
            const userData = docSnap.data();
            bookmarkedIds = userData.bookmarks.map((bookmark) => bookmark.id);
          }

          const nonBookmarkedFilteredProducts = products.filter(
            (product) =>
              !bookmarkedIds.includes(product.id) &&
              (filterOption === "전체" || product.type === filterOption)
          );

          setFilteredProducts(nonBookmarkedFilteredProducts);
        });

        // 컴포넌트 언마운트 시 onSnapshot 감시 중지
        return () => unsubscribeSnapshot();
      } else {
        // 사용자가 로그인하지 않은 경우, 북마크 필터링 없이 모든 상품을 표시
        setFilteredProducts(products);
      }
    });

    // 인증 상태 리스너 해제
    return () => unsubscribeAuth();
  }, [products, filterOption]);

  return (
    <InnerContainer>
      <StyleProductList>
        <Nav setFilterOption={setFilterOption} />
        <main>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>
        <div className="blank"></div>
      </StyleProductList>
    </InnerContainer>
  );
}

export default ProductListPage;
