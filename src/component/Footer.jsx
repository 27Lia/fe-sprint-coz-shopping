import React from "react";
import styled from "styled-components"; 

const StyleFooter = styled.footer`
.footer-container {
    height: 70px;
    border-top: 1px solid rgba(0, 0, 0, 0.10);
    font-size: 12px;
    padding: 11px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #888;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index:1;
    background-color:#fff;
}
`

function Footer() {
    return (
        <StyleFooter>
        <footer className="footer-container">
            <span>개인정보 처리방침 | 이용 약관</span>
            <span>All rights reserved @ sunmi</span>
        </footer>
        </StyleFooter>
    )
}

export default Footer;