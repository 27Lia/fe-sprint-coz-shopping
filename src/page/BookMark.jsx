import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer"; // 무한스크롤 라이브러리
import InnerContainer from "./InnerContainer";
import { useDispatch, useSelector } from "react-redux"; // Redux 훅 사용
import { updateData } from "../redux"; // Redux 액션 임포트

const StyleBookMark = styled.div`
  nav {
    display: flex;
    align-items: center;
    margin-top: 24px;
    justify-content: center;
  }

  ul {
    display: flex;
    gap: 36px;
  }

  main {
    display: grid;
    grid-template-columns: repeat(4, 1fr); // 4개의 열로 구성
    grid-template-rows: repeat(4, 3fr); // 4개의 열로 구성
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

function BookMark({ toggleBookmark, openModal }) {
  const perPage = 10; // 한 번에 불러올 아이템 개수
  const [filterOption, setFilterOption] = useState("전체");
  const [ref, inView] = useInView();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data); // Redux 스토어에서 데이터 가져오기

  const filterProduct = Object.values(products).filter((product) => {
    // 북마크된 상품들만 필터링
    return (
      product.checked &&
      (filterOption === "전체" || product.type === filterOption)
    );
  });

  const fetchMoreProducts = () => {
    const currentProductCount = products.length; // Redux 스토어의 상품 개수를 사용
    const newStartIdx = currentProductCount;
    const newProducts = products.slice(newStartIdx, newStartIdx + perPage);
    if (newProducts.length === 0) return;
    dispatch(updateData([...products, ...newProducts]));
  };

  useEffect(() => {
    if (inView) {
      fetchMoreProducts();
    }
  }, [inView, products]);

  return (
    <InnerContainer>
      <StyleBookMark>
        <nav>
          <ul>
            <li>
              <button className="all" onClick={() => setFilterOption("전체")}>
                <img src="../images/allimg.svg" alt=""></img>
              </button>
            </li>
            <li>
              <button
                className="Product"
                onClick={() => setFilterOption("Product")}
              >
                <img src="../images/productimg.svg" alt=""></img>
              </button>
            </li>
            <li>
              <button
                className="Category"
                onClick={() => setFilterOption("Category")}
              >
                <img src="../images/categoryimg.svg" alt=""></img>
              </button>
            </li>
            <li>
              <button
                className="Exhibition"
                onClick={() => setFilterOption("Exhibition")}
              >
                <img src="../images/Exhibitionimg.svg" alt=""></img>
              </button>
            </li>
            <li>
              <button
                className="Brand"
                onClick={() => setFilterOption("Brand")}
              >
                <img src="../images/Brandimg.svg" alt=""></img>
              </button>
            </li>
          </ul>
        </nav>
        <main>
          {filterProduct.length ? (
            filterProduct.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                toggleBookmark={toggleBookmark}
                openModal={openModal}
              />
            ))
          ) : (
            <h4>북마크된 항목이 존재하지 않습니다</h4>
          )}
        </main>
        <div className="blank" ref={ref}></div>
      </StyleBookMark>
    </InnerContainer>
  );
}
export default BookMark;
