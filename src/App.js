import { Routes, Route, BrowserRouter } from "react-router-dom";
import Footer from "./component/Footer";
import BookMark from "./page/BookMark";
import ProductListPage from "./page/ProductListPage";
import Header from "./component/Header";
import LoginPage from "./page/LoginPage";
import SignUpPage from "./page/SignUpPage";
import BoardPage from "./page/BoardPage";
import CreatePostPage from "./page/CreatePostPage";
import PostDetailPage from "./page/PostDetailPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetailPage from "./page/ProductDetailPage";

function App() {
  return (
    <BrowserRouter basename="/fe-sprint-coz-shopping">
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/bookmark" element={<BookMark />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/board/create" element={<CreatePostPage />} />
          <Route path="/board/:postId" element={<PostDetailPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
        </Routes>
        <Footer />

        <ToastContainer autoClose={700} />
      </div>
    </BrowserRouter>
  );
}
export default App;
