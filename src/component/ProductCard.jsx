import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { addBookmark, removeBookmark } from "../redux";
import { toast } from "react-toastify";

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

function ProductCard({ product }) {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);
  const isBookmarked = bookmarks.includes(product.id);

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(product.id));
      toast("북마크가 제거되었습니다."); // 토스트 메시지 표시
    } else {
      if (!isLoggedIn) {
        // 로그인되어 있지 않으면 알림 표시 및 로그인 페이지로 이동
        alert("로그인이 필요합니다.");
        navigate("/login"); // 로그인 페이지로 이동
        return;
      }

      dispatch(addBookmark(product.id));
      toast("북마크에 추가되었습니다."); // 토스트 메시지 표시
    }
  };

  // 타입에 따라 다른 컴포넌트를 렌더링
  switch (product.type) {
    case "Product":
      return (
        <StyleProductCard>
          <div className="product-box">
            <img className="item-img" src={product.image_url} alt="Product" />
            <img
              onClick={handleBookmarkClick}
              className="star"
              src={"/images/uncheckedStar.svg"}
              alt="Bookmark"
            />
          </div>

          <div className="title-box">
            <span className="title">{product.title}</span>
            <span className="discountPercentage">
              {product.discountPercentage}%
            </span>
          </div>

          <div className="price">{product.price}원</div>
        </StyleProductCard>
      );

    case "Category":
      return (
        <StyleProductCard>
          <div className="product-box">
            <img
              className="item-img"
              src={product.image_url}
              alt="Product-img"
            />{" "}
            <img
              onClick={handleBookmarkClick}
              className="star"
              src={"/images/uncheckedStar.svg"}
              alt="Bookmark"
            />
          </div>
          <div className="title-box">
            <span className="title">#{product.title}</span>
          </div>
        </StyleProductCard>
      );
    case "Exhibition":
      return (
        <StyleProductCard>
          <div className="product-box">
            <img
              className="item-img"
              src={product.image_url}
              alt="Product img"
            />{" "}
            <img
              onClick={handleBookmarkClick}
              className="star"
              src={"/images/uncheckedStar.svg"}
              alt="Bookmark"
            />
          </div>
          <div className="title-box">
            <span className="title">{product.title}</span>
          </div>
          <div className="sub_title">{product.sub_title}</div>
        </StyleProductCard>
      );
    case "Brand":
      return (
        <StyleProductCard>
          <div className="product-box">
            <img
              className="item-img"
              src={product.brand_image_url}
              alt="brand img"
            />{" "}
            <img
              onClick={handleBookmarkClick}
              className="star"
              src={"/images/uncheckedStar.svg"}
              alt="Bookmark"
            />
          </div>
          <div className="title-box">
            <span className="brand_name">{product.brand_name}</span>
            <span className="interest_count">관심고객수</span>
          </div>
          <div className="follower">{product.follower}명</div>
        </StyleProductCard>
      );
    default:
      return null;
  }
}

export default ProductCard;
