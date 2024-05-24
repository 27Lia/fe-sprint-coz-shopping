import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import InnerContainer from "./InnerContainer";
import Nav from "../component/Nav";
import { useSelector } from "react-redux";
import { db, auth } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { fetchProducts } from "../redux";
import { useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

const StyleProductList = styled.div`
  nav {
    display: flex;
    margin-top: 24px;
    justify-content: center;
    align-items: center;
  }

  ul {
    display: flex;
    min-width: 350px;
    gap: 36px;
  }

  main {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    grid-template-rows: repeat(4, 3fr);
    align-items: center;
    gap: 17px;
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
  const products = useSelector((state) => state.products);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (inView) {
      dispatch(fetchProducts());
    }
  }, [inView, dispatch]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        // onSnapshot을 사용하여 북마크 정보의 실시간 변경을 감시
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
          let bookmarkedIds = [];
          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.bookmarks) {
              // bookmarks가 존재하는지 확인
              bookmarkedIds = userData.bookmarks.map((bookmark) => bookmark.id);
            }
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
        // 사용자가 로그인하지 않은 경우에도 필터링을 적용하여 상품을 표시
        const nonBookmarkedFilteredProducts = products.filter(
          (product) => filterOption === "전체" || product.type === filterOption
        );

        setFilteredProducts(nonBookmarkedFilteredProducts);
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
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
          <div className="blank" ref={ref} />
        </main>
      </StyleProductList>
    </InnerContainer>
  );
}

export default ProductListPage;
