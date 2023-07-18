//메인리스트 목록들..

import { styled } from "styled-components";
import ProductCard from "../component/ProductCard";


const StyleMainPage = styled.div`
 
 section {
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    margin: 24px 76px;
    gap: 0.75rem;
    }
h3 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px; 
    align-self: flex-start;
  }
 ul {
    display:flex;
    gap:1.5rem;
}

`


function MainPage({ products }) {
    return (
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
                            />
                        ))}
                </ul>
            </article>
            <article>
                <h3>북마크 리스트</h3>
                <ul>
                  
                </ul>
            </article>
        </section>
        </StyleMainPage>

    );
}
export default MainPage;