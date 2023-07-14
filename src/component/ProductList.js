// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://cozshopping.codestates-seb.link/api/v1/products?limit=10');
//         setProducts(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {products.map((product) => (
//         <div key={product.id}>
//           <h3 className="product-name">{product.name}</h3>
//           <p>{product.description}</p>
//           {/* 추가 필드 표시 */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;
