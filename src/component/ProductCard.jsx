import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

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
  const navigate = useNavigate();

  const handleBookmarkClick = async () => {
    if (!auth.currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      // 사용자 문서가 존재하지 않을 경우, 새로운 문서를 생성
      await setDoc(userDocRef, { bookmarks: [] });
    }

    // 사용자 문서가 이미 존재하거나 새로 생성된 경우, 북마크를 추가하거나 삭제
    let userData = docSnap.exists() ? docSnap.data() : { bookmarks: [] };
    let bookmarks = userData.bookmarks || [];

    // 북마크 객체 생성
    let bookmarkObject = { id: product.id, type: product.type };

    // 상품 ID 기반으로 북마크 여부 확인
    let isBookmarked = bookmarks.some((bookmark) => bookmark.id === product.id);

    if (isBookmarked) {
      // 북마크에서 제거
      await updateDoc(userDocRef, {
        bookmarks: bookmarks.filter((bookmark) => bookmark.id !== product.id),
      });
      toast("북마크가 제거되었습니다.");
    } else {
      // 북마크에 추가
      await updateDoc(userDocRef, {
        bookmarks: arrayUnion(bookmarkObject),
      });
      toast("북마크에 추가되었습니다.");
    }
  };

  const goToDetailPage = () => {
    navigate(`/product/${product.id}`); // 상품 상세 페이지로 이동
  };

  // 타입에 따라 다른 컴포넌트를 렌더링
  switch (product.type) {
    case "Product":
      return (
        <StyleProductCard>
          <div className="product-box" onClick={goToDetailPage}>
            <img className="item-img" src={product.image_url} alt="Product" />
            <img
              onClick={handleBookmarkClick}
              className="star"
              src={"/images/uncheckedStar.svg"}
              alt="Bookmark"
            />
          </div>

          <div className="title-box" onClick={goToDetailPage}>
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
          <div className="product-box" onClick={goToDetailPage}>
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
            <img
              onClick={handleBookmarkClick}
              className="star"
              src={"/images/uncheckedStar.svg"}
              alt="Bookmark"
            />
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
            <img
              onClick={handleBookmarkClick}
              className="star"
              src={"/images/uncheckedStar.svg"}
              alt="Bookmark"
            />
          </div>
          <div className="title-box" onClick={goToDetailPage}>
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
