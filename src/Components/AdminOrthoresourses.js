"use client";
import React, { useState, useEffect } from 'react';
import Nav from '../Components/AdminNavbar'; // Ensure the component import matches the actual file name and path.
import Image from 'next/image';

const PRODUCTS_PER_PAGE = 10;

const AdminProductTable = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);  // Default to the first page

  useEffect(() => {
    console.log("Fetching products...");
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://oasis-final-directory.onrender.com/products/all');
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

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div>
        <Nav />
        <h2 style={{ textAlign: 'center', marginTop: '20px' }}>{error}</h2>
      </div>
    );
  }

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  console.log("Rendering products page", currentPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <Nav />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-center">{product.productName}</h3>
              <Image src={product.imageUrl} alt={product.productName} className="w-full h-40 object-cover rounded mb-4" />
              <p className="text-gray-600 text-center">
                <strong>Price:</strong> LKR {product.price}
              </p>
              <p className="text-gray-600 text-center">
                <strong>Email:</strong> {product.userEmail}
              </p>
              <p className="text-gray-600 text-center">
                <strong>Username:</strong> {product.userName}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#0e0737] text-white'}`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-[#0e0737] text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#0e0737] text-white'}`}
          >
            Next
          </button>
        </div>
        <div className="text-center mt-4">
          {`${startIndex + 1}-${Math.min(startIndex + PRODUCTS_PER_PAGE, totalProducts)} of ${totalProducts} products`}
        </div>
      </div>
    </div>
  );
};

export default AdminProductTable;
