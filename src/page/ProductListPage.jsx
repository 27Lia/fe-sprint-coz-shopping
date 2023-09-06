import { useState, useEffect } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import { useInView } from 'react-intersection-observer';
// import axios from 'axios';
import data from '../data.json'
console.log(data.users);

const StyleProductList = styled.div`
    position:relative;
    top: 100px;   
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    nav {
        margin-top: 24px;
        justify-content:center;    
    }

    ul {
        display:flex;
        gap:36px;
    }

    main {
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 3fr);
    align-items:center;
    margin: 24px 76px;
    gap: 0.75rem;
    }


    button {
        cursor:pointer;
    }
    .blank {
        height:100px;
    }
`

function ProductListPage({ products, toggleBookmark, openModal }) {
    const [filterOption, setFilterOption] = useState("전체");
    const [ref, inView] = useInView();

    const [localProducts, setLocalProducts] = useState(products)


    const filterProduct = localProducts.filter((product) => {
        if (filterOption === "전체") {
            return true; // 모든 상품을 보여줍니다.
        } else {
            return product.type === filterOption; // 해당 카테고리 타입의 상품들만 보여줍니다.
        }
    });

    // const fetchMoreProducts = async () => {
    //     try {
    //         await axios.get("http://cozshopping.codestates-seb.link/api/v1/products");
    //     }   catch (error) {
    //         console.error("상품을 가져오는 데 에러 발생:", error);
    //     }
    // };

    const fetchMoreProducts = () => {
        // 더미 데이터의 첫 10개 상품을 가져오기 
        const newProducts = data.users.slice(0, 10);
        setLocalProducts(prevProducts => [...prevProducts, ...newProducts]);
    };

    useEffect(() => {
        if (inView) {
            fetchMoreProducts();
        }
    }, [inView]);

    return (
        <StyleProductList>
            <nav>
                <ul>
                    <li>
                        <button className="all"
                            onClick={() => setFilterOption("전체")}>
                            <img src="../images/allimg.svg" alt=""></img>
                        </button>
                    </li>
                    <li>
                        <button className="Product"
                            onClick={() => setFilterOption("Product")}>
                            <img src="../images/productimg.svg" alt=""></img>
                        </button>
                    </li>
                    <li>
                        <button className="Category"
                            onClick={() => setFilterOption("Category")}>
                            <img src="../images/categoryimg.svg" alt=""></img>
                        </button>
                    </li>
                    <li>
                        <button className="Exhibition"
                            onClick={() => setFilterOption("Exhibition")}>
                            <img src="../images/Exhibitionimg.svg" alt=""></img>
                        </button>
                    </li>
                    <li>
                        <button className="Brand"
                            onClick={() => setFilterOption("Brand")}>
                            <img src="../images/Brandimg.svg" alt=""></img>
                        </button>
                    </li>
                </ul>
            </nav>
            <main>
                {/* filterProduct를 사용하여 필터링된 상품들만 렌더링합니다. */}
                {filterProduct
                    .filter((product) => !product.checked) 
                    .slice(0)
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
    )
}

export default ProductListPage;