import React from "react";
import { styled } from "styled-components";

// 한개의 컴포넌트에 4개의 타입을 넣는 방식을 사용함 why? poroduct를 중복으로 계속 써주어야하기때문

const StyleProductCard = styled.li`
div:not(:nth-child(1)) {
    margin:6px 0 ;
}

width:264px;
height:264px;

.title-box {
    display:flex;
    justify-content:space-between;
}
.follower {
    text-align:right;
}

.product-box {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;
    width:264px;
    height:210px;

}
.item-img {
        width:264px;
        height:210px;
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
    text-align:right;
}

`

function ProductCard({ product }) {
    const {
        title,
        brand_image_url,
        brand_name,
        bookmark_checked,
        discountPercentage,
        follower,
        image_url,
        price,
        sub_title,
        type,
    } = product;


    // 타입에 따라 다른 컴포넌트를 렌더링합니다.
    switch (type) {
        case "Product":
            return (
                <StyleProductCard>
                    <div className="product-box">
                        <img className="item-img" src={image_url} alt="Product" />
                        <img
                            className="star"
                            src={"/images/checkedStar.svg"}
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
                        <img className="item-img" src={image_url} alt="Product img" />
                        <img
                            className="star"
                            src={"/images/checkedStar.svg"}
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
                        <img className="item-img" src={image_url} alt="Product img" />
                        <img
                            className="star"
                            src={"/images/checkedStar.svg"}
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
                        <img className="item-img" src={brand_image_url} alt="brand img" />
                        <img
                            className="star"
                            src={"/images/checkedStar.svg"}
                            alt="book mark"
                        />
                    </div>
                    <div className="title-box">
                        <span className="brand_name">{brand_name}</span>
                        <span className="interest_count">관심고객수</span>
                    </div>
                    <div className="follower">{follower}</div>
                </StyleProductCard>
            )
        default:
            return null;
    }
}




export default ProductCard;