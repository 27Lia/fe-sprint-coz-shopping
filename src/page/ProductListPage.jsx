import { useState, useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer"; // 무한스크롤 라이브러리
// import axios from 'axios';
import data from "../data.json";
import InnerContainer from "./InnerContainer";

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

function ProductListPage({ products, toggleBookmark, openModal }) {
  const [filterOption, setFilterOption] = useState("전체");
  const [localProducts, setLocalProducts] = useState(products);

  const [ref, inView] = useInView();
  const perPage = 10; // 한 번에 불러올 아이템 개수

  const filterProduct = localProducts.filter((product) => {
    if (filterOption === "전체") {
      return true; // 모든 상품을 보여줍니다.
    } else {
      return product.type === filterOption; // 해당 카테고리 타입의 상품들만 !!
    }
  });

  useEffect(() => {
    setLocalProducts(products); // products prop이 변경되었을 때 localProducts 업데이트
  }, [products]);

  const fetchMoreProducts = () => {
    if (!Array.isArray(data)) {
      console.error("data is not an array!");
      return;
    }
    const newStartIdx = localProducts.length;
    const newProducts = data.slice(newStartIdx, newStartIdx + perPage);
    if (newProducts.length === 0) return;
    setLocalProducts((prevProducts) => [...prevProducts, ...newProducts]);
  };

  useEffect(() => {
    if (inView) {
      fetchMoreProducts();
    }
  }, [inView]);

  return (
    <InnerContainer>
      <StyleProductList>
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
          {/* filterProduct를 사용하여 필터링된 상품들만 렌더링 */}
          {filterProduct
            .filter((product) => !product.checked)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                toggleBookmark={toggleBookmark}
                openModal={openModal}
              />
            ))}
        </main>
        <div className="blank" ref={ref}></div>
      </StyleProductList>
    </InnerContainer>
  );
}

export default ProductListPage;

// api 접근금지됨
// const fetchMoreProducts = async () => {
//     try {
//         await axios.get("http://cozshopping.codestates-seb.link/api/v1/products");
//     }   catch (error) {
//         console.error("상품을 가져오는 데 에러 발생함:", error);
//     }
// };
