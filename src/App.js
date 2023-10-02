import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./page/MainPage";
import Footer from "./component/Footer";
import BookMark from "./page/BookMark";
import ProductListPage from "./page/ProductListPage";
import Header from "./component/Header";
// import axios from 'axios';
import Modal from "./component/Modal";
import Toast from "./component/Toast";
import data from './data.json'
import LoginPage from "./page/LoginPage";


function App() {
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState(''); // modalImage 상태 선언
  const [showToast, setShowToast] = useState(false); // 알림 표시 여부를 관리하는 상태
  const [message, setMessage] = useState('');
  const [updataProduct, setUpdataProduct] = useState();



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 지정된 URL로 GET 요청을 보내고 응답을 기다림
        // const response = await axios.get('http://cozshopping.codestates-seb.link/api/v1/products');
        // 응답에서 데이터를 추출
        // const data = response.data;
        // 'products' 상태를 검색한 데이터로 업데이트
        setProducts(data);
      } catch (error) {
        // API 요청 중에 발생한 오류처리
        console.error('API 요청 중 오류가 발생했습니다:', error);
      }
    };
    // 컴포넌트가 마운트될 때 fetchProducts 함수를 실행
    fetchProducts();
  }, []);

  const toggleBookmark = (item) => {
    setProducts((prevProduct) =>
      prevProduct.map((product) => {
        if (product.id === item.id) {
          const updataProduct = { ...product, checked: !product.checked };
          setUpdataProduct(updataProduct); // 업데이트된 상태를 설정
          setMessage(updataProduct.checked
            ? "상품이 북마크에 추가되었습니다."
            : "상품이 북마크에서 제거되었습니다.");
          setShowToast(true)
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
          return updataProduct;
        } else {
          return product;
        }
      })
    );
  };

  const openModal = (product) => {
    setModal(true);
    setModalImage(product.type === "Brand" ? product.brand_image_url : product.image_url);
    setUpdataProduct(product);
  };


  const closeModal = () => {
    setModal(false);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/"
            element={<MainPage
              products={products}
              toggleBookmark={toggleBookmark}
              openModal={openModal}
            />} />
          <Route path="/bookmark"
            element={<BookMark
              products={products}
              toggleBookmark={toggleBookmark}
              openModal={openModal}
            />} />
          <Route path="/products/list"
            element={<ProductListPage
              products={products}
              toggleBookmark={toggleBookmark}
              openModal={openModal}
            />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
        {modal && (
          <Modal updataProduct={updataProduct}

            products={products}
            openModal={openModal}
            isOpen={modal}
            image={modalImage}
            closeModal={closeModal}
            toggleBookmark={toggleBookmark}
          />
        )}
        {showToast && (<Toast
          message={message}
          checked={updataProduct.checked}
        />
        )}
      </div>

    </BrowserRouter>

  )
}
export default App;


