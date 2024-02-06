import { useState } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import InnerContainer from "./InnerContainer";
import Nav from "../component/Nav";
import useFilteredProducts from "../hooks/useFilteredProducts";

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

  // 북마크 상태에 따른 필터링
  const filterProduct = useFilteredProducts(filterOption, false);
  return (
    <InnerContainer>
      <StyleProductList>
        <Nav setFilterOption={setFilterOption} />
        <main>
          {/* filterProduct를 사용하여 필터링된 상품들만 렌더링 */}
          {filterProduct.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </main>
        <div className="blank"></div>
      </StyleProductList>
    </InnerContainer>
  );
}

export default ProductListPage;
