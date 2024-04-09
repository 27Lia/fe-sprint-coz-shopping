import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import InnerContainer from "./InnerContainer";
import { handleBookmarkClick } from "../utills/bookmarkUtils"; // 북마크 함수 가져오기

const StyleProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  .product-image {
    width: 264px;
    height: 210px;
    border-radius: 10px;
  }

  .product-info {
    margin-top: 20px;
    text-align: center;

    .title {
      margin: 10px 0;
      font-size: 24px;
      font-weight: bold;
    }

    .price {
      margin: 5px 0;
      font-size: 20px;
      color: #007bff;
    }

    .description {
      margin-top: 15px;
    }
  }
`;

function ProductDetailPage() {
  const { productId } = useParams();
  const products = useSelector((state) => state.products);
  const product = products.find(
    (product) => product.id.toString() === productId
  );

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleBookmark = () => {
    handleBookmarkClick(product);
  };

  return (
    <InnerContainer>
      <StyleProductDetail>
        <img
          src={
            product.type === "Brand"
              ? product.brand_image_url
              : product.image_url
          }
          alt="Product"
          className="product-image"
        />
        <img
          onClick={handleBookmark}
          className="star"
          src={process.env.PUBLIC_URL + "/images/uncheckedStar.svg"}
          alt="Bookmark"
        />

        <div className="product-info">
          {product.brand_name || product.title ? (
            <h2>{product.brand_name || product.title}</h2>
          ) : null}
          {product.price && <p className="price">{`${product.price}원`}</p>}
          {product.sub_title && (
            <p className="description">{product.sub_title}</p>
          )}
          {product.discountPercentage && (
            <p>{`${product.discountPercentage}%`}</p>
          )}
        </div>
      </StyleProductDetail>
    </InnerContainer>
  );
}

export default ProductDetailPage;
