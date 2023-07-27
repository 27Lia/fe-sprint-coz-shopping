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


img {
    width: 744px;
    height:480px;
    border-radius: 12px;
    box-shadow: 0px 0px 36px 0px rgba(0, 0, 0, 0.50);
}
button {
  position: absolute;
  top: 27%;
  right:32%;
  font-size: 24px;
  color: white;
  cursor: pointer;
}
`


function Modal({ isOpen, closeModal, image }) {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={closeModal}>
      <div className="modalcontent">
        <img src={image} alt="modal" />        
        <button onClick={closeModal}>X</button>
      </div>
    </ModalBackground>
  );
}

export default Modal;
