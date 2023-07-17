import React from "react";
import styled from "styled-components"; 

const StyleFooter = styled.footer`
.footer-container {
    width: 1280px;
    height: 58px;
    border-top: 1px solid rgba(0, 0, 0, 0.10);
    font-size: 12px;
    padding: 11px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #888;
    margin-bottom: 6px;

}
`

function Footer() {
    return (
        <StyleFooter>
        <footer className="footer-container">
            <span>개인정보 처리방침 | 이용 약관</span>
            <span>All rights reserved @ Codestates</span>
        </footer>
        </StyleFooter>
    )
}

export default Footer;