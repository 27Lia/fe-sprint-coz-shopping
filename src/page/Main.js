import '../component/list.css';
//메인리스트 목록들..

function Main() {
        return (
                <div className='list-container'>
                <span className='list-title'>상품 리스트</span>
                    <ul className="item-container">
                        <li className='item'>
                            <img src="/img.png" alt='상품이미지'></img>
                            <div className='item-title'>
                                <span>상품이름</span>
                                <span>15%</span>
                            </div>
                            <div>12,900</div>
                        </li>
                        <li>
                            <img src="/img.png" alt='상품이미지'></img>
                            <div className='item-title'>
                                <span>상품이름</span>
                                <span>15%</span>
                            </div>
                            <div>12,900</div>
                        </li>
                        <li>
                            <img src="/img.png" alt='상품이미지'></img>
                            <div className='item-title'>
                                <span>상품이름</span>
                                <span>15%</span>
                            </div>
                            <div>12,900</div>
                        </li>
                        <li>
                            <img src="/img.png" alt='상품이미지'></img>
                            <div className='item-title'>
                                <span>상품이름</span>
                                <span>15%</span>
                            </div>
                            <div>12,900</div>
                        </li>
                    </ul>
                    <span className='list-title'>북마크 리스트</span>
                    <ul className="item-container">
                    <li className='item'>
                            <img src="/img.png" alt='상품이미지'></img>
                            <div className='item-title'>
                                <span>상품이름</span>
                                <span>15%</span>
                            </div>
                            <div>12,900</div>
                        </li>
                        <li>
                            <img src="/img.png" alt='상품이미지'></img>
                            <div className='item-title'>
                                <span>상품이름</span>
                                <span>15%</span>
                            </div>
                            <div>12,900</div>
                        </li>
                        <li>
                            <img src="/img.png" alt='상품이미지'></img>
                            <div className='item-title'>
                                <span>상품이름</span>
                                <span>15%</span>
                            </div>
                            <div>12,900</div>
                        </li>
                        <li>
                            <img src="/img.png" alt='상품이미지'></img>
                            <div className='item-title'>
                                <span>상품이름</span>
                                <span>15%</span>
                            </div>
                            <div>12,900</div>
                        </li>
                    </ul>
                </div>

                );
  }
  export default Main;