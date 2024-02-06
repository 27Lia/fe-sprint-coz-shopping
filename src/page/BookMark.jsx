import { useState } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import InnerContainer from "./InnerContainer";
import Nav from "../component/Nav";
import useFilteredProducts from "../hooks/useFilteredProducts";

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

function BookMark() {
  const [filterOption, setFilterOption] = useState("전체");

  // 북마크된 상품 데이터만 필터링
  const filterProduct = useFilteredProducts(filterOption, true);

  return (
    <InnerContainer>
      <StyleBookMark>
        <Nav setFilterOption={setFilterOption} />
        <main>
          {filterProduct.length ? (
            filterProduct.map((product) => (
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
