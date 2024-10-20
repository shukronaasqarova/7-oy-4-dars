import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { http } from '../axios';

function Details() {
  const [color, setColor] = useState();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const { id } = useParams('');

  useEffect(() => {
    http.get(`products/${id}`)
      .then(data => {
        if (data.status === 200) {
          setProduct(data.data.data);
          setColor(data.data.data.attributes.colors[0]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  const handleAddToBag = () => {
    if (product) {
      const productToAdd = {
        id: product.id,
        title: product.attributes.title,
        price: product.attributes.price,
        color,
        image: product.attributes.image,
        quantity,
      };

      const existingBag = JSON.parse(localStorage.getItem('bag')) || [];
      existingBag.push(productToAdd);
      localStorage.setItem('bag', JSON.stringify(existingBag));
      alert('Mahsulot savatchaga qo\'shildi!');
    }
  };

  return (
    <div className="flex justify-center items-start p-6 min-h-screen">
      <div className="wrapper flex w-3/4 md:w-1/2 bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
        {product && product.attributes ? (
          <>
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
              className="rounded-lg shadow-md w-full h-64 object-cover mb-6" 
            />
            <div className="ml-4 w-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{product.attributes.title}</h3>
                <h3 className="text-xl font-bold text-blue-600 mb-2">${product.attributes.price}</h3>
                <p className="text-gray-700 mb-4">{product.attributes.description}</p>
              </div>

              <div className="mb-4">
                <label htmlFor="color" className="mr-2 font-medium">Rang:</label>
                <div className="flex mb-2">
                  {product.attributes.colors.map((colorProduct, index) => (
                    <span
                      key={index}
                      onClick={() => setColor(colorProduct)}
                      className={`cursor-pointer w-8 h-8 rounded-full inline-block mr-2 border-2 transition duration-200 ease-in-out ${color === colorProduct ? 'border-black' : 'border-transparent'}`}
                      style={{ backgroundColor: colorProduct }}
                    ></span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="quantity" className="mr-2 font-medium">Soni:</label>
                <select 
                  id="quantity" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)} 
                  className="border border-gray-300 rounded p-2 transition duration-200 focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleAddToBag} 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Savatchaga qo'shish
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Details;
