import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import InnerContainer from "./InnerContainer";
import { useBookmark } from "../utills/bookmarkUtils";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const StyleProductDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  height: 100%;
`;

const Img = styled.img`
  width: 264px;
  height: 210px;
  border-radius: 10px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  height: 210px;
`;

const ProductInfo = styled.div`
  h2 {
    margin: 10px 0;
    font-size: 24px;
    font-weight: bold;
  }

  .price {
    margin: 5px 0;
    font-size: 20px;
  }

  .description {
    margin-top: 15px;
  }
`;

const BookmarkBtn = styled.button`
  padding: 10px;
  background-color: #007bff; /* 포인트 색상 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* 포인트 색상의 조금 더 어둡게 */
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const QuantityButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const QuantityDisplay = styled.span`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

function ProductDetailPage() {
  const handleBookmarkClick = useBookmark();

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
        <Img
          src={
            product.type === "Brand"
              ? product.brand_image_url
              : product.image_url
          }
          alt="Product"
        />
        <InfoBox>
          <ProductInfo>
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
          </ProductInfo>
          <BookmarkBtn onClick={handleBookmark}>장바구니 담기</BookmarkBtn>
        </InfoBox>
      </StyleProductDetail>
    </InnerContainer>
  );
}

export default ProductDetailPage;
