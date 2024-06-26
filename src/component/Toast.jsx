import React from "react";
import { styled } from "styled-components";

const StyleToast = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  bottom: 80px;
  right: 24px;
  .message-box {
    width: 281px;
    height: 50px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;

function Toast({ message, checked }) {
  return (
    <StyleToast>
      <div className="message-box">
        <img
          src={
            checked ? "/images/checkedStar.svg" : "/images/uncheckedStar.svg"
          }
          alt="Bookmark Icon"
        />
        {message}
      </div>
    </StyleToast>
  );
}

export default Toast;
