import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "./component/Footer";
import BookMark from "./page/BookMark";
import ProductListPage from "./page/ProductListPage";
import Header from "./component/Header";
import Modal from "./component/Modal";
import Toast from "./component/Toast";
import data from "./data.json";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import BoardPage from "./page/BoardPage";
import CreatePostPage from "./page/CreatePostPage";
import PostDetailPage from "./page/PostDetailPage";
import { useDispatch, useSelector } from "react-redux"; // Redux 훅 사용
import { updateData } from "./redux"; // Redux 액션 임포트

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data); // 스토어에서 products 가져오기
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState(""); // modalImage 상태 선언
  const [showToast, setShowToast] = useState(false); // 알림 표시 여부를 관리하는 상태
  const [message, setMessage] = useState("");
  const [updataProduct, setUpdataProduct] = useState();

  const toggleBookmark = (item) => {
    const updatedProducts = products.map((product) => {
      if (product.id === item.id) {
        const updated = { ...product, checked: !product.checked };
        setUpdataProduct(updated); // 현재 선택된 상품 상태 업데이트

        setMessage(
          updated.checked
            ? "상품이 북마크에 추가되었습니다."
            : "상품이 북마크에서 제거되었습니다."
        );
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        return updated;
      } else {
        return product;
      }
    });
    dispatch(updateData(updatedProducts)); // 상태 업데이트
  };

  const openModal = (product) => {
    setModal(true);
    setModalImage(
      product.type === "Brand" ? product.brand_image_url : product.image_url
    );
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
          <Route
            path="/"
            element={
              <ProductListPage
                products={products}
                toggleBookmark={toggleBookmark}
                openModal={openModal}
              />
            }
          />
          <Route
            path="/bookmark"
            element={
              <BookMark
                products={products}
                toggleBookmark={toggleBookmark}
                openModal={openModal}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/board/create" element={<CreatePostPage />} />
          <Route path="/board/:postId" element={<PostDetailPage />} />
        </Routes>
        <Footer />
        {modal && (
          <Modal
            updataProduct={updataProduct}
            products={products}
            openModal={openModal}
            isOpen={modal}
            image={modalImage}
            closeModal={closeModal}
            toggleBookmark={toggleBookmark}
          />
        )}
        {showToast && (
          <Toast message={message} checked={updataProduct.checked} />
        )}
      </div>
    </BrowserRouter>
  );
}
export default App;
