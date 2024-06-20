"use client";
import React, { useState, useEffect } from 'react';
import Nav from '../Components/navbar';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';
import Image from 'next/image';

const PRODUCTS_PER_PAGE = 10;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://oasis-final-directory.onrender.com/products/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products.');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, products]);

  if (error) {
    return (
      <div>
        <Nav />
        <h2 className="text-center mt-5">{error}</h2>
      </div>
    );
  }

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handleOrderClick = (productId, productName) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const productData = {
        productName,
        productId,
        userId
      };
      router.push(`/Ortho-Resources/${productId}?productName=${encodeURIComponent(productName)}&productId=${productId}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <div>
      <Nav />
      <header className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-[#0e0737] my-4">Products</h1>
      </header>
      <div className="text-center my-5">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 text-lg w-full max-w-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {currentProducts.map(product => (
          <div key={product._id} className="m-2 border border-gray-300 p-5 w-full max-w-xs rounded-lg shadow-md">
            <div className="text-black no-underline">
              <Image
                src={product.imageUrl}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-t-lg"
                width={192}
                height={192}
              />
              <h3 className="mt-2 text-xl font-bold">{product.productName}</h3>
              <p className="text-gray-600">Price: LKR {product.price}</p>
            </div>
            <button
              onClick={() => handleOrderClick(product._id, product.productName)}
              className="mt-2 p-2 w-full bg-[#0e0737] text-white rounded-md"
            >
              Order
            </button>
          </div>
        ))}
      </div>
      <div className="text-center my-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 text-lg rounded-md ${currentPage === index + 1 ? 'bg-[#0e0737] text-white' : 'bg-white border border-[#0e0737] text-indigo-900'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="text-center mt-5 text-lg">
        {`${startIndex + 1}-${Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts)} of ${totalProducts} products`}
      </div>
    </div>
  );
}

export default ProductPage;
