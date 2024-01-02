import { useState, useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer";
import data from "../data.json";
import InnerContainer from "./InnerContainer";
import { updateData } from "../redux";
import { useSelector, useDispatch } from "react-redux";

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

function ProductListPage({ toggleBookmark, openModal }) {
  const [filterOption, setFilterOption] = useState("전체");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data); // 스토어에서 products 가져오기

  const [ref, inView] = useInView();
  const perPage = 10; // 한 번에 불러올 아이템 개수
  const filterProduct = Object.values(products).filter((product) => {
    if (filterOption === "전체") {
      return !product.checked; // 북마크 되지 않은 상품만 필터링
    } else {
      return product.type === filterOption && !product.checked; // 북마크 되지 않은 특정 타입의 상품 필터링
    }
  });

  const fetchMoreProducts = () => {
    // Redux 스토어에서 데이터를 사용하여 새로운 상품을 로드하는 로직으로 변경
    const newStartIdx = products.length;
    const newProducts = data.slice(newStartIdx, newStartIdx + perPage);
    if (newProducts.length === 0) return;
    dispatch(updateData([...products, ...newProducts])); // 스토어 업데이트
  };

  useEffect(() => {
    if (inView) {
      fetchMoreProducts();
    }
  }, [inView, products]);

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
          {filterProduct.map((product) => (
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
