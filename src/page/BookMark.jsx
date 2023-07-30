import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer";
import axios from "axios";


const StyleBookMark = styled.div`
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
    grid-template-columns: repeat(4, 1fr); // 4개의 열로 구성
    grid-template-rows: repeat(4, 3fr); // 4개의 열로 구성
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


function BookMark({ products, toggleBookmark, openModal }) {

    const [filterOption, setFilterOption] = useState("전체");
    const [ref, inView] = useInView();
    const filterProduct = products.filter((product) => {
        if (filterOption === "전체") {
            return true; // 모든 상품을 보여줍니다.
        } else {
            return product.type === filterOption; // 해당 카테고리 타입의 상품들만 보여줍니다.
        }
    });

    const fetchMoreProducts = async () => {
        try {
          await axios.get("http://cozshopping.codestates-seb.link/api/v1/products");
        } catch (error) {
          console.error("상품을 가져오는 데 에러 발생:", error);
        }
      };

    useEffect(()=>{
        if(inView) {
            fetchMoreProducts();
        }
    },[inView]);



    return (
        <StyleBookMark>
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
            {filterProduct
                .filter((product) => product.checked)
                .slice(0,4).length ? (
                filterProduct
                    .filter((product) => product.checked)
                    .slice(0)
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

            </main>
            <div className="blank" ref={ref}></div>

        </StyleBookMark>
    )
}
export default BookMark;

