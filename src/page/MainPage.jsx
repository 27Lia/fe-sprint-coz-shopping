//메인리스트 목록들..

import { styled } from "styled-components";
import ProductCard from "../component/ProductCard";
import InnerContainer from "./InnerContainer";

const StyleMainPage = styled.section`
  article {
    margin-bottom: 12px;
  }
  h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
    align-self: flex-start;
  }
  ul {
    display: flex;
    gap: 1.5rem;
  }
`;

function MainPage({ products, toggleBookmark, openModal }) {
  return (
    <InnerContainer>
      <StyleMainPage>
        <section>
          <article>
            <h3>상품 리스트</h3>
            <ul>
              {products
                .filter((product) => !product.checked)
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    toggleBookmark={toggleBookmark}
                    openModal={openModal}
                  />
                ))}
            </ul>
          </article>
          <article>
            <h3>북마크 리스트</h3>
            <ul>
              {products.filter((product) => product.checked).slice(0, 4)
                .length ? (
                products
                  .filter((product) => product.checked)
                  .slice(0, 4)
                  .map((product) => (
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
            </ul>
          </article>
        </section>
      </StyleMainPage>
    </InnerContainer>
  );
}

export default MainPage;
