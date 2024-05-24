import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import styled from "styled-components";
import InnerContainer from "./InnerContainer";
import Nav from "../component/Nav";
import { useSelector, useDispatch } from "react-redux";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { fetchProducts } from "../redux"; // 상품목록들
import { useInView } from "react-intersection-observer";

function ProductListPage() {
  const [filterOption, setFilterOption] = useState("전체"); // 필터 옵션
  const products = useSelector((state) => state.products); // 제품 목록
  const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 제품 목록
  const dispatch = useDispatch();

  // 무한 스크롤을 위한 ref와 inView 상태
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // 컴포넌트가 처음 마운트될 때 제품 목록을 불러오기
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 페이지의 특정 지점에 도달하면 추가 제품 불러오기
  useEffect(() => {
    if (inView) {
      dispatch(fetchProducts());
    }
  }, [inView, dispatch]);

  // 제품 필터링 함수
  const filterProducts = async (products, filterOption) => {
    let bookmarkedIds = [];

    // //현재 로그인된 유저
    const user = auth.currentUser;

    // 로그인되어 있는 경우 북마크 정보를 가져옴
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.bookmarks) {
          // 북마크 된 상품들 ID map
          bookmarkedIds = userData.bookmarks.map((bookmark) => bookmark.id);
        }
      }
    }

    // 북마크되지 않은 제품 필터링
    const nonBookmarkedFilteredProducts = products.filter(
      (product) =>
        !bookmarkedIds.includes(product.id) &&
        (filterOption === "전체" || product.type === filterOption)
    );
    setFilteredProducts(nonBookmarkedFilteredProducts);
  };

  // 제품 목록이나 필터 옵션이 변경될 때 필터링을 적용
  useEffect(() => {
    filterProducts(products, filterOption);
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
