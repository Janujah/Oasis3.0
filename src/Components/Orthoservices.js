"use client"
import React, { useState, useEffect } from 'react';
// import Nav from '../Components/technav';
import {jwtDecode} from 'jwt-decode';  // Adjust the import statement as needed

const PRODUCTS_PER_PAGE = 10;

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Decode the token and extract the username
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.userName) {
          setUserName(decodedToken.userName);
          fetchProducts(decodedToken.userName);
        } else {
          setError('User not authenticated.');
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        setError('Failed to decode token.');
      }
    } else {
      setError('User not authenticated.');
    }
  }, []);

  const fetchProducts = async (userName) => {
    try {
      const response = await fetch(`https://oasis-final-directory.onrender.com/Products/user/${userName}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products.');
    }
  };

  if (error) {
    return (
      <div>
        {/* <Nav /> */}
        <h2 className="text-center mt-5">{error}</h2>
      </div>
    );
  }

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handleOrder = (productId) => {
    // Handle order logic here
    console.log('Order placed for product:', productId);
  };

  return (
    <div>
      {/* <Nav /> */}
      <header className="text-center font-bold text-4xl text-[#0e0737] mt-8 mb-6">
        Products
      </header>
      <div className="flex flex-wrap justify-center">
        {currentProducts.map(product => (
          <div key={product._id} className="border border-gray-300 m-3 p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <img src={product.imageUrl} alt={product.productName} className="w-full h-48 object-cover mb-4" />
            <h3 className="text-lg font-semibold mb-2">{product.productName}</h3>
            <p className="mb-2">Price: LKR {product.price}</p>
            {/* <button
              onClick={() => handleOrder(product._id)}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Order Now
            </button> */}
          </div>
        ))}
      </div>
      <div className="flex justify-center my-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="text-center mt-2 text-lg">
        {`${startIndex + 1}-${Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts)} of ${totalProducts} products`}
      </div>
    </div>
  );
};

export default ProductCard;
