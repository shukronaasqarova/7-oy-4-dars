import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { http } from '../axios';

function Details() {
  const [color, setColor] = useState();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-start p-6 bg-transparent w-full md:w-4/5 lg:w-3/4 xl:w-2/3">
        <nav className="text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:underline">Home</Link> &gt; <span className="text-gray-500">Products</span>
        </nav>

        <div className="wrapper w-full flex flex-col md:flex-row items-center md:items-start gap-8">
          {product && product.attributes ? (
            <>
              <img
                src={product.attributes.image}
                alt={product.attributes.title}
                className="rounded-lg shadow-md w-full md:w-1/1 h-[450px] object-cover mb-6 md:mb-0"
              />
              <div className="w-full md:ml-6 flex flex-col items-start">
                <h3 className="text-3xl font-bold text-gray-600 mb-3">{product.attributes.title}</h3>
                <h4 className="text-2xl font-bold text-gray-500 mb-3">{product.attributes.company}</h4>
                <p className="font-bold text-gray-700 mb-3">${product.attributes.price}</p>
                <p className="text-gray-600 mb-4 text-lg">{product.attributes.description}</p>

                <div className="mb-4 w-full">
                  <label htmlFor="color" className="mr-2 font-medium">Colors:</label>
                  <div className="flex mb-2">
                    {product.attributes.colors.map((colorProduct) => (
                      <span
                        key={colorProduct}
                        onClick={() => setColor(colorProduct)}
                        className={`cursor-pointer w-6 h-6 rounded-full inline-block mr-2 border-2 transition duration-200 ease-in-out ${color === colorProduct ? 'border-black' : 'border-transparent'}`}
                        style={{ backgroundColor: colorProduct }}
                      ></span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 w-full">
                  <label htmlFor="quantity" className="mr-2 font-medium">Amount:</label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full transition duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num} value={num + 1}>{num + 1}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddToBag}
                  className="bg-purple-700 p-4 text-white  rounded-lg hover:bg-purple-700 text-sm"
                >
                  ADD TO BAG
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-600">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
