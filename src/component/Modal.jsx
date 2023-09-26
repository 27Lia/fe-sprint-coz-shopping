import React from "react";
import { styled } from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:1;

.modalcontent {
  position:relative;
}

.main-img {
    width: 744px;
    height:480px;
    border-radius: 12px;
    box-shadow: 0px 0px 36px 0px rgba(0, 0, 0, 0.50);
}
button {
  position: absolute;
  top: 20px;
  right:50px;
  font-size: 24px;
  color: white;
  cursor: pointer;
}
.star {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 20px;
    cursor: pointer;
    bottom: 20px; 
  }
`

function Modal({ isOpen, closeModal, image, toggleBookmark, updataProduct, products }) {
  if (!isOpen) return null;
    // products 배열을 product로 변경하는 로직 추가, products 배열에서 클릭한 이미지 URL과 일치하는 상품 객체를 찾아냄
    const product = products.find((item) => item.image_url === image || item.brand_image_url === image);

  // updataProduct가 있고, updataProduct의 id가 현재 상품의 id와 일치하면 updataProduct의 checked 값을 사용하고,
  // 그렇지 않다면 false
    const checked = updataProduct?.id === product.id ? updataProduct.checked : false; 

  return (
    <ModalBackground onClick={closeModal}>
      <div className="modalcontent">
        <img className="main-img" src={image} alt="modal" />
        <img
          onClick={() => toggleBookmark(product)}                   
          className="star"
          src={checked ? "/images/checkedStar.svg" : "/images/uncheckedStar.svg"}
          alt="book mark" 
        />
        <button onClick={closeModal}>X</button>
      </div>
    </ModalBackground>
  );
}


export default Modal;
