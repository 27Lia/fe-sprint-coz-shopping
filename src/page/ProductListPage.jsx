import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { styled } from "styled-components";
import InnerContainer from "./InnerContainer";
import Nav from "../component/Nav";
import { useSelector } from "react-redux";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { fetchProducts } from "../redux";
import { useDispatch } from "react-redux";

const StyleProductList = styled.div`
  nav {
    display: flex;
    margin-top: 24px;
    justify-content: center;
    align-items: center;
  }

  ul {
    display: flex;
    min-width: 350px;
    gap: 36px;
  }

  main {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    grid-template-rows: repeat(4, 3fr);
    align-items: center;
    gap: 17px;
  }

  button {
    cursor: pointer;
  }
  .blank {
    height: 100px;
  }
`;

function ProductListPage() {
  const [filterOption, setFilterOption] = useState("전체");
  const products = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filterProducts = async (user) => {
      let bookmarkedIds = [];
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.bookmarks) {
            bookmarkedIds = userData.bookmarks.map((bookmark) => bookmark.id);
          }
        }
      }

      const nonBookmarkedFilteredProducts = products.filter(
        (product) =>
          !bookmarkedIds.includes(product.id) &&
          (filterOption === "전체" || product.type === filterOption)
      );

      setFilteredProducts(nonBookmarkedFilteredProducts);
    };

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      filterProducts(user);
    });

    return () => unsubscribeAuth();
  }, [products, filterOption]);

  return (
    <InnerContainer>
      <StyleProductList>
        <Nav setFilterOption={setFilterOption} />
        <main>
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </main>
      </StyleProductList>
    </InnerContainer>
  );
}

export default ProductListPage;
