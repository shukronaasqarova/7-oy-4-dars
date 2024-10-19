import React, { useEffect, useState } from 'react';
import { http } from '../axios'; 
import { useNavigate } from 'react-router-dom';

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

  return (
    <div className="min-h-screen py-10">
      <div className="flex justify-between items-center container mx-auto px-6 py-16">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-gray-600 mb-6 ">
            We are changing <br /> the way people <br /> shop
          </h1>
          <p className="text-gray-600 mb-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.
          </p>
          <button className="btn btn-primary">OUR PRODUCTS</button>
        </div>
        <div className="flex justify-center items-center">
          <img src="https://picsum.photos/400/300" className="rounded-lg shadow-2xl" alt="Example" />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Featured Products
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {
            products.length > 0 ? (
              products.map(product => (
                <div 
                  key={product.id}
                  className="w-80 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
                  onClick={() => handleRedirect(product.id)}
                >
                  <img 
                    className="h-56 w-full object-cover" 
                    src={product.attributes.image} 
                    alt={product.attributes.title} 
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{product.attributes.title}</h3>
                    <h3 className="text-xl font-semibold text-gray-800">${product.attributes.price}</h3>

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