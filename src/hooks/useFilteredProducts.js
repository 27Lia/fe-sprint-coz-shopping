import { useSelector } from "react-redux";

const useFilteredProducts = (filterOption, includeBookmarked) => {
  const products = useSelector((state) => state.products); // 전체 상품 데이터
  const bookmarks = useSelector((state) => state.bookmarks); // 북마크된 상품 ID 목록
  // 북마크 상태에 따른 필터링
  const filteredProducts = products.filter((product) =>
    includeBookmarked
      ? bookmarks.includes(product.id)
      : !bookmarks.includes(product.id)
  );

  // 카테고리 필터링
  const filterProduct = filteredProducts.filter((product) => {
    return filterOption === "전체" || product.type === filterOption;
  });

  return filterProduct;
};

export default useFilteredProducts;
