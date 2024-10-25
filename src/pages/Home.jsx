import React, { useEffect, useState } from 'react';
import { http } from '../axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    http.get('products?featured=true')
      .then(response => {
        if (response.status === 200) {
          setProducts(response.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function handleRedirect(id) {
    navigate(`/details/${id}`);
  }
  function handleProductsPage(e){
    e.preventDefault()
    navigate('/products')
  }

  return (
    <div className="min-h-screen py-10">
      <div className="flex justify-around items-center container mx-auto px-6 py-16">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-gray-600 mb-6 ">
            We are changing <br /> the way people <br /> shop
          </h1>
          <p className="text-gray-600 mb-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.
          </p>
          <button onClick={handleProductsPage} className="btn btn-primary">OUR PRODUCTS</button>
        </div>
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
          <div className="carousel-item">
            <img
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp"
              className="rounded-box w-[320px] h-[416px]"
              alt="Example 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero2-2271e3ad.webp"
              className="rounded-box w-[320px] h-[416px]"
              alt="Example 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero3-a83f0357.webp"
              className="rounded-box w-[320px] h-[416px]"
              alt="Example 3"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://react-vite-comfy-store-v2.netlify.app/assets/hero4-4b9de90e.webp"
              className="rounded-box w-[320px] h-[416px]"
              alt="Example 4"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-gray-600 mb-4 ml-[125px] mt-20">Featured Products</h2>
        <hr />
        <div className="flex flex-wrap gap-8 justify-center ">
          {
            products.length > 0 ? (
              products.map(product => (
                <div
                  key={product.id}
                  className="w-96 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden mt-20 p-4"
                  onClick={() => handleRedirect(product.id)}
                >
                  <img
                    className="w-full h-56 object-cover rounded-xl"
                    src={product.attributes.image}
                    alt={product.attributes.title}
                  />
                  <div className="mt-2 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-gray-600 mt-5">{product.attributes.title}</h3>
                    <h3 className="text-xl font-semibold text-gray-600">${product.attributes.price}</h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center">No products found.</p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
