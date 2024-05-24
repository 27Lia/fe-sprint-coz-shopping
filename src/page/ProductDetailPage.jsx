import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import InnerContainer from "./InnerContainer";
import { useBookmark } from "../utills/bookmarkUtils";

function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

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
    if (!isLoggedIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }

    handleBookmarkClick(product, quantity);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
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
          <QuantityControl>
            <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
          </QuantityControl>
          <BookmarkBtn onClick={handleBookmark}>장바구니 담기</BookmarkBtn>
        </InfoBox>
      </StyleProductDetail>
    </InnerContainer>
  );
}

export default ProductDetailPage;

const StyleProductDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 60px;
  height: 100%;

  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 30px;
  }
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
