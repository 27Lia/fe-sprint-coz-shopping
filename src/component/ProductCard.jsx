import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { toast } from "react-toastify";

const StyleProductCard = styled.li`
  margin: 0 auto;

  div:not(:nth-child(1)) {
    margin: 6px 0;
  }

  width: 264px;
  height: 264px;

  .title-box {
    display: flex;
    justify-content: space-between;
  }
  .follower {
    text-align: right;
  }

  .product-box {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;
    width: 264px;
    height: 210px;
  }
  .item-img {
    width: 264px;
    height: 210px;
  }

  .title {
    font-weight: 800;
    line-height: normal;
  }

  .discount {
    color: #452cdd;
    font-weight: 800;
  }
  .price {
    text-align: right;
  }
`;

function ProductCard({ product }) {
  const navigate = useNavigate();

  const goToDetailPage = () => {
    if (product.type === "Product") {
      navigate(`/product/${product.id}`);
    } else {
      toast("상품만 상세페이지 이동이 가능합니다.");
    }
  };

  // 타입에 따라 다른 컴포넌트를 렌더링
  switch (product.type) {
    case "Product":
      return (
        <StyleProductCard>
          <div className="product-box" onClick={goToDetailPage}>
            <img className="item-img" src={product.image_url} alt="Product" />
          </div>
          <div className="title-box" onClick={goToDetailPage}>
            <span className="title">{product.title}</span>
            <span className="discountPercentage">
              {product.discountPercentage}%
            </span>
          </div>
          <div className="price">
            {parseInt(product.price, 10).toLocaleString("ko-KR")}원
          </div>{" "}
        </StyleProductCard>
      );

    case "Category":
      return (
        <StyleProductCard>
          <div className="product-box" onClick={goToDetailPage}>
            <img
              className="item-img"
              src={product.image_url}
              alt="Product-img"
            />{" "}
          </div>
          <div className="title-box" onClick={goToDetailPage}>
            <span className="title">#{product.title}</span>
          </div>
        </StyleProductCard>
      );
    case "Exhibition":
      return (
        <StyleProductCard>
          <div className="product-box" onClick={goToDetailPage}>
            <img
              className="item-img"
              src={product.image_url}
              alt="Product img"
            />{" "}
          </div>
          <div className="title-box" onClick={goToDetailPage}>
            <span className="title">{product.title}</span>
          </div>
          <div className="sub_title">{product.sub_title}</div>
        </StyleProductCard>
      );
    case "Brand":
      return (
        <StyleProductCard>
          <div className="product-box" onClick={goToDetailPage}>
            <img
              className="item-img"
              src={product.brand_image_url}
              alt="brand img"
            />{" "}
          </div>
          <div className="title-box" onClick={goToDetailPage}>
            <span className="brand_name">{product.brand_name}</span>
          </div>
        </StyleProductCard>
      );
    default:
      return null;
  }
}

export default ProductCard;
