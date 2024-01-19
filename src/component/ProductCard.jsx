import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth, db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

// 한개의 컴포넌트에 4개의 타입을 넣는 방식을 사용함 why? poroduct를 중복으로 계속 써주어야하기때문

const StyleProductCard = styled.li`
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
  .star {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 10px;
    cursor: pointer;
    bottom: 10px;
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

function ProductCard({ product, toggleBookmark, openModal }) {
  const {
    title,
    brand_image_url,
    brand_name,
    checked = false,
    discountPercentage,
    follower,
    image_url,
    price,
    sub_title,
    type,
  } = product;
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const { id } = product;
  const bookmarks = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();
  console.log(bookmarks);

  // 별모양 이미지를 눌렀을 때 실행될 함수
  const handleStarClick = (e) => {
    if (!isLoggedIn) {
      // 로그인되어 있지 않으면 알림 표시 및 로그인 페이지로 이동
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 이동
      return;
    }

    // 로그인된 상태에서는 북마크 토글 동작 수행
    toggleBookmark(product);

    // 이벤트 전파 방지
    e.stopPropagation();
  };

  // 타입에 따라 다른 컴포넌트를 렌더링
  switch (type) {
    case "Product":
      return (
        <StyleProductCard>
          <div className="product-box">
            <img
              onClick={() => openModal(product)}
              className="item-img"
              src={image_url}
              alt="Product"
            />
            <img
              onClick={(e) => {
                handleStarClick(e);
              }}
              className="star"
              src={
                checked
                  ? "/images/checkedStar.svg"
                  : "/images/uncheckedStar.svg"
              }
              alt="book mark"
            />
          </div>

          <div className="title-box">
            <span className="title">{title}</span>
            <span className="discountPercentage">{discountPercentage}%</span>
          </div>

          <div className="price">{price}원</div>
        </StyleProductCard>
      );

    case "Category":
      return (
        <StyleProductCard>
          <div className="product-box">
            <img
              onClick={() => openModal(product)}
              className="item-img"
              src={image_url}
              alt="Product-img"
            />
            <img
              onClick={(e) => {
                handleStarClick(e);
              }}
              className="star"
              src={
                checked
                  ? "/images/checkedStar.svg"
                  : "/images/uncheckedStar.svg"
              }
              alt="book mark"
            />
          </div>
          <div className="title-box">
            <span className="title">#{title}</span>
          </div>
        </StyleProductCard>
      );
    case "Exhibition":
      return (
        <StyleProductCard>
          <div className="product-box">
            <img
              onClick={() => openModal(product)}
              className="item-img"
              src={image_url}
              alt="Product img"
            />
            <img
              onClick={(e) => {
                handleStarClick(e);
              }}
              className="star"
              src={
                checked
                  ? "/images/checkedStar.svg"
                  : "/images/uncheckedStar.svg"
              }
              alt="book mark"
            />
          </div>
          <div className="title-box">
            <span className="title">{title}</span>
          </div>
          <div className="sub_title">{sub_title}</div>
        </StyleProductCard>
      );
    case "Brand":
      return (
        <StyleProductCard>
          <div className="product-box">
            <img
              onClick={() => openModal(product)}
              className="item-img"
              src={brand_image_url}
              alt="brand img"
            />
            <img
              onClick={(e) => {
                handleStarClick(e);
              }}
              className="star"
              src={
                checked
                  ? "/images/checkedStar.svg"
                  : "/images/uncheckedStar.svg"
              }
              alt="book mark"
            />
          </div>
          <div className="title-box">
            <span className="brand_name">{brand_name}</span>
            <span className="interest_count">관심고객수</span>
          </div>
          <div className="follower">{follower}명</div>
        </StyleProductCard>
      );
    default:
      return null;
  }
}

export default ProductCard;
